import React from "react";
import Head from "next/head";
import { getClient } from "lib/sanity.client";
import { homeQuery } from "./api/query";
import { usePreview } from "lib/sanity.preview";
import { PageSections } from "components/page";
import { filterDataToSingleItem } from "components/list";

interface HomeProps {
  data: Data;
  preview: boolean;
  token?: string | null;
  source?: string;
}

interface DocumentWithPreviewProps {
  data: Data;
  token: string | null;
}

interface Data {
  pageData: PageData | null;
}

interface PageData extends CommonPageData {
  collections: any;
  slug: string | string[];
  title: string;
}

function Home({ data, preview, token, source }: HomeProps) {
  return <Document {...{ data }} />;
}

/**
 *
 * @param {data} Data from getStaticProps based on current slug value
 *
 * @returns Document with published data
 */
function Document({ data }: { data: Data }) {
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
      {data?.pageData && <PageSections data={publishedData} />}
    </>
  );
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param token Token value supplied via `/api/preview` route
 * @param source Source value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
// function DocumentWithPreview({ data, token = null }: DocumentWithPreviewProps) {
//   const previewDataEventSource = usePreview(token, homeQuery);

//   const previewData: PageData =
//     previewDataEventSource?.[0] || previewDataEventSource;

//   // General safeguard against empty data
//   if (!previewData) {
//     return null;
//   }

//   const { title, seo } = previewData;

//   return (
//     <>
//       <Head>
//         <meta name="viewport" content="width=260 initial-scale=1" />
//         <title>{seo?.seoTitle ?? title ?? "WebriQ Studio"}</title>
//       </Head>

//       {/* if no sections, show no sections only in preview */}

//       {(!previewData ||
//         !previewData?.sections ||
//         previewData?.sections?.length === 0) && <PreviewNoContent />}

//       {/*  Show page sections */}
//       {data?.pageData && <PageSections data={previewData} />}
//     </>
//   );
// }

export const getStaticProps = async ({
  preview = false,
  previewData = {},
}: any): Promise<{ props: HomeProps }> => {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const indexPage = await client.fetch(homeQuery);

  // pass page data and preview to helper function
  const pageData: PageData = filterDataToSingleItem(indexPage, preview);

  console.log({
    pageData: pageData?.sections?.map((i) => ({
      variant: i.variant,
      title: i.title,
      type: i._type,
    })),
  });

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
      token: (preview && previewData.token) || "",
      source: (preview && previewData.source) || "",
      data: { pageData },
    },
  };
};

export default Home;
