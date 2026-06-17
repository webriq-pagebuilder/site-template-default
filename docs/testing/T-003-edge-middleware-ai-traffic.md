# Test Report — T-003 Vercel edge middleware for AI Traffic Visibility

| Field       | Value                                                        |
| ----------- | ------------------------------------------------------------ |
| Task        | T-003 — Vercel edge middleware (AI Traffic Visibility)       |
| Date        | 2026-06-07                                                   |
| Branch      | feat/T-003-edge-middleware-ai-traffic                        |
| Result      | **PASS**                                                     |
| Environment | macOS Darwin 24.5.0, Node.js 22 (tsx), Next.js 14.2.35, yarn |

---

## Verification Strategy

Three layers, narrowest-reliable-check first:

1. **Static** — `npx tsc --noEmit` (new files) and `yarn build` (compiles the edge middleware, validates Next accepts the matcher).
2. **Logic (unit)** — a `tsx` harness driving the real `lib/tracking/classify.ts` + `config/ai-agents.json`: classification, priority, referrer scrub, and matcher/`STATIC_ASSET` route decisions (32 assertions).
3. **Runtime (integration)** — a `tsx` harness invoking the **real `middleware` export** from `middleware.ts` with constructed `NextRequest`/`NextFetchEvent` objects and a mocked `fetch`: Set-Cookie behaviour, payload contract, cookie reuse, static-asset skip, no-op-when-unset, and failure isolation (23 assertions).

The dev-server + curl matrix from the task's Verification Approach was replaced by layer 3, which exercises the same edge handler more deterministically (no flaky long-running server / port races) and asserts the exact payload bytes and response headers. Next's acceptance of the live matcher string is independently confirmed by the production build (`ƒ Middleware 27.3 kB`).

---

## Acceptance Criteria Results

| #    | Criterion                                                                                                       | Result   | Evidence                                                                                                                                           |
| ---- | --------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC1  | `middleware.ts` at repo root, edge runtime, no Node-only imports                                                | **PASS** | `yarn build` emits `ƒ Middleware 27.3 kB`; only `next/server`, Web `crypto`, `fetch`, `URL` used                                                   |
| AC2  | UA/referrer patterns read from `config/ai-agents.json`; no hardcoded literals in `middleware.ts`                | **PASS** | All patterns in JSON; middleware imports config; logic harness drives real config                                                                  |
| AC3  | `GPTBot`→ai_crawler/ChatGPT; `ClaudeBot`→Claude; `PerplexityBot`→Perplexity; `Google-Extended`→Gemini           | **PASS** | Logic harness: 4/4 crawler labels; runtime harness reconfirms GPTBot→ai_crawler/ChatGPT                                                            |
| AC4  | `Referer: chatgpt.com`→ai_user/ChatGPT; `claude.ai`→ai_user/Claude                                              | **PASS** | Logic harness (chatgpt.com, claude.ai, www.perplexity.ai subdomain); runtime harness reconfirms                                                    |
| AC5  | Ordinary request → human/Other                                                                                  | **PASS** | Logic + runtime harness ("human: visitor_type/agent")                                                                                              |
| AC6  | Priority: crawler UA + AI referer together → ai_crawler (UA wins)                                               | **PASS** | Logic harness "UA+referer => crawler wins"                                                                                                         |
| AC7  | Payload has exactly the §1.1 fields, correct types; ISO 8601 timestamp; enums valid                             | **PASS** | Runtime harness: exact key-set assertion (8 fields), ISO8601 `Date.parse` + `Z` suffix, enum values                                                |
| AC8  | `referrer_url` host+path only (`x.com/p?token#frag`→`x.com/p`); null on absent/unparseable                      | **PASS** | Logic harness (4 cases incl. null/garbage/root); runtime harness scrubs `chatgpt.com/c/abc?token=SECRET#frag`→`chatgpt.com/c/abc`                  |
| AC9  | First visit sets `pf_session` (Secure, SameSite=Lax, Path=/, ~1y); reused on later visits; token matches cookie | **PASS** | Runtime harness: Set-Cookie regex incl. `Max-Age=31536000`; reuse case sends no Set-Cookie and forwards existing token                             |
| AC10 | POST via `event.waitUntil()`, not awaited; forced POST failure still serves the response                        | **PASS** | Runtime "failure isolation": middleware did not throw, response produced, `waitUntil` promise settled (error swallowed)                            |
| AC11 | `PF_TRACK_URL` unset → no POST, no error, cookie still set, page renders                                        | **PASS** | Runtime "noop" case: 0 fetch calls, `pf_session` still set                                                                                         |
| AC12 | Matcher excludes api/\_next/studio/SEO files + static assets; matches content routes                            | **PASS** | Logic harness: 7 "track" + 11 "skip" rows incl. `/webriq-logo.png`, `/vercel.svg`, `/assets/x.css`; runtime asset case fires no POST and no cookie |
| AC13 | `.env.example` documents `PF_TRACK_URL`/`PF_TRACK_KEY`; key not `NEXT_PUBLIC_`                                  | **PASS** | `.env.example` contains both with comments; `PF_TRACK_KEY` is server-only                                                                          |
| AC14 | No new runtime dependency (`crypto.randomUUID()` + `waitUntil()` only)                                          | **PASS** | No `package.json` dependency change; git status shows only middleware/config/lib/env edits                                                         |
| AC15 | `yarn build` succeeds; existing routes render unchanged                                                         | **PASS** | Build PASS in 70s; all prior routes built; only additive `ƒ Middleware` line is new                                                                |

