import React, { useEffect } from "react";
import { QueryParams, SanityDocument } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import { getClient, apiReadToken } from "lib/sanity.client";
import { wishlistPageQuery, globalSEOQuery } from "pages/api/query";
import { WishlistSections } from "components/page/store/wishlist";
import { PreviewNoContent } from "components/PreviewNoContent";
import { PreviewProvider } from "components/list";
import { SEO } from "components/SEO";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, SeoTags } from "types";

interface WishListPageProps {
  draftMode: boolean;
  token: string;
  params: QueryParams;
  source: string;
  data: Data;
  seo?: SeoTags[];
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

interface DocumentProps {
  data: Data;
}

function WishlistPage({ data, draftMode, token, source }: WishListPageProps) {
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
            <DocumentWithPreview {...{ data }} />
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
function Document({ data }: DocumentProps) {
  const publishedData = data?.wishlistData?.[0];

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  return (
    <>
      {/*  Show page sections */}
      {data?.wishlistData?.[0] && <WishlistSections data={publishedData} />}
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
function DocumentWithPreview({ data }: DocumentProps) {
  const [previewDataEventSource] = useLiveQuery(data, wishlistPageQuery);
  const previewData: WishlistData =
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
      {data?.wishlistData && <WishlistSections data={previewData} />}
    </>
  );
}

export async function getStaticProps({
  draftMode = false,
  previewData = {},
}: any) {
  const client = getClient(draftMode ? apiReadToken : undefined);

  const [wishlistPage, globalSEO] = await Promise.all([
    client.fetch<SanityDocument>(wishlistPageQuery),
    client.fetch<SanityDocument>(globalSEOQuery),
  ]);

  // SEO tags
  const seo = SEO({
    data: {
      title: "Wishlist",
      type: wishlistPage?._type || "wishlistPage",
      route: "wishlist",
      ...wishlistPage,
    },
    defaultSeo: globalSEO,
  });

  if (!wishlistPage) {
    return {
      props: {
        draftMode,
        data: { wishlistData: null },
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
        wishlistData: wishlistPage,
      },
      seo,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export default React.memo(WishlistPage);
