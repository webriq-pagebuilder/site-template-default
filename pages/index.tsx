import React from "react";
import { GetStaticProps } from "next";
import { QueryParams, SanityDocument } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import { getClient, apiReadToken } from "lib/sanity.client";
import { homeQuery, globalSEOQuery } from "./api/query";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { PreviewBanner } from "components/PreviewBanner";
import { PageSections } from "components/page";
import { PreviewNoContent } from "components/PreviewNoContent";
import { SEO } from "components/SEO";
import { CommonPageData, SeoTags } from "types";

interface HomeProps {
  draftMode: boolean;
  token: string;
  params: QueryParams;
  source: string;
  data: Data;
  seo?: SeoTags[];
}

interface DocumentProps {
  data: Data;
}

interface Data {
  pageData: PageData | null;
}

interface PageData extends CommonPageData {
  collections: any;
  slug: string | string[];
  title: string;
}

function Home({ draftMode, source, data }: HomeProps) {
  const showInlineEditor = source === "studio";

  if (draftMode) {
    return (
      <>
        <PreviewBanner />
        <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
          <DocumentWithPreview {...{ data }} />
        </InlineEditorContextProvider>
      </>
    );
  }

  return <Document {...{ data }} />;
}

/**
 *
 * @param {data} Data from getStaticProps based on current slug value
 *
 * @returns Document with published data
 */
function Document({ data }: DocumentProps) {
  const publishedData = data?.pageData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  {
    /*  Show page sections */
  }
  return data?.pageData && <PageSections data={publishedData} />;
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param params object from getStaticProps
 * @param source Source value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({ data }: DocumentProps) {
  const [previewDataEventSource] = useLiveQuery(data, homeQuery);

  const previewData: PageData =
    previewDataEventSource?.[0] || previewDataEventSource;

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  return (
    <>
      {/* if no sections, show no sections only in preview */}
      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.pageData && <PageSections data={previewData} />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  draftMode = false,
  previewData = {},
}: any) => {
  const client = getClient(draftMode ? apiReadToken : undefined);

  const [indexPage, globalSEO] = await Promise.all([
    client.fetch<SanityDocument>(homeQuery),
    client.fetch<SanityDocument>(globalSEOQuery),
  ]);

  // SEO tags
  const seo = SEO({
    data: {
      title: indexPage?.title || "Stackshift | Home page",
      type: indexPage?._type || "page",
      route: "",
      ...indexPage?.seo,
    },
    defaultSeo: globalSEO,
  });

  return {
    props: {
      draftMode,
      token: draftMode ? apiReadToken : "",
      source: (draftMode && previewData?.source) || "",
      data: {
        pageData: indexPage || null,
      },
      seo,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
};

export default Home;
