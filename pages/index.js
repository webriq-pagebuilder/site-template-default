import React, { lazy } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PreviewSuspense } from "next-sanity/preview";
import { client } from "lib/sanity.client";
import { homeQuery } from "./api/query";
import NoPreview from "pages/no-preview";
import { Components, filterDataToSingleItem } from "./[slug]";

const PreviewPage = lazy(() => import("component/PreviewPage"));

function Home({ data, preview, token }) {
  const router = useRouter();

  const pageData = data || data?.[0];

  /*
   *  For new unpublished pages, return page telling user that the page needs to be published first before it can be previewed
   *  This prevents showing 404 page when the page is not published yet
   */
  if (((!router.isFallback && !data) || data?.hasNeverPublished) && !preview) {
    return <NoPreview />;
  }

  if (!pageData) {
    return null;
  }

  const { sections, title, seo } = pageData;

  return (
    <>
      {preview && (
        <PreviewSuspense fallback="Loading...">
          <PreviewPage token={token} slug="/" />
        </PreviewSuspense>
      )}
      <Head>
        <title>{seo?.seoTitle ?? title}</title>
      </Head>
      {sections?.map((section, index) => {
        const Component = Components?.[section?._type];

        // skip rendering unknown components
        if (!Component) {
          return null;
        }

        return (
          <Component
            key={index}
            template={{
              bg: "gray",
              color: "webriq",
            }}
            data={section}
          />
        );
      })}
    </>
  );
}

export async function getStaticProps({ preview = false, previewData = {} }) {
  const indexPage = await client.fetch(homeQuery);

  // pass page data and preview to helper function
  const page = filterDataToSingleItem(indexPage, preview);

  // if our query failed, then return null to display custom no-preview page
  if (!page) {
    return {
      props: {
        preview,
        data: { page: null },
      },
    };
  }

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      data: { page },
    },
  };
}

export default React.memo(Home);
