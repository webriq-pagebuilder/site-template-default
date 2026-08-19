---
name: stackshift-i-upgrade
description: >-
  Upgrade this StackShift site (Next.js 14 Pages Router, site-template 6.x) to StackShift I:
  dual-track publishing (agent content layer — /agents twins, llms.txt, agent sitemap, markdown
  negotiation) plus AI Traffic edge middleware, in sync with PublishForge. Also the update channel —
  re-run after `npx skills add` to pull payload patches into an already-upgraded project. Use when
  asked to add the agent content layer, AI traffic tracking, agent/markdown twin pages, dual-track
  publishing; to add just the AI Traffic layer to a site that already has dual-track; to pull the
  latest AI Traffic / agent-layer code changes into an existing install; or to re-run backfill or
  verification. Supports scoped runs — `/stackshift-i-upgrade ai-traffic` applies only that layer.
---

# StackShift I — dual-track publishing + AI Traffic (upgrade runbook)

One publish action produces **two pages**: the human page at `/{slug}` and an AI-agent twin at
`/agents/{slug}` (bare Markdown-rendered page + JSON-LD, discoverable via `/llms.txt` and
`/sitemap-agents.xml`, deliberately `noindex` and never linked from human navigation). Edge
middleware classifies every request (AI crawler / AI-referred / human) and reports it to
PublishForge. **Nothing about the human blog changes; every integration no-ops safely while its
env keys are unset.**

`SKILL_DIR` = the directory containing this SKILL.md (installed:
`<repo>/.claude/skills/stackshift-i-upgrade`). The file inventory lives in
`$SKILL_DIR/payload/manifest.json` — **iterate the manifest, not the directory tree.** Each entry:
`target` (repo-relative destination), `payload` (source in the skill dir), `strategy`
(`verbatim` | `seed` | `merge`), `phase` (`agent-layer` | `ai-traffic` | `studio-publish`),
`optional`, `sha256` (hash of the payload file).

> **HARD RULES**
> - The payload is canonical and one-way. NEVER edit files under `$SKILL_DIR`; NEVER copy project
>   edits back into the skill. Upstreaming a fix = a manual PR to `webriq/agent-skills`.
> - NEVER set, print, or ask for env **values** — key names only. The generated handoff doc is the
>   interface to the PM/Admin.
> - NEVER deploy, trigger builds/hooks, create credentials, or touch PublishForge-side config.
> - NEVER overwrite `seed` targets or `content/agents/*.md` in UPDATE mode.
> - NEVER commit or push without the developer's go-ahead; stage changes and report.
> - Backfill reads Sanity **read-only**; this skill never mutates Sanity content.

---

## Invocation & scope

Invoked as `/stackshift-i-upgrade [scope ...]`. **Phase 0 preflight always runs**, then:

- **No scope (default)** → the full run, mode-detected (FRESH or UPDATE): all phases in order.
  Safe to re-run — it is idempotent (already-current files are skipped, not rewritten).
- **One or more scope words** → run ONLY those phases (plus preflight and the marker/verify steps
  for the layers touched). Use this to fix or refresh part of an install without touching the rest.

| Scope word | Runs | Typical use |
|---|---|---|
| `agent-layer` | Phase 1 | Add/refresh dual-track files only |
| `ai-traffic` | Phase 2 | Add the AI Traffic layer, or pull its latest patches, on a site that already has dual-track |
| `studio` | Phase 3 | Wire (or refresh) the optional Studio publish path |
| `backfill` | Phase 4 | Re-run the Sanity → `content/agents/*.md` backfill |
| `verify` | Phase 5 | Re-run the V1–V5 gates only (no file changes) |

Scope words compose (`ai-traffic studio`). A scoped run still classifies its phase's files through
the same mode logic (FRESH copy / UPDATE 3-way diff), writes the handoff doc only if env-relevant
files changed, and updates the marker for **only the entries it touched** — detecting (not
overwriting) the state of untouched phases when it records `phases` in the marker.

---

## Phase 0 — Preflight (make-or-break; abort on FAIL)

Run all checks, report a PASS/FAIL table, abort on any FAIL unless noted:

