import { allProductsDefaultValues } from "helper/defaultValues";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import AllProductsComponent from "../index.tsx";
    export default {
      title: "CStudio/All Products",
      component: AllProductsComponent,
      tags: ["autodocs"],
      render: ({ variant, ...args }) => {
        const data = {
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(AllProductsComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    // only fetch components that are referenced or added in pages
    const allProductsData = await sanityClient.fetch(componentsQuery, {
      schema: "allProducts",
    });

    const result: StoryConfigs = {};

    await Promise.allSettled(
      allProductsData?.map(
        (item, index) =>
          (result[`${item?.variant}${index + 1}`] = {
            args: {
              variant: item?.variant,
              ...allProductsDefaultValues,
            },
          })
      )
    );

    return result;
  },
});
