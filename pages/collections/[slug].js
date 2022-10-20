/** This component displays content for the COLLECTIONS page */

import React, { lazy, Suspense, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { collectionsQuery } from "pages/api/query";
import { Components, filterDataToSingleItem } from "../[slug]";
import PageNotFound from "pages/404";
import NoPreview from "pages/no-preview";
import { sanityConfig } from "lib/config";
import { getClient, sanityClient } from "lib/sanity.server";

const PreviewMode = lazy(() => import("next-sanity/preview"));

function CollectionPage({ data: initialData = {}, preview, token }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const collectionData = data?.collections || data?.[0];
  const slug = collectionData?.slug;

  if (!router.isFallback && !slug) {
    return <PageNotFound />;
  }

  if (!collectionData) {
    return null;
  }

  const {
    defaultSections, // sections from Store > Pages > Collections
    name, // collection name
    collectionSections, // sections from the Collection page
    seo, // collection page SEO
  } = collectionData;

  /*
   *  For new unpublished pages, return page telling user that the page needs to be published first before it can be previewed
   *  This prevents showing 404 page when the page is not published yet
   */
  if (
    !collectionData?.hasUnpublishedEdits &&
    collectionData?._id?.includes("drafts") &&
    !preview
  ) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=260 initial-scale=1" />
          <title>Unpublished Page</title>
        </Head>
        <NoPreview />
      </>
    );
  }

  let sectionsToDisplay = defaultSections;

  if (collectionSections) {
    const filtered = collectionSections?.filter(
      (section) => section?._type !== "featuredProducts"
    );

    if (filtered?.length !== 0) {
      sectionsToDisplay = collectionSections;
    } else {
      // we only have featuredProducts section on the collection page so we merge this section with the sections in Store > Pages > Collections
      sectionsToDisplay = collectionSections?.reduce(
        (defaultsArr, newArr) => {
          // only need the featuredProducts section from Store > Collections to match
          const getIndex = defaultSections?.findIndex((item) =>
            item?._type?.includes("featuredProducts")
          );

          if (getIndex !== -1) {
            defaultsArr[getIndex] = newArr;
          }

          return defaultsArr;
        },
        [...defaultSections]
      );
    }
  }

  return (
    <>
      {preview && slug && (
        <Suspense fallback={null}>
          <PreviewMode
            projectId={sanityConfig.projectId}
            dataset={sanityConfig.dataset}
            initial={initialData}
            query={collectionsQuery}
            onChange={setData}
            token={token}
            params={{ slug }}
          />
        </Suspense>
      )}
      <Head>
        <meta
          name="viewport"
          content="width=360 initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="../favicon.ico" />
        <title>{seo?.seoTitle ?? name}</title>
      </Head>
      {sectionsToDisplay?.map((section, index) => {
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
            collection={{
              name,
            }}
            data={section}
          />
        );
      })}
    </>
  );
}

export async function getStaticProps({
  params,
  preview = false,
  previewData = {},
}) {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const collections = await client.fetch(collectionsQuery, {
    slug: params.slug,
  });

  // pass collections data and preview to helper function
  const singleCollectionsData = filterDataToSingleItem(collections, preview);

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      data: {
        collections: singleCollectionsData || null,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export async function getStaticPaths() {
  const collections = await sanityClient.fetch(
    groq`*[_type == "mainCollection" && defined(slug.current)][].slug.current`
  );

  return {
    paths: collections.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default React.memo(CollectionPage);
