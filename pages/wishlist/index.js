import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { client } from "lib/sanity.client";
import { wishlistPageQuery } from "pages/api/query";
import NoPreview from "pages/no-preview";
import { Components } from "components/list";

function WishlistPage({ preview, data }) {
  const router = useRouter();

  const wishlistPageData = data?.wishlist || data?.[0];

  /*
   *  For new unpublished pages, return page telling user that the page needs to be published first before it can be previewed
   *  This prevents showing 404 page when the page is not published yet
   */
  if (
    ((!router.isFallback && !data?.wishlist) ||
      data?.wishlist?.hasNeverPublished) &&
    !preview
  ) {
    return <NoPreview />;
  }

  if (!wishlistPageData) {
    return null;
  }

  const { sections, seo } = wishlistPageData;

  // TODO: ADD CODE BLOCK IF PREVIEW IS TRUE

  return (
    <>
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
        <title>{seo?.seoTitle || "Wishlist"}</title>
      </Head>
      {sections &&
        sections?.map((section, index) => {
          const sectionType =
            section?._type === "slotCart" // for slotCart, apply the variant templates of the cart section
              ? "cartSection"
              : section?._type === "slotWishlist" // for slotWishlist, apply the variant templates of the wishlist section
              ? "wishlistSection"
              : section?._type; // otherwise, use the actual section type

          const Component = Components[sectionType];

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
  const searchPage = await client.fetch(wishlistPageQuery);

  // pass page data and preview to helper function
  const singleWishlistPage = filterDataToSingleItem(searchPage, preview);

  if (!singleWishlistPage) {
    return {
      props: {
        preview,
        data: { wishlist: null },
      },
    };
  }

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      data: {
        wishlist: singleWishlistPage || null,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export default React.memo(WishlistPage);
