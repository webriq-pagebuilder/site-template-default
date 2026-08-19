// Build-time sitemap generation. Node-only (fs access) — import this ONLY
// from scripts, never from webpack-bundled app/Studio code. The isomorphic
// pieces live in ./schema, ./urls, ./xml, ./robots-meta.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { SitemapConfig, SitemapUrlEntry } from "./types";
import { documentToPath, normalizeLoc, toAbsoluteUrl } from "./urls";
import { buildSitemapXml, isSitemapIndex, parseSitemapLocs } from "./xml";

export interface SanityFetcher {
  fetch<T = any>(query: string, params?: Record<string, any>): Promise<T>;
}

export interface GenerateOptions {
  config: SitemapConfig;
  client: SanityFetcher;
  /** Absolute path of the public/ dir. Defaults to <cwd>/public. */
  publicDir?: string;
  /** Where the JSON diff report is written. Defaults to <cwd>/.sitemap-report.json. */
  reportPath?: string;
  env?: NodeJS.ProcessEnv;
  log?: (message: string) => void;
}

export interface GenerateReport {
  generatedAt: string;
  siteUrl: string;
  outputPath: string;
  outputFile: string;
  isProductionBuild: boolean;
  /** false when the live sitemap could not be fetched (diff skipped). */
  baselineAvailable: boolean;
  counts: { total: number; added: number; removed: number };
  added: string[];
  removed: string[];
}

// The documents the sitemap includes. Normal builds require the addToSitemap
// flag; preview mode (SITEMAP_PREVIEW=1) drops that clause to render every
// eligible routed doc AS IF flagged — a read-only local aid, never production
// output.
function docsQuery(includeUnflagged: boolean): string {
  return `*[
  _type in $types &&
  ${includeUnflagged ? "" : "addToSitemap == true &&\n  "}!(_id in path("drafts.**")) &&
  defined(slug.current) &&
  (!defined($minLastmod) || _updatedAt >= $minLastmod)
]{
  _id,
  _type,
  _updatedAt,
  "slug": slug.current
}`;
}

const LOG_LINE_CAP = 50;

/**
 * Production detection across deploy platforms. Only production builds fetch
 * the live sitemap, diff, and enforce safety checks — deploy previews and
 * local runs must never pollute the removal signal or fail on missing env.
 */
export function isProductionBuild(
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  return (
    env.SITEMAP_FORCE_PROD === "1" ||
    env.CONTEXT === "production" || // Netlify
    env.VERCEL_ENV === "production" // Vercel
  );
}

function resolveSiteUrl(
  config: SitemapConfig,
  env: NodeJS.ProcessEnv,
  isProd: boolean,
  log: (message: string) => void,
): string {
  const raw = config.siteUrl || env.NEXT_PUBLIC_SITE_URL;
  if (raw) return raw.replace(/\/+$/, "");
  if (isProd) {
    // Hard fail: a production sitemap with localhost URLs is worse than a
    // failed build.
    throw new Error(
      "[sitemap] NEXT_PUBLIC_SITE_URL (or config.siteUrl) is required in production builds.",
    );
  }
  log(
    "[sitemap] NEXT_PUBLIC_SITE_URL not set — falling back to http://localhost:3000 (non-production build)",
  );
  return "http://localhost:3000";
}