- **P1 — StackShift template + version.** `package.json` `name` is
  `@webriq-pagebuilder/site-template-default`. If renamed but `@webriq-pagebuilder/*` or
  `@stackshift-ui/*` deps are present → warn and ask the developer to confirm. Neither → **abort**
  (wrong repo). Then check the **template major version** against the manifest's `targetsTemplate`
  (currently `6.x`), reading the major in this order:
  1. If `package.json` `name` is `@webriq-pagebuilder/site-template-default`, read that file's own
     top-level `version` field — it IS the template version (e.g. `6.0.9` → major 6). Do not look
     for it in `dependencies` / `yarn.lock`; the template is the repo itself, not an installed dep.
  2. If renamed, take the **modal (most common) major** across the `@webriq-pagebuilder/*`
     dependency versions — these are pinned uniformly to the template line (e.g. all `6.2.0`). Do
     NOT key off a single `@stackshift-ui/*` package: those majors are not uniform (e.g.
     `@stackshift-ui/ai-chatbot` is pinned to major 1 while the rest are major 6), so any one of
     them can misread the template line.

  If the resolved major differs from `targetsTemplate` (e.g. a v5 or v7 site) → **abort** with a
  clear message that this payload targets 6.x and the files may not be compatible — the developer
  should upgrade the template first or install a matching skill release. Only if BOTH sources are
  absent/unparseable → warn and ask the developer to confirm before continuing. Do not rely on the
  V1/V5 build gates to catch a version mismatch late; fail fast here.
- **P2 — Pages Router.** `pages/` exists and there is no `app/` directory with route files.
- **P3 — Template shape.** `studio/` directory and `pages/api/revalidate.ts` exist.
- **P4 — Toolchain.** `node --version` ≥ 18; `yarn --version` resolves; `git status --porcelain`
  is clean (or the developer explicitly acknowledges an unclean tree — the upgrade touches ~30
  files and a clean tree is what makes review/rollback possible).
