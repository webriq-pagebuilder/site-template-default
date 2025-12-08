import React, { Suspense, useEffect } from "react";
import { getClient } from "@/lib/sanity.client";
import { usePreview } from "@/lib/sanity.preview";
import { wishlistPageQuery, globalSEOQuery } from "@/pages/api/query";
import { WishlistSections } from "@/components/page/store/wishlist";
import { PreviewNoContent } from "@/components/PreviewNoContent";
import PageNotFound from "@/pages/404";
import { filterDataToSingleItem } from "@/components/list";
import { SEO } from "@/components/SEO";
import { PreviewBanner } from "@/components/PreviewBanner";
import { PreviewProvider } from "@/components/PreviewProvider";
import InlineEditorContextProvider from "@/context/InlineEditorContext";
import { CommonPageData, SeoTags } from "@/types";

interface WishListPageProps {
  data: Data;
  preview: boolean;
  token?: string;
  source?: string;
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

interface DocumentWithPreviewProps {
  data: Data;
  token: string;
}

function WishlistPage({ data, preview, token, source }: WishListPageProps) {
  const showInlineEditor = source === "studio";
  useEffect(() => {
    if (typeof Ecwid !== "undefined") {
      window.Ecwid.init();
    }
  }, []);

  if (!data?.wishlistData) {
    return <PageNotFound />;
  } else {
    if (preview) {
      return (
        <>
          <PreviewBanner />
          <PreviewProvider token={token || ""}>
            <Suspense fallback={"Loading..."}>
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
  const publishedData = data?.wishlistData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  return data?.wishlistData && <WishlistSections data={publishedData} />;
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param token Token value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({ data, token = null }: DocumentWithPreviewProps) {
  const [previewDataEventSource] = usePreview(data?.wishlistData, wishlistPageQuery);
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
  preview = false,
  previewData = {},
}: any): Promise<{ props: WishListPageProps }> {
  const client =
    preview && previewData?.token
      ? getClient(preview).withConfig({ token: previewData.token })
      : getClient(false);

  const [wishlistPage, globalSEO] = await Promise.all([
    client.fetch(wishlistPageQuery),
    client.fetch(globalSEOQuery),
  ]);

  // pass page data and preview to helper function
  const wishlistData = filterDataToSingleItem(wishlistPage, preview);

  const data = { wishlistData };

  const seo = SEO({
    data: {
      title: "Wishlist",
      type: data?.wishlistData?._type,
      route: "wishlist",
      ...data?.wishlistData,
    },
    defaultSeo: globalSEO,
  });

  if (!wishlistData) {
    return {
      props: {
        preview,
        data: { wishlistData: null },
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

export default React.memo(WishlistPage);
