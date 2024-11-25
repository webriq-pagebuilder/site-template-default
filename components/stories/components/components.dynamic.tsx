import React from "react";
import { dynamicStoryData } from "components/common";
import { defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import { Components } from "components/list";
import { fetchDynamicComponentsData, renameVariantKeys } from "utils/schemas";
import { EcommerceSchema } from "studio/utils";
import { useSchema } from "sanity";
import dedent from "ts-dedent";

const componentsList = Object.keys(Components);

function getAllSchemas() {
  const allSchemas = useSchema(); // gets all the defined schemas for the current studio

  const getSchemas = allSchemas
    ?.get("page")
    ?.fields?.find((item: { name: string }) => item?.name === "sections")
    ?.type?.of?.sort((a: { name: string }, b: { name: string }) =>
      a?.name < b?.name ? -1 : 1
    );

  return getSchemas;
};

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import { Components } from "components/list";

    function ComponentsTemplate(data) {
      const { label, variant, variants, type } = data;

      const Component = Components?.[type];

      // skip rendering unknown components
      if (!Component) {
        return null;
      }

      return (
        <Component {...{ data }} />
      );
    }

    export default {
      title: "Components/Sections",
      component: ComponentsTemplate,
      tags: ["autodocs"],
      render: ({ variant, label, type, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          type: type,
          ...args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(ComponentsTemplate, { data: data });
      }
    };
  `,
  stories: async () => {
    const schemaData = (await Promise.all(componentsList.map(async (component) => {
      return (await sanityClient.fetch(componentsQuery, {
        schema: component, // Make schema dynamic based on componentsList
      })) || []; // Provide a default empty array
    }))).flat();

    const schemaFields = getAllSchemas; // Call the function to get schema fields

    return dynamicStoryData({
      data: schemaData, // Ensure this is the correct data structure
      schemaFields: schemaFields,
    });
  },
});