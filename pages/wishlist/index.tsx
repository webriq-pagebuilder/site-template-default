import React, { useEffect } from "react";
import Head from "next/head";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { usePreview } from "lib/sanity.preview";
import { wishlistPageQuery } from "pages/api/query";
import { WishlistSections } from "components/page/store/wishlist";
import { PreviewNoContent } from "components/PreviewNoContent";
import { filterDataToSingleItem } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, CommonSections } from "types";

interface WishListPageProps {
  data: Data;
  preview: boolean;
  token?: string;
  source?: string;
}

interface Data {
  wishlistData: WishlistData;
}

export interface WishlistData extends CommonPageData {
  wishlistSectionVariant: {
    variant: string;
    _type: string;
  };
}

interface DocumentWithPreviewProps {
  data: Data;
  token: string;
}
function WishlistPage({ data, preview, token, source }: WishListPageProps) {
  useEffect(() => {
    if (typeof Ecwid !== "undefined") {
      window.Ecwid.init();
    }
  }, []);

  const showInlineEditor = source === "studio";
  if (preview) {
    return (
      <>
        <PreviewBanner />
        <PreviewSuspense fallback={"Loading..."}>
          <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
            <DocumentWithPreview {...{ data, token }} />
          </InlineEditorContextProvider>
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
function Document({ data }: { data: Data }) {
  const publishedData = data?.wishlistData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { seo } = publishedData;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
        <title>{seo?.seoTitle ?? "Wishlist"}</title>
      </Head>

      {/*  Show page sections */}
      {data?.wishlistData && <WishlistSections data={publishedData} />}
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
function DocumentWithPreview({ data, token = null }: DocumentWithPreviewProps) {
  const previewDataEventSource = usePreview(token, wishlistPageQuery);
  const previewData: WishlistData =
    previewDataEventSource?.[0] || previewDataEventSource;

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { seo } = previewData;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
        <title>{seo?.seoTitle ?? "Wishlist"}</title>
      </Head>

      {/* if no sections, show no sections only in preview */}

      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.wishlistData && <WishlistSections data={previewData} />}
    </>
  );
}

export async function getStaticProps({
  preview = false,
  previewData = {},
}: any): Promise<{ props: WishListPageProps }> {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const searchPage = await client.fetch(wishlistPageQuery);

  // pass page data and preview to helper function
  const wishlistData = filterDataToSingleItem(searchPage, preview);

  if (!wishlistData) {
    return {
      props: {
        preview,
        data: { wishlistData: null },
      },
    };
  }

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData.source) || "",
      data: { wishlistData },
    },
  };
}

export default React.memo(WishlistPage);
