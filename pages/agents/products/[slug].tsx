import React from "react";
import Image from "next/image";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { SEO, addSEOJsonLd } from "components/SEO";
import { globalSEOQuery } from "pages/api/query";
import { sanityClient } from "lib/sanity.client";
import {
  cleanAttr,
  humanizeSlug,
  stripBlankProductData,
} from "lib/agents/read-agent-products";
import { SeoTags, SeoSchema } from "types";

interface AgentProductPageProps {
  html: string;
  // Lead image comes from the PublishForge frontmatter, not the markdown body,
  // so it is rendered explicitly here rather than via the markdown pipeline.
  image?: string | null;
  title?: string;
  // seo / seoSchema are rendered globally into <Head> by pages/_app.tsx.
  seo?: SeoTags[];
  seoSchema?: SeoSchema;
}

function AgentProductPage({ html, image, title }: AgentProductPageProps) {
  return (
    <article className="prose max-w-4xl mx-auto py-10 px-6">
      {image && (
        // `not-prose` keeps the typography plugin from adding margins to the
        // fill image — those margins shift the absolutely-positioned <img> and
        // make it overlap the markdown below.
        <div className="not-prose relative mx-auto mb-8 aspect-square w-full max-w-md">
          <Image
            src={image}
            alt={title ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="rounded-lg object-contain"
            priority
          />
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

const PF_FETCH_TIMEOUT_MS = 8000;

export async function getStaticProps({ params }: any) {
  const base = process.env.PF_AGENT_API_BASE_URL; // PublishForge base URL
  const token = process.env.PIM_AGENT_READ_TOKEN; // shared read token
  const slug = params?.slug;

  let doc: any = null;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PF_FETCH_TIMEOUT_MS);

    let r: Response;
    try {
      r = await fetch(`${base}/api/pim/agent-doc/${encodeURIComponent(slug)}`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    // Unknown slug: serve the real 404, retry occasionally in case it appears.
    if (r.status === 404) return { notFound: true, revalidate: 3600 };
    if (!r.ok) throw new Error(`PublishForge responded ${r.status}`);
    doc = await r.json();
  } catch (e) {
    // Cold fetch failed: never publish a blank 200. Short revalidate to retry.
    // Warm (already-cached) pages keep serving via ISR stale-while-revalidate.
    console.error(`[agents/products] cold fetch failed for "${slug}":`, e);
    return { notFound: true, revalidate: 60 };
  }

  if (!doc?.markdown) {
    return { notFound: true, revalidate: 60 };
  }

  // PublishForge returns the body markdown with a leading YAML frontmatter
  // block. The parsed values arrive separately in `doc.frontmatter`, so strip
  // the raw block here — otherwise the unified pipeline (which has no
  // frontmatter plugin) renders it as an <hr> + Setext <h2> dump at the top.
  // Then stripBlankProductData() drops any "N/A" / empty / null / undefined
  // spec rows so the page never shows placeholder product data.
  const body = stripBlankProductData(
    (doc.markdown ?? "").replace(/^\s*---\r?\n[\s\S]*?\r?\n---\r?\n/, ""),
  );

  // Markdown -> sanitized HTML, SERVER-SIDE (not in useEffect).
  const html = (
    await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(body)
  ).toString();

  const globalSEO = await sanityClient.fetch(globalSEOQuery);
  const fm = doc.frontmatter ?? {};

  // Drop N/A / empty / null / undefined frontmatter before it reaches the title,
  // <meta> tags, or JSON-LD — cleanAttr() returns undefined for any junk value,
  // so each field falls back instead of rendering a placeholder.
  const title = cleanAttr(fm.title) ?? cleanAttr(doc.sku) ?? humanizeSlug(slug);
  const image = cleanAttr(fm.image);
  const description = cleanAttr(fm.description);
  const brand = cleanAttr(fm.brand);
  const availability = cleanAttr(fm.availability);

  const seo = SEO({
    data: {
      title,
      type: "agentProduct",
      route: `agents/products/${slug}`,
      seoDescription: description,
      // Product image is an absolute URL from PublishForge (PIM-hosted), so the
      // SEO helper passes it through to og:image/twitter:image as-is.
      seoImage: image,
    },
    defaultSeo: globalSEO,
  });

  const seoSchema = {
    key: "agentProduct-jsonld",
    innerHTML: addSEOJsonLd({
      seo,
      type: "agentProduct",
      defaults: globalSEO,
      slug,
      // map PublishForge frontmatter -> the shape addSEOJsonLd expects
      pageData: {
        name: title,
        price: fm.price,
        brand,
        availability,
        productInfo: { images: image },
      },
    }),
  };

  return {
    props: {
      html,
      image: image ?? null,
      title,
      seo,
      seoSchema,
    },
    revalidate: 86400, // daily safety backstop; primary refresh is the webhook
  };
}

export async function getStaticPaths() {
  // Greenfield: render on demand. fallback "blocking" returns complete
  // server-rendered HTML on first hit (SEO-critical) — NOT "true".
  return { paths: [], fallback: "blocking" };
}

export default React.memo(AgentProductPage);
