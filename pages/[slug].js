import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { PreviewSuspense } from "next-sanity/preview";
import { sanityClient, getClient } from "lib/sanity.client";
import { blogQuery, slugQuery } from "./api/query";
import { usePreview } from "lib/sanity.preview";
import { PageSections } from "components/page";
import BlogSections from "components/blog";
import { PreviewBanner } from "components/PreviewBanner";
import { PreviewNoContent } from "components/PreviewNoContent";
import { filterDataToSingleItem } from "components/list";
import PageNotFound from "pages/404";
import InlineEditorContextProvider from "context/InlineEditorContext";


function PageBySlug({ data, preview, token, source }) {
  const router = useRouter();
  const slug = router.query.slug;

  if (!data?.pageData && (!data?.blogData || data?.blogData?.length === 0)) {
    return <PageNotFound />;
  } else {
    if (preview) {
      return (
        <>
          <PreviewBanner />
          <PreviewSuspense>
            <DocumentWithPreview {...{ data, token: token || null, slug, source: source || null }} />
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
function Document({ data }) {
  const publishedData = data?.pageData || data?.blogData; // latest published data in Sanity

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { title, seo } = publishedData;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=360 initial-scale=1" />
        <title>{seo?.seoTitle ?? title ?? "WebriQ Studio"}</title>
      </Head>

      {/*  Show page sections */}
      {data?.pageData && <PageSections data={publishedData} />}

      {/* Show Blog sections */}
      {data?.blogData && <BlogSections data={publishedData} />}
    </>
  );
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param slug Slug value from getStaticProps
 * @param token Token value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({ data, slug, token = null, source = null }) {
  // Current drafts data in Sanity
  const previewDataEventSource = usePreview(
    token,
    data?.pageData ? slugQuery : blogQuery, // as a fallback we assume it's a blog post
    {
      slug,
    }
  );

  const previewData = previewDataEventSource?.[0] || previewDataEventSource; // Latest preview data in Sanity
  const showInlineEditor = source === "studio";

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { title, seo, _type } = previewData;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=360 initial-scale=1" />
        <title>{seo?.seoTitle ?? title ?? "WebriQ Studio"}</title>
      </Head>

      {/* if page has no sections, show no sections only in preview */}
      {_type === "page" &&
        (!previewData ||
          !previewData?.sections ||
          previewData?.sections?.length === 0) && <PreviewNoContent />}


      {/*  Show page sections */}
      {data?.pageData && (
        <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
          <PageSections data={previewData} />
        </InlineEditorContextProvider>
      )}

      {/* Show Blog sections */}
      {data?.blogData && (
        <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
          <BlogSections data={previewData} />
        </InlineEditorContextProvider>
      )}
    </>
  );
}

export async function getStaticProps({
  params,
  preview = false,
  previewData = {},
}) {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const [page, blogData] = await Promise.all([
    client.fetch(slugQuery, { slug: params.slug }),
    client.fetch(blogQuery, { slug: params.slug }),
  ]);

  // pass page data and preview to helper function
  const singlePageData = filterDataToSingleItem(page, preview);
  const singleBlogData = filterDataToSingleItem(blogData, preview);

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData.source) || "",
      data: {
        pageData: singlePageData || null,
        blogData: singleBlogData || null,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    groq`*[_type in ["page", "post"] && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default React.memo(PageBySlug);
