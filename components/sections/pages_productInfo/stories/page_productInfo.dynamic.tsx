import { productInfoPageDefaultValues } from "helper/defaultValues";
import { defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import { dynamicStoryData } from "components/common";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import PageProductInfo from "../index.tsx";
    export default {
      title: "Sections/Product Info",
      component: PageProductInfo,
      tags: ["autodocs"],
      render: ({ variant, label, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(PageProductInfo, { data: data });
      }
    };
  `,
  stories: async () => {
    // Check if SANITY_STUDIO_IN_CSTUDIO is false and return an empty object to not render any story
    if (process.env.STORYBOOK_SANITY_STUDIO_IN_CSTUDIO === "false") {
      return {};
    }

    const pagesProductInfoData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "pages_productInfo",
      })) || []; // Provide a default empty array

    return dynamicStoryData({
      data: pagesProductInfoData,
      schemaFields: productInfoPageDefaultValues,
      isEcommerce: true,
    });
  },
});
