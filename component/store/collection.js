/** This component displays content for the CATEGORY page */

import { memo, useEffect, useState } from "react";
import Head from "next/head";
import { productCategoryQuery, overrideCollections } from "pages/api/query";
import { usePreviewSubscription, sanityClient } from "lib/sanity";
import { Components } from "../../pages/[slug]";

function CollectionPage({ data, preview }) {
  const slug = data?.slug;
  const { data: categories } = usePreviewSubscription(productCategoryQuery, {
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
          .fetch(overrideCollections, { collectionName: name })
          .then((result) => {
            setOverride(result);
          });
      } catch (err) {
        console.log(err);
      }
    }

    getNewData();
  }, []);

  const { name, sections, seo, description, collectionID } = categories;

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
            collection={{
              name,
              collectionID,
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
