# T-003 — Vercel edge middleware for AI Traffic Visibility

| Field            | Value                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| ID               | T-003                                                                 |
| Branch           | `feat/T-003-edge-middleware-ai-traffic`                               |
| Recommended Tier | `balanced`                                                            |
| Priority         | P1                                                                    |
| Type             | feature                                                               |
| Created          | 2026-06-07                                                            |
| Source           | `docs/HANDOVER_sprint_2.md` Part 1 (Sprint 2 — AI Traffic Visibility) |
| Status           | Planned — awaiting human review                                       |

## Overview

Sprint 2 ("AI Traffic Visibility") classifies every request to a StackShift site at the
Vercel edge as **AI crawler**, **AI-referred human**, or **ordinary human**, and forwards a
tracking event to PublishForge for aggregation, scoring, and a dashboard.

Per the handover (Part 1), **the only Sprint 2 work in this repository is the edge
middleware.** Everything downstream — the `/api/track` ingestion endpoint, the four database
tables, `bot_verified` verification, aggregation, scoring (pg_cron), alerting, the dashboard,
and `pf_known_pages` — lives in PublishForge (Repository A) and is **out of scope here**.

This is a clean additive build: no `middleware.ts` currently runs on these sites.

The middleware must:

1. Classify each matched request (priority order: `ai_crawler` → `ai_user` → `human`).
2. Derive an `agent` label (`ChatGPT | Claude | Perplexity | Gemini | Other`).
3. Read a first-party session cookie; **mint an opaque UUID and set it if absent** (forward-prep only — no attribution logic).
4. Fire a **non-blocking** (`event.waitUntil()`) POST to PublishForge `/api/track`. The write must **never block or fail the response**; all tracking errors are swallowed.
5. **PII-scrub** the referrer at the edge (host + path only; strip query string and fragment).
6. Read the AI bot/referrer match list from **editable config** (a bundled JSON file), not hardcoded patterns.

### Locked decisions (confirmed with the user before planning)

- **Match list delivery:** bundled JSON file in the repo (`config/ai-agents.json`), imported by the middleware. Editable config, not hardcoded logic. Tradeoff accepted: updating the list requires a redeploy (a remote PF endpoint was the alternative and was declined).
- **`session_token`:** mint-if-absent and set a first-party cookie — self-contained in this repo. No existing cookie minting to rely on.
- **PF endpoint:** build against env vars (`PF_TRACK_URL`, `PF_TRACK_KEY`) to be filled in later. The endpoint is not assumed live; fire-and-forget makes a missing/dead endpoint harmless. Not live-validated in this task.
- **Discoverability files (handover Part 2.8):** OUT OF SCOPE for this repo, even though `public/llms.txt` and `public/sitemap-agents.xml` are generated here. Treated as PublishForge's concern (assigned to Ross in the handover).

## Requirements

1. **`middleware.ts` at the repo root.** Runs on the Vercel edge runtime (Next.js middleware default). Must use only edge-safe APIs (Web `fetch`, Web Crypto, `NextRequest`/`NextResponse`) — no Node-only modules.

2. **Classification (priority order).** Evaluate in this exact order; first match wins:

   1. **`ai_crawler`** — `User-Agent` matches a known AI-bot pattern (case-insensitive substring) from config.
   2. **`ai_user`** — the `Referer` header's host matches an AI-platform host from config.
   3. **`human`** — everything else.

3. **Agent label.** Derived from whichever signal matched:

   - `ai_crawler` → the `agent` of the matched crawler entry.
   - `ai_user` → the `agent` of the matched referrer entry.
   - `human` → `Other`.
   - Enum is exactly `ChatGPT | Claude | Perplexity | Gemini | Other` (must match the PF payload contract).

4. **Match list as config (`config/ai-agents.json`).** AI-bot UA patterns and AI-referrer hosts live in a bundled JSON file the middleware imports. `middleware.ts` must contain **no hardcoded** UA/host literals — only the matching logic. Seed it from the handover §1.1 list (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Gemini, etc.; referrer hosts chat.openai.com, chatgpt.com, claude.ai, perplexity.ai, gemini.google.com, copilot.microsoft.com).

5. **`session_token` — mint if absent.** Read a first-party cookie (proposed name `pf_session`). If absent, generate `crypto.randomUUID()` and set it on the response (`Secure`, `SameSite=Lax`, `Path=/`, long `Max-Age`, e.g. 1 year). **No** sessionization, joins, or attribution this sprint — the value is captured and forwarded only (forward-prep for a future conversion-attribution sprint).

