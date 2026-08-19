// sitemap.config.ts — the ONE per-project file for the flag-driven sitemap.
//
// Adapt this template to the project: fill `routes` from the physical `pages/`
// folder, set `outputPath`, and list any slug-bearing types to exclude. Keep it
// isomorphic-safe (no Node builtins) — it is imported by the Studio bundle, the
// Next.js app, and the prebuild scripts.

import { defineSitemapConfig } from "./lib/sitemap/types";

export default defineSitemapConfig({
  // Absolute production origin. REQUIRED in production builds — the generator
  // throws if it is unset during a production build (a localhost sitemap in
  // production is worse than a failed build).
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,

  // Output path relative to public/, no leading slash. Convention: "sitemap.xml".
  // Use a custom path only when an existing external reference requires it.
  outputPath: "sitemap.xml",

  // Only when the CURRENTLY-served sitemap lives at a different URL than
  // `outputPath` (e.g. you are standardizing onto sitemap.xml from an old
  // /api/sitemap, or preserving a legacy custom path). The production baseline
  // diff + SAFETY STOP fetch this during the cutover so they aren't disarmed by
  // a 404 on the new path. Absolute or site-relative. Omit if outputPath already
  // matches the served URL.
  // legacySitemapUrl: "/api/sitemap",

  // Only include documents updated on/after this ISO datetime (filters
  // `_updatedAt`). Useful to exclude a stale back-catalog. Omit to include all
  // flagged documents regardless of age.
  // minLastmod: "2025-01-01T00:00:00Z",

  // Slug-bearing document types to keep OUT of the "Add to sitemap" toggle.
  // Slugless documents (sections, config singletons) are excluded automatically.
  // Common candidates: taxonomy types, archived-page types, or any routed type
  // whose page does not render the shared SEO component (noindex can't reach it).
  excludeTypes: [],

  // Escape hatch: force the toggle onto slugless document types (rare).
  includeTypes: [],

  // "explicit-false" (safe default) noindexes only pages an editor deliberately
  // switched OFF. Switch to "strict" only AFTER migrating every page that must
  // stay indexed — strict noindexes anything not explicitly ON.
  noindexMode: "explicit-false",

  // documentType -> URL pattern. MUST mirror the physical pages/ routes.
  // Types absent here never enter the sitemap and can never be noindexed.
  // Replace the examples below with the project's real routed types, e.g.:
  //   insightPost: { pattern: "/insights/:slug" }
  // Gate env-specific route groups with a spread, e.g. commerce:
  //   ...(process.env.NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO === "true" && {
  //     mainProduct: { pattern: "/products/:slug" },
  //   }),
  routes: {
    page: { pattern: "/:slug", homeSlugs: ["home", "Home"] },
    post: { pattern: "/:slug" },
  },

  // Exact slug -> path override (e.g. a slug that 308-redirects to a paginated
  // listing: { blog: "/blog/1" }). An empty string skips that document.
  slugOverrides: {},

  // Manually curated entries appended to the generated sitemap — e.g. hosted
  // PDFs or cross-host URLs the flag system cannot derive from documents.
  extraUrls: [],
});
