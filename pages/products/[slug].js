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
import { filterDataToSingleItem } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import { PreviewNoContent } from "components/PreviewNoContent";
import { ProductSections } from "components/page/store/products";
import { EcwidContextProvider } from "context/EcwidContext";

function ProductPageBySlug({ data, preview, token }) {
  const router = useRouter();
  const slug = router.query.slug;

  useEffect(() => {
    if (typeof Ecwid !== "undefined") Ecwid.init();
  }, []);

  if (!data?.productData || data?.productData?.length === 0) {
    return <PageNotFound />;
  } else {
    if (preview) {
      return (
        <>
          <PreviewBanner />
          <PreviewSuspense>
            <DocumentWithPreview {...{ data, token: token || null, slug }} />
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
function Document({ data }) {
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
      <EcwidContextProvider>
        {data?.productData && <ProductSections data={publishedData} />}
      </EcwidContextProvider>
    </>
  );
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param slug Slug value from getStaticProps
 * @param token Token value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({ data, slug, token = null }) {
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
      <EcwidContextProvider>
        {data?.productData && <ProductSections data={previewData} />}
      </EcwidContextProvider>
    </>
  );
}

export async function getStaticProps({
  params,
  preview = false,
  previewData = {},
}) {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const products = await client.fetch(productsQuery, { slug: params.slug });

  // pass products data and preview to helper function
  const singleProductsData = filterDataToSingleItem(products, preview);

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      data: {
        productData: singleProductsData || null,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export async function getStaticPaths() {
  const products = await sanityClient.fetch(
    groq`*[_type == "mainProduct" && defined(slug.current)][].slug.current`
  );

  return {
    paths: products.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default React.memo(ProductPageBySlug);
