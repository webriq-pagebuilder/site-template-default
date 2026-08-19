---
name: stackshift-sitemap
description: >-
  Add the flag-driven sitemap system to a StackShift site (Next.js 14 Pages Router, site-template 6.x):
  a per-document "Add to sitemap" toggle in Sanity Studio, a build-time generator that writes a static
  sitemap from the flagged documents, and a noindex robots meta that de-indexes pages switched back off.
  Retires ad-hoc/legacy sitemap mechanisms into one config-driven source of truth. Also the update channel —
  re-run after `npx skills add` to pull payload patches into an already-installed project. Use when asked
  to add sitemap control, a per-page sitemap flag, sitemap de-indexing, or to replace an existing sitemap
  setup. Safe for headless/CI runs (read-only steps); the one-time flag migration is human-gated.
---

# StackShift sitemap flag system (install / update runbook)

Editors get an **Add to sitemap** boolean on every slug-bearing Sanity document type. Only documents
flagged `true` enter the generated sitemap; a page an editor switches back OFF is served
`<meta name="robots" content="noindex">` so search engines drop it (removing a URL from a sitemap alone
never de-indexes). The sitemap is a **static build artifact** regenerated on every production build via the
npm `prebuild` lifecycle — platform-agnostic (Netlify, Vercel, local). **The site behaves exactly as before
until the one-time flag migration runs and the site redeploys.**

`SKILL_DIR` = the directory containing this SKILL.md (installed: `<repo>/.claude/skills/stackshift-sitemap`).
The file inventory lives in `$SKILL_DIR/payload/manifest.json` — **iterate the manifest, not the directory
tree.** Each entry: `target` (repo-relative destination), `payload` (source in the skill dir), `strategy`
(`verbatim` | `merge`), `phase` (`core` | `wiring` | `teardown`), `optional`, `sha256` (verbatim only).

> **HARD RULES**
> - The payload is canonical and one-way. NEVER edit files under `$SKILL_DIR`; NEVER copy project edits
>   back into the skill. Upstreaming a fix = a manual PR to `webriq/agent-skills`.
> - The flag field has **no `initialValue`** — never add one. A stored default of `false` would noindex
>   every newly created page before an editor touched it. Undefined = out of the sitemap but still indexable.
> - The flag **migration is human-gated**: run it DRY-RUN only and hand the developer the `--execute`
>   command. NEVER run `--execute` yourself, and never in a headless/CI run — it mutates production Sanity.
> - NEVER set, print, or ask for env **values** — key names only; the handoff doc is the interface to the PM/Admin.
> - NEVER deploy, trigger builds/hooks, or touch hosting-side config.
> - NEVER commit or push without the developer's go-ahead; stage changes and report.
> - The generator reads Sanity **read-only**; only the human-run migration writes.

---

## Phase 0 — Preflight & discovery (make-or-break; abort on FAIL)

First run the read-only inventory: `bash "$SKILL_DIR/scripts/discover-touchpoints.sh"` from the project root.
It reports the toolchain + prebuild, any existing sitemap mechanism and its served URL, the schema assembly
point, the `<SEO>` call sites, the GROQ spread, and the robots mechanism — the inputs for Phases 1–3. Reason
over its output; it writes nothing.

Then run all checks, report a PASS/FAIL table, abort on any FAIL unless noted:

- **P1 — StackShift template + version.** `package.json` `name` is `@webriq-pagebuilder/site-template-default`
  (its own top-level `version` is the template version — read the major from it). If renamed, take the modal
  major across `@webriq-pagebuilder/*` deps. Neither present → **abort** (wrong repo). Major ≠ manifest
  `targetsTemplate` (`6.x`) → **abort** with a clear message.
- **P2 — Pages Router.** `pages/` exists; no `app/` route directory.
- **P3 — Toolchain.** `node --version` ≥ 18 (the generator uses global `fetch`/`AbortController`); `tsx`
  resolves (or is addable); `git status --porcelain` clean (or the developer acknowledges an unclean tree).
- **P4 — Env presence (names only).** Report which of `NEXT_PUBLIC_SANITY_PROJECT_ID`,
  `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_READ_TOKEN`/`SANITY_API_READ_TOKEN`,
  `NEXT_PUBLIC_SITE_URL` resolve from `.env.local` / `.env.development`. Missing → warning (the generator and
  migration need them). **Note the dataset is typically private — queries return empty *silently* without a
  read token.**
