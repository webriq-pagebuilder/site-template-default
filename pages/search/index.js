import React, { useEffect } from "react";
import Head from "next/head";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { usePreview } from "lib/sanity.preview";
import { searchPageQuery } from "pages/api/query";
import { SearchPageSections } from "components/page/store/search";
import { PreviewNoContent } from "components/PreviewNoContent";
import { filterDataToSingleItem } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";

function SearchPage({ data, preview, token }) {
  useEffect(() => {
    if (typeof Ecwid !== "undefined") {
      window.Ecwid.init();
    }
  }, []);

  if (preview) {
    return (
      <>
        <PreviewBanner />
        <PreviewSuspense>
          <DocumentWithPreview {...{ data, token }} />
        </PreviewSuspense>
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
function Document({ data }) {
  const publishedData = data?.searchData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { title, seo } = publishedData;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
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
function DocumentWithPreview({ data, token = null }) {
  const previewDataEventSource = usePreview(token, searchPageQuery);
  const previewData = previewDataEventSource?.[0] || previewDataEventSource;

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { title, seo } = previewData;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
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

export async function getStaticProps({ preview = false, previewData = {} }) {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const searchPage = await client.fetch(searchPageQuery);

  // pass page data and preview to helper function
  const searchData = filterDataToSingleItem(searchPage, preview);

  if (!searchData) {
    return {
      props: {
        preview,
        data: { searchData: null },
      },
    };
  }

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      data: { searchData },
    },
  };
}

export default React.memo(SearchPage);
