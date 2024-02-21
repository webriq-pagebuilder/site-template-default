import { pricingSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import PricingComponent from "../index.tsx";
    export default {
      title: "Sections/Pricing",
      component: PricingComponent,
      tags: ["autodocs"],
    };
  `,
  stories: async () => {
    // only fetch components that are referenced or added in pages
    const pricingData = await sanityClient.fetch(componentsQuery, {
      schema: "pricing",
    });

    const result: StoryConfigs = {};

    await Promise.allSettled(
      pricingData?.map(
        (item, index) =>
          (result[`${item?.variant}${index + 1}`] = {
            args: {
              data: {
                variant: item?.variant,
                variants: filterArgsByVariant(
                  pricingSchema,
                  item?.variants,
                  item?.variant
                ),
              },
            },
          })
      )
    );

    return result;
  },
});
