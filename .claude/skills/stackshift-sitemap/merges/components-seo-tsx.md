# merge: SEO head component — emit the `noindex` meta

**Target:** the shared component that renders per-page `<head>` meta (commonly `components/SEO.tsx`). Discover it:

```bash
grep -rln "canonical\|og:title\|twitter:card" components/ | head
```

## Idempotency check

```bash
grep -n "resolveRobotsMeta" components/SEO.tsx && echo "ALREADY APPLIED — skip"
```

## Edit

1. Add imports (match the project's import style — StackShift uses `baseUrl` absolute imports, so no leading `./`):

```ts
import { resolveRobotsMeta } from "lib/sitemap/robots-meta";
import sitemapConfig from "sitemap.config";
```

2. Inside the component body, before the returned JSX, derive the directive from the data the component already receives (it must expose the document `type` and `addToSitemap` — wired in `merges/seo-callsites.md`):

```ts
const robotsMeta = resolveRobotsMeta(
  { type: data?.type, addToSitemap: data?.addToSitemap },
  sitemapConfig,
);
```

3. Render it inside the head fragment (near the canonical link):

```tsx
{robotsMeta === "noindex" && <meta name="robots" content="noindex" />}
```

## Notes

- `resolveRobotsMeta` returns `null` for any document type absent from `sitemapConfig.routes`, so excluded/config/section pages can never be false-noindexed regardless of `noindexMode`.
- If the project's SEO component receives its data under a different prop name, adapt `data?.type` / `data?.addToSitemap` accordingly — the two values are all it needs.
- If a routed page type does NOT render this component (e.g. an author route with a bare `<Head>`), either exclude that type in `sitemap.config.ts` or add the same three-line block to that page's `<Head>`.
