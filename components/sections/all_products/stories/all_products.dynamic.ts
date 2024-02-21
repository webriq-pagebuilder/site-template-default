import { allProductsDefaultValues } from "helper/defaultValues";
import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import AllProductsComponent from "../index.tsx";
    export default {
      title: "CStudio/All Products",
      component: AllProductsComponent,
      tags: ["autodocs"],
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
              data: {
                variant: item?.variant,
                variants: allProductsDefaultValues,
              },
            },
          })
      )
    );

    return result;
  },
});
