import { memo } from "react";
import Head from "next/head";
import { usePreviewSubscription, getClient } from "lib/sanity";
import { wishlistPageQuery } from "pages/api/query";
import { Components, filterDataToSingleItem } from "../[slug]";

function WishlistPage({ data, preview }) {
  const slug = "wishlist";

  let wishlistPageData;
  const { data: wishlistPage } = usePreviewSubscription(wishlistPageQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  // for never published pages
  if (wishlistPage?.hasNeverPublished) {
    wishlistPageData = wishlistPage;
  } else {
    // for published pages and pages with unpublished edits
    wishlistPageData = wishlistPage?.wishlistPage || wishlistPage?.[0];
  }

  if (!wishlistPageData) {
    return null;
  }

  const { sections, seo } = wishlistPageData;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
        <title>{seo?.seoTitle || "Wishlist"}</title>
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

export async function getStaticProps({ preview = false }) {
  const wishlistData = await getClient(preview).fetch(wishlistPageQuery);

  // pass page data and preview to helper function
  const wishlistPage = filterDataToSingleItem(wishlistData, preview);

  // if our query failed to return data for page, return data for blog page
  // Reference: https://www.sanity.io/guides/nextjs-live-preview
  if (!wishlistPage) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      data: { wishlistPage },
    },
  };
}

export default memo(WishlistPage);
