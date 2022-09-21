/** This component displays content for the PRODUCT page */

import { memo } from "react";
import Head from "next/head";
import { productQuery } from "pages/api/query";
import { usePreviewSubscription } from "lib/sanity";
import { Components } from "../../pages/[...slug]";

function ProductPage({ data, preview }) {
  const slug = data?.slug?.current;
  const { data: products } = usePreviewSubscription(productQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  const { name, sections, seo, pid, category, description, productPreview } =
    products;

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
              category,
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
