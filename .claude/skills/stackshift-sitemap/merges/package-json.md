# merge: package.json — prebuild hook + script aliases

**Target:** `package.json`.

## Idempotency check

```bash
grep -n "generate-sitemap" package.json && echo "ALREADY APPLIED — skip"
```

## Edit

1. **Prebuild hook.** Append the generator to the existing `prebuild` chain so
   the sitemap regenerates on every build (platform-agnostic — runs whenever the
   package-manager `build` script runs):

   ```jsonc
   "prebuild": "<existing prebuild steps> && tsx scripts/generate-sitemap.ts",
   ```

   If there is **no** `prebuild` script, create one:
   ```jsonc
   "prebuild": "tsx scripts/generate-sitemap.ts",
   ```
   Then confirm the deploy actually invokes the package-manager `build` (which
   triggers `prebuild`). Platforms that call `next build` directly (e.g. a
   Vercel project with a zero-config build command) skip npm lifecycle hooks —
   in that case set the build command to `<pm> build`, or move the generator
   into the build command itself: `"build": "tsx scripts/generate-sitemap.ts && next build"`.

2. **Convenience scripts:**
   ```jsonc
   "sitemap:generate": "tsx scripts/generate-sitemap.ts",
   "sitemap:migrate":  "tsx scripts/migrate-sitemap-flags.ts",
   ```

3. **Toolchain check.** The runners use `tsx`, `@next/env`, and `next-sanity` —
   all standard in StackShift 6.x. If `tsx` is missing from devDependencies,
   add it. After any dependency change, run the project's install (`yarn install`).

## Notes

- Dependency **removals** (e.g. an unused `next-sitemap`, or `sitemap` once the
  legacy runtime routes are deleted) are handled in `merges/legacy-teardown.md`,
  not here.
