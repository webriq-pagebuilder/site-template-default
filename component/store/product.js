/** This component displays content for the PRODUCT page */

import { memo, useEffect, useState } from "react";
import Head from "next/head";
import { productQuery, siteSettingsQuery } from "pages/api/query";
import { sanityClient, usePreviewSubscription } from "lib/sanity";
import { Components } from "../../pages/[...slug]";

function ProductPage({ data, preview }) {
  const slug = data?.slug?.current;
  const { data: products } = usePreviewSubscription(productQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  // get site settings page sections
  const [siteSettings, setSiteSettings] = useState(null);
  useEffect(() => {
    async function getSiteSettings() {
      await sanityClient
        .fetch(siteSettingsQuery)
        .then((settings) => setSiteSettings(settings))
        .catch((error) => console.log(error));
    }

    getSiteSettings();
  }, []);

  const { name, sections, seo, pid, category, description, productPreview } =
    products;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=360 initial-scale=1, shrink-to-fit=no"
        />
        <title>{seo?.seoTitle ?? siteSettings?.seo?.seoTitle ?? name}</title>
      </Head>
      {siteSettings?.sections?.map((section, index) => {
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
