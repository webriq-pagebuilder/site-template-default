import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import { featuredProductDefaultValues } from "helper/defaultValues";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import FeaturedProducts from "../index.tsx";
    export default {
      title: "CStudio/Featured Products",
      component: FeaturedProducts,
      tags: ["autodocs"],
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
              data: {
                variant: item?.variant,
                variants: featuredProductDefaultValues,
              },
            },
          })
      )
    );

    return result;
  },
});
