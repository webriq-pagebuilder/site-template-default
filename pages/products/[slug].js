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
    defaultSections, // sections from Store > Commerce Pages > Products
    name, // product name
    ecwidProductId, // the product ID from Ecwid
    price, // product price
    description, // product description
    productPreview, // product preview image
    sections, // sections from the Design field group tab of Product page
    seo, // product page SEO
    productInfo, // display other product information
    productInfoVariant, // product info design
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

  let sectionsToDisplay = defaultSections;
  // if we have "slotProductInfo" section, then we have the placeholder for the productInfo values
  let placeholderSection = sections?.map((section) => {
    const newObj = {
      variant: productInfoVariant?.variant, // e.g. variant_a
      variants: productInfo, // schema fields for the variant
    };

    // mutate sections array to add the productInfo details if the section is slotProductInfo
    if (section?._type === "slotProductInfo") {
      return { ...section, ...newObj };
    }

    // just return other sections as is
    return section;
  });

  // let us make sure that "placeholderSection" is not empty or undefined, otherwise if its empty then use defaultSections array
  if (placeholderSection) {
    // check if we have other sections aside from slotProductInfo
    const filtered = placeholderSection?.filter(
      (section) => section?._type !== "slotProductInfo"
    );

    if (filtered?.length !== 0) {
      // if line 83 returns true, then we must replace all the defaultSections from Store > Commerce Pages > Products
      sectionsToDisplay = placeholderSection;
    } else {
      // if only have slotProductInfo section, then use its value for the Dynamic Product Info section
      sectionsToDisplay = placeholderSection?.reduce(
        (defaultsArr, newArr) => {
          // only need the slotProductInfo section from Store > Products Design field group to match
          const getIndex = defaultSections?.findIndex((item) =>
            item?._type?.includes("productInfo")
          );

          // If placeholderSection variant is "defaultVariant", then use the variant set in defaultSections Dynamic Product Info
          if (newArr?.variant === "defaultVariant") {
            newArr.variant = defaultsArr[getIndex]?.variant;
          }

          // if there is a productInfo type section from Store > Commerce Pages > Products, then replace with the slotProductInfo array
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
        <title>{seo?.seoTitle ?? name}</title>
      </Head>
      {sectionsToDisplay &&
        sectionsToDisplay?.map((section, index) => {
          const sectionType =
            section?._type === "slotProductInfo" // for slotProductInfo, apply the variant templates of the former productInfo section
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
                  productPreview,
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
