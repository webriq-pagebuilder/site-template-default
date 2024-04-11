import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

// NOTE: If this component has a custom component, comment out this line and import that instead
// Example: import { cookiesSchema } from "schemas/custom/sanity-plugin-schema-default/src/schemas/sections/cookies/schema";
import { cookiesSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import CookiesComponent from "../index.tsx";
    export default {
      title: "Sections/Cookies",
      component: CookiesComponent,
      tags: ["autodocs"],
      render: ({ variant, label, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(CookiesComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    const cookiesData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "cookies",
      })) || []; // Provide a default empty array

    const result: StoryConfigs = {};

    cookiesData?.map((item) => {
      if (!item || !item.variants) return; // Skip iteration if item or item.variants is falsy

      const trimmedLabel = item?.label.trim();
      const label = trimmedLabel
        .toLowerCase()
        .replace(/[^\w\s]/g, "_")
        .replace(/\s/g, "_"); // Replace special characters and white spaces with underscores

      result[`${label}${item?.variant}`] = {
        args: {
          variant: item.variant,
          label: item.label,
          ...filterArgsByVariant(cookiesSchema, item.variants, item.variant),
        },
      };
    });

    return result;
  },
});
