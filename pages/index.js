import React, { lazy, Suspense, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { homeQuery } from "./api/query";
import { getClient } from "lib/sanity.server";
import { sanityConfig } from "lib/config";
import NoPreview from "pages/no-preview";
import { Components, filterDataToSingleItem } from "./[slug]";

const PreviewMode = lazy(() => import("next-sanity/preview"));

function Home({ data: initialData = {}, preview, token }) {
  console.log("🚀 ~ file: index.js ~ line 12 ~ Home ~ data", initialData);

  const router = useRouter();
  const [data, setData] = useState(initialData);

  const pageData = data?.page || data?.[0];
  const slug = pageData?.slug;

  /*
   *  For new unpublished pages, return page telling user that the page needs to be published first before it can be previewed
   *  This prevents showing 404 page when the page is not published yet
   */
  if (
    ((!router.isFallback && !data?.page) || data?.page?.hasNeverPublished) &&
    !preview
  ) {
    return <NoPreview />;
  }

  if (!pageData) {
    return null;
  }

  const { sections, title, seo } = pageData;

  return (
    <>
      {preview && slug && (
        <Suspense fallback={null}>
          <PreviewMode
            projectId={sanityConfig.projectId}
            dataset={sanityConfig.dataset}
            initial={initialData}
            query={homeQuery}
            onChange={setData}
            token={token}
          />
        </Suspense>
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
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);
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
