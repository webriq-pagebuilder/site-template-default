import React, { lazy, Suspense, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { sanityConfig } from "lib/config";
import { getClient } from "lib/sanity.server";
import { searchPageQuery } from "pages/api/query";
import NoPreview from "pages/no-preview";
import { Components, filterDataToSingleItem } from "../[slug]";

const PreviewMode = lazy(() => import("next-sanity/preview"));

function SearchPage({ data: initialData = {}, preview, token }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const searchPageData = data?.search || data?.[0];
  const slug = "search";

  /*
   *  For new unpublished pages, return page telling user that the page needs to be published first before it can be previewed
   *  This prevents showing 404 page when the page is not published yet
   */
  if (
    ((!router.isFallback && !data?.search) ||
      data?.search?.hasNeverPublished) &&
    !preview
  ) {
    return <NoPreview />;
  }

  if (!searchPageData) {
    return null;
  }

  const { sections, seo } = searchPageData;

  return (
    <>
      {preview && slug && (
        <Suspense fallback={null}>
          <PreviewMode
            projectId={sanityConfig.projectId}
            dataset={sanityConfig.dataset}
            initial={initialData}
            query={searchPageQuery}
            onChange={setData}
            token={token}
            params={{ slug }}
          />
        </Suspense>
      )}
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
        <title>{seo?.seoTitle || "Search"}</title>
      </Head>
      {sections &&
        sections?.map((section, index) => {
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

export async function getStaticProps({ preview = false, previewData = {} }) {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const searchPage = await client.fetch(searchPageQuery);

  // pass page data and preview to helper function
  const singlePageData = filterDataToSingleItem(searchPage, preview);

  if (!singlePageData) {
    return {
      props: {
        preview,
        data: { search: null },
      },
    };
  }

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      data: {
        search: singlePageData || null,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export default React.memo(SearchPage);
