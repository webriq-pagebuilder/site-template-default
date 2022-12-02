/** This component displays content for the PRODUCT page */

import React, { lazy, Suspense, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { productsQuery } from "pages/api/query";
import { Components, filterDataToSingleItem } from "../[slug]";
import PageNotFound from "pages/404";
import NoPreview from "pages/no-preview";
import { sanityConfig } from "lib/config";
import { getClient, sanityClient } from "lib/sanity.server";
import { EcwidContextProvider } from "context/EcwidContext";

const PreviewMode = lazy(() => import("next-sanity/preview"));

function ProductPage({ data: initialData = {}, preview, token }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const productData = data?.products || data?.[0];
  const slug = productData?.slug;

  if (!router.isFallback && !slug) {
    return <PageNotFound />;
  }

  if (!productData) {
    return null;
  }

  const {
    commonSections, // sections from Store > Commerce Pages > Products
    name, // product name
    ecwidProductId, // the product ID from Ecwid
    price, // product price
    description, // product description
    sections, // sections from the Design field group tab of Product page
    seo, // product page SEO
  } = productData;

  /*
   *  For new unpublished pages, return page telling user that the page needs to be published first before it can be previewed
   *  This prevents showing 404 page when the page is not published yet
   */
  if (
    !productData?.hasUnpublishedEdits &&
    productData?._id?.includes("drafts") &&
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

  // let us make sure that "sections" array is not empty or undefined, otherwise use the default sections from Store > Commerce Pages > Products
  if (sections) {
    // check if we have other sections aside from slotProductInfo in a Store > Products product page
    const filtered = sections?.filter(
      (section) => section?._type !== "slotProductInfo"
    );

    if (filtered?.length !== 0) {
      // if line 67 returns true, then replace all the sections from Store > Commerce Pages > Products with sections from Store > Products
      sectionsToDisplay = sections;
    } else {
      // there is only "slotProductInfo" section in Store > Products product page
      sectionsToDisplay = sections?.reduce(
        (defaultsArr, newArr) => {
          // get the index of the "slotProductInfo" section from Store > Commerce Pages > Products sections
          const getIndex = commonSections?.sections?.findIndex((item) =>
            item?._type?.includes("slotProductInfo")
          );

          // if the variant from the Store > Products page is a "defaultVariant", then replace it with the variant of Store > Commerce Pages > Products "slotProductInfo"
          if (newArr?.variant === "defaultVariant") {
            newArr.variant = defaultsArr[getIndex]?.variant;
          }

          // if there is a "slotProductInfo" section in Store > Commerce Pages > Products, then replace it with the "slotProductInfo" of Store > Pages section
          if (getIndex !== -1) {
            defaultsArr[getIndex] = newArr;
          }

          // otherwise return the sections as defined
          return defaultsArr;
        },
        [...commonSections?.sections]
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
            query={productsQuery}
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
        <title>{seo?.seoTitle ?? commonSections?.seo?.seoTitle ?? name}</title>
      </Head>
      {sectionsToDisplay &&
        sectionsToDisplay?.map((section, index) => {
          const sectionType =
            section?._type === "slotCart" // for slotCart, apply the variant templates of the cart section
              ? "cartSection"
              : section?._type === "slotWishlist" // for slotWishlist, apply the variant templates of the wishlist section
              ? "wishlistSection"
              : section?._type === "slotProductInfo" // for slotProductInfo, apply the variant templates of the former productInfo section
              ? "productInfo"
              : section?._type; // otherwise, use the actual section type

          const Component = Components?.[sectionType];

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
                product={{
                  name,
                  ecwidProductId,
                  price,
                  description,
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

  const products = await client.fetch(productsQuery, { slug: params.slug });

  // pass products data and preview to helper function
  const singleProductsData = filterDataToSingleItem(products, preview);

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      data: {
        products: singleProductsData || null,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export async function getStaticPaths() {
  const products = await sanityClient.fetch(
    groq`*[_type == "mainProduct" && defined(slug.current)][].slug.current`
  );

  return {
    paths: products.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default React.memo(ProductPage);