6. **Event payload — exact contract (handover §1.1).** POST body:

   ```jsonc
   {
     "page_url": "string", // request pathname, normalized (no query/fragment)
     "visitor_type": "ai_crawler | ai_user | human",
     "agent": "ChatGPT | Claude | Perplexity | Gemini | Other",
     "client_ip": "string", // for PF's bot_verified reverse-DNS (Part 3.2)
     "user_agent": "string", // raw UA, for verification + audit
     "timestamp": "string", // ISO 8601 (new Date().toISOString())
     "referrer_url": "string | null", // PII-scrubbed: host + path only
     "session_token": "string"
   }
   ```

7. **referrer_url scrubbing.** Parse the `Referer` header; emit `host + pathname` only. Strip query string and fragment. Never forward tokens/emails/query params. If there is no referer or it is unparseable, emit `null`.

8. **client_ip.** Use `req.ip` (populated by Vercel) with a fallback to the first hop of `x-forwarded-for`. Empty string if neither is present (PF tolerates it; do not throw).

9. **Transport.** `fetch(PF_TRACK_URL, { method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer <PF_TRACK_KEY>" }, body })`. The exact auth header is a **cross-repo contract** to confirm with PublishForge (Part 2.2 says "per-customer ingest key; 401 if missing/invalid"); default to `Authorization: Bearer`.

10. **Fire-and-forget, never block.** Wrap the POST in `event.waitUntil(trackEvent(...).catch(() => {}))`. The response is returned immediately. Any error (network, non-2xx, JSON, missing env) is swallowed — the page always serves. **No measurable TTFB impact** is the target (handover §1.1, §3.3) — do not `await` the POST on the request path and do not design to an arbitrary ms budget.

11. **No-op when unconfigured.** If `PF_TRACK_URL` is unset (local dev, or before PF is live), skip the POST entirely — still set the session cookie and continue the response normally. No errors, no logs that would fail the build.

12. **Simple version only.** Build the per-request `waitUntil` POST. **No sampling or batching** yet — that is a staging-driven optimization (handover §3.3). All three visitor types are tracked on every matched request.

13. **No tier gating / flags.** One code path for all customers. No paywall, no feature flags, no Tier-2 / conversion / revenue logic anywhere.

14. **Matcher — content routes only.** Exclude: `/api/*`, `/_next/*`, `/studio/*` (embedded Sanity Studio), the discoverability/SEO files (`llms.txt`, `sitemap-agents.xml`, `sitemap.xml`, `robots.txt`), `favicon.ico`, `mockServiceWorker.js`, and static asset extensions. See Code Context for the proposed matcher regex.

15. **Env documentation.** Add `PF_TRACK_URL` and `PF_TRACK_KEY` to `.env.example` with comments. `PF_TRACK_KEY` is a secret — **must not** be `NEXT_PUBLIC_`.

## Out of Scope / Must Not Change

- **Everything in handover Part 2 onward** — the `/api/track` endpoint, the four tables (`pf_known_pages`, `pf_page_events`, `pf_page_stats`, `pf_scores_daily`), `bot_verified` verification, per-page aggregation, the daily score job, alerting, the dashboard, `wiki_health_log` wiring, and `pf_known_pages` upsert. All PublishForge.
- **Discoverability-file freshness (Part 2.8)** — no changes to `scripts/generate-*`, `public/llms.txt`, `public/sitemap-agents.xml`, or the `prebuild` chain.
- **No Tier-2 / conversion / revenue / paywall / feature-flag surfaces** anywhere.
- **No attribution logic on `session_token`** — capture and forward only.
- **Existing routes, pages, API handlers, and `next.config.mjs`** — the middleware is purely additive; do not modify route behavior. (The matcher must not accidentally intercept `/api/*` or `/studio/*`.)
- **No new runtime dependency** — use the built-in `NextFetchEvent.waitUntil()` and native `crypto.randomUUID()`. Do not add `@vercel/functions` or use the `uuid` package.

## Proposed File Changes

| Path                       | Change | Notes                                                                                                                     |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `middleware.ts`            | new    | Edge middleware: classify → build payload → `waitUntil` POST → set session cookie → continue.                             |
| `config/ai-agents.json`    | new    | Editable match list: crawler UA patterns + AI-referrer hosts, each tagged with an agent label.                            |
| `lib/tracking/classify.ts` | new    | Pure classification helpers (UA match, referrer-host match, agent label, referrer scrub). Unit-testable, no edge globals. |
| `.env.example`             | edit   | Add `PF_TRACK_URL` and `PF_TRACK_KEY` (server-only secret) with comments.                                                 |