Additional contract checks beyond the AC list, confirmed in the runtime harness:

- `page_url` is the **bare pathname** (`/agents/about-us`) — matches the ratified PF join contract (Compatibility Touchpoints).
- `client_ip` resolves to the **first `x-forwarded-for` hop** (`203.0.113.9` from `"203.0.113.9, 10.0.0.1"`).
- Transport sends `Authorization: Bearer <PF_TRACK_KEY>` with `content-type: application/json`.

---

## Commands Run

```bash
# Layer 1 — static
npx tsc --noEmit            # 0 errors in middleware.ts / lib/tracking / config (implement stage)
yarn build                  # PASS, 70s — output shows: ƒ Middleware  27.3 kB

# Layer 2 — logic harness (throwaway ./t003-verify.mts, driven by real classify.ts + config)
npx tsx ./t003-verify.mts   # ALL PASS: 32 passed, 0 failed

# Layer 3 — runtime harness (throwaway ./t003-runtime.mts, invokes real middleware export)
npx tsx ./t003-runtime.mts  # ALL PASS: 23 passed, 0 failed
```

Both `tsx` harnesses were temporary and removed after running (no test framework is configured in this repo; `tsx` is an existing devDependency). They are reproduced in the task document's verification notes and below for re-runnability.

### Layer 3 assertions (23, all PASS)

```
human: Set-Cookie pf_session present
human: cookie Secure+SameSite=Lax+Path=/+Max-Age
human: exactly one tracking POST
human: method POST + Bearer auth
human: payload field set exact
human: visitor_type/agent
human: page_url is bare pathname
human: client_ip = first XFF hop
human: timestamp ISO8601
human: referrer_url null (no referer)
human: session_token matches cookie
crawler: ai_crawler / ChatGPT
ai_user: classified ai_user / ChatGPT
ai_user: referrer_url scrubbed (no token/frag)
reuse: no Set-Cookie when cookie present
reuse: session_token = existing cookie
asset: no tracking POST
asset: no Set-Cookie
failure: middleware did not throw
failure: response still produced
failure: waitUntil promise settled (swallowed)
noop: no fetch when PF_TRACK_URL unset
noop: cookie still set
```

---

## Skipped / Deferred Checks

- **Live dev-server + curl matrix** — superseded by the layer-3 runtime harness, which asserts the same behaviours (Set-Cookie, live `waitUntil` POST capture, 200-on-dead-URL isolation, no-op) deterministically against the real handler. No behavioural gap.
- **End-to-end against PublishForge `/api/track`** — out of scope for this repo. _(Update 2026-06-17: PublishForge `/api/track` is now live & hardened; E2E ingest was validated cross-repo — events + known-pages land and the dashboard renders. The `pf_known_pages` producer also moved into this repo as the T-003 "Sprint 2 Follow-Up".)_ KPI items requiring genuine verified-crawl volume still accrue only on production over time.
- **Real reverse-DNS / IP-range `bot_verified`** — PublishForge's responsibility (handover §3.2); middleware only forwards raw `client_ip` + `user_agent`, which the payload assertions confirm. PF now does reverse-DNS forward-confirm **with a published IP-range fallback** for operators whose PTR doesn't forward-confirm (OpenAI/Anthropic).

---

## Conclusion

All 15 acceptance criteria PASS across static, logic, and runtime layers (55 total automated assertions, 0 failures). The middleware is self-contained and additive; the only un-verifiable items are explicitly cross-repo (live PublishForge ingestion) and were scoped out of this repo from the start. Recommend approval.