- **P5 — Mode detection.** `.stackshift-sitemap.json` at repo root → **UPDATE mode** (jump to that section).
  Otherwise **FRESH mode**, continue.

## Phase 1 — Core + config (manifest `phase == "core"`)

1. **Copy `verbatim` entries** exactly (`mkdir -p` parents): `lib/sitemap/*`, the two `scripts/*`, and the
   test. These are the invariant engine — do not edit them per project.
2. **Author `sitemap.config.ts`** from `$SKILL_DIR/payload/sitemap.config.template.ts` (strategy `merge` —
   adapt, do not copy blind). Read the physical `pages/` folder AND `next.config.*` redirects, then fill:
   - `routes`: one entry per routed **document type**, mirroring the real URL (a type absent here never
     enters the sitemap and can never be noindexed). Use `homeSlugs` for the home page; `slugOverrides` for
     a slug that redirects (emit its real target, or `""` to skip). Gate env-specific groups with a spread.
   - `outputPath`: match whatever sitemap URL the project already serves (preserve it); else `sitemap.xml`.
     If you deliberately standardize onto a different path than the one currently served, ALSO set
     `legacySitemapUrl` to the OLD served URL so the production baseline diff + SAFETY STOP compare against
     what is actually live during the cutover (otherwise the guard 404s on the new path and self-disarms).
   - `excludeTypes`: slug-bearing types to keep out (taxonomy, archival, or any routed type whose page does
     not render the shared SEO component).
   - `noindexMode`: start `explicit-false` (safe). Only switch to `strict` after migration.
   - `minLastmod` (optional): ISO datetime to include only documents updated since then (filters `_updatedAt`, and scopes `--scope=all` migration); omit to include all flagged docs regardless of age.
   - `extraUrls`: external/cross-host URLs the flag system can't derive (carried from a retired singleton).
3. **Self-validate the copy:** `npx tsx lib/sitemap/__tests__/sitemap.test.ts` → must print all tests passed.
4. Run the project install if `tsx` was added.

## Phase 2 — Wiring (manifest `phase == "wiring"` — follow each `merges/*.md`)

Run each merge doc's idempotency check first; skip if already applied. Order:
`merges/schemas-schema-ts.md` (Studio toggle) → `merges/types-ts.md` (SEO data type; skip on JS) →
`merges/components-seo-tsx.md` (noindex meta) → `merges/seo-callsites.md` (pass the flag into every `<SEO>`)
→ `merges/package-json.md` (prebuild + scripts) → install → `merges/gitignore.md` → `merges/robots-txt.md`
(optional). The call-site wiring is the highest-variance, highest-risk step — enumerate `<SEO>` by grep, do
not assume a count.

## Phase 3 — Legacy teardown (manifest `phase == "teardown"` — `merges/legacy-teardown.md`)

Using the Phase 0 discovery output, retire whatever pre-existing sitemap mechanisms the project has (config
generators, crawler plugins, runtime API routes + rewrites, a Sanity sitemap singleton, a committed static
sitemap). Preserve the agents sitemap. Keep `outputPath` at the URL the project already serves so the public
URL is unchanged (or use `legacySitemapUrl` when intentionally moving it — see Phase 1).

## Phase 4 — Flag migration (DRY-RUN only; hand off `--execute`)

The generator's SAFETY STOP fails a production build while zero documents are flagged and the live sitemap is
non-empty — so existing pages must be seeded first.

1. Run **dry-run** (never `--execute`): `NEXT_PUBLIC_SITE_URL=… SANITY_API_READ_TOKEN=… yarn sitemap:migrate`
   (default scope `prod-sitemap` flags exactly the docs already in the live sitemap → day-one parity;
   `--scope=all` flags every routed doc). Present the table + counts.
2. **Surface the private-dataset gotcha:** a "0 documents" dry-run means a missing token, not an empty
   dataset. Confirm a non-zero count before handing off.
3. Put the exact `--execute` command (with the **write** token) in the handoff doc for the developer/PM to
   run. The skill never executes it. `--execute` also refuses to run non-interactively: in a terminal it
   proceeds, but in CI/automation it requires a human-set `SITEMAP_MIGRATE_CONFIRM=1` (a guard against
   unattended production writes / mass de-index).

## Phase 5 — VERIFY (all gates; run ALL)

