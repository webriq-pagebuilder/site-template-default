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
      render: ({ variant, label, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(FeaturedProducts, { data: data });
      }
    };
  `,
  stories: async () => {
    // Check if SANITY_STUDIO_IN_CSTUDIO is false and return an empty object to not render any story
    if (process.env.STORYBOOK_SANITY_STUDIO_IN_CSTUDIO === "false") {
      return {};
    }

    const featuredProductsData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "featuredProducts",
      })) || []; // Provide a default empty array

    const result: StoryConfigs = {};

    featuredProductsData?.map((item) => {
      if (!item || !item.variants) return; // Skip iteration if item or item.variants is falsy

      const trimmedLabel = item?.label.trim();
      const label = trimmedLabel
        .toLowerCase()
        .replace(/[^\w\s]/g, "_")
        .replace(/\s/g, "_"); // Replace special characters and white spaces with underscores

      result[`${label}${item?.variant}`] = {
        args: {
          variant: item.variant,
          label: item.label,
          ...featuredProductDefaultValues,
        },
      };
    });

    return result;
  },
});
