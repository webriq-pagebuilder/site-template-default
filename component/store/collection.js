/** This component displays content for the CATEGORY page */

import { memo } from "react";
import Head from "next/head";
import { productCategoryQuery } from "pages/api/query";
import { usePreviewSubscription } from "lib/sanity";
import { Components } from "../../pages/[...slug]";

function CollectionPage({ data, preview }) {
  const slug = data?.slug?.current;
  const { data: categories } = usePreviewSubscription(productCategoryQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  const { name, sections, seo, description, categoryID } = categories;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=360 initial-scale=1, shrink-to-fit=no"
        />
        <title>{seo?.seoTitle ?? siteSettings?.seo?.seoTitle ?? name}</title>
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
            productDetails={{
              name,
              categoryID,
              description,
            }}
            data={section}
          />
        );
      })}
    </>
  );
}
export default memo(CollectionPage);
