import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { loadEnvConfig } from "@next/env";

// Load .env / .env.local with Next.js precedence so this prebuild script
// sees the same NEXT_PUBLIC_SITE_URL that `next build` would.
loadEnvConfig(process.cwd());

const OUTPUT = path.join(process.cwd(), "public", "robots.txt");

// Policy directives — preserve any historical disallow rules here. Sitemap
// directives are appended below with the resolved absolute URL.
const POLICY = `# Allow all user agents.
User-agent: *
Disallow: /theme-page`;

// Absolute URLs of every sitemap this site publishes. Crawlers use these to
// discover the URL graph beyond what they can find by link-following.
const SITEMAP_PATHS = ["/sitemap-agents.xml", "/api/sitemap"];

function resolveSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (!env) {
    console.warn(
      "[generate-robots-txt] NEXT_PUBLIC_SITE_URL not set — falling back to http://localhost:3000",
    );
    return "http://localhost:3000";
  }
  return env.replace(/\/$/, "");
}

async function main() {
  const siteUrl = resolveSiteUrl();
  const sitemapLines = SITEMAP_PATHS.map((p) => `Sitemap: ${siteUrl}${p}`);

  const content = [POLICY, "", ...sitemapLines, ""].join("\n");

  await mkdir(path.dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, content, "utf-8");
  console.log(`[generate-robots-txt] wrote ${OUTPUT}`);
}

main().catch((err) => {
  console.error("[generate-robots-txt] failed:", err);
  process.exit(1);
});
