import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { loadEnvConfig } from "@next/env";
import matter from "gray-matter";
import { createBackfillClient } from "./sanity-backfill-client";
import { blocksToMarkdown, firstParagraph } from "./portabletext-to-md";
import { getWikiContext } from "./wiki-context";

loadEnvConfig(process.cwd());

const AGENTS_DIR = path.join(process.cwd(), "content", "agents");

const { values: args } = parseArgs({
  options: {
    mode: { type: "string", default: "direct" },
    type: { type: "string", default: "all" },
    slug: { type: "string" },
    "wiki-dir": { type: "string" },
    model: { type: "string" },
    overwrite: { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
  },
});

const mode = args.mode as string;
const docType = args.type as string;
const filterSlug = args.slug as string | undefined;
const wikiDir =
  (args["wiki-dir"] as string | undefined) ??
  (existsSync(path.join(process.cwd(), "content", "wiki"))
    ? path.join(process.cwd(), "content", "wiki")
    : undefined);
const model = args.model as string | undefined;
const overwrite = args.overwrite as boolean;
const dryRun = args["dry-run"] as boolean;

interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  body?: unknown[];
  categories?: string[];
  seo?: { seoTitle?: string; seoDescription?: string };
}

interface SanityPage {
  _id: string;
  title: string;
  slug: string;
  publishDateTime?: string;
  seo?: { seoTitle?: string; seoDescription?: string };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resolveTitle(doc: SanityPost | SanityPage): string {
  if (doc.title && doc.title.trim()) return doc.title.trim();
  if (doc.seo?.seoTitle && doc.seo.seoTitle.trim())
    return doc.seo.seoTitle.trim();
  return doc.slug;
}

function resolveSummary(doc: SanityPost | SanityPage): string {
  const post = doc as SanityPost;
  if (post.excerpt && post.excerpt.trim()) return post.excerpt.trim();
  if (doc.seo?.seoDescription && doc.seo.seoDescription.trim())
    return doc.seo.seoDescription.trim();
  if (Array.isArray(post.body)) {
    const para = firstParagraph(post.body);
    if (para) return para;
  }
  const title = resolveTitle(doc);
  if (title) return title;
  return doc.slug;
}

async function buildDirectContent(
  doc: SanityPost | SanityPage,
  taxonomy: string,
): Promise<{ frontmatter: Record<string, unknown>; body: string }> {
  const post = doc as SanityPost;
  const title = resolveTitle(doc);
  const summary = resolveSummary(doc);
  const generatedAt =
    post.publishedAt ??
    (doc as SanityPage).publishDateTime ??
    new Date().toISOString();
  const bodyMd = Array.isArray(post.body) ? blocksToMarkdown(post.body) : "";

  const frontmatter: Record<string, unknown> = {
    title,
    slug: doc.slug,
    summary,
    taxonomy,
    generated_at: generatedAt,
    source: "sanity-backfill-direct",
  };

  return { frontmatter, body: bodyMd };
}

async function processDocument(
  doc: SanityPost | SanityPage,
  taxonomy: string,
  stats: { written: number; skipped: number; failed: number },
  seenSlugs: Map<string, string>,
): Promise<void> {
  const slug = doc.slug;
  const outputPath = path.join(AGENTS_DIR, `${slug}.md`);

  if (seenSlugs.has(slug)) {
    console.warn(
      `[backfill] WARNING: slug collision — "${slug}" already processed from ${seenSlugs.get(
        slug,
      )} (_id: ${doc._id}). Skipping.`,
    );
    stats.skipped++;
    return;
  }
  seenSlugs.set(slug, `_type=${taxonomy} _id=${doc._id}`);

  if (!overwrite && existsSync(outputPath)) {
    console.log(`[backfill] skip  ${slug}.md (already exists)`);
    stats.skipped++;
    return;
  }

  try {
    const { frontmatter, body } = await buildDirectContent(doc, taxonomy);

    if (mode === "enrich") {
      const { enrichFrontmatter } = await import("./enrich-with-claude");
      const content = [frontmatter.title, frontmatter.summary, body].join(
        "\n\n",
      );
      const wikiContext = wikiDir
        ? await getWikiContext(slug, wikiDir)
        : undefined;
      const enriched = await enrichFrontmatter(content, { model, wikiContext });

      if (enriched.faq && enriched.faq.length > 0)
        frontmatter.faq = enriched.faq;
      if (enriched.best_for && enriched.best_for.length > 0)
        frontmatter.best_for = enriched.best_for;
      if (enriched.not_for && enriched.not_for.length > 0)
        frontmatter.not_for = enriched.not_for;
      if (enriched.use_cases && enriched.use_cases.length > 0)
        frontmatter.use_cases = enriched.use_cases;

      await sleep(200);
    }

    const fileContent = matter.stringify(body, frontmatter);

    if (dryRun) {
      console.log(`[backfill] dry-run would write: ${outputPath}`);
      console.log(`  title: ${frontmatter.title}`);
      console.log(
        `  summary: ${(frontmatter.summary as string).slice(0, 80)}...`,
      );
      stats.written++;
      return;
    }

    await mkdir(AGENTS_DIR, { recursive: true });
    await writeFile(outputPath, fileContent, "utf-8");
    console.log(`[backfill] wrote  ${slug}.md`);
    stats.written++;
  } catch (err) {
    console.error(`[backfill] FAILED ${slug}.md:`, err);
    stats.failed++;
  }
}

async function main() {
  const stats = { written: 0, skipped: 0, failed: 0 };
  const seenSlugs = new Map<string, string>();

  const client = createBackfillClient();

  let posts: SanityPost[] = [];
  let pages: SanityPage[] = [];

  if (docType === "all" || docType === "post") {
    const postQuery = filterSlug
      ? `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))] {
          _id, title, "slug": slug.current, excerpt, publishedAt, body,
          "categories": categories[]->.title,
          "seo": seo { seoTitle, seoDescription }
        }`
      : `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] {
          _id, title, "slug": slug.current, excerpt, publishedAt, body,
          "categories": categories[]->.title,
          "seo": seo { seoTitle, seoDescription }
        }`;

    const params = filterSlug ? { slug: filterSlug } : {};
    posts = await client.fetch(postQuery, params);
    console.log(`[backfill] fetched ${posts.length} posts`);
  }

  if (docType === "all" || docType === "page") {
    const pageQuery = filterSlug
      ? `*[_type == "page" && slug.current == $slug && !(_id in path("drafts.**"))] {
          _id, title, "slug": slug.current, publishDateTime,
          "seo": seo { seoTitle, seoDescription }
        }`
      : `*[_type == "page" && defined(slug.current) && !(_id in path("drafts.**")) && slug.current != "home"] {
          _id, title, "slug": slug.current, publishDateTime,
          "seo": seo { seoTitle, seoDescription }
        }`;

    const params = filterSlug ? { slug: filterSlug } : {};
    pages = await client.fetch(pageQuery, params);
    console.log(`[backfill] fetched ${pages.length} pages`);
  }

  for (const post of posts) {
    await processDocument(post, "article", stats, seenSlugs);
  }

  for (const page of pages) {
    await processDocument(page, "page", stats, seenSlugs);
  }

  console.log("");
  console.log("Backfill complete:");
  console.log(`  written:  ${stats.written}`);
  console.log(`  skipped:  ${stats.skipped}  (already exist)`);
  console.log(`  failed:   ${stats.failed}  (see errors above)`);
}

main().catch((err) => {
  console.error("[backfill] fatal:", err);
  process.exit(1);
});
