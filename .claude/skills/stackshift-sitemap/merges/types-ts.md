# merge: SEO data type — add `addToSitemap`

**Target:** the TypeScript interface for the SEO component's `data` prop (commonly `SeoData` / `SEOData` in `types.ts`). **Skip entirely on JavaScript projects.**

## Idempotency check

```bash
grep -n "addToSitemap" types.ts && echo "ALREADY APPLIED — skip"
```

## Edit

Add one optional field to the interface the SEO component consumes:

```ts
export interface SeoData extends Seo {
  // ...existing fields...
  addToSitemap?: boolean; // sitemap flag — explicit false renders a noindex robots meta
}
```

## Notes

- Type-only change; no runtime effect. If the SEO component uses a differently-named or inline type, add the optional `addToSitemap?: boolean` there instead.
- Many StackShift projects build with `typescript.ignoreBuildErrors: true`, so a missed type addition will not fail the build — but wire it anyway so editors get autocomplete and the Phase 5 `tsc` gate stays clean.
