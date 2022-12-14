/** This component displays content for the COLLECTIONS page */

import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { collectionsQuery } from "pages/api/query";
import { Components, filterDataToSingleItem } from "components/list";
import PageNotFound from "pages/404";
import NoPreview from "pages/no-preview";
import { sanityClient, getClient } from "lib/sanity.client";
import { EcwidContextProvider } from "context/EcwidContext";

function CollectionPage({ data, preview, token }) {
  const router = useRouter();

  const collectionData = data?.collections || data?.[0];
  const slug = collectionData?.slug;

  useEffect(() => {
    if (typeof Ecwid !== "undefined") Ecwid.init();
  }, []);

  if (!router.isFallback && !slug) {
    return <PageNotFound />;
  }

  if (!collectionData) {
    return null;
  }

  const {
    commonSections, // sections from Store > Pages > Collections
    name, // collection name
    seo, // collection page SEO
    sections, // sections from the Design field group tab of Collections page
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

  let sectionsToDisplay = commonSections?.sections;

  if (sections) {
    const filtered = sections?.filter(
      (section) => section?._type !== "slotCollectionInfo"
    );

    if (filtered?.length !== 0) {
      sectionsToDisplay = sections;
    } else {
      // we only have featuredProducts section on the collection page so we merge this section with the sections in Store > Pages > Collections
      sectionsToDisplay = sections?.reduce(
        (defaultsArr, newArr) => {
          // only need the featuredProducts section from Store > Collections to match
          const getIndex = commonSections?.sections?.findIndex((item) =>
            item?._type?.includes("slotCollectionInfo")
          );

          // if the variant from the Store > Collections page is a "defaultVariant", then replace it with the variant of Store > Commerce Pages > Collections "slotCollectionInfo"
          if (newArr?.variant === "defaultVariant") {
            newArr.variant = defaultsArr[getIndex]?.variant;
          }

          // if there is a "slotCollectionInfo" section in Store > Commerce Pages > Collections, then replace it with the "slotCollectionInfo" of Store > Collections section
          if (getIndex !== -1) {
            defaultsArr[getIndex] = newArr;
          }

          // otherwise return the other sections defined
          return defaultsArr;
        },
        [...commonSections?.sections]
      );
    }
  }

  // TODO: ADD CODE BLOCK IF PREVIEW IS TRUE

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=360 initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="../favicon.ico" />
        <title>{seo?.seoTitle ?? commonSections?.seo?.seoTitle ?? name}</title>
      </Head>
      {sectionsToDisplay &&
        sectionsToDisplay?.map((section, index) => {
          const sectionType =
            section?._type === "slotCart" // for slotCart, apply the variant templates of the cart section
              ? "cartSection"
              : section?._type === "slotWishlist" // for slotWishlist, apply the variant templates of the wishlist section
              ? "wishlistSection"
              : section?._type === "slotCollectionInfo" // for slotCollectionInfo, apply the variant templates of the featuredProducts section
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
