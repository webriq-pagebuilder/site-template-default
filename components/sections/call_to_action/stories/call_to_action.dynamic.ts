import { dynamicStoryData } from "components/common";
import { defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

// NOTE: If this component has a custom component, comment out this line and import that instead
// Example: import { callToActionSchema } from "schemas/custom/sanity-plugin-schema-default/src/schemas/sections/call_to_action/schema";
import { callToActionSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import CallToActionComponent from "../index.tsx";
    export default {
      title: "Sections/Call to Action",
      component: CallToActionComponent,
      tags: ["autodocs"],
      render: ({ variant, label, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(CallToActionComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    const callToActionData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "callToAction",
      })) || []; // Provide a default empty array

    return dynamicStoryData({
      data: callToActionData,
      schemaFields: callToActionSchema,
    });
  },
});
