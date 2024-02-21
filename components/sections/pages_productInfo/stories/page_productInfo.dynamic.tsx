import { productInfoPageDefaultValues } from "helper/defaultValues";
import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import PageProductInfo from "../index.tsx";
    export default {
      title: "Sections/Product Info",
      component: PageProductInfo,
      tags: ["autodocs"],
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
              data: {
                variant: item?.variant,
                variants: {
                  products: productInfoPageDefaultValues,
                },
              },
            },
          })
      )
    );

    return result;
  },
});