- **V1 — self-test.** `npx tsx lib/sitemap/__tests__/sitemap.test.ts` passes.
- **V2 — generate (non-prod).** `yarn sitemap:generate` writes `public/<outputPath>` (valid `<urlset>`).
  With `NEXT_PUBLIC_SITE_URL` set, locs are absolute prod URLs; unset → localhost + warning. Before the
  migration runs no doc is flagged, so this emits only `extraUrls` — use `SITEMAP_PREVIEW=1 yarn
  sitemap:generate` to preview every eligible routed doc as if flagged (read-only, no write, no diff).
- **V3 — prod safety.** `SITEMAP_FORCE_PROD=1` with `NEXT_PUBLIC_SITE_URL` **unset** → the generator exits
  non-zero (hard-fail guard).
- **V4 — Studio toggle.** Studio boots; "Add to sitemap" appears on routed content types and is **absent**
  on sections / config / excluded types; a new draft shows it OFF.
- **V5 — noindex render.** `yarn dev`; a flagged-OFF (stored `false`) doc's page source contains
  `<meta name="robots" content="noindex">`; a flagged-ON / untouched doc does not; an excluded/unrouted page
  never does. Stop the dev server after.
- **V6 — build + no new type errors.** `yarn build` succeeds; `npx tsc --noEmit` adds zero NEW errors vs the
  pre-install baseline.
- **V7 — robots + gitignore.** `public/robots.txt` lists the sitemap (no new `Disallow`); `git add -A` stages
  0 sitemap artifacts.

Any FAIL → fix and re-run the gate; after 3 failed attempts on one gate, stop and report precisely what fails.

## Phase 6 — Marker + handoff

1. Write `.stackshift-sitemap.json` at repo root (commit with the change):
   ```json
   {
     "skill": "stackshift-sitemap",
     "payloadVersion": "<manifest payloadVersion>",
     "appliedAt": "<ISO date>",
     "updatedAt": "<ISO date>",
     "templateVersion": "<target package.json version>",
     "outputPath": "<sitemap.config outputPath>",
     "noindexMode": "explicit-false",
     "files": { "<target>": { "sha256": "<manifest sha256>", "held": false } }
   }
   ```
   `files` covers every applied `verbatim` entry. Mark a verbatim entry applied via guided merge (rather than
   a clean copy) with `held: true` so UPDATE mode re-surfaces its diff instead of flagging drift.
2. Generate `docs/SITEMAP-HANDOFF.md` from `$SKILL_DIR/templates/SITEMAP-HANDOFF.template.md`, filling the
   `{{...}}` placeholders (`OUTPUT_PATH`, `SITE_URL`, `HOSTING_UI_NOTE`). It carries the migration `--execute`
   command and the deploy/GSC checklist.
3. Final report: files copied/merged, gates passed, the handoff doc location, and the reminder that the site
   is unchanged until the migration runs and the site redeploys.

---

## UPDATE mode (already-installed project)

Entered from P5 when `.stackshift-sitemap.json` exists. Purpose: pull payload patches after the skill was
updated (`npx skills add … stackshift-sitemap` overwrites `$SKILL_DIR`).

1. Read marker + manifest. `payloadVersion` matches AND every recorded hash matches → report "up to date", stop.
2. For each `verbatim` entry compare three hashes — **R** (marker), **C** (current project file), **P**
   (manifest): `held` → keep local by default; `C == P` → skip; `C == R, P != R` → auto-apply; `C != R and
   C != P` → locally modified, payload wins by default; target missing → fresh copy.
3. Present ONE summary table (file / classification / action) before touching anything; one confirmation for
   the auto-apply + fresh-copy set; per-file `diff` for the decision entries. Record outcomes (`held`).
4. For `merge` entries, re-run each `merges/*.md` idempotency check; re-apply where it reverted. `sitemap.config.ts`
   is developer-owned — never overwrite it; surface new template fields as suggestions only.
5. Re-run Phase 5. Update the marker (new `payloadVersion`, refreshed hashes, `updatedAt`, `held` flags).

---

## What this skill does NOT do

Set env values (it lists key names only in the handoff doc) · run the migration `--execute` (human-gated) ·
mutate Sanity content itself · deploy or trigger builds/hooks · touch hosting-side config (e.g. a UI-installed
crawler plugin — it flags that for the human) · push commits. The developer/PM owns migration execution and
deploy; `docs/SITEMAP-HANDOFF.md` is the interface.
