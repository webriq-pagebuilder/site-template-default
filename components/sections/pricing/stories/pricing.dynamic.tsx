import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

// NOTE: If this component has a custom component, comment out this line and import that instead
// Example: import { pricingSchema } from "schemas/custom/sanity-plugin-schema-default/src/schemas/sections/pricing/schema";
import { pricingSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import PricingComponent from "../index.tsx";
    export default {
      title: "Sections/Pricing",
      component: PricingComponent,
      tags: ["autodocs"],
      render: ({ variant, ...args }) => {
        const data = {
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(PricingComponent, { data: data });
      }
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
              variant: item?.variant,
              ...filterArgsByVariant(
                pricingSchema,
                item?.variants,
                item?.variant
              ),
            },
          })
      )
    );

    return result;
  },
});
