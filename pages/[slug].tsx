import React, { Suspense } from "react";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { PreviewSuspense } from "next-sanity/preview";
import { sanityClient, getClient } from "lib/sanity.client";
import { blogQuery, slugQuery, globalSEOQuery } from "./api/query";
import { usePreview } from "lib/sanity.preview";
import { PageSections } from "components/page";
import BlogSections from "components/blog";
import { PreviewBanner } from "components/PreviewBanner";
import { PreviewNoContent } from "components/PreviewNoContent";
import { filterDataToSingleItem } from "components/list";
import { SEO } from "components/SEO";
import PageNotFound from "pages/404";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { GetStaticPaths, GetStaticProps } from "next";
import { CommonPageData, BlogsData, SeoTags, SeoSchema } from "types";
import { addSEOJsonLd } from "components/SEO";
import { ThemeSettings } from "components/ThemeSettings";
import { ThemeSettingsProvider } from "context/ThemeSettingsContext";
import { defaultThemeConfig } from "components/theme-settings/defaultThemeConfig";

interface PageBySlugProps {
  data: Data;
  preview: boolean;
  token: string | null;
  source: string;
  seo?: SeoTags[];
  seoSchema?: SeoSchema;
  theme?: any;
}

interface DocumentWithPreviewProps {
  data: Data;
  slug: string | string[];
  token: string | null;
  source: string;
}

interface Data {
  pageData: PageData | null;
  blogData: BlogsData | null;
}

export interface PageData extends CommonPageData {
  collections: any;
  slug: string | string[];
  title: string;
  hasNeverPublished?: boolean | null;
}

export function PageBySlug({
  data,
  preview,
  token,
  source,
  theme,
}: PageBySlugProps) {
  const router = useRouter();
  const slug = router.query.slug;
  const showInlineEditor = source === "studio";
  const showThemeSetting = source === "theme";

  if (!data?.pageData && !data?.blogData) {
    return <PageNotFound />;
  } else {
    if (preview) {
      return (
        <>
          <PreviewBanner />
          {showThemeSetting && (
            <ThemeSettingsProvider preview={preview} themeSettings={theme}>
              <ThemeSettings />
            </ThemeSettingsProvider>
          )}
          <PreviewSuspense fallback="Loading...">
            <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
              <DocumentWithPreview
                {...{
                  data,
                  token: token || null,
                  slug,
                  source,
                }}
              />
            </InlineEditorContextProvider>
          </PreviewSuspense>
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
  const publishedData = data?.pageData || data?.blogData; // latest published data in Sanity

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  if (publishedData?.hasNeverPublished) {
    return <PageNotFound />;
  }

  return (
    <Suspense fallback={null}>
      {/*  Show page sections */}
      {data?.pageData && <PageSections data={data?.pageData} />}

      {/* Show Blog sections */}
      {data?.blogData && <BlogSections data={data?.blogData} />}
    </Suspense>
  );
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param slug Slug value from getStaticProps
 * @param token Token value supplied via `/api/preview` route
 * @param source Source value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({
  data,
  slug,
  token = null,
}: DocumentWithPreviewProps) {
  // Current drafts data in Sanity
  const previewDataEventSource = usePreview(
    token,
    data?.pageData ? slugQuery : blogQuery, // as a fallback we assume it's a blog post
    {
      slug,
    }
  );

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
      {data?.pageData && <PageSections data={previewData as PageData} />}

      {/* Show Blog sections */}
      {data?.blogData && <BlogSections data={previewData as BlogsData} />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData = {},
}: any): Promise<{ props: PageBySlugProps; revalidate?: number }> => {
  const client =
    preview && previewData?.token
      ? getClient(preview).withConfig({ token: previewData.token })
      : getClient(false);

  const themeQuery = preview
    ? "*[_type=='themeSettings'][0]"
    : "*[_type=='themeSettings' && !(_id in path('drafts.**'))][0]";

  const [page, blogData, globalSEO, initialConfig] = await Promise.all([
    client.fetch(slugQuery, { slug: params.slug }),
    client.fetch(blogQuery, { slug: params.slug }),
    client.fetch(globalSEOQuery),
    client.fetch(themeQuery),
  ]);

  const theme = initialConfig || defaultThemeConfig;

  // pass page data and preview to helper function
  const singlePageData: PageData = filterDataToSingleItem(page, preview);
  const singleBlogData: BlogsData = filterDataToSingleItem(blogData, preview);

  const data = {
    pageData: singlePageData || null,
    blogData: singleBlogData || null,
  };

  // SEO tags
  const seo = SEO({
    data: {
      title:
        data?.pageData?.title || data?.blogData?.title || "StackShift page",
      type: data?.pageData?._type || data?.blogData?._type || "",
      route: params?.slug,
      ...(data?.pageData?.seo || data?.blogData?.seo),
    },
    defaultSeo: globalSEO,
  });

  // Structured data (JSON-LD encoding)
  const seoSchema = {
    key: `${data?.pageData?._type || data?.blogData?._type}-jsonld`,
    innerHTML: addSEOJsonLd({
      seo: seo,
      type: data?.pageData?._type || data?.blogData?._type,
      defaults: globalSEO,
      slug: params?.slug,
      pageData: data?.pageData || data?.blogData,
    }),
  };

  return {
    props: {
      theme,
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData?.source) || "",
      data,
      seo,
      seoSchema,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
};

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

  const paths = await sanityClient.fetch(
    groq`*[_type in ["page", "post"] && !(_id in path("drafts.**")) && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export default React.memo(PageBySlug);
