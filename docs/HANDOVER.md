# HANDOVER.md — StackShift Site: Agent Content Layer

> **Purpose.** Hand-off for anyone working in **this repo** (the StackShift site). It describes the agent content layer as built — T-001 (agent route + discovery artifacts) and T-002 (Sanity backfill) are combined and both live here — and how to operate it.
>
> **Scope.** This repo only. The agentic publishing pipeline (WIKI compilation, agent transformation LLM, GitHub commits into this repo, deploy hooks) is **set up in the PublishForge project separately** — see [Part 3](#part-3--publishforge-integration-other-repo).
>
> **Audience.** Developers and operators of this StackShift site.

---

## Document map

| Document                                                                       | What it covers                                                                  |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `docs/HANDOVER.md` (this file)                                                 | Entry point — what exists in this repo and how to use it                        |
| [`docs/architecture/agent-content-flow.md`](architecture/agent-content-flow.md) | End-to-end flow: Sanity → PublishForge → this repo → live agent page            |
| [`docs/features/backfill-agents-from-sanity.md`](features/backfill-agents-from-sanity.md) | T-002 backfill script: full flag reference, output format, implementation notes |
| [`docs/operational/pilot-go-live-checklist.md`](operational/pilot-go-live-checklist.md) | Non-code setup steps (Vercel env, GitHub App install, deploy hook)              |

---

# PART 1 — What this repo provides (as built)

The agent content layer turns markdown files into AI-crawlable pages and discovery artifacts. It is fully static: no runtime database reads, no LLM calls, no inbound API endpoints.

```
content/agents/{slug}.md            ← markdown files land here
        │
        ▼  (yarn build)
prebuild:  public/llms.txt          ← llmstxt.org index of all agent pages
           public/sitemap-agents.xml
           public/robots.txt        ← declares both sitemaps
next build: /agents/{slug}          ← one static HTML page per file,
                                       with JSON-LD Schema.org markup
```

## Key files

| File                                     | Role                                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------- |
| `content/agents/*.md`                    | Source of truth for agent pages (filename = slug = URL)                               |
| `pages/agents/[slug].tsx`                | Pages Router route; `getStaticPaths` with `fallback: false` — fully static, no ISR    |
| `lib/agents/content-dirs.ts`             | `AGENT_CONTENT_DIRS` — single source of truth for which directories are scanned       |
| `lib/agents/read-agents.ts`              | Reads + validates the markdown files (used by the route and all generators)           |
| `lib/agents/json-ld.ts`                  | Frontmatter → Schema.org JSON-LD (`Article`, plus `FAQPage` when `faq` is present)    |
| `scripts/generate-llms-txt.ts`           | Prebuild generator → `public/llms.txt`                                                |
| `scripts/generate-sitemap-agents.ts`     | Prebuild generator → `public/sitemap-agents.xml`                                      |
| `scripts/generate-robots-txt.ts`         | Prebuild generator → `public/robots.txt`                                              |
| `scripts/backfill-agents-from-sanity.ts` | T-002 backfill (see Part 2)                                                           |

Generated files in `public/` are gitignored and regenerated on every deploy via the `prebuild` script in `package.json` — never commit them.

## Design rules (deliberate, don't "fix")

- **Agent pages do not use `@stackshift-ui`.** They render semantic HTML + `@tailwindcss/typography` only. AI crawlers parse the DOM, not the component tree; this is a carve-out from the usual component mandate.
- **`title` and `summary` frontmatter are build-critical.** `lib/agents/read-agents.ts` throws on any file with an empty value, which aborts the whole build. Anything writing to `content/agents/` must guarantee non-empty values.
- **No Sanity reads at runtime for agent content.** Blog/page content continues to flow through Sanity unchanged; the agent layer is filesystem-only and independent.

---

# PART 2 — Populating content: the T-002 backfill

Ongoing content arrives via PublishForge commits (Part 3). The **backfill** covers everything published before that pipeline existed: it converts existing Sanity `post` and `page` documents into `content/agents/{slug}.md` files.

```bash
# Index all existing content immediately (no LLM, no API cost, idempotent)
yarn backfill:agents --mode=direct --type=all

# Preview changes without writing
yarn backfill:agents --dry-run --overwrite --type=all

# Optionally enrich a single page with Claude-generated faq/best_for/not_for/use_cases
yarn backfill:agents --mode=enrich --slug=<slug> --overwrite

# Verify the build picks everything up
yarn build && grep -c "agents/" public/llms.txt
```

- **Direct mode** (default) maps Sanity fields to frontmatter deterministically — safe to run repeatedly, skips existing files unless `--overwrite`.
- **Enrich mode** additionally calls Claude (requires `ANTHROPIC_API_KEY`); the SDK is dynamically imported, so direct mode never touches it.
- Env vars (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_READ_TOKEN`) load from `.env.local` automatically.

Full flag reference, frontmatter output format, and implementation notes: [`docs/features/backfill-agents-from-sanity.md`](features/backfill-agents-from-sanity.md).

## Other commands

| Command             | What it does                                                                  |
| ------------------- | ------------------------------------------------------------------------------ |
| `yarn seed:agents`  | Writes `__fixture-*.md` test files into `content/agents/` for local testing  |
| `yarn clean:agents` | Removes the fixture files                                                     |

**Dev-server gotcha:** `fallback: false` caches `getStaticPaths` in the dev server. After running the backfill or seed scripts, restart `yarn dev` to see new pages. Production builds are unaffected.

---

# PART 3 — PublishForge integration (other repo)

> **Note.** The agentic publishing pipeline is **not** part of this repo and should be set up in the **PublishForge project separately.** The full architecture (WIKI tables, compile worker, publish orchestration, agent transformation prompts) lives in PublishForge's own documentation (`wiki_architecture_locked.md`, `multi_channel_publishing_locked.md`, and the original Sprint 1 hand-off).

What this repo needs to know — PublishForge, once configured, will:

1. Run the agent transformation LLM when an editor publishes a blog.
2. Commit the resulting markdown to `content/agents/{slug}.md` on `master` via a GitHub App (`Contents: Read & write`).
3. Fire this site's Vercel deploy hook, which rebuilds and publishes the new agent page.

This repo's only obligations are the **landing zone** (`content/agents/` exists), the **route + generators** (Part 1, already built), and three operational setup steps owned by this site's team:

- `NEXT_PUBLIC_SITE_URL` set in Vercel production env (embedded into every llms.txt/sitemap URL).
- The PublishForge GitHub App installed on this repo.
- The Vercel deploy hook URL created and handed to the PublishForge team.

Step-by-step instructions and verification for each: [`docs/operational/pilot-go-live-checklist.md`](operational/pilot-go-live-checklist.md). The end-to-end flow with failure modes: [`docs/architecture/agent-content-flow.md`](architecture/agent-content-flow.md).

This repo does **not** expose receiving endpoints, webhook handlers, or runtime database connections for agent content — PublishForge writes via Git, and everything else is build-time.

---

_End of HANDOVER.md_
