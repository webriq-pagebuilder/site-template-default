// Sitemap XML serialization/parsing. Emits <loc> + <lastmod> only —
// changefreq/priority are ignored by Google and add nothing but noise.

import type { SitemapUrlEntry } from "./types";

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const unescapeXml = (value: string): string =>
  value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");

export function buildSitemapXml(entries: SitemapUrlEntry[]): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((entry) =>
      [
        "  <url>",
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        ...(entry.lastmod
          ? [`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`]
          : []),
        "  </url>",
      ].join("\n"),
    ),
    "</urlset>",
    "",
  ].join("\n");
}

/**
 * Tolerant <loc> extractor. Works on any sitemap flavor (this generator's
 * output, a `sitemap`-package output, crawler plugins) without an XML parser
 * dependency.
 */
export function parseSitemapLocs(xml: string): string[] {
  const matches = xml.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/g);
  return Array.from(matches, (m) => unescapeXml(m[1].trim())).filter(Boolean);
}

/**
 * True when the document is a <sitemapindex> — its <loc>s point at child
 * sitemaps, not pages. Callers must NOT treat parseSitemapLocs() output as page
 * URLs in that case (the diff/reverse-map would be garbage).
 */
export function isSitemapIndex(xml: string): boolean {
  return /<sitemapindex[\s>]/i.test(xml);
}