- **P5 — Env presence (names only, never values).** Report which of
  `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
  `NEXT_PUBLIC_SANITY_API_READ_TOKEN` resolve from `.env.local` / `.env.development`. Missing →
  warning only (backfill in Phase 4 will need them).
- **P6 — Mode detection.**
  - `.stackshift-i.json` exists at repo root → **UPDATE mode** (skip to that section).
  - `lib/agents/content-dirs.ts` exists without the marker → pre-skill install: run UPDATE-mode
    diffing, then write the marker in Phase 6.
  - Neither → **FRESH mode**, continue with Phase 1.

## Phase 1 — Agent content layer

Apply every manifest entry with `phase == "agent-layer"`:

1. **verbatim** → `mkdir -p` the parent, copy `$SKILL_DIR/<payload>` to `<target>` exactly.
2. **seed** → copy only if `<target>` is absent (`config/agent-slugs.json` = `[]` so imports
   compile before the first prebuild regenerates it; `content/agents/.gitkeep` tracks the dir).
3. **merge** → open the referenced `$SKILL_DIR/merges/*.md` and follow it. Run its idempotency
   check first; skip if already applied. Order: `package-json.md` → `yarn install` →
   `next-config-mjs.md` → `gitignore.md` → `env-example.md` → `pages-slug-tsx.md`.

## Phase 2 — AI Traffic layer

Apply manifest entries with `phase == "ai-traffic"`: `middleware.ts`, `lib/tracking/classify.ts`,
`config/ai-agents.json` copy verbatim.

> **Depends on the agent layer.** `middleware.ts` imports `lib/agents/agent-slugs` (agent-layer) for
> its markdown-negotiation and alternate-link logic, so AI Traffic cannot build without the agent
> layer present. In the common "already have dual-track, add AI Traffic" case that dependency is
> already satisfied. When running `ai-traffic` scoped, first confirm `lib/agents/agent-slugs.ts` and
> `config/agent-slugs.json` exist; if not, include `agent-layer` in the scope (or run the full
> upgrade) — do not apply AI Traffic onto a repo with no agent layer.

**`middleware.ts` guard:** if the project has no `middleware.ts`, copy verbatim. If one already
exists, do NOT overwrite — show the developer a diff and compose: the payload middleware must own
the default export + matcher; fold the project's existing logic in around the tracking/negotiation
blocks, or the project's logic into the payload version, whichever is cleaner. Flag this
composition in the final report (it is a per-project decision, not automatable). When middleware is
composed this way rather than copied clean, record it in the marker with `held: true` (Phase 6) so
future updates re-surface the diff instead of silently treating the composed file as drift.

## Phase 3 — Studio-initiated publish path (OPTIONAL — ask first)

Ask: **"Does this project publish content from Sanity Studio (publish buttons in Studio) rather
than only from PublishForge?"** If no → skip, record `studioPublish: false`. If yes, apply the
`phase == "studio-publish"` entries:

1. `pages/api/publishforge-proxy.ts` → verbatim copy (server-side proxy; avoids browser CORS).
2. `studio/config.ts` → merge per `merges/studio-config-ts.md`.
3. The two publish actions (`customBlogPublishAction.tsx`, `createProductsPublishAction.tsx`):
   the payload files under `$SKILL_DIR/payload/studio/reference/` are **references, not copies**.
   Diff each against the project's own action (if it exists) and port only the
   PublishForge-forwarding block — the fire-and-forget POST of `{documentId, documentType, slug}`
   to `/api/publishforge-proxy`, gated on `PUBLISHFORGE_WEBHOOK_URL` and `type ∈ {page, post}` —
   preserving all project-specific action logic. If the project has no custom publish actions,
   copy the references wholesale and wire them into the Studio document actions config.
4. `pages/api/revalidate.ts` → merge per `merges/pages-api-revalidate-ts.md`.

## Phase 4 — Backfill the existing back catalog

Publishing going forward does not touch old content — without backfill, only posts published
after the upgrade get agent twins, and testers will flag existing pages as "missing."

1. Prereq: the Sanity read env vars from P5. Missing → tell the developer, offer to continue and
   backfill later (record `backfill: "skipped"`).
2. `yarn backfill:agents --dry-run` → present the summary (documents found, files that would be
   written). Useful flags: `--type=post|page|all` (default `all`), `--slug=<slug>` for one doc.
3. On developer confirmation: `yarn backfill:agents --mode=direct` (fast, deterministic, no LLM).
   The script is idempotent — existing files are skipped unless `--overwrite`.
4. `--mode=enrich --overwrite` (FAQ / best_for / use_cases front-matter) needs `ANTHROPIC_API_KEY`
   — offer, don't default.
5. Commit guidance: `content/agents/*.md` **is committed** (it is the content). Generated
   `public/llms.txt`, `public/sitemap-agents.xml`, `public/robots.txt`, and
   `content/agents/__fixture-*.md` are gitignored — never force-add them.

## Phase 5 — VERIFY (all gates must pass)

- **V1 — fixture build.** `yarn seed:agents && yarn build`. PASS = build succeeds AND
  `public/llms.txt`, `public/sitemap-agents.xml`, `public/robots.txt` exist AND
  `config/agent-slugs.json` is a non-empty array. Then `yarn clean:agents`.
- **V2 — twin route + markdown negotiation.** Start `yarn dev` on a free port. With a real slug
  from `content/agents/`: `curl -s http://localhost:<port>/agents/<slug>` returns 200 HTML;
  `curl -s -H "Accept: text/markdown" http://localhost:<port>/agents/<slug>` returns raw markdown
  (front-matter or `#` heading visible — proves the middleware rewrite).
- **V3 — alternate wiring.** `curl -sI http://localhost:<port>/<same-slug>` includes
  `Link: </agents/<slug>>; rel="alternate"; type="text/markdown"`; the page HTML contains a
  `<link rel="alternate" type="text/markdown"` element. Stop the dev server after this gate.
- **V4 — discovery content.** Every URL in `public/llms.txt` and `public/sitemap-agents.xml`
  starts with `NEXT_PUBLIC_SITE_URL` (if unset, the documented `http://localhost:3000` fallback
  appears — emit a loud warning that Production must set it); `public/robots.txt` contains both
  `Sitemap:` lines.
- **V5 — no new type errors.** `npx tsc --noEmit` introduces zero NEW errors vs the pre-upgrade
  baseline (capture the baseline error list before Phase 1; pre-existing errors are not yours to
  fix).

Any FAIL → fix and re-run the gate. Do not proceed to Phase 6 with a failing gate; after 3 failed
fix attempts on the same gate, stop and report precisely what fails.

## Phase 6 — Marker + handoff

1. Write `.stackshift-i.json` at the repo root (commit it with the upgrade):

```json
{
  "skill": "stackshift-i-upgrade",
  "payloadVersion": "<manifest payloadVersion>",
  "appliedAt": "<ISO date>",
  "updatedAt": "<ISO date>",
  "templateVersion": "<target package.json version>",
  "phases": { "agentLayer": true, "aiTraffic": true, "studioPublish": <bool>, "backfill": "direct|enrich|skipped" },
  "files": { "<target>": { "sha256": "<manifest sha256 for that entry>", "held": false } }
}
```

`files` covers every applied `verbatim` entry (seeds and merges are not hash-tracked). Record a
verbatim entry that was applied via guided merge instead of a clean copy — e.g. a composed
`middleware.ts` (Phase 2) — with `held: true`, so UPDATE mode re-surfaces its diff rather than
flagging it as unexpected drift every run.

2. Generate `docs/STACKSHIFT-I-HANDOFF.md` from
   `$SKILL_DIR/templates/STACKSHIFT-I-HANDOFF.template.md`, filling the `{{...}}` placeholders
   (`STUDIO_REQUIRED` = "Yes" when the studio phase was applied, else "Not applicable"). This doc
   is the complete PM/Admin work order — env keys, PublishForge-side gate values, and the deployed
   smoke test.
3. Final report to the developer: files added/merged, gates passed, backfill count, the handoff
   doc location, and the reminder that the site behaves exactly as before until the PM/Admin sets
   the env keys and the site deploys with the default build command.

---

## UPDATE mode (already-upgraded project)

Entered from P6 when `.stackshift-i.json` exists. Purpose: pull payload patches fleet-wide after
the skill was updated (`npx skills add … stackshift-i-upgrade …` overwrites `$SKILL_DIR`).

1. Read marker + manifest. If `payloadVersion` matches AND every recorded hash matches the
   manifest → report "up to date", stop.
2. For each `verbatim` entry, first read its recorded `held` flag from the marker, then compute
   three hashes — **R** (recorded in marker), **C** (current project file, `shasum -a 256`), **P**
   (manifest `sha256`):
   - `held == true` → **held (intentionally diverged)**, e.g. a composed `middleware.ts` or a
     deliberately-kept local edit → queue for per-file decision, defaulting to **keep local**.
   - else `C == P` → current; skip.
   - else `C == R` and `P != R` → payload updated, local untouched → queue for **auto-apply**.
   - else `C != R` and `C != P` → **locally modified** → queue for per-file decision, defaulting to
     **payload wins**.
   - Target missing → queue for fresh copy.
3. **Present ONE summary table first** (file / classification / proposed action) before touching
   anything. Then: one confirmation for the auto-apply + fresh-copy set. For each per-file-decision
   entry show `diff <target> $SKILL_DIR/<payload>` and let the developer decide, honoring the
   default from step 2 — **held → keep local by default** (never overwrite a composition without an
   explicit "take payload"); **locally-modified → payload wins by default**. Record the outcome:
   set `"held": true` when the developer keeps local (so it is re-asked, never silently skipped),
   clear it to `false` when they take the payload clean. Suggest that intentional improvements be
   upstreamed via a PR to `webriq/agent-skills`.
4. Seeds are never touched. For each `merge` entry, re-run the idempotency check in its
   `merges/*.md`; if it fails (project reverted the merge) or the doc's Changelog shows a newer
   snippet than `payloadVersion` in the marker, walk the developer through re-applying.
5. `optional` entries are processed only if the marker says `studioPublish: true`.
6. Re-run Phase 5 (V1–V5). Update the marker: new `payloadVersion`, refreshed hashes, `updatedAt`,
   and each entry's `held` flag set to the step-3 outcome (kept-local → `true`, took-payload →
   `false`; untouched entries keep their prior flag).

---

## What this skill does NOT do

Set env values anywhere (it only lists key names in the handoff doc) · deploy or trigger
builds/hooks · create GitHub keys or Vercel deploy hooks · PublishForge-side setup (ingest
endpoint, WIKI compile, prompt seeding, Supabase) · mutate Sanity content · push commits. The
PM/Admin + PublishForge Setup Wizard own all env/infra; `docs/STACKSHIFT-I-HANDOFF.md` is the
interface between the two.
