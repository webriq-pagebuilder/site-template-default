import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { QueryParams, SanityDocument, groq } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import { getClient, apiReadToken } from "lib/sanity.client";
import { blogQuery, slugQuery, globalSEOQuery } from "./api/query";
import PageNotFound from "pages/404";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { PreviewBanner } from "components/PreviewBanner";
import { PageSections } from "components/page";
import BlogSections from "components/blog";
import { PreviewNoContent } from "components/PreviewNoContent";
import { PreviewProvider } from "components/list";
import { SEO, addSEOJsonLd } from "components/SEO";
import { CommonPageData, BlogsData, SeoTags, SeoSchema } from "types";

interface PageProps {
  draftMode: boolean;
  token: string;
  params: QueryParams;
  source: string;
  data: Data;
  seo?: SeoTags[];
}

interface Data {
  pageData: PageData | null;
  blogData: BlogsData | null;
}

interface DocumentProps {
  data: Data;
  slug: string | string[];
  source: string;
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
              <DocumentWithPreview {...{ data, slug, source }} />
            </InlineEditorContextProvider>
          </PreviewProvider>
        </>
      );
    }

    return <Document {...{ data }} />;
  }
}

/**
 *
 * @param {data} Data from getStaticProps based on current slug value
 *
 * @returns Document with published data
 */
function Document({ data }: { data: Data }) {
  const publishedData = data?.pageData?.[0] || data?.blogData?.[0]; // latest published data in Sanity

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  return (
    <>
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

function DocumentWithPreview({ data, slug }: DocumentProps) {
  const pageQuery = data?.pageData ? slugQuery : blogQuery;
  const [previewDataEventSource] = useLiveQuery(data, pageQuery, { slug });

  const previewData: PageData | BlogsData =
    previewDataEventSource?.[0] || previewDataEventSource; // Latest preview data in Sanity

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { _type } = previewData;

  return (
    <>
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

  const [pageData, blogData, globalSEO] = await Promise.all([
    client.fetch<SanityDocument>(slugQuery, { slug: params.slug }),
    client.fetch<SanityDocument>(blogQuery, { slug: params.slug }),
    client.fetch<SanityDocument>(globalSEOQuery),
  ]);

  // SEO tags
  const seo = SEO({
    data: {
      title: pageData?.title || blogData?.title || "Stackshift page",
      type: pageData?._type || blogData?._type || "",
      route: params?.slug,
      ...(pageData?.seo || blogData?.seo),
    },
    defaultSeo: globalSEO,
  });

  // Structured data (JSON-LD encoding)
  const seoSchema = {
    key: `${pageData?._type || blogData?._type}-jsonld`,
    innerHTML: addSEOJsonLd({
      seo: seo,
      type: pageData?._type || blogData?._type,
      defaults: globalSEO,
      slug: params?.slug,
      pageData: pageData || blogData,
    }),
  };

  return {
    props: {
      draftMode,
      token: draftMode ? apiReadToken : "",
      params,
      source: (draftMode && previewData?.source) || "",
      data: {
        pageData: pageData || null,
        blogData: blogData || null,
      },
      seo,
      seoSchema,
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

  const pages = await getClient().fetch(
    groq`*[_type in ["page", "post"] && !(_id in path("drafts.**")) && defined(slug.current)][].slug.current`
  );

  return {
    paths: pages.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export default React.memo(PageBySlug);
