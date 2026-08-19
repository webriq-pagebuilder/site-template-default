# Changelog

All notable changes to the WebriQ PageBuilder site template are documented here.

## [v6.4.0] - 2026-08-12

### ✨ What's New

- **Open WebUI Support for the Headless Migration Pipeline** — the `claude-implement` GitHub Action can now be dispatched from an Open WebUI chat (via CiteForge) with only `pageSlug` + `mockupPath`; the workflow is self-sufficient for prompt, callback, and run linkage
- **In-Repo Migration Prompt Template** — the dispatch `prompt` input is now optional: when empty, the workflow renders the 13-rule migration contract from `.github/migration/prompt.md` (`{{pageSlug}}`/`{{mockupPath}}` substitution), so the chat control plane cannot author or skip the plan gate, reuse triage, or V1–V7 verification rules
- **Chat ↔ Run Linkage** — new optional `chatId` input echoed on every callback ping, so the `#html-migrations` notification links back to the Open WebUI conversation that started the run
- **Callback Resolution & Run Adoption** — when the dispatcher supplies no `callback_url`, the workflow builds one from `CITEFORGE_URL` + `MIGRATION_CALLBACK_SECRET`; every ping now carries `repo`/`runId`/`mockupPath` so CiteForge can adopt chat-dispatched runs that have no `page_migrations` row

### 🛠️ Improvements

- Stable, greppable `MIGRATION_USAGE` log line (model + raw token counts + turns + duration) for the chat control plane's cost reporting — USD is priced by CiteForge, not the workflow
- PRs created by the action now include a run report (verdict + usage) in the PR body
- Migration prompt contract extended with stale-attempt guard, reuse field parity, scroll/double-render parity, nav element inventory, and foreground-only subagent rules
- CI workflow files relocated under `.github/workflows/workflows/`

### 🧩 Full Change log

- Open WebUI support for the claude-implement action by @rosellerenrqz in #331

## [v6.3.1] - 2026-07-24

### ✨ What's New

- **Claude Code Agent Tooling** — staged workflow skills (`task` → `implement` → `simplify` → `test` → `document` → `ship` → `release`) plus the `stackshift-section` skill encoding the full section build procedure: mockup conversion, schema, Sanity content migration, and verification gates
- **Headless CI Migration Pipeline** — new `claude-implement.yml` GitHub Actions workflow: receives a `repository_dispatch` from the app UI (or a manual `workflow_dispatch`), runs the `stackshift-section` skill end-to-end headlessly, always pushes the preview branch when changes exist, and opens a PR only when the completion gate reports DONE
- **Mechanical Verification Scripts** — `scripts/verify-section.sh` (section content counts, page order/keys, schema duplicate fields, phantom styles) and `scripts/verify-render.mjs` (rendered app vs rendered mockup: text parity, images, painted palette, page height); script verdicts override agent self-assessment
- **CLAUDE.md** — always-loaded architecture and guardrails reference (render flow, naming invariant, styling/token hierarchy, Sanity write-safety lanes)

### 🛠️ Improvements

- Completion-gate system prompt appended to the headless run so one-shot CI runs cannot self-report success without passing verification
- `scripts/claude-stream-render.jq` renders the headless run's stream-json events as compact one-line progress entries in the Actions log
- `scripts/thinking-strip-proxy.mjs` — pass-through proxy that strips reasoning blocks from Anthropic-compat responses so the headless CLI's final output assembles correctly
- `.claude/launch.json` dev launch configuration

### 🧩 Full Change log

- Claude agent skills, headless CI pipeline, and verify scripts by @rosellerenrqz in #TBD

## [v6.3.0] - 2026-06-26

### ✨ What's New

- **Agent Content Layer** — content layer with a Sanity backfill script that populates agent-readable content from existing page sections
- New `page` and `post` fields
- Removed default commerce schema templates and page from the fresh-site scaffold
- Bump StackShift UI component library package versions

### 🐞 Notable Fixes

- Fixed redundant `pricing` schema

### 🧩 Full Change log

- Content Layer in #316
- Remove default ecommerce in #323

## [v6.2.0] - 2026-05-25

### ✨ What's New

- **AI Chatbot Package** — new AI Chatbot UI component with its own Sanity schema, section list, and package integration
- Bump WebriQ PageBuilder Sanity package versions

### 🐞 Notable Fixes

- Hotfix: corrected AI Chatbot package version

### 🧩 Full Change log

- AI Chatbot Package | Webriq Pagebuilder Sanity Version by @rosellerenrqz in #314
- hotfix: aichatbot pkg version by @rosellerenrqz in #315
