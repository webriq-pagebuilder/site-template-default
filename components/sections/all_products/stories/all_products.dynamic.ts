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
      render: ({ variant, label, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(AllProductsComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    // Check if SANITY_STUDIO_IN_CSTUDIO is false and return an empty object to not render any story
    if (process.env.STORYBOOK_SANITY_STUDIO_IN_CSTUDIO === "false") {
      return {};
    }

    const allProductsData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "allProducts",
      })) || []; // Provide a default empty array

    const result: StoryConfigs = {};

    allProductsData?.map((item, index) => {
      if (!item || !item.variants) return; // Skip iteration if item or item.variants is falsy

      result[`${item.variant}${index + 1}`] = {
        args: {
          variant: item.variant,
          label: item.label,
          ...allProductsDefaultValues,
        },
      };
    });

    return result;
  },
});
