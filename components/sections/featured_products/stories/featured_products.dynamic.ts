import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import { featuredProductDefaultValues } from "helper/defaultValues";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import FeaturedProducts from "../index.tsx";
    export default {
      title: "CStudio/Featured Products",
      component: FeaturedProducts,
      tags: ["autodocs"],
      render: ({ variant, ...args }) => {
        const data = {
          variant: variant,
          variants: {
            collections: args
          },
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(FeaturedProducts, { data: data });
      }
    };
  `,
  stories: async () => {
    // only fetch components that are referenced or added in pages
    const featuredProductsData = await sanityClient.fetch(componentsQuery, {
      schema: "featuredProducts",
    });

    const result: StoryConfigs = {};

    await Promise.allSettled(
      featuredProductsData?.map(
        (item, index) =>
          (result[`${item?.variant}${index + 1}`] = {
            args: {
              variant: item?.variant,
              ...featuredProductDefaultValues,
            },
          })
      )
    );

    return result;
  },
});
