import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { homeQuery } from "./api/query";
import { getClient, usePreviewSubscription } from "../lib/sanity";
import NoPreview from "pages/no-preview";
import { Components, filterDataToSingleItem } from "./[slug]";

function Home({ data, preview }) {
  const router = useRouter();
  /*
   *  For new unpublished pages, return page telling user that the page needs to be published first before it can be previewed
   *  This prevents showing 404 page when the page is not published yet
   */
  if ((!router.isFallback && !data?.page) || data?.page?.hasNeverPublished) {
    return <NoPreview />;
  }

  let pageData;
  const { data: page } = usePreviewSubscription(homeQuery, {
    initialData: data,
    enabled: preview,
  });

  // for never published pages
  if (data?.page?.hasNeverPublished) {
    pageData = data?.page;
  } else {
    // for published pages and pages with unpublished edits
    pageData = page?.page?.[0] || page?.[0];
  }

  if (!pageData) {
    return null;
  }

  const { sections, title, seo } = pageData;

  return (
    <>
      <Head>
        <title>{seo?.seoTitle ?? title}</title>
      </Head>
      {sections?.map((section, index) => {
        const Component = Components[section._type];

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

export async function getStaticProps({ preview = false }) {
  const indexPage = await getClient(preview).fetch(homeQuery);

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
      data: { page },
    },
  };
}

export default React.memo(Home);
