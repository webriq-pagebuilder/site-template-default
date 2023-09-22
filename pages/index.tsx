import React from "react";
import { getClient } from "lib/sanity.client";
import { homeQuery } from "./api/query";
import { filterDataToSingleItem } from "helpers/filterDataToSingleItem";
import { Document } from "components/page/Document";
import type { CommonPageData } from "types";

interface HomeProps {
  data: Data;
  preview: boolean;
  token?: string | null;
  source?: string;
}

export interface DocumentWithPreviewProps {
  data: Data;
  token: string | null;
}

export interface Data {
  pageData: PageData | null;
}

export interface PageData extends CommonPageData {
  collections: any;
  slug: string | string[];
  title: string;
}

function Home({ data, preview, token, source }: HomeProps) {
  return <Document {...{ data }} />;
}

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
      data: {
        // pageData: { ...pageData, sections: pageData.sections?.slice(0, 2) },
        pageData,
      },
    },
  };
};

export default Home;
