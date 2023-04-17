import React from "react";
import Head from "next/head";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { homeQuery } from "./api/query";
import { usePreview } from "lib/sanity.preview";
import { PageSections } from "components/page";
import { PreviewNoContent } from "components/PreviewNoContent";
import { filterDataToSingleItem } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import { GetStaticPropsContext } from "next";

import { PageDataProps } from "types";

interface HomeProps {
  data: DataProps;
  preview?: any;
  token: string;
  source: string;
}

interface DataProps {
  pageData: PageDataProps;
}

const Home = ({ data, preview, token, source }: HomeProps) => {
  if (preview) {
    return (
      <>
        <PreviewBanner />
        <PreviewSuspense fallback="Loading...">
          <DocumentWithPreview {...{ data, token, source }} />
        </PreviewSuspense>
      </>
    );
  }

  return <Document {...{ data }} />;
};

/**
 *
 * @param {data} Data from getStaticProps based on current slug value
 *
 * @returns Document with published data
 */
const Document = ({ data }: { data: DataProps }) => {
  const publishedData = data?.pageData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { title, seo } = publishedData;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
        <title>{seo?.seoTitle ?? title ?? "WebriQ Studio"}</title>
      </Head>

      {/*  Show page sections */}
      {data?.pageData && (
        <PageSections enableInlineEditing={false} data={publishedData} />
      )}
    </>
  );
};

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param token Token value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
const DocumentWithPreview = ({ data, token = null, source }: HomeProps) => {
  const previewDataEventSource = usePreview(token, homeQuery);

  const previewData: PageDataProps =
    previewDataEventSource?.[0] || previewDataEventSource;
  const enableInlineEditing = source === "studio";

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { title, seo } = previewData;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
        <title>{seo?.seoTitle ?? title ?? "WebriQ Studio"}</title>
      </Head>

      {/* if no sections, show no sections only in preview */}

      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.pageData && (
        <PageSections
          data={previewData}
          enableInlineEditing={enableInlineEditing}
        />
      )}
    </>
  );
};

export const getStaticProps = async ({
  preview = false,
  previewData = {},
}: any) => {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const indexPage = await client.fetch(homeQuery);

  // pass page data and preview to helper function
  const pageData = filterDataToSingleItem(indexPage, preview);

  // if our query failed, then return null to display custom no-preview page
  if (!pageData) {
    return {
      props: {
        preview,
        data: { pageData: null },
      },
    };
  }

  return {
    props: {
      preview,
      source: (preview && previewData.source) || "",
      token: (preview && previewData.token) || "",
      data: { pageData },
    },
  };
};

export default Home;
