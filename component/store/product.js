/** This component displays content for the PRODUCT page */

import { memo, useEffect, useState } from "react";
import Head from "next/head";
import { productQuery, overrideProducts } from "pages/api/query";
import { usePreviewSubscription, sanityClient } from "lib/sanity";
import { Components } from "../../pages/[slug]";

function ProductPage({ data, preview }) {
  const slug = data?.slug;
  const { data: products } = usePreviewSubscription(productQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  // let's get the data that will override what is defined in Settings > Products based on product name
  const [override, setOverride] = useState(null);
  useEffect(() => {
    async function getNewData() {
      try {
        // fetch data and pass to override state variable
        await sanityClient
          .fetch(overrideProducts, { productName: name })
          .then((result) => {
            setOverride(result);
          });
      } catch (err) {
        console.log(err);
      }
    }

    getNewData();
  }, []);

  const { name, sections, seo, pid, collections, description, productPreview } =
    products;

  let collectionsToDisplay = collections;

  if (override?.collections !== undefined) {
    collectionsToDisplay = override?.collections;
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=360 initial-scale=1, shrink-to-fit=no"
        />
        <title>{seo?.seoTitle ?? name}</title>
      </Head>
      {sections?.map((section, index) => {
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
              collectionsToDisplay,
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
export default memo(ProductPage);
