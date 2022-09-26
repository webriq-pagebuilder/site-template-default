import { memo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { usePreviewSubscription, getClient } from "lib/sanity";
import { cartPageQuery } from "pages/api/query";
import { Components, filterDataToSingleItem } from "../[slug]";
import PageNotFound from "pages/404";

function CartPage({ data, preview }) {
  const router = useRouter();

  if (!router.isFallback && !data?.cartPage?.slug) {
    return <PageNotFound />;
  }

  const slug = data?.cartPage?.slug;
  let cartPageData;
  const { data: cartPage } = usePreviewSubscription(cartPageQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  // for never published pages
  if (cartPage?.hasNeverPublished) {
    cartPageData = cartPage;
  } else {
    // for published pages and pages with unpublished edits
    cartPageData = cartPage?.cartPage || cartPage?.[0];
  }

  if (!cartPageData) {
    return null;
  }

  const { name, sections, seo } = cartPageData;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
        <title>{seo?.seoTitle || name}</title>
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
  const cartData = await getClient(preview).fetch(cartPageQuery);

  // pass page data and preview to helper function
  const cartPage = filterDataToSingleItem(cartData, preview);

  // if our query failed to return data for page, return data for blog page
  // Reference: https://www.sanity.io/guides/nextjs-live-preview
  if (!cartPage) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      data: { cartPage },
    },
  };
}

export default memo(CartPage);
