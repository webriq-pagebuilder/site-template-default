// Prebuild step: generates the flag-driven sitemap from Sanity documents with
// addToSitemap == true, diffs it against the live production sitemap, and
// writes public/<outputPath> plus a removal report. Runs on every build via
// the npm prebuild lifecycle (platform-agnostic — Netlify, Vercel, local).
//
// Local usage:
//   yarn sitemap:generate                          (non-prod: no diff, localhost fallback)
//   SITEMAP_FORCE_PROD=1 yarn sitemap:generate     (full prod behavior incl. diff + safety checks)

import { loadEnvConfig } from "@next/env";
import { createClient } from "next-sanity";

// Load .env / .env.local with Next.js precedence BEFORE the config module is
// evaluated — sitemap.config.ts reads NEXT_PUBLIC_* at import time, which is
// why it is imported dynamically inside main() rather than statically here.
loadEnvConfig(process.cwd());

async function main() {
  const [{ default: sitemapConfig }, { generateSitemap }] = await Promise.all([
    import("../sitemap.config"),
    import("../lib/sitemap/generate"),
  ]);

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");

  // useCdn: false so a flag flipped minutes before the build is honored.
  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2022-03-13",
    useCdn: false,
    // Reads work with a read OR a write token — fall back so a local
    // preview/generate authenticates with whatever token the developer has set.
    token:
      process.env.SANITY_API_READ_TOKEN ??
      process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN ??
      process.env.SANITY_API_WRITE_TOKEN ??
      process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN,
  });

  await generateSitemap({ config: sitemapConfig, client });
}

main().catch((err) => {
  console.error("[generate-sitemap] failed:", err);
  process.exit(1);
});
