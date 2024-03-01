// THIS IS THE STORY FILE TO GENERATE DYNAMIC STORIES FOR APP PROMO AS ADDED IN THE STUDIO

import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

// NOTE: If this component has a custom component, comment out this line and import that instead
// Example: import { appPromoSchema } from "schemas/custom/sanity-plugin-schema-default/src/schemas/sections/app_promo/schema";
import { appPromoSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import AppPromoComponent from "../index.tsx";
    export default {
      title: "Sections/App Promo",
      component: AppPromoComponent,
      tags: ["autodocs"],
      render: ({ variant, label, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(AppPromoComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    const appPromoData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "appPromo",
      })) || []; // Provide a default empty array

    const result: StoryConfigs = {};

    appPromoData?.map((item, index) => {
      if (!item || !item.variants) return; // Skip iteration if item or item.variants is falsy

      result[`${item.variant}${index + 1}`] = {
        args: {
          variant: item.variant,
          label: item.label,
          ...filterArgsByVariant(appPromoSchema, item.variants, item.variant),
        },
      };
    });

    return result;
  },
});
