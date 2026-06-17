# HANDOVER.md — StackShift I Sprint 2 Implementation

> **Purpose.** Hands off the Sprint 2 architecture (AI Traffic Visibility) to Claude Code for implementation.
> **Companion docs.** Assumes Sprint 1's `wiki_architecture_locked.md` and `multi_channel_publishing_locked.md`, plus the Sprint 1 and Sprint 1.5 handovers. Sprint 2 builds on those and does not modify their schemas.
> **Scope note.** This sprint targets **Vercel-hosted sites**. Capture adapters for other hosting (Netlify, self-hosted) are deferred and named in Part 6.
> **Task markers.** [BUILD] = net-new. [EXTEND] = modifies a Sprint 1/1.5 system. [NOTE] = context, not work.

---

## 0. Scope

Sprint 2 is **AI Traffic Visibility only**. One outcome: every request to a StackShift site is classified at the edge as AI crawler / AI-referred human / ordinary human, written to a tracking store, aggregated per page, scored daily, and surfaced in a dashboard — available to **all** customers at no extra cost.

This is a **single-tier** sprint. There is no Tier 1 / Tier 2 split. The PipelineForge conversion-attribution layer (sessions, conversion events, direct/assisted/influenced classification, AI Revenue Score, CRM integration) is **not built here** and is a separate future sprint. Do not build session attribution, conversion capture, revenue scoring, or any paywalled / feature-flagged panels.

### In scope

- Vercel edge middleware classifying all traffic (ai_crawler / ai_user / human)
- Per-page AI crawl + AI-referred visit tracking
- bot_verified anti-spoof verification (see 3.3)
- Known-page inventory (pf_known_pages) as the coverage denominator
- Citation signal tracking (which pages cited by which LLM)
- AI Visibility Score (0–100), recomputed daily via pg_cron
- AI Crawl Coverage metric (% of known pages crawled by ≥1 verified bot)
- Score-drop alerting (email + Slack webhook)
- Crawl signals feeding wiki_health_log as a freshness input
- Discoverability file freshness (llms.txt + sitemap-agents.xml auto-update)
- AI Traffic Visibility dashboard

### Out of scope (do NOT build)

- Session attribution, conversion capture, direct/assisted/influenced classification
- AI Revenue Score, CRM integration
- Any feature flag or paywall gating
- Capture adapters for Netlify or self-hosted sites (deferred — Part 6)

### Already shipped — do NOT rebuild [NOTE]

Sprint 1.5 delivered the full PIM-to-Agent pipeline (8 PIM tables, enrichment, /agents/products/[sku] via ISR, pgvector embeddings, agent product-search tools). Sprint 2 only _tracks_ those pages; they are already live, crawlable URLs.

---

## 1. Architecture premises [NOTE]

Two technical premises this build depends on. They are stated here so implementation does not drift toward a different capture mechanism.

1. **Capture happens at the Vercel edge via middleware — not from Vercel logs or observability.** Vercel runtime logs are application output and do not carry user-agent or referrer, so they cannot classify traffic. The Vercel firewall/AI-Bots ruleset can log crawlers but does not capture AI-_referred humans_ (the ai_user class) and does not hold our session_token. Middleware captures all three visitor classes plus the session token, so middleware is the capture layer. Do not substitute log drains or observability scraping.

2. **No upstream proxy verifies bots for us.** There is no CDN/proxy bot-verification layer in front of these sites, so verified-bot identification is **our** responsibility (see 3.3). User-agent strings are spoofable and must be verified before they count toward metrics.

Both /agents/[slug] (Sprint 1) and /agents/products/[sku] (Sprint 1.5) are live, crawlable URLs and become tracking targets automatically.

---

# PART 1 — StackShift site (Repository B) Changes

The only Sprint 2 work in this repo is the edge middleware. Everything downstream lives in PublishForge. No edge middleware currently runs on these sites, so this is a clean additive build.

## 1.1 Vercel edge middleware [BUILD]

A TypeScript edge middleware that runs on every request, classifies it, and fires a non-blocking write to PublishForge.

**File:** `middleware.ts` at the StackShift repo root, with a matcher covering all content routes.

**Hard requirements:**

