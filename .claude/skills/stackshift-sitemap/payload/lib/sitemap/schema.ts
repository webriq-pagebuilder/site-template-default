// Sanity schema transformer: appends the "addToSitemap" flag to document types.
// Isomorphic and dependency-free (plain objects, no `sanity` import) so it is
// safe in the Studio bundle, the Next.js bundle, and Node scripts alike.

import type { SitemapConfig } from "./types";

// NOTE: intentionally no `initialValue`. Under noindexMode "explicit-false",
// resolveRobotsMeta noindexes a page only when addToSitemap is stored as an
// explicit `false` — i.e. a page an editor deliberately switched OFF. If this
// field defaulted to `false`, every newly created document would be born with
// a stored `false` and get a noindex meta before anyone touched it. Leaving it
// undefined means: new/untouched pages are simply absent from the sitemap and
// stay indexable; only a deliberate ON→OFF flip triggers de-indexing.
export const SITEMAP_FLAG_FIELD = {
  name: "addToSitemap",
  title: "Add to sitemap",
  type: "boolean",
  description:
    "Turn ON to list this page in the public sitemap. Leaving it OFF simply keeps the page out of the sitemap. Switching a page from ON back to OFF also adds a noindex robots meta tag so search engines drop it from results.",
} as const;

const hasSlugField = (schema: any): boolean =>
  Array.isArray(schema?.fields) &&
  schema.fields.some((f: any) => f?.name === "slug" && f?.type === "slug");

/**
 * Returns a new schema array where every eligible `type: "document"` schema
 * gains the addToSitemap field. Eligible = has a slug field (or is forced in
 * via includeTypes) and is not listed in excludeTypes. The slug heuristic
 * keeps the exclusion list short: section documents, config singletons, and
 * future scaffolded sections never accidentally grow a sitemap toggle.
 *
 * Non-mutating by construction — some schemas share a fields array instance
 * (e.g. `page` and `oldPage` both use pageFields), so pushing in place would
 * append the field twice.
 */
export function withSitemapFlag(
  schemas: any[],
  config: Pick<SitemapConfig, "excludeTypes" | "includeTypes">,
): any[] {
  return schemas.map((schema) => {
    if (schema?.type !== "document") return schema;
    // A document without a plain fields array (unusual schema shape) can't be
    // spread safely — skip it rather than throw, even if includeTypes names it.
    if (!Array.isArray(schema.fields)) return schema;
    if (config.excludeTypes.includes(schema.name)) return schema;
    if (!hasSlugField(schema) && !config.includeTypes.includes(schema.name)) {
      return schema;
    }
    // Idempotency: never double-append (covers double application and a base
    // package that may ship the field itself one day).
    if (schema.fields?.some((f: any) => f?.name === SITEMAP_FLAG_FIELD.name)) {
      return schema;
    }
    return { ...schema, fields: [...schema.fields, SITEMAP_FLAG_FIELD] };
  });
}
