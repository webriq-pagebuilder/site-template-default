import React, { useEffect } from "react";
import Head from "next/head";
import { QueryParams, SanityDocument } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import { getClient, apiReadToken } from "lib/sanity.client";
import { wishlistPageQuery, globalSEOQuery } from "pages/api/query";
import { WishlistSections } from "components/page/store/wishlist";
import { PreviewNoContent } from "components/PreviewNoContent";
import { SEO, PreviewProvider } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, DefaultSeoData } from "types";

interface WishListPageProps {
  draftMode: boolean;
  token: string;
  params: QueryParams;
  source: string;
  data: Data;
  defaultSeo: DefaultSeoData;
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
  defaultSeo: DefaultSeoData;
}

function WishlistPage({
  data,
  draftMode,
  token,
  source,
  defaultSeo,
}: WishListPageProps) {
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
            <DocumentWithPreview {...{ data, defaultSeo }} />
          </InlineEditorContextProvider>
        </PreviewProvider>
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
function Document({ data, defaultSeo }: DocumentProps) {
  const publishedData = data?.wishlistData?.[0];

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { seo, _type } = publishedData;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: "Wishlist",
            type: _type,
            route: "wishlist",
            ...seo,
          }}
          defaultSeo={defaultSeo}
        />
        <title>{seo?.seoTitle ?? "Wishlist"}</title>
      </Head>

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
function DocumentWithPreview({ data, defaultSeo }: DocumentProps) {
  const [previewDataEventSource] = useLiveQuery(data, wishlistPageQuery);
  const previewData: WishlistData =
    previewDataEventSource?.[0] || previewDataEventSource;

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { seo, _type } = previewData;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: "Wishlist",
            type: _type,
            route: "wishlist",
            ...seo,
          }}
          defaultSeo={defaultSeo}
        />
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
  draftMode = false,
  previewData = {},
}: any) {
  const client = getClient(draftMode ? apiReadToken : undefined);

  const [wishlistPage, globalSEO] = await Promise.all([
    client.fetch<SanityDocument>(wishlistPageQuery),
    client.fetch<SanityDocument>(globalSEOQuery),
  ]);

  if (!wishlistPage) {
    return {
      props: {
        draftMode,
        data: { wishlistData: null },
        defaultSeo: globalSEO,
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
      defaultSeo: globalSEO,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export default React.memo(WishlistPage);
