/** This component displays content for the PRODUCT page */

import { memo } from "react";
import Head from "next/head";
import { productQuery } from "pages/api/query";
import { usePreviewSubscription } from "lib/sanity";
import { Components } from "../../pages/[...slug]";

function ProductPage({ data, siteSettings, preview }) {
  const slug = data?.slug?.current;
  const { data: products } = usePreviewSubscription(productQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  const { name, sections, seo, pid, category, description, productPreview } =
    products;

  if (siteSettings) {
    if (siteSettings?.sections?.length !== 0 && sections?.length !== 0) {
      sections?.map((section, idx) => {
        // For every section, find the array index in siteSettings?.sections where their _types match
        let getSettingsIndex = siteSettings?.sections
          ?.map((i) => i?._type)
          ?.indexOf(section?._type); // make an array of _type

        if (getSettingsIndex !== undefined) {
          if (getSettingsIndex === -1) {
            // if we can't find a match, add the _type from sections[] based on their array order
            siteSettings?.sections?.splice(idx + 1, 0, section);
          } else {
            // if there is a matching _type, replace the siteSettings?.sections with that of sections[].
            siteSettings?.sections?.splice(getSettingsIndex, 1, section);
          }
        }
      });
    }
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=360 initial-scale=1, shrink-to-fit=no"
        />
        <title>{seo?.seoTitle ?? siteSettings?.seo?.seoTitle ?? name}</title>
      </Head>
      {(siteSettings?.sections?.length === 0
        ? sections
        : siteSettings?.sections
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
            productDetails={{
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
