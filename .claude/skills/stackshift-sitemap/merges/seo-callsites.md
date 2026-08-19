# merge: SEO call sites — pass `addToSitemap` into the head component

The SEO component reads `data.addToSitemap`, but the per-page `data` object is
usually built by spreading a `seo` sub-object (`...seo`) that does **not** carry
top-level document fields. So each `<SEO data={{…}}>` call site must pass the
document's top-level `addToSitemap` through explicitly.

**Target:** every routed page that renders the SEO component — in BOTH its
published and preview render paths. **Enumerate by grep; the count is not fixed
and varies per project.**

```bash
grep -rn "<SEO" pages/ | grep -v node_modules
```

## Idempotency check

```bash
grep -rn "addToSitemap:" pages/ && echo "SOME/ALL APPLIED — check each call site"
```

## Edit

At each call site, add one line to the `data` object literal, using that call
site's own document variable (it differs: `publishedData`, `previewData`,
`data.blogs`, `data.insights`, `finalSEO`'s source, etc.):

Before:
```tsx
<SEO
  data={{
    pageTitle: title,
    type: _type,
    route: publishedData?.slug,
    ...seo,
  }}
  defaultSeo={defaultSeo}
/>
```

After:
```tsx
<SEO
  data={{
    pageTitle: title,
    type: _type,
    route: publishedData?.slug,
    ...seo,
    addToSitemap: publishedData?.addToSitemap,
  }}
  defaultSeo={defaultSeo}
/>
```

Do the same in the preview component, sourcing from the preview variable
(e.g. `addToSitemap: previewData?.addToSitemap`).

## Notes

- **No GROQ change is normally needed:** most StackShift page queries begin with
  a document-root `...` spread, so `addToSitemap` is already fetched. Verify once:
  `grep -n "\.\.\.," pages/api/query.ts`. If a query uses an **explicit field
  projection** (no top-level spread), add `addToSitemap` to that projection — this
  is the only conditional query edit.
- Skip call sites for types NOT in `sitemap.config.ts` `routes` (search, cart,
  wishlist, category if excluded, …): `resolveRobotsMeta` returns null for them
  anyway, so passing the field is harmless but unnecessary.
- **Phase 5 gate:** render a flagged-OFF doc and confirm `<meta name="robots"
  content="noindex">` appears; render a flagged-ON / untouched doc and confirm it
  does not. A missed call site is the top silent-failure mode.
