# merge: schema assembly point — wrap with `withSitemapFlag`

**Target:** wherever the project assembles the array it hands to the Studio as `schema.types` (commonly `schemas/schema.ts`, exporting `schemaTypes`; sometimes inline in `sanity.config.ts`). **Discover it — do not assume the filename or the variable name.**

```bash
# find the assembly point + the exported array name
grep -rn "schema: *{" sanity.config.* ; grep -rn "export const schemaTypes" schemas/
```

## Idempotency check

```bash
grep -rn "withSitemapFlag" schemas/ sanity.config.* && echo "ALREADY APPLIED — skip"
```

## Edit

Add two imports (adjust the relative depth to where the file sits), then wrap the final array that is exported / passed to the Studio. `withSitemapFlag` runs **after** any merge/replace helper the project uses, so it decorates the fully-resolved set.

Before:
```ts
export const schemaTypes = [
  ...localDocuments,
  ...updatedSchema,
];
```

After:
```ts
import { withSitemapFlag } from "../lib/sitemap/schema";
import sitemapConfig from "../sitemap.config";

export const schemaTypes = withSitemapFlag(
  [
    ...localDocuments,
    ...updatedSchema,
  ],
  sitemapConfig,
);
```

If the array is built inline in `sanity.config.ts`, wrap it there instead:
`schema: { types: withSitemapFlag(allTypes, sitemapConfig) }`.

## Notes

- `withSitemapFlag` is pure and non-mutating; it only appends the `addToSitemap` boolean to `type: "document"` schemas that have a `slug` field and are not in `excludeTypes`. Sections, config singletons, and slugless docs are skipped automatically.
- Verify in Studio (Phase 5): the "Add to sitemap" toggle appears on routed content types and is **absent** on sections / config / excluded types.
