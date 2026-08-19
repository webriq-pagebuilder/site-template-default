// Document -> URL resolution, driven entirely by the routes map in
// sitemap.config.ts (the physical pages/ folder structure is the source of
// truth those patterns must mirror).

import type { SitemapConfig } from "./types";

/**
 * Resolve a flagged document to its site-relative path.
 * Returns null when the document is unroutable (no routes entry, empty slug,
 * or a slugOverrides entry of "" marking it as deliberately skipped).
 */
export function documentToPath(
  doc: { _type: string; slug?: string | null },
  config: Pick<SitemapConfig, "routes" | "slugOverrides">,
): string | null {
  const rule = config.routes[doc._type];
  if (!rule || !doc.slug) return null;
  if (rule.homeSlugs?.includes(doc.slug)) return "/";
  const override = config.slugOverrides?.[doc.slug];
  if (override !== undefined) return override || null;
  // Function replacement — a plain string would let a slug containing `$`
  // ($&, $1, $`, $') act as a String.replace substitution pattern and corrupt
  // the URL.
  return rule.pattern.replace(":slug", () => doc.slug as string);
}

export function toAbsoluteUrl(siteUrl: string, pathOrUrl: string): string {
  // Absolute (http/https) or protocol-relative (//host) URLs pass through as-is.
  if (/^https?:\/\//i.test(pathOrUrl) || pathOrUrl.startsWith("//"))
    return pathOrUrl;
  const base = siteUrl.replace(/\/+$/, "");
  return pathOrUrl === "/"
    ? base
    : `${base}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/**
 * Canonical form used for dedupe and diffing: lowercased host, no trailing
 * slash (root collapses to the bare origin), query string preserved.
 */
export function normalizeLoc(loc: string): string {
  try {
    const url = new URL(loc);
    const pathname = url.pathname.replace(/\/+$/, "");
    return `${url.protocol}//${url.host.toLowerCase()}${pathname}${url.search}`;
  } catch {
    return loc.replace(/\/+$/, "");
  }
}