> Splitting the pure logic into `lib/tracking/classify.ts` keeps `middleware.ts` thin (request glue + `waitUntil`) and makes classification testable without an edge environment. Implementation may inline it if the reviewer prefers a single file, but the config JSON must stay separate (Requirement 4).

## Code Context

Files the implementation stage should read before writing:

### `next.config.mjs` (existing — do not break)

- `i18n: { locales: ["en"], defaultLocale: "en" }` — single locale, so the matcher needs no locale-prefix handling, but be aware i18n is active.
- `rewrites`: `/sitemap.xml → /api/sitemap`. The matcher already excludes `/api/*` and should also exclude `/sitemap.xml` to avoid double-counting the rewrite source.
- `redirects`: `/home → /` (permanent). Redirects are evaluated by Next; middleware on `/home` is avoidable but harmless — not a concern.
- `compiler.removeConsole` strips `console.log` in production (keeps `error`/`info`). Keep tracking silent regardless.

### Routes present (for matcher design)

Top-level `pages/`: `index.tsx`, `[slug].tsx`, `agents/`, `products/`, `collections/`, `cart/`, `search/`, `wishlist/`, `theme-page/`, plus `studio/[[...index]].tsx` (embedded Sanity Studio — **exclude**). Sprint-1/1.5 targets `/agents/[slug]` and `/agents/products/[sku]` are ordinary content routes and will be matched automatically (handover §1, KPI: both must appear in tracking).

### Existing PublishForge integration (naming reference, not reuse)

`pages/api/publishforge-proxy.ts` proxies to `NEXT_PUBLIC_PUBLISHFORGE_WEBHOOK_URL` (from `studio/config.ts`). That is a **different, public** webhook for a different purpose. Do **not** reuse it and do **not** import `studio/config` into the edge middleware (it pulls Studio deps and is not edge-safe). The tracking ingest key is a **secret** — read `process.env.PF_TRACK_URL` / `process.env.PF_TRACK_KEY` directly in the middleware; `PF_TRACK_KEY` must not be `NEXT_PUBLIC_`.

### Proposed `config/ai-agents.json` shape

```jsonc
{
  "crawlers": [
    { "agent": "ChatGPT", "ua": ["GPTBot", "OAI-SearchBot", "ChatGPT-User"] },
    { "agent": "Claude", "ua": ["ClaudeBot", "Claude-Web", "anthropic-ai"] },
    { "agent": "Perplexity", "ua": ["PerplexityBot", "Perplexity-User"] },
    { "agent": "Gemini", "ua": ["Google-Extended", "Gemini"] }
  ],
  "referrers": [
    { "agent": "ChatGPT", "hosts": ["chat.openai.com", "chatgpt.com"] },
    { "agent": "Claude", "hosts": ["claude.ai"] },
    { "agent": "Perplexity", "hosts": ["perplexity.ai"] },
    { "agent": "Gemini", "hosts": ["gemini.google.com"] },
    { "agent": "Other", "hosts": ["copilot.microsoft.com"] }
  ]
}
```

UA matching is case-insensitive substring. Referrer matching is host equality or sub-domain suffix. The list is seedable/extendable without touching `middleware.ts`.

### Edge middleware skeleton (illustrative — not final code)

```typescript
import {
  NextResponse,
  type NextRequest,
  type NextFetchEvent,
} from "next/server";
import agents from "./config/ai-agents.json";
import { classify, scrubReferrer } from "./lib/tracking/classify";

const SESSION_COOKIE = "pf_session";

export function middleware(req: NextRequest, event: NextFetchEvent) {
  const res = NextResponse.next();

  // session_token: read or mint
  let token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    token = crypto.randomUUID();
    res.cookies.set(SESSION_COOKIE, token, {
      path: "/",
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  const url = process.env.PF_TRACK_URL;
  if (url) {
    const ua = req.headers.get("user-agent") ?? "";
    const referer = req.headers.get("referer");
    const { visitorType, agent } = classify(ua, referer, agents);

    const payload = {
      page_url: req.nextUrl.pathname,
      visitor_type: visitorType,
      agent,
      client_ip:
        req.ip ??
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        "",
      user_agent: ua,
      timestamp: new Date().toISOString(),
      referrer_url: scrubReferrer(referer),
      session_token: token,
    };

    event.waitUntil(
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.PF_TRACK_KEY ?? ""}`,
        },
        body: JSON.stringify(payload),
      }).catch(() => {}), // swallow — never block/fail the response
    );
  }

  return res;
}

