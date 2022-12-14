import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getClient } from "lib/sanity.client";
import { cartPageQuery } from "pages/api/query";
import NoPreview from "pages/no-preview";
import { Components, filterDataToSingleItem } from "components/list";
import { EcwidContextProvider } from "context/EcwidContext";

function CartPage({ data, preview, token }) {
  const router = useRouter();

  const cartPageData = data?.cart || data?.[0];

  /*
   *  For new unpublished pages, return page telling user that the page needs to be published first before it can be previewed
   *  This prevents showing 404 page when the page is not published yet
   */
  if (
    ((!router.isFallback && !data?.cart) || data?.cart?.hasNeverPublished) &&
    !preview
  ) {
    return <NoPreview />;
  }

  if (!cartPageData) {
    return null;
  }

  const { sections, seo } = cartPageData;

  // TODO: ADD CODE BLOCK IF PREVIEW IS TRUE

  return (
    <>
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
        <title>{seo?.seoTitle || "Cart"}</title>
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
            <EcwidContextProvider key={index}>
              <Component
                template={{
                  bg: "gray",
                  color: "webriq",
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

  const cartPage = await client.fetch(cartPageQuery);

  // pass page data and preview to helper function
  const singleCartPageData = filterDataToSingleItem(cartPage, preview);

  if (!singleCartPageData) {
    return {
      props: {
        preview,
        data: { cart: null },
      },
    };
  }

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      data: {
        cart: singleCartPageData || null,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export default React.memo(CartPage);
