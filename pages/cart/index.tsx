import React from "react";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { usePreview } from "lib/sanity.preview";
import { cartPageQuery, globalSEOQuery } from "pages/api/query";
import { CartSections } from "components/page/store/cart";
import { PreviewNoContent } from "components/PreviewNoContent";
import { filterDataToSingleItem } from "components/list";
import { SEO } from "components/SEO";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, SeoTags } from "types";

interface CartPageProps {
  data: Data;
  preview: boolean;
  token?: string;
  source?: string;
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

interface DocumentWithPreviewProps {
  data: Data;
  token: string;
}

function CartPage({ data, preview, token, source }: CartPageProps) {
  const showInlineEditor = source === "studio";

  if (preview) {
    return (
      <>
        <PreviewBanner />
        <PreviewSuspense fallback="Loading">
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
  const publishedData = data?.cartData;

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
function DocumentWithPreview({ data, token = null }: DocumentWithPreviewProps) {
  const previewDataEventSource = usePreview(token, cartPageQuery);
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
      {data?.cartData && <CartSections data={previewData} />}
    </>
  );
}

export async function getStaticProps({
  preview = false,
  previewData = {},
}: any): Promise<{ props: CartPageProps }> {
  const client =
    preview && previewData?.token
      ? getClient(preview).withConfig({ token: previewData.token })
      : getClient(false);

  const [cartPage, globalSEO] = await Promise.all([
    client.fetch(cartPageQuery),
    client.fetch(globalSEOQuery),
  ]);

  // pass page data and preview to helper function
  const cartData: CartData = filterDataToSingleItem(cartPage, preview);

  const data = { cartData };

  // SEO tags
  const seo = SEO({
    data: {
      title: "Cart",
      type: data?.cartData?._type || "cartPage",
      route: "cart",
      ...data?.cartData,
    },
    defaultSeo: globalSEO,
  });

  if (!cartData) {
    return {
      props: {
        preview,
        data: { cartData: null },
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

export default React.memo(CartPage);
