import React from "react";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { homeQuery, globalSEOQuery } from "pages/api/query";
import { filterDataToSingleItem } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, DefaultSeoData } from "types";
import { Document } from "components/page/Document";
import { DocumentWithPreview } from "components/page/DocumentWithPreview";

interface HomeProps {
  data: Data;
  preview: boolean;
  token?: string | null;
  source?: string;
  defaultSeo: DefaultSeoData;
}

export interface DocumentWithPreviewProps {
  data: Data;
  token: string | null;
  defaultSeo: DefaultSeoData;
}

export interface Data {
  pageData: PageData | null;
}

export interface PageData extends CommonPageData {
  collections: any;
  slug: string | string[];
  title: string;
}

function Home({ data, preview, token, source, defaultSeo }: HomeProps) {
  const showInlineEditor = source === "studio";

  if (preview) {
    return (
      <>
        <PreviewBanner />
        <PreviewSuspense fallback="Loading...">
          <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
            <DocumentWithPreview {...{ data, token, defaultSeo }} />
          </InlineEditorContextProvider>
        </PreviewSuspense>
      </>
    );
  }

  return <Document {...{ data, defaultSeo }} />;
}

export const getStaticProps = async ({
  preview = false,
  previewData = {},
}: any): Promise<{ props: HomeProps }> => {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const [indexPage, globalSEO] = await Promise.all([
    client.fetch(homeQuery),
    client.fetch(globalSEOQuery),
  ]);

  // pass page data and preview to helper function
  const pageData: PageData = filterDataToSingleItem(indexPage, preview);

  // if our query failed, then return null to display custom no-preview page
  if (!pageData) {
    return {
      props: {
        preview,
        data: { pageData: null },
        defaultSeo: globalSEO,
      },
    };
  }

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData.source) || "",
      data: { pageData },
      defaultSeo: globalSEO,
    },
  };
};

export default Home;
