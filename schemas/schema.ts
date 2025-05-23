import React from "react";
import { Components } from "components/list";
import { fetchDynamicComponentsData, renameVariantKeys } from "utils/schemas";
import { EcommerceSchema, mergeReplaceAndAdd } from "studio/utils";

import pages from "./documents/pages";
import themePage from "./documents/themePage";

// default schemas
import { baseSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { blogSchema } from "@webriq-pagebuilder/sanity-plugin-schema-blog";
import { commerceSchema } from "@webriq-pagebuilder/sanity-plugin-schema-commerce";

const baseSchemaArray = Object.values(baseSchema);
const blogSchemaArray = Object.values(blogSchema);
const commerceSchemaArray = Object.values(commerceSchema);

const defaultSchemas = [...baseSchemaArray, ...blogSchemaArray];
const baseSchemas = mergeReplaceAndAdd(defaultSchemas, commerceSchemaArray);

// Uncomment these code below if we have custom components
//import customSchema from "./custom";
//const updatedSchemaArray = Object.values(customSchema);

const allSchemas = (() => {
  // 12-04-2024: Hide socialMediaFeed component until Instagram integration has been updated
  const mergedSchemas = mergeReplaceAndAdd(baseSchemas, commerceSchemaArray); // comment this code if we have custom components

  // Uncomment the line to replace line 33 if we have custom components
  //const mergedSchemas = mergeReplaceAndAdd(baseSchemas, updatedSchemaArray);

  return mergedSchemas;
})();

const componentsList = Object.keys(Components);

// Update schemasWithComponents to include dynamic components data
const schemasWithComponents = await Promise.all(
  allSchemas.map(async (schema) => {
    if (componentsList.includes(schema.name)) {
      const fields = schema.fields?.find((field) => field.name === "variants")
        ?.fields;
      const isEcommerce = EcommerceSchema.includes(schema.name);
      const dynamicData = await fetchDynamicComponentsData(
        schema.name,
        fields,
        isEcommerce
      ); // Fetch dynamic data for the schema

      return {
        ...schema,
        fields: schema.fields.map((field) => {
          if (field.name === "variant") {
            const Component = Components?.[schema.name];

            // Exclude the dynamic components from rendering
            if (
              !Component ||
              schema?.name === "cookies" ||
              process.env.NEXT_PUBLIC_RENDER_DYNAMIC_COMPONENTS === "false" ||
              !process.env.NEXT_PUBLIC_RENDER_DYNAMIC_COMPONENTS
            ) {
              return field;
            }

            return {
              ...field,
              options: {
                ...field.options,
                list:
                  field.options?.list?.map((item) => {
                    const data = dynamicData?.[schema.name]?.[item?.value];

                    if (data) {
                      const component = React.createElement(Component, {
                        data: renameVariantKeys(data),
                      });
                      return {
                        ...item,
                        component,
                      };
                    }

                    return item;
                  }) || [],
              },
            };
          }

          return field;
        }),
      };
    }

    return schema;
  })
);

export const schemaTypes = [pages, themePage, ...schemasWithComponents];
