import { dynamicStoryData } from "@/components/common";
import { defineStories } from "@/utils/stories";
import { sanityClient } from "@/lib/sanity.client";
import { componentsQuery } from "@/pages/api/query";
import dedent from "ts-dedent";

// NOTE: If this component has a custom component, comment out this line and import that instead
// Example: import { logoCloudSchema } from "schemas/custom/sanity-plugin-schema-default/src/schemas/sections/logo_cloud/schema";
import { logoCloudSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import { Components } from "@/components/list";

    const LogoCloudComponent = Components.logoCloud;

    export default {
      title: "Components/Logo Cloud",
      component: LogoCloudComponent,
      tags: ["autodocs"],
      render: ({ variant, label, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(LogoCloudComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    const logoCloudData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "logoCloud",
      })) || []; // Provide a default empty array

    return dynamicStoryData({
      data: logoCloudData,
      schemaFields: logoCloudSchema,
    });
  },
});
