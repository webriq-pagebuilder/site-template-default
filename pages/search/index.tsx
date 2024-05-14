import React, { useEffect } from "react";
import { QueryParams, SanityDocument } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import { getClient, apiReadToken } from "lib/sanity.client";
import { searchPageQuery, globalSEOQuery } from "pages/api/query";
import { SearchPageSections } from "components/page/store/search";
import { PreviewNoContent } from "components/PreviewNoContent";
import { PreviewProvider } from "components/list";
import { SEO } from "components/SEO";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, SeoTags } from "types";

interface SeachPageProps {
  draftMode: boolean;
  token: string;
  params: QueryParams;
  source: string;
  data: Data;
  seo?: SeoTags[];
}

interface Data {
  searchData: SearchData;
}

export interface SearchData extends CommonPageData {
  collections: any;
  slug: string | string[] | null;
}

interface DocumentProps {
  data: Data;
  token?: string | null;
}

function SearchPage({ data, draftMode, token, source }: SeachPageProps) {
  useEffect(() => {
    if (typeof Ecwid !== "undefined") {
      window.Ecwid.init();
    }
  }, []);

  const showInlineEditor = source === "studio";

  if (draftMode) {
    return (
      <>
        <PreviewBanner />
        <PreviewProvider token={token}>
          <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
            <DocumentWithPreview {...{ data, token }} />
          </InlineEditorContextProvider>
        </PreviewProvider>
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
function Document({ data }: { data: Data }) {
  const publishedData = data?.searchData?.[0];

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  return (
    <>
      {/*  Show page sections */}
      {data?.searchData?.[0] && <SearchPageSections data={publishedData} />}
    </>
  );
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param token Token value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({ data, token = null }: DocumentProps) {
  const [previewDataEventSource] = useLiveQuery(data, searchPageQuery);
  const previewData = previewDataEventSource?.[0] || previewDataEventSource;

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
      {data?.searchData && <SearchPageSections data={previewData} />}
    </>
  );
}

export async function getStaticProps({
  draftMode = false,
  previewData = {},
}: any) {
  const client = getClient(draftMode ? apiReadToken : undefined);

  const [searchPage, globalSEO] = await Promise.all([
    client.fetch<SanityDocument>(searchPageQuery),
    client.fetch<SanityDocument>(globalSEOQuery),
  ]);

  // SEO tags
  const seo = SEO({
    data: {
      title: "Search",
      type: searchPage?._type || "searchPage",
      route: "search",
      ...searchPage,
    },
    defaultSeo: globalSEO,
  });

  if (!searchPage) {
    return {
      props: {
        draftMode,
        data: { searchData: null },
        seo,
      },
    };
  }

  return {
    props: {
      draftMode,
      token: draftMode ? apiReadToken : "",
      source: (draftMode && previewData.source) || "",
      data: {
        searchData: searchPage,
      },
      seo,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export default React.memo(SearchPage);
