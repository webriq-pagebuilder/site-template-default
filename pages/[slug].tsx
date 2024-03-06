import React from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { QueryParams, SanityDocument, groq } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import { getClient, apiReadToken } from "lib/sanity.client";
import { blogQuery, slugQuery, globalSEOQuery } from "./api/query";
import { CommonPageData, BlogsData, DefaultSeoData } from "types";
import PageNotFound from "pages/404";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { PreviewBanner } from "components/PreviewBanner";
import { PageSections } from "components/page";
import BlogSections from "components/blog";
import { PreviewNoContent } from "components/PreviewNoContent";
import { SEO, PreviewProvider } from "components/list";
import { addSEOJsonLd } from "components/SEO";

interface PageProps {
  draftMode: boolean;
  token: string;
  params: QueryParams;
  source: string;
  data: Data;
  defaultSeo: DefaultSeoData;
}

interface Data {
  pageData: PageData | null;
  blogData: BlogsData | null;
}

interface DocumentProps {
  data: Data;
  slug: string | string[];
  source: string;
  defaultSeo: DefaultSeoData;
}

export interface PageData extends CommonPageData {
  collections: any;
  slug: string | string[];
  title: string;
}

export function PageBySlug({
  draftMode,
  token,
  params,
  source,
  data,
  defaultSeo,
}: PageProps) {
  const slug = params?.slug;
  const showInlineEditor = source === "studio";

  if (!data?.pageData && !data?.blogData) {
    return <PageNotFound />;
  } else {
    if (draftMode) {
      return (
        <>
          <PreviewBanner />
          <PreviewProvider token={token}>
            <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
              <DocumentWithPreview {...{ data, slug, source, defaultSeo }} />
            </InlineEditorContextProvider>
          </PreviewProvider>
        </>
      );
    }

    return <Document {...{ data, defaultSeo }} />;
  }
}

/**
 *
 * @param {data} Data from getStaticProps based on current slug value
 *
 * @returns Document with published data
 */
function Document({
  data,
  defaultSeo,
}: {
  data: Data;
  defaultSeo: DefaultSeoData;
}) {
  const publishedData = data?.pageData?.[0] || data?.blogData?.[0]; // latest published data in Sanity

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { title, _type, seo } = publishedData;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: title,
            type: _type,
            route: publishedData?.slug,
            ...seo,
          }}
          defaultSeo={defaultSeo}
        />
        {/* Structured data (JSON-LD encoding) */}
        <script
          key={`${_type}-jsonld`}
          type="application/ld+json"
          dangerouslySetInnerHTML={addSEOJsonLd({
            seo: seo,
            type: _type,
            slug: publishedData?.slug,
            defaults: defaultSeo,
            pageData: publishedData,
          })}
        />
        <title>{seo?.seoTitle ?? title}</title>
      </Head>

      {/*  Show page sections */}
      {data?.pageData?.[0] && <PageSections data={publishedData} />}

      {/* Show Blog sections */}
      {data?.blogData?.[0] && <BlogSections data={publishedData} />}
    </>
  );
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param slug page route
 * @param defaultSeo default values for SEO
 *
 * @returns Document with preview data
 */

function DocumentWithPreview({ data, slug, defaultSeo }: DocumentProps) {
  const pageQuery = data?.pageData ? slugQuery : blogQuery;
  const [previewDataEventSource] = useLiveQuery(data, pageQuery, { slug });

  const previewData: PageData | BlogsData =
    previewDataEventSource?.[0] || previewDataEventSource; // Latest preview data in Sanity

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { title, seo, _type } = previewData;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: title,
            type: _type,
            route: slug,
            ...seo,
          }}
          defaultSeo={defaultSeo}
        />
        {/* Structured data (JSON-LD encoding) */}
        <script
          key={`${_type}-jsonld`}
          type="application/ld+json"
          dangerouslySetInnerHTML={addSEOJsonLd({
            seo: seo,
            type: _type,
            slug: previewData?.slug,
            defaults: defaultSeo,
            pageData: previewData,
          })}
        />
        <title>{seo?.seoTitle ?? title}</title>
      </Head>

      {/* if page has no sections, show no sections only in preview */}
      {_type === "page" &&
        "sections" in previewData &&
        (!previewData ||
          !previewData?.sections ||
          previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.pageData?.[0] && <PageSections data={previewData as PageData} />}

      {/* Show Blog sections */}
      {data?.blogData?.[0] && <BlogSections data={previewData as BlogsData} />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  draftMode = false,
  previewData = {},
}: any) => {
  const client = getClient(draftMode ? apiReadToken : undefined);

  const [page, blogData, globalSEO] = await Promise.all([
    client.fetch<SanityDocument>(slugQuery, { slug: params.slug }),
    client.fetch<SanityDocument>(blogQuery, { slug: params.slug }),
    client.fetch<SanityDocument>(globalSEOQuery),
  ]);

  return {
    props: {
      draftMode,
      token: draftMode ? apiReadToken : "",
      params,
      source: (draftMode && previewData?.source) || "",
      data: {
        pageData: page || null,
        blogData: blogData || null,
      },

      defaultSeo: globalSEO,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
};

// Prepare Next.js to know which routes already exist
export const getStaticPaths: GetStaticPaths = async () => {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)

  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const paths = await getClient().fetch(
    groq`*[_type in ["page", "post"] && defined(slug.current)][].slug.current`
  );

  return { paths, fallback: true };
};

export default React.memo(PageBySlug);
