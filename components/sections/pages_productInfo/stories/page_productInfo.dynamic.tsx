import { productInfoPageDefaultValues } from "helper/defaultValues";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import PageProductInfo from "../index.tsx";
    export default {
      title: "Sections/Product Info",
      component: PageProductInfo,
      tags: ["autodocs"],
      render: ({ variant, ...args }) => {
        const data = {
          variant: variant,
          variants: {
            products: args
          },
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(PageProductInfo, { data: data });
      }
    };
  `,
  stories: async () => {
    // only fetch components that are referenced or added in pages
    const pagesProductInfoData = await sanityClient.fetch(componentsQuery, {
      schema: "pages_productInfo",
    });

    const result: StoryConfigs = {};

    await Promise.allSettled(
      pagesProductInfoData?.map(
        (item, index) =>
          (result[`${item?.variant}${index + 1}`] = {
            args: {
              variant: item?.variant,
              ...productInfoPageDefaultValues,
            },
          })
      )
    );

    return result;
  },
});
