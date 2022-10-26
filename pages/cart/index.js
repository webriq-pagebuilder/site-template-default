import React, { lazy, Suspense, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { sanityConfig } from "lib/config";
import { getClient } from "lib/sanity.server";
import { cartPageQuery } from "pages/api/query";
import NoPreview from "pages/no-preview";
import { Components, filterDataToSingleItem } from "../[slug]";
import { EcwidContextProvider } from "context/EcwidContext";

const PreviewMode = lazy(() => import("next-sanity/preview"));

function CartPage({ data: initialData = {}, preview, token }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const cartPageData = data?.cart || data?.[0];
  const slug = "cart";

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

  return (
    <>
      {preview && slug && (
        <Suspense fallback={null}>
          <PreviewMode
            projectId={sanityConfig.projectId}
            dataset={sanityConfig.dataset}
            initial={initialData}
            query={cartPageQuery}
            onChange={setData}
            token={token}
            params={{ slug }}
          />
        </Suspense>
      )}
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
        <title>{seo?.seoTitle || "Cart"}</title>
      </Head>
      {sections &&
        sections?.map((section, index) => {
          const Component = Components[section._type];

          // skip rendering unknown components
          if (!Component) {
            return null;
          }

          return (
            <EcwidContextProvider>
              <Component
                key={index}
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

export async function getStaticProps({ preview = false, previewData = {} }) {
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