- Runs at the Vercel edge.
- **No measurable impact on TTFB.** The tracking write uses `waitUntil()` (or Next.js `after()` on 15.1+) — fire-and-forget, executed after the response is sent. The target is "no measurable TTFB impact," achieved by never making the user wait for the write. Do not design to an arbitrary millisecond budget.
- The write must never block or fail the response. If it errors, the page still serves. Swallow tracking errors.
- **Do not POST a fetch on 100% of requests naively.** Vercel warns against per-request Fetch in middleware. Use waitUntil so it's off the hot path; if staging shows cost, batch or sample. Confirm behavior in staging before freeze.
- No tier gating, no feature flags. One code path for all customers.

**Classification (priority order):**

1. ai_crawler — User-Agent matches a known AI bot (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Gemini, etc.). Match list is **config, not hardcoded** (1.2).
2. ai_user — Referer is an AI platform host (chat.openai.com, chatgpt.com, claude.ai, perplexity.ai, gemini.google.com, copilot.microsoft.com). Config-driven.
3. human — everything else.

**Agent label** (ChatGPT/Claude/Perplexity/Gemini/Other) derived from whichever signal matched.

**Event payload to PublishForge:**

```
{
  page_url:      string,   // pathname, normalized
  visitor_type:  'ai_crawler' | 'ai_user' | 'human',
  agent:         'ChatGPT' | 'Claude' | 'Perplexity' | 'Gemini' | 'Other',
  client_ip:     string,   // needed for bot_verified reverse-DNS (see 3.3)
  user_agent:    string,   // raw UA, for verification + audit
  timestamp:     string,   // ISO 8601
  referrer_url:  string | null,  // PII-SCRUBBED at edge (host+path only, no query/fragment)
  session_token: string,   // opaque; NO attribution logic in Sprint 2 (forward-prep only)
}
```

**referrer_url scrubbing:** strip query string + fragment at the edge before sending; host + path only. Never forward tokens/emails/query params.

**session_token note:** include and persist, but build **no** logic on it. Opaque first-party cookie value only. Captured now so a future conversion-attribution sprint needs no schema migration. No sessionization, no joins, no attribution this sprint.

**Transport:** POST to PublishForge POST /api/track, authenticated with a per-customer ingest key (PF_TRACK_URL, PF_TRACK_KEY in StackShift env).

## 1.2 Match list as config [BUILD]

Do not hardcode AI bot UA / referrer patterns in middleware.ts. Store them as editable config (a JSON the middleware reads, or a cached PublishForge endpoint) so the list can be updated without a redeploy. Because no upstream proxy provides an auto-maintained bot list, this list is maintained by us.

---

# PART 2 — PublishForge (Repository A) Changes

## 2.1 Database migrations [BUILD]

Four net-new tables. No changes to Sprint 1/1.5 schemas. Order: pf_known_pages, then pf_page_events, then pf_page_stats, then pf_scores_daily.

### pf_known_pages — known-URL inventory (coverage denominator)

This table is the **denominator** for AI Crawl Coverage. pf_page_events only records pages that _were_ crawled; it cannot tell you which pages exist but were _not_ crawled. pf_known_pages is the authoritative list of pages that should be discoverable, populated from sitemap-agents.xml / the page index (see 2.8). Coverage % = known pages with ≥1 verified crawl ÷ total known pages. It is also the anchor for "expected but missing" crawl_drop detection — a page can only be flagged as gone dark if we know it was supposed to be there.

```
CREATE TABLE pf_known_pages (
  client_id   text NOT NULL,
  page_url    text NOT NULL,
  page_type   text,            -- 'agent' | 'product' | 'content' | etc.
  first_seen  timestamptz NOT NULL DEFAULT now(),
  last_seen   timestamptz NOT NULL DEFAULT now(),  -- last time URL appeared in sitemap/index
  active      boolean NOT NULL DEFAULT true,       -- false when URL drops out of the sitemap
  PRIMARY KEY (client_id, page_url)
);
CREATE INDEX pf_known_pages_type_idx ON pf_known_pages (client_id, page_type);
```

### pf_page_events — raw event log

