import React from "react";
import Head from "next/head";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { usePreview } from "lib/sanity.preview";
import { cartPageQuery } from "pages/api/query";
import { CartSections } from "components/page/store/cart";
import { PreviewNoContent } from "components/PreviewNoContent";
import { filterDataToSingleItem } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import { TPageData } from "types";

interface CartPageProps {
  data?: {
    cartData?: CartData;
  };
  preview?: boolean | null;
  token?: string | null;
  source?: string | null;
}

interface CartData extends TPageData {
  cartSectionVariant?: {
    variant: string;
    _type: string;
  };
}

function CartPage({ data, preview, token, source }: CartPageProps) {
  console.log(data);

  if (preview) {
    return (
      <>
        <PreviewBanner />
        <PreviewSuspense fallback="Loading">
          <DocumentWithPreview {...{ data, token, source }} />
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
function Document({ data }: CartPageProps) {
  const publishedData = data?.cartData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { seo } = publishedData;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
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
function DocumentWithPreview({ data, token = null, source }: CartPageProps) {
  const previewDataEventSource = usePreview(token, cartPageQuery);
  const previewData: CartData =
    previewDataEventSource?.[0] || previewDataEventSource;

  const enableInlineEditing = source === "studio";

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { seo } = previewData;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
        <title>{seo?.seoTitle ?? "Cart"}</title>
      </Head>

      {/* if no sections, show no sections only in preview */}

      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.cartData && (
        <CartSections
          data={previewData}
          enableInlineEditing={enableInlineEditing}
        />
      )}
    </>
  );
}

export async function getStaticProps({
  preview = false,
  previewData = {},
}: any) {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const cartPage = await client.fetch(cartPageQuery);
  // pass page data and preview to helper function
  const cartData: CartData = filterDataToSingleItem(cartPage, preview);

  if (!cartData) {
    return {
      props: {
        preview,
        data: { cartData: null },
      },
    };
  }

  return {
    props: {
      preview,
      source: (preview && previewData.source) || "",
      token: (preview && previewData.token) || "",
      data: { cartData },
    },
  };
}

export default React.memo(CartPage);