async function fetchBaselineLocs(
  url: string,
  log: (message: string) => void,
): Promise<string[] | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": "webriq-sitemap-generator" },
    });
    if (!res.ok) {
      log(
        `[sitemap] baseline fetch of ${url} returned ${res.status} — treating as first run (empty baseline)`,
      );
      return [];
    }
    const text = await res.text();
    if (isSitemapIndex(text)) {
      log(
        `[sitemap] baseline ${url} is a <sitemapindex>, not a <urlset> — cannot ` +
          "compare page URLs; skipping diff. Point config.legacySitemapUrl at a " +
          "child urlset if you need the diff.",
      );
      return null;
    }
    return parseSitemapLocs(text);
  } catch (err) {
    log(
      `[sitemap] baseline fetch of ${url} failed (${err instanceof Error ? err.message : err}) — skipping diff, still writing sitemap`,
    );
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function capped(lines: string[]): string[] {
  if (lines.length <= LOG_LINE_CAP) return lines;
  return [
    ...lines.slice(0, LOG_LINE_CAP),
    `  … and ${lines.length - LOG_LINE_CAP} more`,
  ];
}

export async function generateSitemap(
  options: GenerateOptions,
): Promise<GenerateReport> {
  const {
    config,
    client,
    publicDir = path.join(process.cwd(), "public"),
    reportPath = path.join(process.cwd(), ".sitemap-report.json"),
    env = process.env,
    log = console.log,
  } = options;

  // Preview renders every eligible routed doc as if flagged (read-only, no
  // diff/safety/report) — a local aid to inspect the would-be sitemap before the
  // flag migration runs. NEVER honored in a production build: a stray
  // SITEMAP_PREVIEW in the deploy env must not hijack the real sitemap.
  const isProd = isProductionBuild(env);
  const previewRequested =
    env.SITEMAP_PREVIEW === "1" || env.SITEMAP_PREVIEW === "all";
  if (previewRequested && isProd) {
    log(
      "[sitemap] SITEMAP_PREVIEW is set but IGNORED in a production build — " +
        "preview is a local-only aid.",
    );
  }
  const preview = previewRequested && !isProd;
  const siteUrl = resolveSiteUrl(config, env, isProd, log);
  const types = Object.keys(config.routes);

  if (preview) {
    log(
      "[sitemap] PREVIEW MODE — rendering every eligible routed document AS IF flagged (ignoring " +
        "addToSitemap). Read-only; no Sanity writes; diff/safety skipped. This is NOT what production " +
        "emits until documents are migrated.",
    );
  }

  const docs: Array<{
    _id: string;
    _type: string;
    _updatedAt: string;
    slug: string;
  }> = await client.fetch(docsQuery(preview), {
    types,
    minLastmod: config.minLastmod ?? null,
  });

  const skipped: string[] = [];
  const rawEntries: SitemapUrlEntry[] = [];
  for (const doc of docs) {
    const docPath = documentToPath(doc, config);
    if (docPath === null) {
      skipped.push(`${doc._type}/${doc.slug} (${doc._id})`);
      continue;
    }
    rawEntries.push({
      loc: toAbsoluteUrl(siteUrl, docPath),
      lastmod: doc._updatedAt,
    });
  }
  for (const extra of config.extraUrls ?? []) {
    rawEntries.push({ ...extra, loc: toAbsoluteUrl(siteUrl, extra.loc) });
  }
  if (skipped.length) {
    log(
      `[sitemap] skipped ${skipped.length} flagged doc(s) with no resolvable URL:`,
    );
    capped(skipped.map((s) => `  · ${s}`)).forEach((line) => log(line));
  }

  // Dedupe by normalized loc, keeping the freshest lastmod (covers "home" +
  // "Home" both resolving to "/", and page/post slug collisions at the root).
  const byLoc = new Map<string, SitemapUrlEntry>();
  for (const entry of rawEntries) {
    const key = normalizeLoc(entry.loc);
    const existing = byLoc.get(key);
    if (!existing) {
      byLoc.set(key, entry);
    } else if ((entry.lastmod ?? "") > (existing.lastmod ?? "")) {
      byLoc.set(key, { ...existing, lastmod: entry.lastmod });
    }
  }
  const entries = Array.from(byLoc.values()).sort((a, b) =>
    a.loc.localeCompare(b.loc),
  );

  // Diff against what production currently serves. During the cutover build
  // the previous deploy is still live, so the baseline is the legacy sitemap —
  // exactly the right thing to diff against.
  let baseline: string[] | null = null;
  let added: string[] = [];
  let removed: string[] = [];
  if (isProd) {
    // Diff against the sitemap production actually serves. That is normally
    // `${siteUrl}/${outputPath}`, but during a path change it lives elsewhere —
    // config.legacySitemapUrl points the baseline at the real live URL so the
    // diff + SAFETY STOP are not silently disarmed by a 404 on the new path.
    const baselineUrl = config.legacySitemapUrl
      ? toAbsoluteUrl(siteUrl, config.legacySitemapUrl)
      : `${siteUrl}/${config.outputPath}`;
    baseline = await fetchBaselineLocs(baselineUrl, log);
    if (baseline !== null) {
      const baselineKeys = new Set(baseline.map(normalizeLoc));
      const nextKeys = new Set(entries.map((e) => normalizeLoc(e.loc)));
      added = entries.map((e) => e.loc).filter((loc) => !baselineKeys.has(normalizeLoc(loc)));
      removed = baseline.filter((loc) => !nextKeys.has(normalizeLoc(loc)));

      // Guard on FLAGGED DOC count, not total entries — extraUrls must not
      // mask a broken query (missing read token on a private dataset returns
      // zero results without erroring).
      if (
        docs.length === 0 &&
        baseline.length > 0 &&
        env.SITEMAP_ALLOW_EMPTY !== "1"
      ) {
        throw new Error(
          `[sitemap] SAFETY STOP: no flagged documents found but production currently serves ${baseline.length} URLs. ` +
            "Either the flag migration hasn't run yet (yarn sitemap:migrate), or the Sanity read token is missing " +
            "(private datasets return empty results without one). Set SITEMAP_ALLOW_EMPTY=1 to override.",
        );
      }
      if (baseline.length > 0 && entries.length < baseline.length / 2) {
        log(
          `[sitemap] WARNING: sitemap shrank from ${baseline.length} to ${entries.length} URLs (>50%). ` +
            "Verify this mass de-flagging is intentional.",
        );
      }
    }
  } else if (!preview) {
    log("[sitemap] non-production build — baseline diff and report skipped");
  }

  const outputFile = path.join(publicDir, config.outputPath);
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, buildSitemapXml(entries), "utf-8");
  log(`[sitemap] wrote ${entries.length} URLs → ${outputFile}`);

  const report: GenerateReport = {
    generatedAt: new Date().toISOString(),
    siteUrl,
    outputPath: config.outputPath,
    outputFile,
    isProductionBuild: isProd,
    baselineAvailable: baseline !== null,
    counts: { total: entries.length, added: added.length, removed: removed.length },
    added,
    removed,
  };

  if (isProd) {
    if (added.length) {
      log(`[sitemap] ${added.length} URL(s) added:`);
      capped(added.map((u) => `  + ${u}`)).forEach((line) => log(line));
    }
    if (removed.length) {
      log(
        `[sitemap] ${removed.length} URL(s) removed — their pages are de-indexed via the addToSitemap flag (noindex meta):`,
      );
      capped(removed.map((u) => `  - ${u}`)).forEach((line) => log(line));
    }
    await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n", "utf-8");
    log(`[sitemap] diff report → ${reportPath}`);
  }

  return report;
}