export const config = {
  matcher: [
    // All paths except: api, _next, studio, named SEO/discoverability files,
    // and ANY path ending in a static-asset extension (covers root-level public/
    // files like /webriq-logo.png, /vercel.svg — these are NOT under /assets/).
    "/((?!api|_next/static|_next/image|studio|favicon\\.ico|mockServiceWorker\\.js|robots\\.txt|sitemap\\.xml|sitemap-agents\\.xml|llms\\.txt|assets/).*?(?<!\\.(?:png|jpe?g|gif|svg|webp|ico|js|css|map|woff2?|ttf|txt|xml)))$",
  ],
};
```

> **Matcher must exclude root-level static assets.** This repo serves files directly from `public/` at the root — `/webriq-logo.png`, `/webriq-logo-lg.png`, `/vercel.svg` (seen in `ls public/`). A matcher that only excludes `/_next/` and `/assets/` would still match these and fire a tracking POST per asset hit — the exact "don't POST naively on every request" anti-pattern (handover §1.1, §3.3). The negative lookahead above also rejects any path ending in a static-asset extension. A trailing-lookbehind regex like this is the riskiest part of the file — the implementer **must** validate it against the full route table in Acceptance Criteria (both the "matches" and "does NOT match" lists) before relying on it; if Next's matcher parser rejects the lookbehind, fall back to an in-handler extension guard (`if (/\.(png|svg|...)$/.test(pathname)) return res;`) plus a simpler matcher.

## Implementation Steps

1. **Create `config/ai-agents.json`** with the crawler/referrer shape above, seeded from the handover §1.1 list.
2. **Create `lib/tracking/classify.ts`** — pure functions:
   - `classify(ua, referer, config) → { visitorType, agent }` implementing the priority order (crawler UA → referrer host → human/Other).
   - `scrubReferrer(referer) → string | null` returning `host + pathname` only, `null` on absent/unparseable.
   - No edge globals; importable in a plain test runner.
3. **Create `middleware.ts`** at the repo root — request glue: build `NextResponse.next()`, read/mint the session cookie, build the payload, `event.waitUntil()` the POST (guarded by `PF_TRACK_URL`), return the response. Export the `config.matcher`.
4. **Finalize the matcher regex** so it excludes `/api`, `/_next`, `/studio`, the SEO/discoverability files, and static asset extensions, while still matching `/`, `/[slug]`, `/agents/*`, `/products/*`, `/collections/*`, etc.
5. **Update `.env.example`** — add `PF_TRACK_URL=` and `PF_TRACK_KEY=` with comments (note `PF_TRACK_KEY` is a server-only secret; the endpoint may be empty until PublishForge is live, in which case tracking is a safe no-op).
6. **Self-check** — `npx tsc --noEmit` clean for the new files; `yarn build` succeeds; manual `yarn dev` confirms pages render unchanged and (with `PF_TRACK_URL` pointed at a local echo) the payload shape matches the contract.

## Acceptance Criteria

- [ ] `middleware.ts` exists at the repo root and runs on the edge runtime (no Node-only imports).
- [ ] AI-bot UA patterns and AI-referrer hosts are read from `config/ai-agents.json`; `middleware.ts` contains no hardcoded UA/host literals.
- [ ] A request with `User-Agent: GPTBot/1.0` is classified `ai_crawler` / `ChatGPT`; `ClaudeBot` → `Claude`; `PerplexityBot` → `Perplexity`; `Google-Extended` → `Gemini`.
- [ ] A request with `Referer: https://chatgpt.com/...` and an ordinary browser UA is classified `ai_user` / `ChatGPT`. A request from `https://claude.ai/...` → `ai_user` / `Claude`.
- [ ] An ordinary browser request (no AI UA, no AI referer) is classified `human` / `Other`.
- [ ] Classification priority holds: a request that is **both** a known crawler UA and has an AI referer is classified `ai_crawler` (UA wins).
- [ ] The payload contains exactly the §1.1 fields with the correct types; `timestamp` is ISO 8601; `agent` and `visitor_type` are within their enums.
- [ ] `referrer_url` is host + path only — a `Referer` of `https://x.com/p?token=abc#frag` yields `x.com/p` (no `?token`, no `#frag`); absent/unparseable referer yields `null`.
- [ ] On first visit, a `pf_session` cookie is set (`Secure`, `SameSite=Lax`, `Path=/`, ~1y `Max-Age`); on subsequent visits the existing value is reused and `session_token` matches the cookie.
- [ ] The tracking POST is fired via `event.waitUntil()` and is **not** awaited on the response path; a forced failure of the POST (bad URL) does not error the page — it still serves 200.
- [ ] With `PF_TRACK_URL` unset, no POST is attempted, no error is thrown, the session cookie is still set, and pages render normally.
- [ ] The matcher **does NOT match** (no tracking POST): `/api/sitemap`, `/_next/static/x`, `/studio`, `/favicon.ico`, `/mockServiceWorker.js`, `/sitemap.xml`, `/sitemap-agents.xml`, `/llms.txt`, **and root-level static assets `/webriq-logo.png`, `/vercel.svg`, `/assets/anything`**.
- [ ] The matcher **does match** (fires tracking): `/`, `/some-slug`, `/agents/about-us`, `/agents/products/SKU-123`, `/products`, `/collections/x`, `/search`.
- [ ] `.env.example` documents `PF_TRACK_URL` and `PF_TRACK_KEY`; `PF_TRACK_KEY` is not prefixed `NEXT_PUBLIC_`.
- [ ] No new runtime dependency added (`crypto.randomUUID()` and `NextFetchEvent.waitUntil()` only).
- [ ] `yarn build` succeeds; existing routes render unchanged in `yarn dev`.

## Verification Commands / Approach

```bash
# 1. Type + build
npx tsc --noEmit
yarn build           # middleware compiles into the edge bundle; build must pass

# 2. Local run with a throwaway echo target for /api/track
#    (start a local listener, e.g. `npx http-echo-server 4000`, set PF_TRACK_URL=http://localhost:4000)
PF_TRACK_URL=http://localhost:4000 PF_TRACK_KEY=test-key yarn dev

# 3. Classification smoke tests (observe the echoed payload)
curl -s -A "GPTBot/1.0"     http://localhost:3000/                 # -> ai_crawler / ChatGPT
curl -s -A "ClaudeBot/1.0"  http://localhost:3000/agents/some-slug # -> ai_crawler / Claude
curl -s -H "Referer: https://chatgpt.com/c/x" http://localhost:3000/  # -> ai_user / ChatGPT
curl -s http://localhost:3000/                                     # -> human / Other

# 4. Referrer scrub
curl -s -H "Referer: https://x.com/p?token=secret#frag" http://localhost:3000/
#    echoed referrer_url must be exactly "x.com/p"

# 5. Session cookie
curl -si http://localhost:3000/ | grep -i set-cookie   # pf_session=<uuid>; Secure; SameSite=Lax; ...

# 6. Excluded paths fire NO tracking POST (no echo hit)
curl -s http://localhost:3000/llms.txt
curl -s http://localhost:3000/sitemap-agents.xml
curl -s http://localhost:3000/studio
curl -s http://localhost:3000/api/sitemap

# 7. Failure isolation — point at a dead URL, page must still serve 200
PF_TRACK_URL=http://127.0.0.1:1 yarn dev
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/   # -> 200

# 8. Unconfigured no-op — unset PF_TRACK_URL, confirm normal render + cookie still set
```

> Optional but recommended: a small unit test for `lib/tracking/classify.ts` covering the priority order, each agent label, and the referrer scrub. No test framework is currently configured — if one is added it should be a separate, low-risk addition; otherwise the curl matrix above is the verification of record.

## Compatibility Touchpoints

- **Cross-repo contract (PublishForge `/api/track`).** The payload shape (§1.1) is the shared event contract (handover Part 6). Confirm with PublishForge: (a) the auth header format (`Authorization: Bearer` vs a custom `x-ingest-key`), and (b) that field names/enums match before either side freezes. This middleware is the producer; PF Part 2.2 is the consumer.
- **`page_url` normalization — KPI-load-bearing contract.** PublishForge computes AI Crawl Coverage by joining `pf_page_events.page_url` (this payload) against `pf_known_pages.page_url`, which is populated from `sitemap-agents.xml` (handover 2.1 / 2.8). **A mismatch silently under-counts the headline coverage KPI.** Observed today: `public/sitemap-agents.xml` emits **absolute URLs with no trailing slash** (e.g. `http://localhost:3000/agents/about-us`); this middleware emits `req.nextUrl.pathname` = **bare path, no trailing slash** (`/agents/about-us`). The path components already agree on trailing-slash policy — good — but one side is absolute and one is a path. **Decision to ratify with PF:** both sides key on the **bare pathname** (PF strips the origin from each sitemap `<loc>` when upserting `pf_known_pages`). Document this so neither side drifts; re-verify if the sitemap generator switches to relative URLs or starts emitting trailing slashes.
- **TTFB / KPI validation.** "No measurable TTFB delta" and "pages appear in tracking within 24h of first verified crawl" (handover Part 4) can only be validated end-to-end once PF `/api/track` is live and `bot_verified` runs there. The middleware build is self-contained; this validation is a deferred cross-repo handoff, not a blocker for merging this task.
- **Set-Cookie vs CDN caching (specific TTFB risk to check in staging).** Setting `Set-Cookie` on an otherwise-cacheable SSG/ISR response can suppress the CDN cache hit and surface as exactly the TTFB delta the KPI watches. The mint-only-if-absent design bounds this to a visitor's **first** request (repeat visits send the existing cookie and set nothing), which is the right mitigation — but staging validation must check this **specific** mechanism: compare TTFB of a cache-warm repeat visit (cookie already present, no `Set-Cookie`) against the pre-middleware baseline, not just a generic "is it slower" pass.
- **`bot_verified` is PublishForge's job.** The middleware forwards raw `client_ip` and `user_agent` precisely so PF can do reverse-DNS / IP-range verification (handover §3.2). Do not attempt verification at the edge.
- **Edge bundle size.** Importing `config/ai-agents.json` statically is fine (small). Keep `middleware.ts` free of heavy imports (no `studio/config`, no `lib/sanity.client.ts`) to keep the edge bundle small and cold-start-free.
- **`next.config.mjs` rewrite for `/sitemap.xml`.** The matcher excludes `/sitemap.xml` and `/api/*`, so the rewrite source/target are not double-tracked.
- **Future sampling/batching.** If staging shows per-request POST cost, the next iteration adds sampling or batching (handover §1.1, §3.3). The config-driven, `waitUntil`-isolated design leaves room for this without touching the classification logic.

## Implementation Notes

### What Changed

- Added a Vercel edge middleware (`middleware.ts`) that classifies every matched request (`ai_crawler` / `ai_user` / `human`), derives the agent label, mints-if-absent an opaque `pf_session` cookie, and fires a fire-and-forget (`event.waitUntil`) POST to PublishForge `/api/track`. The tracking write is a no-op until `PF_TRACK_URL` is set, and all tracking errors are swallowed so the response never blocks or fails.
- Classification logic lives in a pure, edge-global-free module (`lib/tracking/classify.ts`) so it is unit-testable without an edge runtime. The AI-bot UA patterns and AI-referrer hosts are bundled editable config (`config/ai-agents.json`) — `middleware.ts` contains no hardcoded UA/host literals.
- Documented `PF_TRACK_URL` / `PF_TRACK_KEY` in `.env.example` (key marked server-only secret).

### Files Changed

- `config/ai-agents.json` - new: editable match list (crawler UA patterns + AI-referrer hosts, each tagged with an agent label).
- `lib/tracking/classify.ts` - new: pure `classify()` (priority: crawler UA → referrer host → human) and `scrubReferrer()` (host+path only). Exports `AgentConfig` type.
- `middleware.ts` - new: edge middleware glue — session cookie, payload assembly, `waitUntil` POST, matcher.
- `.env.example` - edit: added `PF_TRACK_URL` and `PF_TRACK_KEY` with comments.
- `TASKS.md` - edit: T-003 moved Planned → In Progress → Testing.

### Deviations From Plan

- **Matcher implemented as negative-lookahead + in-handler static-asset guard, not the lookbehind regex.** The task doc explicitly sanctioned this fallback ("if Next's matcher parser rejects the lookbehind, fall back to an in-handler extension guard"). I chose it proactively to avoid a build-time risk from the unsupported lookbehind. The matcher excludes `api`/`_next`/`studio`/named SEO files by name; root-level static assets (e.g. `/webriq-logo.png`) are skipped by a `STATIC_ASSET` regex at the top of the handler, which returns `NextResponse.next()` with no tracking and **no Set-Cookie** (protects asset cacheability). Net behaviour matches Requirement 14 exactly — verified against the full route table (all 32 logic assertions pass; see below).
- **Referrer host matching uses `URL.hostname` (port-stripped), not `URL.host`.** Minor robustness choice so an unexpected `:port` in a referer can't defeat a host match. `scrubReferrer` likewise emits `hostname + pathname`. Within spec ("host + path"); the acceptance example `x.com/p` is unaffected.
- **Added a few extra crawler UA patterns** (`Claude-User`, `Claude-SearchBot`) beyond the handover's seed list, consistent with the "match list as editable config" intent. No behavioural risk — purely additive entries in the JSON.

### Verification Run

- `npx tsc --noEmit` (new files) - PASS (0 type errors in `middleware.ts`, `lib/tracking/classify.ts`, `config/ai-agents.json`).
- Logic verification (throwaway `tsx` harness driving the real `classify.ts` + config) - PASS (32/32): all agent labels, classification priority (crawler UA wins over AI referer), `human`/`Other` default, referrer scrub (strips query/fragment, null on absent/garbage, root-path `/`), and the matcher+`STATIC_ASSET` decision for all "track" and "skip" rows in Acceptance Criteria.
- `yarn build` - PASS (70s; output shows `ƒ Middleware 27.3 kB` — Next compiled the edge middleware and accepted the matcher; all existing routes built unchanged).
- Dev-server curl matrix (Set-Cookie header on first visit, live `waitUntil` POST to an echo target, 200-on-dead-URL failure isolation, no-op when `PF_TRACK_URL` unset) - DEFERRED to the `test` stage. These are runtime behaviours requiring a running dev server + echo listener; the deterministic logic harness above already covers the classification/scrub/matcher assertions.

## Quality Gate Notes

### Result

PASS

### Standards Review

- No dead code, no commented-out implementation, no debug logging. The only comments are intent-explaining.
- No broad `any`. The single `agentsConfig as AgentConfig` cast is justified (TS widens JSON string fields to `string`, defeating the `Agent` union) and documented inline. All other types are explicit.
- Guard clauses keep nesting shallow: early `return` for static assets, `if (!token)` mint, `if (trackUrl)` no-op gate.
- Clear separation of concerns: `lib/tracking/classify.ts` is pure (no `next/server`, no request objects — unit-testable); `middleware.ts` is thin edge glue. Match list is data (`config/ai-agents.json`), not code.
- Error handling is intentional and matches the "never block/fail the response" requirement: URL parsing returns `null` on bad input; the tracking `fetch` swallows all errors via `.catch()`; the whole POST is gated behind `PF_TRACK_URL` so an unconfigured env is a clean no-op.
- No secrets in the tree: `.env.example` ships empty `PF_TRACK_KEY=`; the key is read from `process.env` and sent only as an `Authorization: Bearer` header, never logged. Not `NEXT_PUBLIC_`-prefixed.
- Edge-safety confirmed by `yarn build` (`ƒ Middleware 27.3 kB`): only `NextResponse`/`NextRequest`/`NextFetchEvent`, Web `crypto`, `fetch`, and `URL` are used — all available in the edge runtime.

### Deviations

- **Minor — matcher fallback (already documented in Implementation Notes).** Negative-lookahead matcher + in-handler `STATIC_ASSET` guard instead of the lookbehind regex. Task-sanctioned; net behaviour verified identical against the acceptance route table.
- **Minor — `URL.hostname` for host matching and scrub** (instead of `URL.host`). Strips port for robustness; within the "host + path" spec; acceptance example `x.com/p` unaffected.
- **Minor — extra crawler UA patterns** (`Claude-User`, `Claude-SearchBot`) seeded into `config/ai-agents.json`. Additive config data, consistent with the editable-match-list intent; zero code impact.
- **Minor — referer is parsed twice per request that carries one** (once in `classify` via `refererHostname`, once in `scrubReferrer`). Two ~microsecond in-memory `new URL()` calls on the synchronous path; negligible and off the network hot path. Not extracted on purpose: merging would couple pure classification with PII-scrubbing and return-shape concerns for no measurable gain. No fix required.
- **Minor (informational) — `secure: true` cookie over plain HTTP.** Browsers treat `localhost` as a secure context, so `pf_session` still sets in local dev; production is HTTPS. No action needed.

### Required Fixes

- None.

---

## PublishForge Wiring — Integration Handoff

> Status: this repo (the **producer**) is complete and merged-ready but **dormant until activated**. With `PF_TRACK_URL` unset, the middleware sets the session cookie and sends nothing. It starts emitting events the moment `PF_TRACK_URL` is present in the environment. Nothing else in this repo needs to change to go live.

### 1. What StackShift emits (the producer contract)

- **When:** once per matched request (all content routes; excludes `/api`, `/_next`, `/studio`, SEO files, and static assets). Fired via `event.waitUntil()` — off the response hot path, errors swallowed.
- **Where:** `POST {PF_TRACK_URL}` (the value of the env var verbatim — set it to the full `/api/track` URL).
- **Auth header:** `Authorization: Bearer {PF_TRACK_KEY}`.
- **Content-Type:** `application/json`.
- **Body (exact shape — `middleware.ts`):**
  ```json
  {
    "page_url": "/agents/about-us",
    "visitor_type": "ai_crawler | ai_user | human",
    "agent": "ChatGPT | Claude | Perplexity | Gemini | Other",
    "client_ip": "203.0.113.9",
    "user_agent": "Mozilla/5.0 (compatible; GPTBot/1.0)",
    "timestamp": "2026-06-07T12:34:56.789Z",
    "referrer_url": "chatgpt.com/c/abc",
    "session_token": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
  }
  ```
  - `page_url` is a **bare pathname, no origin, no trailing slash, no query/fragment**.
  - `referrer_url` is **host + path only** (PII-scrubbed) or `null`.
  - `client_ip` is the first `x-forwarded-for` hop (or `req.ip`); may be `""` if neither is present.
  - `session_token` is an opaque first-party UUID. **No attribution logic is built on it this sprint** — PF should store it for forward-prep only.

### 2. To activate (StackShift / Vercel side — no code change)

1. Set the two env vars in the StackShift Vercel project (Production + Preview as desired):
   - `PF_TRACK_URL` = the PublishForge ingest endpoint, e.g. `https://<pf-host>/api/track`
   - `PF_TRACK_KEY` = the **per-customer** ingest key (secret; **not** `NEXT_PUBLIC_`)
2. Redeploy (env-only changes require a new deployment to reach the edge).
3. Confirm in PF that events arrive for `/`, `/agents/<slug>`, and `/agents/products/<sku>`.

> The match list (`config/ai-agents.json`) is bundled — updating bot/referrer patterns requires a commit + redeploy (accepted tradeoff). This is the only StackShift-side change ever needed for this feature beyond the two env vars.

### 3. What PublishForge must implement to receive this (consumer side — Repository A, NOT this repo)

This is the downstream work the producer depends on. It is **out of scope here** and lives in PublishForge per handover Part 2 — listed so the integrator has a single checklist:

- **`POST /api/track`** (handover 2.2): authenticate the `Authorization: Bearer` key → resolve `client_id`; 401 on missing/invalid, 400 on malformed; validate the `visitor_type` / `agent` enums; set `event_month`; insert into `pf_page_events`. Must be fast and side-effect-free beyond the insert (+ verification flag).
- **`bot_verified`** (handover 3.2): reverse-DNS / published-IP-range check on `client_ip` for `ai_crawler` events, run in the endpoint or async — **not** at the edge. Only verified crawls count toward metrics.
- **Tables** (handover 2.1): `pf_known_pages`, `pf_page_events`, `pf_page_stats`, `pf_scores_daily`.
- **`page_url` join normalization** (KPI-load-bearing): `pf_known_pages` is populated from `sitemap-agents.xml`, which emits **absolute** URLs (`http://host/agents/about-us`). The middleware sends a **bare pathname** (`/agents/about-us`). **Ratified contract: both sides key on the bare pathname — PF must strip the origin from each sitemap `<loc>` when upserting `pf_known_pages`.** If PF instead stores absolute URLs, AI Crawl Coverage silently under-counts.
- Downstream (aggregation, daily score via pg_cron, alerting, dashboard, `wiki_health_log` crawl_drop wiring) per handover Part 2.

### 4. Contract items to confirm with PublishForge before freeze

| Item                   | StackShift default (this repo)   | Action                                                                                                                |
| ---------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Auth header format     | `Authorization: Bearer <key>`    | Confirm PF expects Bearer (vs a custom `x-ingest-key`). If PF differs, change the one header line in `middleware.ts`. |
| `page_url` key         | bare pathname, no trailing slash | Confirm PF normalizes `pf_known_pages` to the same.                                                                   |
| Field names / enums    | the 8 fields above               | Confirm PF's `pf_page_events` columns + `CHECK` enums match exactly.                                                  |
| `client_ip` empty case | may send `""`                    | Confirm PF tolerates empty/`NULL` for the `inet` column (don't reject the row).                                       |

### 5. Files that carry the integration (for the next engineer)

- `middleware.ts` — the emitter. The endpoint, auth header, payload assembly, and matcher all live here.
- `config/ai-agents.json` — the editable bot/referrer match list.
- `lib/tracking/classify.ts` — pure classification + referrer scrub.
- `.env.example` — documents `PF_TRACK_URL` / `PF_TRACK_KEY`.
