/** This component displays content for the PRODUCT page */

import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { QueryParams, SanityDocument, groq } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import { getClient, apiReadToken } from "lib/sanity.client";
import { globalSEOQuery, productsQuery } from "pages/api/query";
import PageNotFound from "pages/404";
import { PreviewProvider } from "components/list";
import { SEO, addSEOJsonLd } from "components/SEO";
import { PreviewBanner } from "components/PreviewBanner";
import { PreviewNoContent } from "components/PreviewNoContent";
import { ProductSections } from "components/page/store/products";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CollectionProduct, CommonSections, SeoTags, SeoSchema } from "types";

interface ProductPageBySlugProps {
  draftMode: boolean;
  token: string;
  params: QueryParams;
  source: string;
  data: Data;
  seo?: SeoTags[];
  seoSchema?: SeoSchema;
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
}

function ProductPageBySlug({
  data,
  draftMode,
  params,
  token,
  source,
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
              <DocumentWithPreview {...{ data, slug, source }} />
            </InlineEditorContextProvider>
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
  const publishedData = data?.productData?.[0]; // latest published data in Sanity

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  return (
    <>
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

function DocumentWithPreview({ data, slug }: DocumentWithPreviewProps) {
  const [previewDataEventSource] = useLiveQuery(data, productsQuery, { slug });
  const previewData = previewDataEventSource?.[0] || previewDataEventSource; // Latest preview data in Sanity

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

  // SEO tags
  const seo = SEO({
    data: {
      title: product?.title || "StackShift | Product page",
      type: product?._type || "mainProduct",
      route: `products/${params.slug}`,
      ...product,
    },
    defaultSeo: globalSEO,
  });

  // Structured data (JSON-LD encoding)
  const seoSchema = {
    key: `${product?._type}-jsonld`,
    innerHTML: addSEOJsonLd({
      seo: seo,
      type: product?._type,
      defaults: globalSEO,
      slug: params?.slug,
      pageData: product,
    }),
  };

  return {
    props: {
      draftMode,
      token: draftMode ? apiReadToken : "",
      params,
      source: (draftMode && previewData?.source) || "",
      data: {
        productData: product || null,
      },
      seo,
      seoSchema,
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
    groq`*[_type == "mainProduct" && !(_id in path("drafts.**")) && defined(slug.current)][].slug.current`
  );

  return {
    paths: products.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

export default React.memo(ProductPageBySlug);
