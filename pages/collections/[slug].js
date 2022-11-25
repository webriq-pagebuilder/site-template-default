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
import { EcwidContextProvider } from "context/EcwidContext";

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
    seo, // collection page SEO
    sections, // sections from the Design field group tab of Collections page
    products, // array of products for this Collection
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
  // if we have "slotCollectionInfo" section, then we have the placeholder for the collections values
  let placeholderSection = sections?.map((section) => {
    // only need the dynamic_featuredProducts section from Store > Commerce Pages > Collections to match
    const getIndex = defaultSections?.findIndex((item) =>
      item?._type?.includes("dynamic_featuredProducts")
    );

    const newObj = {
      variant: sectionsToDisplay[getIndex]?.variant, // the selected variant for the featuredProducts from Store > Commerce Pages > Collections
      variants: {
        featured: products,
      }, // schema fields for the variant
    };

    // mutate sections array to add the collections details if the section is slotCollectionInfo
    if (section?._type === "slotCollectionInfo") {
      return { ...section, ...newObj };
    }
    // just return other sections as is
    return section;
  });

  if (placeholderSection) {
    const filtered = placeholderSection?.filter(
      (section) => section?._type !== "slotCollectionInfo"
    );

    if (filtered?.length !== 0) {
      sectionsToDisplay = placeholderSection;
    } else {
      // we only have featuredProducts section on the collection page so we merge this section with the sections in Store > Pages > Collections
      sectionsToDisplay = placeholderSection?.reduce(
        (defaultsArr, newArr) => {
          // only need the featuredProducts section from Store > Collections to match
          const getIndex = defaultSections?.findIndex((item) =>
            item?._type?.includes("featuredProducts")
          );

          // if there is a featuredProducts type section from Store > Commerce Pages > Collections, then replace with the slotCollectionInfo array
          if (getIndex !== -1) {
            defaultsArr[getIndex] = newArr;
          }

          // otherwise return the other sections defined
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
      {sectionsToDisplay &&
        sectionsToDisplay?.map((section, index) => {
          const sectionType =
            section?._type === "slotCollectionInfo" // for slotCollectionInfo, apply the variant templates of the featuredProducts section
              ? "featuredProducts"
              : section?._type; // otherwise, use the actual section type
          const Component = Components[sectionType];

          // skip rendering unknown components
          if (!Component) {
            return null;
          }

          return (
            <EcwidContextProvider key={index}>
              <Component
                template={{
                  bg: "gray",
                  color: "webriq",
                }}
                collection={{
                  name,
                }}
                data={section}
              />
            </EcwidContextProvider>
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
