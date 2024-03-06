/** This component displays content for the COLLECTIONS page */

import React, { useEffect } from "react";
import Head from "next/head";
import { QueryParams, SanityDocument, groq } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import { getClient, apiReadToken } from "lib/sanity.client";
import { collectionsQuery, globalSEOQuery } from "pages/api/query";
import PageNotFound from "pages/404";
import { SEO, PreviewProvider } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import { PreviewNoContent } from "components/PreviewNoContent";
import { CollectionSections } from "components/page/store/collections";
import InlineEditorContextProvider from "context/InlineEditorContext";

import {
  CommonPageData,
  CommonSections,
  CollectionProduct,
  DefaultSeoData,
} from "types";

interface CollectionPageBySlugProps {
  draftMode: boolean;
  token: string;
  params: QueryParams;
  source: string;
  data: Data;
  defaultSeo: DefaultSeoData;
}
interface Data {
  collectionData: CollectionData;
}

export interface CollectionData extends CommonPageData {
  collectionInfoVariant?: {
    variant?: string;
  };
  commonSections?: CommonSections | null;
  products?: CollectionProduct[] | null;
  slug?: string | null;
  name?: string | null;
}

interface DocumentWithPreviewProps {
  data: Data;
  slug: string | string[];
  defaultSeo: DefaultSeoData;
}

function CollectionPageBySlug({
  data,
  draftMode,
  params,
  token,
  source,
  defaultSeo,
}: CollectionPageBySlugProps) {
  const slug = params?.slug;
  const showInlineEditor = source === "studio";

  useEffect(() => {
    if (typeof Ecwid !== "undefined") Ecwid.init();
  }, []);

  if (!data?.collectionData) {
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
  const publishedData = data?.collectionData; // latest published data in Sanity

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const {
    commonSections, // sections from Store > Pages > Collections
    name, // collection name
    seo, // collection page SEO
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
        <title>
          {seo?.seoTitle ??
            commonSections?.seo?.seoTitle ??
            name ??
            "WebriQ Studio"}
        </title>
      </Head>

      {/* Show Product page sections */}
      {data?.collectionData?.[0] && <CollectionSections data={publishedData} />}
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
  const [previewDataEventSource] = useLiveQuery(data, collectionsQuery, {
    slug,
  });
  const previewData = previewDataEventSource?.[0] || previewDataEventSource; // Latest preview data in Sanity

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const {
    commonSections, // sections from Store > Pages > Collections
    name, // collection name
    seo, // collection page SEO
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
      {data?.collectionData?.[0] && <CollectionSections data={previewData} />}
    </>
  );
}

export async function getStaticProps({
  params,
  draftMode = false,
  previewData = {},
}: any) {
  const client = getClient(draftMode ? apiReadToken : undefined);

  const [collections, globalSEO] = await Promise.all([
    client.fetch<SanityDocument>(collectionsQuery, { slug: params.slug }),
    client.fetch<SanityDocument>(globalSEOQuery),
  ]);

  return {
    props: {
      draftMode,
      token: draftMode ? apiReadToken : "",
      params,
      source: (draftMode && previewData?.source) || "",
      data: {
        collectionData: collections || null,
      },
      defaultSeo: globalSEO,
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

  const collections = await getClient().fetch(
    groq`*[_type == "mainCollection" && defined(slug.current)][].slug.current`
  );

  return { paths: collections, fallback: true };
}

export default React.memo(CollectionPageBySlug);
