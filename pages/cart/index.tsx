import React from "react";
import Head from "next/head";
import { QueryParams, SanityDocument } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import { getClient, apiReadToken } from "lib/sanity.client";
import { cartPageQuery, globalSEOQuery } from "pages/api/query";
import { CartSections } from "components/page/store/cart";
import { SEO } from "components/SEO";
import { PreviewNoContent } from "components/PreviewNoContent";
import { PreviewProvider } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, SeoTags } from "types";

interface CartPageProps {
  draftMode: boolean;
  token: string;
  params: QueryParams;
  source: string;
  data: Data;
  seo?: SeoTags[];
}

interface Data {
  cartData: CartData;
}
export interface CartData extends CommonPageData {
  cartSectionVariant?: {
    variant: string;
    _type: string;
  };
  id?: string;
}

interface DocumentProps {
  data: Data;
}

function CartPage({ data, draftMode, token, source }: CartPageProps) {
  const showInlineEditor = source === "studio";

  if (draftMode) {
    return (
      <>
        <PreviewBanner />
        <PreviewProvider token={token}>
          <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
            <DocumentWithPreview {...{ data, source }} />
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
  const publishedData = data?.cartData?.[0];

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  return data?.cartData && <CartSections data={publishedData} />;
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param token Token value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({ data }: DocumentProps) {
  const [previewDataEventSource] = useLiveQuery(data, cartPageQuery);
  const previewData: CartData =
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
      {data?.cartData?.[0] && <CartSections data={previewData} />}
    </>
  );
}

export async function getStaticProps({
  draftMode = false,
  previewData = {},
}: any) {
  const client = getClient(draftMode ? apiReadToken : undefined);

  const [cartPage, globalSEO] = await Promise.all([
    client.fetch<SanityDocument>(cartPageQuery),
    client.fetch<SanityDocument>(globalSEOQuery),
  ]);

  // SEO tags
  const seo = SEO({
    data: {
      title: "Cart",
      type: cartPage?._type || "cartPage",
      route: "cart",
      ...cartPage,
    },
    defaultSeo: globalSEO,
  });

  if (!cartPage) {
    return {
      props: {
        draftMode,
        data: { cartData: null },
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
        cartData: cartPage,
      },
      seo,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export default React.memo(CartPage);
