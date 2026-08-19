// One-time flag migration: seeds addToSitemap on existing documents so the
// flag-driven sitemap starts with parity instead of empty.
//
// Scopes:
//   --scope=prod-sitemap (default)  Parse the LIVE production sitemap and flag
//                                   only the documents whose URLs appear in it.
//   --scope=all                     Flag every routed document with a slug.
//
// Safety:
//   · DRY-RUN by default — pass --execute to write.
//   · setIfMissing by default (never clobbers an editor's explicit choice);
//     --force switches to set. --value=false inverts the migration.
//   · Patches BOTH the published document AND its open draft (when one
//     exists): patching only the published version means the editor's next
//     Publish would silently revert the flag.
//
// Usage:
//   yarn sitemap:migrate                              (dry-run, prod-sitemap scope)
//   yarn sitemap:migrate --execute                    (write)
//   yarn sitemap:migrate --scope=all --execute
//   yarn sitemap:migrate --value=false --force --execute

import { loadEnvConfig } from "@next/env";
import { createClient } from "next-sanity";

loadEnvConfig(process.cwd());

interface DocRow {
  _id: string;
  _type: string;
  slug: string;
  addToSitemap?: boolean | null;
}

function parseArgs(argv: string[]) {
  const has = (flag: string) => argv.includes(flag);
  const get = (name: string, fallback: string) =>
    argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1] ?? fallback;
  return {
    scope: get("scope", "prod-sitemap") as "prod-sitemap" | "all",
    execute: has("--execute") && !has("--dry-run"),
    force: has("--force"),
    value: get("value", "true") === "true",
  };
}

