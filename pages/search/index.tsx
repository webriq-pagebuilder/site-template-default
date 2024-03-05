import React, { useEffect } from "react";
import Head from "next/head";
import { QueryParams, SanityDocument } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { token } from "lib/token";
import { searchPageQuery, globalSEOQuery } from "pages/api/query";
import { SearchPageSections } from "components/page/store/search";
import { PreviewNoContent } from "components/PreviewNoContent";
import { SEO } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";

import { CommonPageData, DefaultSeoData } from "types";

interface SeachPageProps {
  draftMode: boolean;
  token: string;
  params: QueryParams;
  source: string;
  data: Data;
  defaultSeo: DefaultSeoData;
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
  defaultSeo: DefaultSeoData;
}

function SearchPage({
  data,
  draftMode,
  token,
  source,
  defaultSeo,
}: SeachPageProps) {
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
        <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
          <DocumentWithPreview {...{ data, token, defaultSeo }} />
        </InlineEditorContextProvider>
      </>
    );
  }

  return <Document {...{ data, defaultSeo }} />;
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
  const publishedData = data?.searchData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { seo, _type } = publishedData;

  return (
    <>
      <Head>
        <SEO
          data={{ pageTitle: "Search", type: _type, route: "search", ...seo }}
          defaultSeo={defaultSeo}
        />
        <title>{seo?.seoTitle ?? "Search"}</title>
      </Head>

      {/*  Show page sections */}
      {data?.searchData && <SearchPageSections data={publishedData} />}
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
function DocumentWithPreview({
  data,
  token = null,
  defaultSeo,
}: DocumentProps) {
  const [previewDataEventSource] = useLiveQuery(data, searchPageQuery);
  const previewData = previewDataEventSource?.[0] || previewDataEventSource;

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { seo, _type } = previewData;

  return (
    <>
      <Head>
        <SEO
          data={{ pageTitle: "Search", type: _type, route: "search", ...seo }}
          defaultSeo={defaultSeo}
        />
        <title>{seo?.seoTitle ?? "Search"}</title>
      </Head>

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
  const client = getClient(draftMode ? token : undefined);

  const [searchPage, globalSEO] = await Promise.all([
    client.fetch<SanityDocument>(searchPageQuery),
    client.fetch<SanityDocument>(globalSEOQuery),
  ]);

  if (!searchPage) {
    return {
      props: {
        draftMode,
        data: { searchData: null },
        defaultSeo: globalSEO,
      },
    };
  }

  return {
    props: {
      draftMode,
      token: draftMode ? token : "",
      source: (draftMode && previewData.source) || "",
      data: {
        searchData: searchPage,
      },
      defaultSeo: globalSEO,
    },
  };
}

export default React.memo(SearchPage);
