import { dynamicStoryData } from "components/common";
import { defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

// NOTE: If this component has a custom component, comment out this line and import that instead
// Example: import { featuresSchema } from "schemas/custom/sanity-plugin-schema-default/src/schemas/sections/features/schema";
import { featuresSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import { Components } from "components/list";

    const FeaturesComponent = Components.features;

    export default {
      title: "Components/Features",
      component: FeaturesComponent,
      tags: ["autodocs"],
      render: ({ variant, ...args }) => {
        const data = {
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(FeaturesComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    const featuresData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "features",
      })) || []; // Provide a default empty array

    return dynamicStoryData({
      data: featuresData,
      schemaFields: featuresSchema,
    });
  },
});
