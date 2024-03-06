import React from "react";
import Head from "next/head";
import { QueryParams, SanityDocument } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import { getClient, apiReadToken } from "lib/sanity.client";
import { cartPageQuery, globalSEOQuery } from "pages/api/query";
import { CartSections } from "components/page/store/cart";
import { PreviewNoContent } from "components/PreviewNoContent";
import { SEO, PreviewProvider } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, DefaultSeoData } from "types";

interface CartPageProps {
  draftMode: boolean;
  token: string;
  params: QueryParams;
  source: string;
  data: Data;
  defaultSeo: DefaultSeoData;
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
  defaultSeo: DefaultSeoData;
}

function CartPage({
  data,
  draftMode,
  token,
  source,
  defaultSeo,
}: CartPageProps) {
  const showInlineEditor = source === "studio";

  if (draftMode) {
    return (
      <>
        <PreviewBanner />
        <PreviewProvider token={token}>
          <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
            <DocumentWithPreview {...{ data, source, defaultSeo }} />
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
  const publishedData = data?.cartData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { seo, _type } = publishedData;

  return (
    <>
      <Head>
        <SEO
          data={{ pageTitle: "Cart", type: _type, route: "cart", ...seo }}
          defaultSeo={defaultSeo}
        />
        <title>{seo?.seoTitle ?? "Cart"}</title>
      </Head>

      {/*  Show page sections */}
      {data?.cartData && <CartSections data={publishedData} />}
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
  const [previewDataEventSource] = useLiveQuery(data, cartPageQuery);
  const previewData: CartData =
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
          data={{ pageTitle: "Cart", type: _type, route: "cart", ...seo }}
          defaultSeo={defaultSeo}
        />
        <title>{seo?.seoTitle ?? "Cart"}</title>
      </Head>

      {/* if no sections, show no sections only in preview */}

      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.cartData && <CartSections data={previewData} />}
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

  if (!cartPage) {
    return {
      props: {
        draftMode,
        data: { cartData: null },
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
        cartData: cartPage,
      },
      defaultSeo: globalSEO,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export default React.memo(CartPage);
