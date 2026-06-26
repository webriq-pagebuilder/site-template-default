# Feature: Backfill agent pages from Sanity

Converts existing Sanity `post` and `page` documents into `content/agents/{slug}.md` files so the agent route, `llms.txt`, and `sitemap-agents.xml` (all from T-001) pick them up on the next build.

## Entry point

```bash
yarn backfill:agents [flags]
```

Implemented in `scripts/backfill-agents-from-sanity.ts`. Safe to run repeatedly — idempotent by default.

## Modes

| Mode   | Flag                      | What it does                                                                                                              |
| ------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Direct | `--mode=direct` (default) | Maps Sanity fields to agent frontmatter. No LLM call. Fast, free, deterministic.                                          |
| Enrich | `--mode=enrich`           | Direct mode first, then calls Claude to generate `faq`, `best_for`, `not_for`, `use_cases`. Requires `ANTHROPIC_API_KEY`. |

## Flags

| Flag                     | Default                   | Description                                               |
| ------------------------ | ------------------------- | --------------------------------------------------------- |
| `--mode=direct\|enrich`  | `direct`                  | Processing mode                                           |
| `--type=post\|page\|all` | `all`                     | Which Sanity document type to fetch                       |
| `--slug=<slug>`          | —                         | Process a single document by slug                         |
| `--wiki-dir=<path>`      | `content/wiki` if present | Path to local wiki markdown files for enrich-mode context |
| `--model=<id>`           | `claude-sonnet-4-6`       | Claude model for enrich mode                              |
| `--overwrite`            | false                     | Re-generate files that already exist                      |
| `--dry-run`              | false                     | Log what would be written without writing anything        |

## Output format

Each file is `content/agents/{slug}.md` with YAML frontmatter:

```yaml
---
title: <post.title or seo.seoTitle or slug>
slug: <slug>
summary: <post.excerpt or seo.seoDescription or first paragraph of body or title>
taxonomy: article # "page" for _type==page
generated_at: <publishedAt or publishDateTime or now>
source: sanity-backfill-direct
# Enrich mode only (if LLM provides them):
faq:
  - q: "..."
    a: "..."
best_for: [...]
not_for: [...]
use_cases: [...]
---
{ markdown body from PortableText }
```

## Env vars required

| Variable                            | When needed                                          |
| ----------------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`     | Always                                               |
| `NEXT_PUBLIC_SANITY_DATASET`        | Always (defaults to `production`)                    |
| `NEXT_PUBLIC_SANITY_API_READ_TOKEN` | Always (read-only token; undefined = public dataset) |
| `ANTHROPIC_API_KEY`                 | Enrich mode only                                     |

All vars are loaded from `.env.local` automatically via `@next/env`.

## Recommended onboarding workflow

```bash
# 1. Get all content indexed immediately (no API cost)
yarn backfill:agents --mode=direct --type=all

# 2. Preview what will be written before committing
yarn backfill:agents --dry-run --overwrite --type=all

# 3. After WIKI is compiled, enrich one post to verify quality
yarn backfill:agents --mode=enrich --slug=<post-slug> --overwrite

# 4. Confirm build picks everything up
yarn build
grep -c "agents/" public/llms.txt
```

## Implementation notes

- Processes documents sequentially (not `Promise.all`) to avoid Sanity and Claude API rate limits. Enrich mode adds a 200ms delay between calls.
- Slug collision between posts and pages: the second document with the same slug is skipped with a warning. Use `--type=post` and `--type=page` separately to handle collisions manually.
- The PortableText serializer (`scripts/portabletext-to-md.ts`) handles standard blocks, `h1`–`h4`, blockquote, bullet/number lists, `strong`/`em`/`code`/`link` marks, and gracefully skips non-text blocks (`addImage`, etc.).
- `@anthropic-ai/sdk` is a devDependency. It is dynamically imported only in enrich mode. Running direct mode without `ANTHROPIC_API_KEY` is safe and produces no errors.

## Related files

| File                                     | Role                                    |
| ---------------------------------------- | --------------------------------------- |
| `scripts/backfill-agents-from-sanity.ts` | Main orchestrator                       |
| `scripts/sanity-backfill-client.ts`      | Minimal Sanity client (no Studio deps)  |
| `scripts/portabletext-to-md.ts`          | PortableText → markdown serializer      |
| `scripts/enrich-with-claude.ts`          | Claude enrichment (enrich mode only)    |
| `scripts/wiki-context.ts`                | WIKI file reader for enrichment context |
| `lib/agents/read-agents.ts`              | Reads the files this script writes      |
| `content/agents/`                        | Output directory                        |
