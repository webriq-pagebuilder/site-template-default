// Flag-driven sitemap system — shared contracts.
//
// This module (lib/sitemap/*) is deliberately self-contained: it imports
// nothing from the rest of the project, so the stackshift-sitemap skill can
// vendor it verbatim into any StackShift project. Everything project-specific
// lives in the root sitemap.config.ts.

export interface RouteRule {
  /** URL pattern for the document type; must contain ":slug" (e.g. "/insights/:slug"). */
  pattern: string;
  /** Slugs that resolve to the site root "/" instead of the pattern (e.g. ["home", "Home"]). */
  homeSlugs?: string[];
}

export interface SitemapUrlEntry {
  /** Absolute URL, or a site-relative path resolved against siteUrl at generation time. */
  loc: string;
  /** ISO 8601 timestamp. */
  lastmod?: string;
}

/**
 * "explicit-false": only documents whose addToSitemap is explicitly `false`
 *   (editor-flipped) get a noindex meta. Documents with the field unset stay
 *   indexable. Safe rollout default.
 * "strict": anything not explicitly `true` gets noindex — the sitemap becomes
 *   the exact index whitelist. Only switch after migration has flagged every
 *   document that should stay indexed.
 */
export type NoindexMode = "explicit-false" | "strict";

export interface SitemapConfig {
  /** Absolute site origin. Falls back to NEXT_PUBLIC_SITE_URL; required in production builds. */
  siteUrl?: string;
  /** Output path relative to public/, no leading slash. Convention: "sitemap.xml" unless the project needs a custom path. */
  outputPath: string;
  /**
   * URL (absolute, or site-relative) of the sitemap currently served in
   * production, when it differs from `outputPath` — e.g. mid-migration, or when
   * standardizing a project onto `sitemap.xml` from an old `/api/sitemap`. The
   * production baseline diff + SAFETY STOP fetch this instead of
   * `${siteUrl}/${outputPath}`, so the guard still compares against what is
   * actually live during a path change. Defaults to `${siteUrl}/${outputPath}`.
   */
  legacySitemapUrl?: string;
  /**
   * When set, only documents with `_updatedAt >= this ISO datetime` are included
   * in the sitemap (and eligible for `--scope=all` migration). Omit to include
   * all flagged documents regardless of age.
   */
  minLastmod?: string;
  /** Document types that must NOT receive the addToSitemap field (the user-editable exclusion list). */
  excludeTypes: string[];
  /** Escape hatch: force the field onto document types that have no slug field. */
  includeTypes: string[];
  noindexMode: NoindexMode;
  /** documentType -> URL rule. Types absent here never appear in the sitemap and can never be noindexed. */
  routes: Record<string, RouteRule>;
  /** Exact slug -> path override (e.g. { blog: "/blog/1" }). An empty string skips the document entirely. */
  slugOverrides?: Record<string, string>;
  /** Manually curated entries appended to the generated sitemap (e.g. hosted PDFs). */
  extraUrls?: SitemapUrlEntry[];
}

/** Identity helper for typing/autocomplete in sitemap.config.ts. */
export const defineSitemapConfig = (config: SitemapConfig): SitemapConfig =>
  config;
