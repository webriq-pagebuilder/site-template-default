LEARNINGS.md

Reusable lessons from completed tasks in this codebase. Each entry is a gotcha or pattern that applies beyond the task that surfaced it.

---

## Script authoring

### Use a fresh Sanity client in scripts — never the app client

`lib/sanity.client.ts` imports from `studio/config`, which transitively pulls in Sanity Studio dependencies unsuitable for a plain Node script. Always call `createClient` directly in scripts with env vars.

```ts
// scripts/sanity-backfill-client.ts
import { createClient } from "next-sanity";
export function createBackfillClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  // ...
  return createClient({
    projectId,
    dataset,
    apiVersion: "2022-03-13",
    useCdn: false,
    token,
  });
}
```

Source: T-002. See `scripts/sanity-backfill-client.ts`.

---

### Every standalone script needs `loadEnvConfig` — `tsx` does not load `.env.local`

`tsx` (and `ts-node`, plain `node`) does not implement Next.js's `.env.local` precedence. Add this at the top of any script that reads `NEXT_PUBLIC_*` or other app env vars:

```ts
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());
```

Call it once in the entry-point file. Calling it in imported helper modules works too (it's idempotent) but creates duplicate calls — prefer the entry point.

Source: T-001 (initial discovery), T-002 (reinforced). See `scripts/generate-llms-txt.ts`.

---

### `@portabletext/to-markdown` does not exist

The `@portabletext/*` npm namespace ships `react`, `to-html`, `toolkit`, and `types` — there is no markdown serializer. For text-only extraction in scripts, hand-roll a minimal serializer (~100 LOC). See `scripts/portabletext-to-md.ts` for the implementation covering standard blocks, `h1`–`h4`, blockquote, lists, `strong`/`em`/`code`/`link` marks, and graceful skip for non-text blocks like `addImage`.

Source: T-002.

---

### Isolate optional SDK imports behind dynamic `import()`

When a script has a common path (free) and an optional path (paid/side-effect), put the optional dependency in a dedicated module and use `await import()` at the call site. This avoids startup cost and makes the dependency truly optional:

```ts
// In main script — enrich path only
if (mode === "enrich") {
  const { enrichFrontmatter } = await import("./enrich-with-claude");
  // ...
}
// Direct mode never touches @anthropic-ai/sdk
```

Source: T-002. See `scripts/backfill-agents-from-sanity.ts:138`.

---

## Agent content layer

### `title` and `summary` in `content/agents/*.md` are build-critical — never empty

`lib/agents/read-agents.ts:79` throws `Error: missing required frontmatter fields (title, summary)` on any file with an empty field. This causes `getStaticPaths` to fail and aborts the entire build. Any script writing to `content/agents/` must guarantee non-empty values via fallback chains:

```
title:   doc.title → seo.seoTitle → slug
summary: post.excerpt → seo.seoDescription → firstParagraph(body) → title → slug
```

Source: T-002. See `scripts/backfill-agents-from-sanity.ts:62–81`.

---

### `gray-matter` coerces ISO date strings into JS `Date` objects — breaks `getStaticProps`

`gray-matter` uses `js-yaml`'s default schema, which parses ISO 8601 strings as `Date` objects. Next.js `getStaticProps` requires JSON-serializable values. Fix: round-trip through JSON immediately after `matter()`:

```ts
const { data, content } = matter(raw);
const frontmatter = JSON.parse(JSON.stringify(data)) as AgentFrontmatter;
```

Source: T-001. Already applied in `lib/agents/read-agents.ts:75`.

---

### `fallback: false` caches `getStaticPaths` in the Pages Router dev server

New files added after dev server start are invisible until restart. Use `yarn dev` restart after `yarn seed:agents` or `yarn backfill:agents`. Production (`yarn build`) always recomputes from scratch — unaffected.

Source: T-001. See `pages/agents/[slug].tsx`.

---

### Agent pages intentionally do not use `@stackshift-ui`

The `@stackshift-ui` mandate has a carve-out for AI-targeted surfaces. Agent pages at `/agents/[slug]` use semantic HTML + `@tailwindcss/typography` only. This is deliberate: AI crawlers parse the DOM, not the React component tree. Do not add `@stackshift-ui` components to `pages/agents/[slug].tsx`.

Source: T-001.

---

## Build artifacts

### Generated crawler files go in `public/`, get gitignored, regenerate on every deploy

Pattern for `llms.txt`, `sitemap-agents.xml`, `robots.txt`:

1. Source: `scripts/generate-*.ts` + `content/agents/*.md`
2. Output: `public/{filename}` (gitignored)
3. Triggered by `prebuild` in `package.json`

This avoids merge conflicts from committed generated files and guarantees freshness on every Vercel deploy.

Source: T-001. See `package.json:prebuild`.