```
CREATE TABLE pf_page_events (
  id            uuid NOT NULL DEFAULT gen_random_uuid(),
  client_id     text NOT NULL,
  page_url      text NOT NULL,
  visitor_type  text NOT NULL,   -- 'ai_crawler' | 'ai_user' | 'human'
  agent         text NOT NULL,   -- 'ChatGPT'|'Claude'|'Perplexity'|'Gemini'|'Other'
  client_ip     inet,
  user_agent    text,
  bot_verified  boolean NOT NULL DEFAULT false,  -- set by verification step (3.3)
  referrer_url  text,            -- PII-scrubbed at edge
  session_token text,            -- opaque; no attribution logic in Sprint 2
  event_month   date NOT NULL,   -- partition key, first-of-month
  created_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id, client_id, event_month),
  CHECK (visitor_type IN ('ai_crawler','ai_user','human')),
  CHECK (agent IN ('ChatGPT','Claude','Perplexity','Gemini','Other'))
) PARTITION BY LIST (client_id);
-- sub-partition each client by month

CREATE INDEX pf_page_events_page_idx     ON pf_page_events (page_url);
CREATE INDEX pf_page_events_type_idx     ON pf_page_events (visitor_type);
CREATE INDEX pf_page_events_agent_idx    ON pf_page_events (agent);
CREATE INDEX pf_page_events_time_idx     ON pf_page_events (created_at);
CREATE INDEX pf_page_events_verified_idx ON pf_page_events (bot_verified);
```

### pf_page_stats — per-page rollup

```
CREATE TABLE pf_page_stats (
  client_id          text NOT NULL,
  page_url           text NOT NULL,
  ai_crawl_count     bigint NOT NULL DEFAULT 0,   -- verified crawls only
  ai_referred_visits bigint NOT NULL DEFAULT 0,
  top_citing_agents  jsonb,
  first_crawl_at     timestamptz,
  last_crawl_at      timestamptz,
  updated_at         timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (client_id, page_url)
);
```

### pf_scores_daily — daily score history

```
CREATE TABLE pf_scores_daily (
  client_id        text NOT NULL,
  score_date       date NOT NULL,
  visibility_score integer NOT NULL,  -- 0–100
  coverage_pct     numeric,
  recency          numeric,
  depth            numeric,
  high_value_hits  integer,
  components_json  jsonb,
  computed_at      timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (client_id, score_date)
);
```

## 2.2 Ingestion endpoint [BUILD]

POST /api/track — receives edge events.

- Auth via per-customer ingest key; 401 if missing/invalid.
- Validate payload (enum checks); 400 if malformed.
- Resolve client_id from the key; set event_month; insert into pf_page_events.
- Run the bot_verified check here or async (3.3) — not in the edge middleware (keep the edge light).
- Fast and side-effect-free beyond insert + verification flag.

## 2.3 Per-page aggregation [BUILD]

Roll pf_page_events into pf_page_stats (short pg_cron interval or post-ingest trigger). **Count only bot_verified = true events** toward ai_crawl_count so spoofed UAs don't inflate metrics. Update crawl counts, AI-referred visits, top citing agents, first/last crawl.

## 2.4 AI Visibility Score — daily job [BUILD]

