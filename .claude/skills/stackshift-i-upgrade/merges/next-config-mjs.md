# Merge: `next.config.mjs` (or `next.config.js`)

Two additions inside the existing `nextConfig` object. Preserve everything the
project already configures (redirects, rewrites, images, i18n, …).

## 1. Headers for the agent surface

If the config has no `headers()` member, add this one; if it does, append the
two route entries to the returned array:

```js
async headers() {
  // /agents/* is the AI-agent surface (LLM-rewritten derivatives of human
  // pages). Deliberately kept OUT of Google's index (noindex) so the twins
  // never compete in search / trip scaled-content policies — AI crawlers
  // (GPTBot, ClaudeBot, PerplexityBot) ignore robots meta for fetching, so
  // their crawling is unaffected. Vary: Accept because the same URL serves
  // text/markdown to Accept: text/markdown requests (middleware rewrite).
  const agentHeaders = [
    { key: "X-Robots-Tag", value: "noindex" },
    { key: "Vary", value: "Accept" },
  ];
  return [
    { source: "/agents", headers: agentHeaders },
    { source: "/agents/:path*", headers: agentHeaders },
  ];
},
```

## 2. Serverless bundle tracing for the markdown API route

Add (or extend) the `experimental` member:

```js
experimental: {
  outputFileTracingIncludes: {
    // The markdown-negotiation API route reads content/agents/*.md from disk
    // at runtime; make sure the files ship in its serverless bundle.
    "/api/agents-md/[slug]": ["./content/agents/**/*.md"],
  },
},
```

If `experimental` already exists, add only the `outputFileTracingIncludes` key
(or merge the route entry into an existing `outputFileTracingIncludes`).

## Notes

- i18n: with `i18n: { locales: ["en"], defaultLocale: "en" }`, agent pages build
  at `/en/agents/{slug}` but also resolve un-prefixed at `/agents/{slug}`. The
  llms.txt / sitemap URLs are canonical WITHOUT the locale prefix — no config
  change needed.

## Idempotency check

Already applied when this passes:

```bash
grep -q 'agents-md' next.config.* && grep -q 'X-Robots-Tag' next.config.*
```

## Changelog

- payload 1.0.0 — initial snippet.
