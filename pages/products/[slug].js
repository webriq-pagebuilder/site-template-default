/** This component displays content for the PRODUCT page */

import React, { lazy, Suspense, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { productsQuery, productSettings } from "pages/api/query";
import { Components, filterDataToSingleItem } from "../[slug]";
import PageNotFound from "pages/404";
import NoPreview from "pages/no-preview";
import { sanityConfig } from "lib/config";
import { getClient, sanityClient } from "lib/sanity.server";

const PreviewMode = lazy(() => import("next-sanity/preview"));

function ProductPage({ data: initialData = {}, preview, token }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const productData = data?.products || data?.[0];
  const productDefaults = data?.defaults || data?.defaults?.[0];
  const slug = productData?.slug;

  let sectionsToDisplay = productDefaults?.sections;

  if (!router.isFallback && !slug) {
    return <PageNotFound />;
  }

  if (!productData) {
    return null;
  }

  const { sections, name, seo, pid, collections, productPreview } = productData;

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

  // TO DO : Add condition here to update the array for `sectionsToDisplay`

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
            product={{
              name,
              pid,
              collections,
              productPreview,
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

  const [products, defaults] = await Promise.all([
    client.fetch(productsQuery, { slug: params.slug }),
    client.fetch(productSettings),
  ]);

  // pass products data and preview to helper function
  const singleProductsData = filterDataToSingleItem(products, preview);

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      data: {
        products: singleProductsData || null,
        defaults: defaults || null,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    // revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
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
