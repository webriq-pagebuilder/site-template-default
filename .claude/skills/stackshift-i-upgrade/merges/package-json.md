# Merge: `package.json`

Adds the agent-layer build scripts and dependencies. This is a merge — never
replace the project's `package.json`; edit the existing one.

## 1. Scripts

Add to the `"scripts"` block (keep existing scripts untouched):

```json
"prebuild": "tsx scripts/generate-llms-txt.ts && tsx scripts/generate-sitemap-agents.ts && tsx scripts/generate-robots-txt.ts",
"backfill:agents": "tsx scripts/backfill-agents-from-sanity.ts",
"seed:agents": "tsx scripts/seed-agents-fixtures.ts",
"clean:agents": "rm -f content/agents/__fixture-*.md"
```

- If a `prebuild` script already exists, chain the three generators onto the end
  with `&&` rather than replacing what is there. The generators must run before
  `next build` — `prebuild` only fires on `yarn build` / `npm run build`, so the
  project's deploy build command must stay the default (not a raw `next build`).

## 2. Dependencies

Add to `"dependencies"` (runtime — used at build and by the API route):

```json
"gray-matter": "^4.0.3",
"marked": "^14.1.2"
```

Add to `"devDependencies"`:

```json
"@anthropic-ai/sdk": "^0.36.3",
"@tailwindcss/typography": "^0.5.15",
"tsx": "^4.19.2"
```

- Skip any package already present at a compatible version; do not downgrade.
- `@tailwindcss/typography` powers the `prose` class on the agent pages. If the
  project already registers it in `tailwind.config`, leave that as-is; otherwise
  add `require("@tailwindcss/typography")` to the config's `plugins` array.
- Run `yarn install` after editing.

## Idempotency check

Already applied when this passes:

```bash
grep -q '"backfill:agents"' package.json && grep -q '"gray-matter"' package.json
```

## Changelog

- payload 1.0.0 — initial snippet.
