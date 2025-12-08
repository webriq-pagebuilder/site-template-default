import React, { Suspense, useEffect } from "react";
import { getClient } from "@/lib/sanity.client";
import { usePreview } from "@/lib/sanity.preview";
import { searchPageQuery, globalSEOQuery } from "@/pages/api/query";
import { SearchPageSections } from "@/components/page/store/search";
import { PreviewNoContent } from "@/components/PreviewNoContent";
import PageNotFound from "@/pages/404";
import { filterDataToSingleItem } from "@/components/list";
import { SEO } from "@/components/SEO";
import { PreviewBanner } from "@/components/PreviewBanner";
import { PreviewProvider } from "@/components/PreviewProvider";
import InlineEditorContextProvider from "@/context/InlineEditorContext";
import { CommonPageData, SeoTags } from "@/types";

interface SeachPageProps {
  data: Data;
  preview: boolean;
  token?: string;
  source?: string;
  seo?: SeoTags[];
}

interface Data {
  searchData: SearchData;
}

export interface SearchData extends CommonPageData {
  collections: any;
  slug: string | string[] | null;
}

interface DocumentWithPreviewProps {
  data: Data;
  token?: string | null;
}

function SearchPage({ data, preview, token, source }: SeachPageProps) {
  const showInlineEditor = source === "studio";
  useEffect(() => {
    if (typeof Ecwid !== "undefined") {
      window.Ecwid.init();
    }
  }, []);

  if (!data?.searchData) {
    return <PageNotFound />;
  } else {
    if (preview) {
      return (
        <>
          <PreviewBanner />
          <PreviewProvider token={token || ""}>
            <Suspense fallback="Loading...">
              <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
                <DocumentWithPreview {...{ data, token }} />
              </InlineEditorContextProvider>
            </Suspense>
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
  const publishedData = data?.searchData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  return data?.searchData && <SearchPageSections data={publishedData} />;
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param token Token value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({ data, token = null }: DocumentWithPreviewProps) {
  const [previewDataEventSource] = usePreview(data?.searchData, searchPageQuery);
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
  preview = false,
  previewData = {},
}: any): Promise<{ props: SeachPageProps }> {
  const client =
    preview && previewData?.token
      ? getClient(preview).withConfig({ token: previewData.token })
      : getClient(false);

  const [searchPage, globalSEO] = await Promise.all([
    client.fetch(searchPageQuery),
    client.fetch(globalSEOQuery),
  ]);

  // pass page data and preview to helper function
  const searchData: SearchData = filterDataToSingleItem(searchPage, preview);

  const data = { searchData };

  const seo = SEO({
    data: {
      title: "Search",
      type: data?.searchData?._type,
      route: "search",
      ...data?.searchData,
    },
    defaultSeo: globalSEO,
  });

  if (!searchData) {
    return {
      props: {
        preview,
        data: { searchData: null },
        seo,
      },
    };
  }

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData.source) || "",
      data,
      seo,
    },
  };
}

export default React.memo(SearchPage);
