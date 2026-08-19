// Runtime companion of the sitemap flag: decides whether a rendered document
// must carry <meta name="robots" content="noindex">.
//
// De-indexing works by REMOVING a URL from the sitemap while serving noindex
// on the page itself, so crawlers can see the directive on their next visit.
// Never pair this with a robots.txt Disallow — blocking the crawl would hide
// the noindex and keep the page in the index indefinitely.

import type { SitemapConfig } from "./types";

/**
 * Returns "noindex" when the page must be dropped from search indexes, else null.
 *
 * Types without a `routes` entry always return null: they either never
 * received the flag (sections, config documents, excluded types) or are
 * deliberately outside sitemap control — they must never be false-noindexed.
 */
export function resolveRobotsMeta(
  doc: { type?: string; addToSitemap?: boolean | null },
  config: Pick<SitemapConfig, "routes" | "noindexMode">,
): "noindex" | null {
  if (!doc?.type || !config.routes[doc.type]) return null;
  if (config.noindexMode === "strict") {
    return doc.addToSitemap === true ? null : "noindex";
  }
  return doc.addToSitemap === false ? "noindex" : null;
}
