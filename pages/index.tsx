import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { QueryParams, SanityDocument } from "next-sanity";
import { useLiveQuery } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { token } from "lib/token";
import { homeQuery, globalSEOQuery } from "./api/query";
import { CommonPageData, DefaultSeoData } from "types";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { PreviewBanner } from "components/PreviewBanner";
import { PageSections } from "components/page";
import { PreviewNoContent } from "components/PreviewNoContent";
import SEO from "components/SEO";
import { addSEOJsonLd } from "components/SEO";

interface HomeProps {
  draftMode: boolean;
  token: string;
  params: QueryParams;
  source: string;
  data: Data;
  defaultSeo: DefaultSeoData;
}

interface DocumentProps {
  data: Data;
  defaultSeo: DefaultSeoData;
}

interface Data {
  pageData: PageData | null;
}

interface PageData extends CommonPageData {
  collections: any;
  slug: string | string[];
  title: string;
}

function Home({ draftMode, source, data, defaultSeo }: HomeProps) {
  const showInlineEditor = source === "studio";

  if (draftMode) {
    return (
      <>
        <PreviewBanner />
        <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
          <DocumentWithPreview {...{ data, defaultSeo }} />
        </InlineEditorContextProvider>
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
  const publishedData = data?.pageData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { title, _type, seo } = publishedData;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: title,
            type: _type,
            route: publishedData?.slug,
            ...seo,
          }}
          defaultSeo={defaultSeo}
        />
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
        <title>{seo?.seoTitle ?? title ?? "WebriQ Studio"}</title>
      </Head>

      {/*  Show page sections */}
      {data?.pageData && <PageSections data={publishedData} />}
    </>
  );
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param params object from getStaticProps
 * @param defaultSeo default values for SEO
 * @param source Source value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({ data, defaultSeo }: DocumentProps) {
  const [previewDataEventSource] = useLiveQuery(data, homeQuery);

  const previewData: PageData =
    previewDataEventSource?.[0] || previewDataEventSource;

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { title, _type, seo } = previewData;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: title,
            type: _type,
            route: previewData?.slug,
            ...seo,
          }}
          defaultSeo={defaultSeo}
        />
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
        <title>{seo?.seoTitle ?? title ?? "WebriQ Studio"}</title>
      </Head>

      {/* if no sections, show no sections only in preview */}

      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.pageData && <PageSections data={previewData} />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  draftMode = false,
  previewData = {},
}: any) => {
  const client = getClient(draftMode ? token : undefined);

  const [indexPage, globalSEO] = await Promise.all([
    client.fetch<SanityDocument>(homeQuery),
    client.fetch<SanityDocument>(globalSEOQuery),
  ]);

  return {
    props: {
      draftMode,
      token: draftMode ? token : "",
      source: (draftMode && previewData?.source) || "",
      data: {
        pageData: indexPage || null,
      },

      defaultSeo: globalSEO,
    },
  };
};

export default Home;
