# StackShift I — Environment & Infrastructure Handoff

**Project:** {{PROJECT_NAME}}
**Prepared:** {{DATE}}
**Payload version applied:** {{PAYLOAD_VERSION}}
**Phases applied:** agent layer ✓ · AI traffic ✓ · Studio publish path {{STUDIO_APPLIED}} · backfill {{BACKFILL_STATUS}}

The code side of the StackShift I upgrade is complete in this repository. The
items below are **PM/Admin tasks** — environment keys and infrastructure that
the developer cannot and must not set. Until the required keys are in place,
publishing silently degrades to blog-only and AI-traffic tracking is a no-op
(safe, but invisible — no error an operator will notice).

## 1. Environment variables — StackShift site deploy (Vercel project)

| Key | Required | What it does | What breaks without it |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes (Production) | Canonical production URL, **no trailing slash**. Embedded into every `llms.txt` / `sitemap-agents.xml` entry. | Crawlers get localhost/wrong-domain URLs — the "wrong domain in llms.txt" failure. |
| `PF_TRACK_URL` | Yes (for AI Traffic) | PublishForge `/api/track` ingest endpoint. | Edge middleware skips all tracking; known-pages reporting no-ops. Dashboard shows nothing. |
| `PF_TRACK_KEY` | Yes (for AI Traffic) | Per-customer ingest key; must equal the value configured in PublishForge. | Ingest rejects events (auth). |
| `PF_KNOWN_PAGES_URL` | No | Explicit known-pages endpoint. Defaults to `${PF_TRACK_URL}/known-pages`. | Only needed for non-default routing. |
| `NEXT_PUBLIC_PUBLISHFORGE_WEBHOOK_URL` | {{STUDIO_REQUIRED}} | Studio publish → PublishForge agent generation. **Must end in `/api/webhooks/stackshift-publish`** (an older `/api/webhooks/sanity-update` value 404s silently). Secret goes in as `?token=` or the `x-publishforge-webhook-secret` header. | Studio publishes produce no agent article, silently. |
| `NEXT_PUBLIC_SANITY_API_READ_TOKEN` | For backfill re-runs | Read-only Sanity token used by `yarn backfill:agents`. | Backfill script cannot query Sanity. |
| `ANTHROPIC_API_KEY` | Only for `backfill:agents --mode=enrich` | FAQ / use-case front-matter enrichment. | Enrich mode fails; direct mode unaffected. |

Also confirm on the Vercel project:

- [ ] **Build command stays default** (`yarn build` / `npm run build`) so `prebuild` fires — a raw `next build` silently skips `llms.txt` / `sitemap-agents.xml` / `robots.txt` generation.

## 2. Dual-track publishing gate — PublishForge side (per project)

If any of the three gate values (GitHub repository, GitHub write credential,
Vercel deploy hook) is missing, publishing silently degrades to blog-only.

- [ ] GitHub access key generated for this repository only, **Contents: Read & write** — set as `GITHUB_ACCESS_TOKEN` with `GITHUB_REPOSITORY_OWNER` / `GITHUB_REPOSITORY_NAME` (optional `GITHUB_REPOSITORY_BRANCH`). Treat as a credential — never paste into chat or tickets.
- [ ] Vercel deploy hook created on the branch PublishForge commits to; URL set as `VERCEL_DEPLOY_HOOK_URL` (treat as a credential). `VERCEL_API_TOKEN` for deploy-status polling.
- [ ] WIKI: `WIKI_WORKER_URL`, `WIKI_WORKER_SHARED_SECRET`; `wiki_state.status` must be `ready`; a current agent-transformation prompt must be seeded.
- [ ] `ANTHROPIC_API_KEY` (agent transformation), `BLOG_LIFECYCLE_AGENT_API_KEY`.
- [ ] Inbound path: `PUBLISHFORGE_STACKSHIFT_WEBHOOK_SECRET`, `SANITY_MASTER_TOKEN` (missing token → 503).

All of the above are set through the PublishForge Setup Wizard / PublishForge
deploy config — **not** in this repository.

## 3. Smoke test after env + deploy (no technical skills needed)

Replace `www.example-site.com` with the site's real domain.

1. **Agent twins exist** — pick a published blog post, open
   `https://www.example-site.com/agents/<same-slug>`. Pass: loads as plain,
   bare text (that's correct — these pages are for AI crawlers). Fail: 404 →
   backfill was skipped, or the deploy hasn't finished.
2. **`/llms.txt`** — lists many `/agents/...` links, all on the real domain.
   Wrong domain → `NEXT_PUBLIC_SITE_URL` is set incorrectly.
3. **`/sitemap-agents.xml`** — XML listing the same `/agents/...` URLs.
4. **Publish flow** — publish (or republish) one post via the path this team
   actually uses (PublishForge or Studio). Within ~2 minutes the new
   `/agents/<slug>` page loads and appears in both `/llms.txt` and
   `/sitemap-agents.xml`, while the normal `/{slug}` page looks unchanged.
   A passing PublishForge publish does **not** prove the Studio path works —
   they use different plumbing.
5. **AI Traffic** — after events arrive, the PublishForge `/ai-traffic`
   dashboard (SuperAdmin-only) shows non-zero data within ~5 minutes.

## 4. Quick triage

| Symptom | Likely cause |
| --- | --- |
| Publish succeeds, no `/agents/{slug}` | Dual-track gate values missing (silent blog-only fallback) |
| `llms.txt` missing a known page | `prebuild` didn't run (custom build command) |
| Wrong URLs in `llms.txt` / sitemap | `NEXT_PUBLIC_SITE_URL` wrong in Production |
| Studio publish never produces agent page | Webhook URL doesn't end in `/api/webhooks/stackshift-publish`, or bad secret |
| AI Traffic dashboard empty | `PF_TRACK_URL` / `PF_TRACK_KEY` missing or mismatched |