Composite 0–100 per client into pf_scores_daily. Components: crawl frequency, page coverage %, crawl recency, crawl depth, high-value page hits (pricing/compare//agents///agents/products/ — list is config). Persist component breakdown in components_json.

**Coverage component uses pf_known_pages as denominator.** coverage_pct = (count of pf_known_pages where active=true AND the URL has ≥1 verified crawl in pf_page_stats) ÷ (count of active pf_known_pages). Do not derive coverage from pf_page_events alone — it has no denominator. This same value backs the AI Crawl Coverage KPI (Part 4).

### Scheduler: Supabase pg_cron [DECISION]

Run the daily score job as **Supabase pg_cron**, not Vercel cron.

- The job is set-based data-in-Postgres to data-in-Postgres; it belongs next to the data (no wire payload, no serverless timeout ceiling).
- **Maintainability:** schedule lives in the same migrations as the schema; no Vercel/Supabase env coordination; Sprint 1.5 already runs enrichment on pg_cron, so the team operates one scheduler, not two.
- **Caveat:** pg_cron competes with live query load — schedule off-peak; the job touches only recent partitions.
- Vercel cron's advantage (external API calls) doesn't apply to the score job. The **alerting** does make external calls — so it runs reactively off the score write, not on its own cron (2.5).

## 2.5 Score-drop alerting [BUILD]

On each new pf_scores_daily write, compare to prior day. If visibility_score dropped **>10 points**, fire email + Slack webhook. Runs **reactively, inline after the score write** (via pg_net/http from the job, or a Supabase Edge Function invoked post-write) — not a separate cron, because it makes external calls.

**Baseline suppression (recommended):** on a brand-new score with no history, day-over-day swings are noisy. Suppress alerts for the first ~7–14 days per client while a baseline forms.

## 2.6 WIKI freshness feedback wiring [EXTEND]

Feed crawl signals into wiki_health_log — schema already reserves the signal type (wiki_architecture_locked.md 5.11 lists 'crawl_drop' as a Sprint 2 type). No migration.

- On a sustained crawl drop / page going stale on AI crawls, insert: signal_type='crawl_drop', signal_source='ai_traffic', page_url, plus severity + details (drop magnitude, window, last crawl).
- Use pf_known_pages to detect **expected-but-uncrawled** pages: a page active in pf_known_pages with zero verified crawls (or whose last_crawl_at has gone stale) is a crawl_drop candidate, even though it has little/no presence in pf_page_events. This is the case raw event data cannot catch.
- Write same-day. Do **not** write 'conversion_drop' — that belongs to the deferred conversion sprint.

## 2.7 AI Traffic Visibility dashboard [BUILD]

At /dashboard/ai-visibility, accessible to **all** customers — no paywall, no flags. Three views:

1. **Site overview** — total verified AI crawls, AI-referred sessions, top pages by AI traffic, current score + 3-month trend, and AI Crawl Coverage % (crawled vs known pages).
2. **Per-page** — crawl frequency, which bots, last crawl, AI-referred visits, citation signal strength. Include known pages with zero crawls (the coverage gap) — these are the actionable rows.
3. **Agent breakdown** — crawl share by ChatGPT/Claude/Perplexity/Gemini/Other.

No conversion/revenue surfaces anywhere. Confirm dashboard queries stay **<1s on a 90-day rolling window** before freeze (lean on partitioning + pf_page_stats pre-aggregation).

## 2.8 Discoverability file freshness [EXTEND]

llms.txt and sitemap-agents.xml are how AI crawlers find pages — they are **upstream of everything this sprint measures.** If they go stale, crawl volume drops and the Visibility Score will report a decline that is actually a sitemap bug, not a discoverability problem. Sprint 1 created these files and Sprint 1.5 added product pages; this task ensures they stay current.

- Confirm (or wire) auto-regeneration of llms.txt and sitemap-agents.xml on content change — new/removed agent and product URLs must appear/disappear without manual steps.
- The regeneration job is the natural place to also **upsert pf_known_pages**: every URL written to sitemap-agents.xml is upserted (active=true, last_seen=now); URLs no longer emitted are marked active=false. This keeps the coverage denominator authoritative for free.
- If Sprint 1's generator already fires on content change, this task is verification only — confirm it runs and feeds pf_known_pages. If it does not, wiring it is in scope.

---

# PART 3 — Key Implementation Notes

## 3.1 Architecture summary

Capture happens at the **Vercel edge** (middleware), into PublishForge ingestion, then aggregation, then daily score, then dashboard. One edge per site.

## 3.2 bot_verified — anti-spoof verification [BUILD]

UA strings are trivially spoofed, so a raw UA match is not trust. For events classified ai_crawler:

- Verify the claimed bot via **reverse DNS on client_ip** and/or matching against the operator's **published IP ranges** (OpenAI, Anthropic, Perplexity, Google publish these).
- Set bot_verified = true only on success.
- **Aggregate and score only verified crawls.** Unverified ai_crawler events are stored (for audit) but excluded from ai_crawl_count and the score.
- Run verification in the ingestion endpoint or an async follow-up — **not** in the edge middleware (keep the edge light; reverse DNS is too slow for the hot path).

## 3.3 Pitfalls

- Tracking write is fire-and-forget; never blocks/fails the response.
- Target "no measurable TTFB impact" via waitUntil; don't design to an arbitrary ms budget.
- Don't POST naively on every request without waitUntil/sampling.
- Match list is editable config, not hardcoded.
- PII-scrub referrers at the edge.
- Build nothing on session_token.
- Score job in pg_cron; alerting reactive in app-layer.
- Score/aggregate only bot_verified=true crawls.
- wiki_health_log gets crawl_drop only, never conversion_drop.
- No Tier 2 / conversion / revenue surface anywhere.

---

# PART 4 — Definition of Done & KPIs

## 4.1 Definition of done

- Edge middleware classifying all traffic with no measurable TTFB impact (via waitUntil).
- pf_page_events writing for all three visitor types on every request.
- bot_verified set via reverse-DNS / IP-range check; only verified crawls scored.
- Per-page crawl count, AI-referred visits, citing agents in dashboard.
- AI Visibility Score (0–100) updating daily via pg_cron.
- pf_known_pages populated from sitemap-agents.xml; AI Crawl Coverage % computed against it.
- llms.txt and sitemap-agents.xml confirmed auto-updating on content change.
- Citation signal tracking per page.
- Score drop >10pts triggers email + Slack alert (with baseline suppression).
- Crawl signals feeding wiki_health_log (crawl_drop) same-day, including expected-but-uncrawled pages.
- Both /agents/[slug] and /agents/products/[sku] appear in tracking.
- All features available to all customers — no paywall.
- Validated on a live site before freeze.

## 4.2 Acceptance KPIs

| KPI                       | Target                                                                           | Source                         |
| ------------------------- | -------------------------------------------------------------------------------- | ------------------------------ |
| Middleware impact         | No measurable TTFB delta in staging                                              | Vercel Edge logs               |
| Visibility Score          | 0–100, daily                                                                     | pf_scores_daily                |
| Per-page crawl data       | All /agents/ + /agents/products/ pages appear within 24h of first verified crawl | pf_page_events                 |
| AI Crawl Coverage         | ≥90% of active known pages crawled by ≥1 verified bot                            | pf_known_pages + pf_page_stats |
| Discoverability freshness | New/removed URLs reflected in llms.txt + sitemap-agents.xml without manual steps | sitemap-agents.xml             |
| Bot verification          | Spoofed-UA events flagged bot_verified=false, excluded from score                | pf_page_events                 |
| Citation tracking         | Per-page citing-agent breakdown visible                                          | pf_page_stats                  |
| WIKI freshness            | crawl_drop written same-day                                                      | wiki_health_log                |
| Dashboard perf            | <1s on 90-day window                                                             | dashboard                      |

---

# PART 5 — Resources & Risks

## 5.1 Ownership

| Role   | Responsibility                                                                                                                                                                          | Effort            |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Ross   | Middleware, /api/track, 4 migrations, bot_verified, aggregation + coverage, score pg_cron job, alerting, wiki_health_log wiring, discoverability-file freshness + pf_known_pages upsert | 2 weeks full      |
| Jun    | Dashboard (3 views), query optimization                                                                                                                                                 | ~1 week, split    |
| Mariel | High-value page list, match-list validation, freeze validation                                                                                                                          | ~0.5 weeks spread |

## 5.2 Risks

| Risk                                  | Mitigation                                                        | Level  |
| ------------------------------------- | ----------------------------------------------------------------- | ------ |
| Match list stale, misclassification   | Editable config; validate against real traffic in week 1          | High   |
| Spoofed UAs inflate metrics           | bot_verified reverse-DNS/IP-range check; score only verified      | High   |
| Middleware adds latency               | waitUntil fire-and-forget; confirm no TTFB delta in staging       | Medium |
| pf_page_events volume, slow dashboard | Partition by client+month, index, pre-aggregate via pf_page_stats | Medium |
| Citation signal is inferential        | Label as signal not attribution; document method                  | Medium |
| New-score alert noise                 | Baseline suppression 7–14 days                                    | Low    |

---

# PART 6 — Deferred (named gaps, NOT this sprint)

- **Netlify-hosted sites:** capture needs Netlify Edge Functions (Deno API, different from Vercel middleware). Not built here.
- **Self-hosted / direct-DNS sites:** capture mechanism depends on the server (nginx logs / app middleware / CDN). Unknown until inventoried.
- **Shared event contract:** when the above are specced, all stacks should normalize into the **same pf_page_events shape** so score/dashboard/alerts are host-agnostic. The schema in 2.1 is that contract — design other-host adapters to feed it unchanged.

---

_End of HANDOVER.md — Sprint 2: AI Traffic Visibility_
