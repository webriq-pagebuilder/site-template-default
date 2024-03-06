/** This component displays content for the PRODUCT page */

import React, { useEffect } from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { QueryParams, SanityDocument, groq } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import { getClient, apiReadToken } from "lib/sanity.client";
import { globalSEOQuery, productsQuery } from "pages/api/query";
import PageNotFound from "pages/404";
import { SEO, PreviewProvider } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import { PreviewNoContent } from "components/PreviewNoContent";
import { ProductSections } from "components/page/store/products";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CollectionProduct, CommonSections, DefaultSeoData } from "types";
import { addSEOJsonLd } from "components/SEO";

interface ProductPageBySlugProps {
  draftMode: boolean;
  token: string;
  params: QueryParams;
  source: string;
  data: Data;
  defaultSeo: DefaultSeoData;
}

interface Data {
  productData: ProductData;
}

export interface ProductData extends CollectionProduct {
  commonSections: CommonSections;
}

interface DocumentWithPreviewProps {
  data: Data;
  slug: string | string[];
  defaultSeo: DefaultSeoData;
}

function ProductPageBySlug({
  data,
  draftMode,
  params,
  token,
  source,
  defaultSeo,
}: ProductPageBySlugProps) {
  const slug = params?.slug;
  const showInlineEditor = source === "studio";

  useEffect(() => {
    if (typeof Ecwid !== "undefined") Ecwid.init();
  }, []);

  if (!data?.productData) {
    return <PageNotFound />;
  } else {
    if (draftMode) {
      return (
        <>
          <PreviewBanner />
          <PreviewProvider token={token}>
            <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
              <DocumentWithPreview {...{ data, slug, source, defaultSeo }} />
            </InlineEditorContextProvider>
          </PreviewProvider>
        </>
      );
    }

    return <Document {...{ data, defaultSeo }} />;
  }
}

/**
 *
 * @param {data} Data from getStaticProps based on current slug value
 *
 * @returns Document with published data
 */
function Document({
  data,
  defaultSeo,
}: {
  data: Data;
  defaultSeo: DefaultSeoData;
}) {
  const publishedData = data?.productData?.[0]; // latest published data in Sanity

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const {
    commonSections, // sections from Store > Commerce Pages > Products
    name, // product name
    seo, // product page SEO
    _type, // page type
  } = publishedData;

  const finalSEO = commonSections?.seo ?? seo;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: name,
            type: _type,
            route: publishedData?.slug,
            ...finalSEO,
          }}
          defaultSeo={defaultSeo}
        />
        <link rel="icon" href="../favicon.ico" />
        {/* Structured data (JSON-LD encoding) */}
        <script
          key={`${_type}-jsonld`}
          type="application/ld+json"
          dangerouslySetInnerHTML={addSEOJsonLd({
            seo: seo,
            type: _type,
            slug: publishedData?.slug,
            defaults: defaultSeo,
            pageData: publishedData,
          })}
        />
        <title>
          {seo?.seoTitle ??
            commonSections?.seo?.seoTitle ??
            name ??
            "WebriQ Studio"}
        </title>
      </Head>

      {/* Show Product page sections */}
      {data?.productData?.[0] && <ProductSections data={publishedData} />}
    </>
  );
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param slug page route
 * @param defaultSeo default values for SEO
 *
 * @returns Document with preview data
 */

function DocumentWithPreview({
  data,
  slug,
  defaultSeo,
}: DocumentWithPreviewProps) {
  const [previewDataEventSource] = useLiveQuery(data, productsQuery, { slug });
  const previewData = previewDataEventSource?.[0] || previewDataEventSource; // Latest preview data in Sanity

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const {
    commonSections, // sections from Store > Commerce Pages > Products
    name, // product name
    seo, // product page SEO
    _type, // page type
  } = previewData;

  const finalSEO = commonSections?.seo ?? seo;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: name,
            type: _type,
            route: previewData?.slug,
            ...finalSEO,
          }}
          defaultSeo={defaultSeo}
        />
        <link rel="icon" href="../favicon.ico" />
        {/* Structured data (JSON-LD encoding) */}
        <script
          key={`${_type}-jsonld`}
          type="application/ld+json"
          dangerouslySetInnerHTML={addSEOJsonLd({
            seo: seo,
            type: _type,
            slug: previewData?.slug,
            defaults: defaultSeo,
            pageData: previewData,
          })}
        />
        <title>{seo?.seoTitle ?? commonSections?.seo?.seoTitle ?? name}</title>
      </Head>

      {/* if no sections, show no sections only in preview */}
      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/* Show Product page sections */}
      {data?.productData?.[0] && <ProductSections data={previewData} />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  draftMode = false,
  previewData = {},
}: any) => {
  const client = getClient(draftMode ? apiReadToken : undefined);

  const [product, globalSEO] = await Promise.all([
    client.fetch<SanityDocument>(productsQuery, { slug: params.slug }),
    client.fetch<SanityDocument>(globalSEOQuery),
  ]);

  return {
    props: {
      draftMode,
      token: draftMode ? apiReadToken : "",
      params,
      source: (draftMode && previewData?.source) || "",
      data: {
        productData: product || null,
      },
      defaultSeo: globalSEO,
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const products = await getClient().fetch(
    groq`*[_type == "mainProduct" && defined(slug.current)][].slug.current`
  );

  return {
    paths: products.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export default React.memo(ProductPageBySlug);
