import { StoryConfigs, defineStories } from "@/utils/stories";
import { sanityClient } from "@/lib/sanity.client";
import { componentsQuery } from "@/pages/api/query";
import { featuredProductDefaultValues } from "@/helper/defaultValues";
import { dynamicStoryData } from "@/components/common";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import FeaturedProducts from "../../sections/featured_products/index.tsx";
    
    export default {
      title: "Ecommerce/Featured Products",
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

    return dynamicStoryData({
      data: featuredProductsData,
      schemaFields: featuredProductDefaultValues,
      isEcommerce: true,
    });
  },
});
