/** This component displays content for the PRODUCT page */

import { memo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { productsQuery, productSettings } from "pages/api/query";
import { usePreviewSubscription, getClient } from "lib/sanity";
import { Components, filterDataToSingleItem } from "../[slug]";
import PageNotFound from "pages/404";
import NoPreview from "pages/no-preview";

function ProductPage({ data, preview }) {
  const router = useRouter();

  if (!router.isFallback && !data?.products?.slug) {
    return <PageNotFound />;
  }

  const slug = data?.products?.slug;
  let productData, recordsData;
  const { data: products } = usePreviewSubscription(productsQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  // enable preview for changes done on Settings > Products
  const { data: records } = usePreviewSubscription(productSettings, {
    params: { slug },
    initialData: data?.records,
    enabled: preview,
  });

  // for never published pages
  if (products?.hasNeverPublished) {
    productData = products;
  } else {
    // for published pages and pages with unpublished edits
    productData = products?.products || products?.[0];
  }

  if (!productData) {
    return null;
  }

  const { name, sections, seo, pid, collections, description, productPreview } =
    productData;

  if (records && records?.pid) {
    recordsData = records;
  }

  /*
   *  For new unpublished pages, return page telling user that the page needs to be published first before it can be previewed
   *  This prevents showing 404 page when the page is not published yet
   */
  if (
    !productData?.hasUnpublishedEdits &&
    productData?._id?.includes("drafts")
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
            product={{
              name,
              pid,
              collections,
              description,
              productPreview,
            }}
            data={section}
          />
        );
      })}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const productsData = await getClient(preview).fetch(productsQuery, {
    slug: params.slug,
  });

  // pass page data and preview to helper function
  const products = filterDataToSingleItem(productsData, preview);

  // check if we have record products with sections that will replace the main products section
  const records = await getClient(preview).fetch(productSettings);

  // if our query failed to return data for page, return data for blog page
  // Reference: https://www.sanity.io/guides/nextjs-live-preview
  if (!products) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      data: { products, records },
    },
  };
}

export async function getStaticPaths() {
  const products = await getClient().fetch(
    groq`*[_type == "mainProduct" && defined(slug.current)][].slug.current`
  );

  return {
    paths: products.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default memo(ProductPage);
