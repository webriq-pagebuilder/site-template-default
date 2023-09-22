/** This component displays content for the PRODUCT page */

import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { PreviewSuspense } from "next-sanity/preview";
import { sanityClient, getClient } from "lib/sanity.client";
import { usePreview } from "lib/sanity.preview";
import { productsQuery } from "pages/api/query";
import PageNotFound from "pages/404";
import { filterDataToSingleItem } from "helpers/filterDataToSingleItem";
import { PreviewBanner } from "components/PreviewBanner";
import { PreviewNoContent } from "components/PreviewNoContent";
import { ProductSections } from "components/page/store/products";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CollectionProduct, CommonSections } from "types";

interface ProductPageBySlugProps {
  data: Data;
  preview: boolean;
  token: string;
  source: string;
}

interface Data {
  productData: ProductData;
}

export interface ProductData extends CollectionProduct {
  commonSections: CommonSections;
}

interface DocumentWithPreviewProps {
  data: Data;
  token: string;
  slug: string | string[];
}

function ProductPageBySlug({
  data,
  preview,
  token,
  source,
}: ProductPageBySlugProps) {
  const router = useRouter();
  const slug = router.query.slug;
  const showInlineEditor = source === "studio";
  useEffect(() => {
    if (typeof Ecwid !== "undefined") Ecwid.init();
  }, []);

  if (!data?.productData) {
    return <PageNotFound />;
  } else {
    if (preview) {
      return (
        <>
          <PreviewBanner />
          <PreviewSuspense fallback={"Loading..."}>
            <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
              <DocumentWithPreview {...{ data, token: token || null, slug }} />
            </InlineEditorContextProvider>
          </PreviewSuspense>
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
  const publishedData = data?.productData; // latest published data in Sanity

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const {
    commonSections, // sections from Store > Commerce Pages > Products
    name, // product name
    seo, // product page SEO
  } = publishedData;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=360 initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="../favicon.ico" />
        <title>
          {seo?.seoTitle ??
            commonSections?.seo?.seoTitle ??
            name ??
            "WebriQ Studio"}
        </title>
      </Head>

      {/* Show Product page sections */}
      {data?.productData && <ProductSections data={publishedData} />}
    </>
  );
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param slug Slug value from getStaticProps
 * @param token Token value supplied via `/api/preview` route
 * @param source Source value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({
  data,
  slug,
  token = null,
}: DocumentWithPreviewProps) {
  // Current drafts data in Sanity
  const previewDataEventSource = usePreview(token, productsQuery, { slug });
  const previewData = previewDataEventSource?.[0] || previewDataEventSource; // Latest preview data in Sanity

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const {
    commonSections, // sections from Store > Commerce Pages > Products
    name, // product name
    seo, // product page SEO
  } = previewData;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=360 initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="../favicon.ico" />
        <title>
          {seo?.seoTitle ??
            commonSections?.seo?.seoTitle ??
            name ??
            "WebriQ Studio"}
        </title>
      </Head>

      {/* if no sections, show no sections only in preview */}
      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/* Show Product page sections */}
      {data?.productData && <ProductSections data={previewData} />}
    </>
  );
}

export async function getStaticProps({
  params,
  preview = false,
  previewData = {},
}: any): Promise<{ props: ProductPageBySlugProps; revalidate: number }> {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const products = await client.fetch(productsQuery, { slug: params.slug });

  // pass products data and preview to helper function
  const singleProductsData: ProductData = filterDataToSingleItem(
    products,
    preview
  );

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData.source) || "",
      data: {
        productData: singleProductsData || null,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const products = await sanityClient.fetch(
    groq`*[_type == "mainProduct" && defined(slug.current)][].slug.current`
  );

  return {
    paths: products.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default React.memo(ProductPageBySlug);
