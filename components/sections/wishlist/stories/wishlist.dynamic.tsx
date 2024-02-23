import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import Wishlist from "../index.tsx";
    export default {
      title: "CStudio/Wishlist",
      component: Wishlist,
      tags: ["autodocs"],
      render: ({ variant, ...args }) => {
        const data = {
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(Wishlist, { data: data });
      },
    };
  `,
  stories: async () => {
    // only fetch components that are referenced or added in pages
    const wishlistData = await sanityClient.fetch(componentsQuery, {
      schema: "slotWishlist",
    });

    const result: StoryConfigs = {};

    await Promise.allSettled(
      wishlistData?.map(
        (item, index) =>
          (result[`${item?.variant ?? "variant_a"}${index + 1}`] = {
            args: {
              variant: item?.variant ?? "variant_a",
            },
          })
      )
    );

    return result;
  },
});
