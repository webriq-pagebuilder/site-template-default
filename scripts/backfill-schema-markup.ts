/**
 * Backfill `schemaMarkup` JSON-LD onto existing Sanity `post` and `page`
 * documents that do not yet have it.
 *
 * This is the independent bridge for T-004 Phase 2: it populates the field that
 * `addSEOJsonLd()` (components/SEO.tsx) prefers, so already-published content
 * emits stored JSON-LD instead of the render-time fallback — without waiting for
 * the PublishForge Studio-webhook write-back pipeline.
 *
 *   yarn backfill:schema-markup --dry-run --type=all
 *   yarn backfill:schema-markup --mode=direct --type=post
 *   yarn backfill:schema-markup --type=page --slug=about
 *   yarn backfill:schema-markup --overwrite --type=all
 *
 * Direct mode (default, only supported mode) builds JSON-LD from existing Sanity
 * fields: BlogPosting for `post`, WebPage for `page`. No LLM call. The shapes
 * mirror PublishForge's structured-metadata.ts (post) and pipeline.ts WebPage
 * branch (page) so backfilled and freshly-published documents agree.
 */
import { parseArgs } from "node:util";
import { loadEnvConfig } from "@next/env";
import { createClient } from "next-sanity";
import { firstParagraph } from "./lib/portabletext-to-md";

loadEnvConfig(process.cwd());

const { values: args } = parseArgs({
  options: {
    mode: { type: "string", default: "direct" },
    type: { type: "string", default: "all" },
    slug: { type: "string" },
    overwrite: { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
  },
});

const mode = args.mode as string;
const docType = args.type as string;
const filterSlug = args.slug as string | undefined;
const overwrite = args.overwrite as boolean;
const dryRun = args["dry-run"] as boolean;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");

interface SanityPost {
  _id: string;
  title?: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  body?: unknown[];
  author?: { name?: string } | null;
  categories?: string[];
  aiVisibilityTags?: string[];
  seo?: { seoTitle?: string; seoDescription?: string };
}

interface SanityPage {
  _id: string;
  title?: string;
  slug: string;
  seo?: { seoTitle?: string; seoDescription?: string };
}

function createWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token =
    process.env.SANITY_API_WRITE_TOKEN ??
    process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN;

  if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
  if (!token && !dryRun) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN is not set — required to patch documents (use --dry-run to preview without it)",
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: "2022-03-13",
    useCdn: false,
    token,
  });
}

function postUrl(slug: string): string {
  return `${SITE_URL}/${slug.replace(/^\/+/, "")}`;
}

function buildPostSchema(doc: SanityPost): string {
  const description =
    doc.excerpt?.trim() ||
    doc.seo?.seoDescription?.trim() ||
    (Array.isArray(doc.body) ? firstParagraph(doc.body) : "") ||
    undefined;

  // Node shape mirrors PublishForge structured-metadata.ts buildSchemaMarkup so a
  // post emits the same BlogPosting whether populated by PF publish or backfill.
  const keywords = Array.from(
    new Set([...(doc.aiVisibilityTags ?? []), ...(doc.categories ?? [])]),
  ).filter(Boolean);
  const node: Record<string, unknown> = {
    "@type": "BlogPosting",
    headline: doc.title || doc.seo?.seoTitle || doc.slug,
    description,
    author: doc.author?.name
      ? { "@type": "Person", name: doc.author.name }
      : undefined,
    datePublished: doc.publishedAt || undefined,
    url: postUrl(doc.slug),
    keywords: keywords.length > 0 ? keywords : undefined,
  };

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [node],
  });
}

function buildPageSchema(doc: SanityPage): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: doc.seo?.seoTitle || doc.title || doc.slug,
    description: doc.seo?.seoDescription || undefined,
    url: postUrl(doc.slug),
  });
}

async function main() {
  if (mode !== "direct") {
    throw new Error(
      `Unsupported --mode=${mode}. Only "direct" is supported (page docs are WebPage-minimal by design; enrich mode is out of scope for T-004 Phase 2).`,
    );
  }

  const stats = { written: 0, skipped: 0, failed: 0 };
  const client = createWriteClient();

  // Without --overwrite, only target docs missing schemaMarkup.
  const missingFilter = overwrite
    ? ""
    : ' && (!defined(schemaMarkup) || schemaMarkup == "")';
  const slugFilter = filterSlug ? " && slug.current == $slug" : "";
  const params = filterSlug ? { slug: filterSlug } : {};

  let posts: SanityPost[] = [];
  let pages: SanityPage[] = [];

  if (docType === "all" || docType === "post") {
    posts = await client.fetch(
      `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))${slugFilter}${missingFilter}] {
        _id, title, "slug": slug.current, excerpt, publishedAt, body,
        "author": authors[0]->{ name },
        "categories": categories[]->title,
        aiVisibilityTags,
        "seo": seo { seoTitle, seoDescription }
      }`,
      params,
    );
    console.log(`[backfill] fetched ${posts.length} post(s) to patch`);
  }

  if (docType === "all" || docType === "page") {
    pages = await client.fetch(
      `*[_type == "page" && defined(slug.current) && !(_id in path("drafts.**"))${slugFilter}${missingFilter}] {
        _id, title, "slug": slug.current,
        "seo": seo { seoTitle, seoDescription }
      }`,
      params,
    );
    console.log(`[backfill] fetched ${pages.length} page(s) to patch`);
  }

  for (const doc of posts) {
    try {
      const schemaMarkup = buildPostSchema(doc);
      if (dryRun) {
        console.log(
          `[backfill] dry-run post ${doc.slug} → ${schemaMarkup.slice(0, 90)}…`,
        );
        stats.written++;
        continue;
      }
      await client.patch(doc._id).set({ schemaMarkup }).commit();
      console.log(`[backfill] wrote post ${doc.slug}`);
      stats.written++;
    } catch (err) {
      console.error(`[backfill] FAILED post ${doc.slug}:`, err);
      stats.failed++;
    }
  }

  for (const doc of pages) {
    try {
      const schemaMarkup = buildPageSchema(doc);
      if (dryRun) {
        console.log(
          `[backfill] dry-run page ${doc.slug} → ${schemaMarkup.slice(0, 90)}…`,
        );
        stats.written++;
        continue;
      }
      await client.patch(doc._id).set({ schemaMarkup }).commit();
      console.log(`[backfill] wrote page ${doc.slug}`);
      stats.written++;
    } catch (err) {
      console.error(`[backfill] FAILED page ${doc.slug}:`, err);
      stats.failed++;
    }
  }

  console.log(
    `\nSchema markup backfill complete:\n  written:  ${stats.written}${
      dryRun ? " (dry-run)" : ""
    }\n  failed:   ${stats.failed}`,
  );
}

main().catch((err) => {
  console.error("[backfill] fatal:", err);
  process.exit(1);
});