/** Invert the routes map: pathname -> [{ type, slug }] candidates. */
function pathToCandidates(
  pathname: string,
  config: {
    routes: Record<string, { pattern: string; homeSlugs?: string[] }>;
    slugOverrides?: Record<string, string>;
  },
): Array<{ type: string; slug: string }> {
  const candidates: Array<{ type: string; slug: string }> = [];
  const cleaned = pathname.replace(/\/+$/, "") || "/";

  for (const [type, rule] of Object.entries(config.routes)) {
    if (cleaned === "/") {
      for (const homeSlug of rule.homeSlugs ?? []) {
        candidates.push({ type, slug: homeSlug });
      }
      continue;
    }
    // Reverse slugOverrides: an override target maps back to its slug.
    for (const [slug, target] of Object.entries(config.slugOverrides ?? {})) {
      if (target && target.replace(/\/+$/, "") === cleaned) {
        candidates.push({ type, slug });
      }
    }
    const escaped = rule.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = cleaned.match(
      new RegExp(`^${escaped.replace(":slug", "([^/]+)")}$`),
    );
    if (match?.[1]) candidates.push({ type, slug: decodeURIComponent(match[1]) });
  }
  return candidates;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const [
    { default: sitemapConfig },
    { parseSitemapLocs, isSitemapIndex },
    { toAbsoluteUrl },
  ] = await Promise.all([
    import("../sitemap.config"),
    import("../lib/sitemap/xml"),
    import("../lib/sitemap/urls"),
  ]);

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
  const writeToken =
    process.env.SANITY_API_WRITE_TOKEN ??
    process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN;
  if (args.execute && !writeToken) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN (or NEXT_PUBLIC_SANITY_API_WRITE_TOKEN) is required with --execute",
    );
  }
  // --execute mutates production Sanity content (and `--force --value=false` can
  // mass-de-index). Refuse a non-interactive run unless a human explicitly
  // confirms via SITEMAP_MIGRATE_CONFIRM=1 — the skill never sets this.
  if (
    args.execute &&
    !process.stdout.isTTY &&
    process.env.SITEMAP_MIGRATE_CONFIRM !== "1"
  ) {
    throw new Error(
      "Refusing to --execute non-interactively (no TTY). Run it in a terminal, " +
        "or set SITEMAP_MIGRATE_CONFIRM=1 to confirm a production write.",
    );
  }

  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2022-03-13",
    useCdn: false,
    token:
      writeToken ??
      process.env.SANITY_API_READ_TOKEN ??
      process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
  });

  const types = Object.keys(sitemapConfig.routes);
  const unmatchedLocs: string[] = [];
  let docs: DocRow[] = [];

  if (args.scope === "all") {
    // No drafts filter on purpose: draft variants come back too and are
    // grouped with their published counterparts below.
    docs = await client.fetch(
      `*[_type in $types && defined(slug.current) && (!defined($minLastmod) || _updatedAt >= $minLastmod)]{_id, _type, "slug": slug.current, addToSitemap}`,
      { types, minLastmod: sitemapConfig.minLastmod ?? null },
    );
  } else {
    const siteUrl = (
      sitemapConfig.siteUrl ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      ""
    ).replace(/\/+$/, "");
    if (!siteUrl) {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL is required for --scope=prod-sitemap (it locates the live sitemap)",
      );
    }
    const baselineUrl = sitemapConfig.legacySitemapUrl
      ? toAbsoluteUrl(siteUrl, sitemapConfig.legacySitemapUrl)
      : `${siteUrl}/${sitemapConfig.outputPath}`;
    const res = await fetch(baselineUrl, {
      headers: { "user-agent": "webriq-sitemap-migrate" },
    });
    if (!res.ok) {
      throw new Error(`Fetching live sitemap ${baselineUrl} failed: ${res.status}`);
    }
    const baselineText = await res.text();
    if (isSitemapIndex(baselineText)) {
      throw new Error(
        `Live sitemap ${baselineUrl} is a <sitemapindex>, not a <urlset> — the ` +
          "prod-sitemap scope needs a page-URL list. Point at a child sitemap, or use --scope=all.",
      );
    }
    const locs = parseSitemapLocs(baselineText);
    console.log(`[migrate] live sitemap has ${locs.length} URLs (${baselineUrl})`);

    // Match on pathname only — the live locs' host may differ from
    // NEXT_PUBLIC_SITE_URL's apex/www form.
    const slugsByType = new Map<string, Set<string>>();
    for (const loc of locs) {
      let pathname: string;
      try {
        pathname = new URL(loc).pathname;
      } catch {
        unmatchedLocs.push(loc);
        continue;
      }
      const candidates = pathToCandidates(pathname, sitemapConfig);
      if (!candidates.length) {
        unmatchedLocs.push(loc);
        continue;
      }
      for (const c of candidates) {
        if (!slugsByType.has(c.type)) slugsByType.set(c.type, new Set());
        slugsByType.get(c.type)!.add(c.slug);
      }
    }

    for (const [type, slugs] of slugsByType) {
      const rows: DocRow[] = await client.fetch(
        `*[_type == $type && slug.current in $slugs]{_id, _type, "slug": slug.current, addToSitemap}`,
        { type, slugs: Array.from(slugs) },
      );
      docs.push(...rows);
    }
  }

  // Group by base id so published + draft variants are patched together.
  const groups = new Map<string, DocRow[]>();
  for (const doc of docs) {
    const baseId = doc._id.replace(/^drafts\./, "");
    if (!groups.has(baseId)) groups.set(baseId, []);
    groups.get(baseId)!.push(doc);
  }

  const targets = Array.from(groups.values()).flat();
  console.log(
    `[migrate] scope=${args.scope} value=${args.value} mode=${args.force ? "set" : "setIfMissing"} — ${groups.size} document(s), ${targets.length} variant(s) incl. drafts`,
  );
  if (docs.length === 0) {
    console.warn(
      "[migrate] WARNING: 0 documents matched. If this dataset is private, queries return empty without a token — set SANITY_API_READ_TOKEN (or the write token) and retry.",
    );
  }
  for (const [baseId, variants] of groups) {
    const published = variants.find((v) => !v._id.startsWith("drafts."));
    const draft = variants.find((v) => v._id.startsWith("drafts."));
    const sample = published ?? draft!;
    console.log(
      `  · ${sample._type}/${sample.slug}  id=${baseId}  draft=${draft ? "yes" : "no"}  current=${String(sample.addToSitemap)}`,
    );
  }
  if (unmatchedLocs.length) {
    console.log(
      `[migrate] ${unmatchedLocs.length} live-sitemap URL(s) matched no document (external/CDN entries belong in sitemap.config.ts extraUrls):`,
    );
    unmatchedLocs.forEach((loc) => console.log(`  ? ${loc}`));
  }

  if (!args.execute) {
    console.log("[migrate] DRY-RUN — no writes performed. Re-run with --execute to apply.");
    return;
  }

  const CHUNK = 100;
  for (let i = 0; i < targets.length; i += CHUNK) {
    const chunk = targets.slice(i, i + CHUNK);
    let tx = client.transaction();
    for (const doc of chunk) {
      tx = tx.patch(doc._id, (p) =>
        args.force
          ? p.set({ addToSitemap: args.value })
          : p.setIfMissing({ addToSitemap: args.value }),
      );
    }
    await tx.commit({ visibility: "async" });
    console.log(
      `[migrate] patched ${Math.min(i + CHUNK, targets.length)}/${targets.length}`,
    );
  }

  for (const type of types) {
    const count = await client.fetch(
      `count(*[_type == $type && addToSitemap == true && !(_id in path("drafts.**"))])`,
      { type },
    );
    console.log(`[migrate] verify: ${type} flagged=true (published) → ${count}`);
  }
}

main().catch((err) => {
  console.error("[migrate-sitemap-flags] failed:", err);
  process.exit(1);
});
