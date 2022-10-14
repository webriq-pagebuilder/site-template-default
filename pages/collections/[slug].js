/** This component displays content for the COLLECTIONS page */

import { memo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { collectionsQuery, collectionSettings } from "pages/api/query";
import { usePreviewSubscription, getClient } from "lib/sanity";
import { Components, filterDataToSingleItem } from "../[slug]";
import PageNotFound from "pages/404";
import NoPreview from "pages/no-preview";

function CollectionPage({ data, preview }) {
  const router = useRouter();

  if (!router.isFallback && !data?.collections?.slug) {
    return <PageNotFound />;
  }

  const slug = data?.collections?.slug;
  let collectionsData, recordsData;
  const { data: collections } = usePreviewSubscription(collectionsQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  // enable preview for changes done on Settings > Collections
  const { data: records } = usePreviewSubscription(collectionSettings, {
    params: { slug },
    initialData: data?.records,
    enabled: preview,
  });

  // for never published pages
  if (collections?.hasNeverPublished) {
    collectionsData = collections;
  } else {
    // for published pages and pages with unpublished edits
    collectionsData = collections?.collections || collections?.[0];
  }

  if (!collectionsData) {
    return null;
  }

  const { name, sections, seo, description, collectionID } = collectionsData;

  if (records && records?.collectionID) {
    recordsData = records;
  }

  /*
   *  For new unpublished pages, return page telling user that the page needs to be published first before it can be previewed
   *  This prevents showing 404 page when the page is not published yet
   */
  if (
    !collectionsData?.hasUnpublishedEdits &&
    collectionsData?._id?.includes("drafts")
  ) {
    return (
      <>
        <Head>
          <title>Unpublished Page</title>
        </Head>
        <NoPreview />
      </>
    );
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=360 initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="../favicon.ico" />
        <title>{seo?.seoTitle ?? name}</title>
      </Head>
      {(recordsData?.sections === undefined ||
      recordsData?.sections?.length === 0
        ? sections
        : recordsData?.sections
      )?.map((section, index) => {
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
              collectionID,
              description,
            }}
            data={section}
          />
        );
      })}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const collectionData = await getClient(preview).fetch(collectionsQuery, {
    slug: params.slug,
  });

  // pass page data and preview to helper function
  const collections = filterDataToSingleItem(collectionData, preview);

  // check if we have record collections with sections that will replace the main collections section
  const records = await getClient(preview).fetch(collectionSettings);

  // if our query failed to return data for page, return data for blog page
  // Reference: https://www.sanity.io/guides/nextjs-live-preview
  if (!collections) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      data: { collections, records },
    },
  };
}

export async function getStaticPaths() {
  const collections = await getClient().fetch(
    groq`*[_type == "mainCollection" && defined(slug.current)][].slug.current`
  );

  return {
    paths: collections.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default memo(CollectionPage);
