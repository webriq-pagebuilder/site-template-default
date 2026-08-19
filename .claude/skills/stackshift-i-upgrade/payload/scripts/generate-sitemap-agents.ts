import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { loadEnvConfig } from "@next/env";
import matter from "gray-matter";

// Load .env / .env.local / .env.development.local with Next.js precedence so this
// prebuild script sees the same NEXT_PUBLIC_SITE_URL that `next build` would.
loadEnvConfig(process.cwd());

import { listAgentFiles } from "../lib/agents/read-agents";
import { syncKnownPages, type KnownPage } from "./lib/sync-known-pages";

const OUTPUT = path.join(process.cwd(), "public", "sitemap-agents.xml");
// Static manifest of agent slugs consumed by edge middleware (markdown Accept
// negotiation + alternate Link header) and pages/[slug].tsx (head rel=alternate).
// Committed so imports compile on a fresh clone; refreshed on every prebuild.
const SLUG_MANIFEST = path.join(process.cwd(), "config", "agent-slugs.json");

/**
 * Infer the PublishForge `page_type` from the URL path. Path-based (not source-based)
 * so it stays correct when Sprint 1.5 adds `/agents/products/<sku>` URLs to the set.
 */
function pageTypeForPath(pathname: string): string {
  if (pathname.startsWith("/agents-products/")) return "product";
  if (pathname === "/agents" || pathname.startsWith("/agents/")) return "agent";
  return "content";
}

function resolveSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (!env) {
    console.warn(
      "[generate-sitemap-agents] NEXT_PUBLIC_SITE_URL not set — falling back to http://localhost:3000",
    );
    return "http://localhost:3000";
  }
  return env.replace(/\/$/, "");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function main() {
  const siteUrl = resolveSiteUrl();
  const refs = await listAgentFiles();

  const articleUrls = await Promise.all(
    refs.map(async (ref) => {
      const raw = await readFile(ref.absPath, "utf-8");
      const { data } = matter(raw);
      const lastmod =
        typeof data.generated_at === "string"
          ? data.generated_at
          : new Date().toISOString();
      return {
        loc: `${siteUrl}/agents/${ref.slug}`,
        lastmod,
      };
    }),
  );

  // /agents index — the machine-discovery hub: one URL that links to every
  // agent page, so a crawler that finds it can fan out to the whole tree.
  // Omitted when there are no articles: an empty hub is not worth listing and
  // the epoch-fallback lastmod would be a nonsense signal to crawlers.
  const indexLastmod = articleUrls.reduce(
    (max, u) => (u.lastmod > max ? u.lastmod : max),
    "",
  );
  const urls = articleUrls.length
    ? [{ loc: `${siteUrl}/agents`, lastmod: indexLastmod }, ...articleUrls]
    : [];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (u) =>
        `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${escapeXml(
          u.lastmod,
        )}</lastmod>\n  </url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");

  await mkdir(path.dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, xml, "utf-8");
  console.log(
    `[generate-sitemap-agents] wrote ${urls.length} URLs → ${OUTPUT}`,
  );

  // Refresh the committed slug manifest (middleware + human-page head links).
  const slugs = refs.map((r) => r.slug).sort();
  await mkdir(path.dirname(SLUG_MANIFEST), { recursive: true });
  await writeFile(
    SLUG_MANIFEST,
    JSON.stringify(slugs, null, 2) + "\n",
    "utf-8",
  );
  console.log(
    `[generate-sitemap-agents] wrote ${slugs.length} slugs → ${SLUG_MANIFEST}`,
  );

  // Sprint 2 (T-003 follow-up): mirror the same URL set into PublishForge's
  // pf_known_pages (AI Crawl Coverage denominator). Bare pathnames so the key
  // matches the edge middleware's payload. No-op + non-fatal when PF is unset —
  // never fails the build.
  const knownPages: KnownPage[] = urls.map((u) => {
    const pathname = new URL(u.loc).pathname.replace(/\/+$/, "") || "/";
    return { page_url: pathname, page_type: pageTypeForPath(pathname) };
  });
  await syncKnownPages(knownPages);
}

main().catch((err) => {
  console.error("[generate-sitemap-agents] failed:", err);
  process.exit(1);
});
