import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { loadEnvConfig } from "@next/env";
import matter from "gray-matter";

// Load .env / .env.local / .env.development.local with Next.js precedence so this
// prebuild script sees the same NEXT_PUBLIC_SITE_URL that `next build` would.
loadEnvConfig(process.cwd());

import { listAgentFiles } from "../lib/agents/read-agents";
import { listAgentProductRefs } from "../lib/agents/read-agent-products";

const OUTPUT = path.join(process.cwd(), "public", "sitemap-agents.xml");

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

  // (a) file-backed /agents/{slug} entries (content/agents markdown)
  const refs = await listAgentFiles();
  const fileUrls = await Promise.all(
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

  // (b) PublishForge-backed /agents-products/{slug} entries (PIM-sourced)
  const productRefs = await listAgentProductRefs();
  const productUrls = productRefs.map((ref) => ({
    loc: `${siteUrl}/agents-products/${ref.slug}`,
    lastmod: ref.updatedAt,
  }));

  const urls = [...fileUrls, ...productUrls];

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
    `[generate-sitemap-agents] wrote ${urls.length} URLs ` +
      `(${fileUrls.length} agents, ${productUrls.length} agent-products) → ${OUTPUT}`,
  );
}

main().catch((err) => {
  console.error("[generate-sitemap-agents] failed:", err);
  process.exit(1);
});
