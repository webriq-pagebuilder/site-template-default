# merge: robots.txt — advertise the sitemap

**Target:** the project's robots mechanism — a generator script
(`scripts/generate-robots-txt.ts`, present if the agent content layer is
installed) OR a static `public/robots.txt`. **Optional:** apply only if the
project serves a robots.txt.

## Idempotency check

```bash
grep -rn "outputPath" scripts/generate-robots-txt.ts 2>/dev/null && echo "GENERATOR ALREADY DERIVES PATH — skip"
grep -n "Sitemap:" public/robots.txt 2>/dev/null
```

## Case A — a robots.txt generator exists

Derive the sitemap path from `sitemap.config.ts` so the two can never drift.
Replace a hard-coded sitemap path with a value read from the config:

```ts
async function resolveSitemapPaths(): Promise<string[]> {
  const { default: sitemapConfig } = await import("../sitemap.config");
  return [/* keep existing entries, e.g. "/sitemap-agents.xml" */, `/${sitemapConfig.outputPath.replace(/^\/+/, "")}`];
}
```

...and `await resolveSitemapPaths()` where the `Sitemap:` lines are built.

## Case B — static public/robots.txt (or none)

Ensure it contains a `Sitemap:` line for the generated sitemap (absolute URL,
built from `NEXT_PUBLIC_SITE_URL` + `outputPath`). Create the file if absent.

## Notes

- **Never add a `Disallow` for de-indexed pages.** De-indexing relies on the
  `noindex` meta being crawlable; a `Disallow` would hide it and keep the page
  in the index indefinitely.
- Keep any pre-existing `Sitemap:` lines (e.g. an agents sitemap).
