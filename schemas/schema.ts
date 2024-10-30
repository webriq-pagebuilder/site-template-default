import { Components } from "components/list";
import React from "react";
import { EcommerceSchema, mergeReplaceAndAdd } from "studio/utils";
import pages from "./documents/pages";
import { dynamicComponentsData } from "components/data/dynamic"; // Import the dynamicComponentsData function

import { baseSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
const baseSchemaArray = Object.values(baseSchema);

import { blogSchema } from "@webriq-pagebuilder/sanity-plugin-schema-blog";
const blogSchemaArray = Object.values(blogSchema);

import { commerceSchema } from "@webriq-pagebuilder/sanity-plugin-schema-commerce";
const commerceSchemaArray = Object.values(commerceSchema);

const defaultSchemas = [...baseSchemaArray, ...blogSchemaArray];
const allSchemas = mergeReplaceAndAdd(defaultSchemas, commerceSchemaArray); // with C-Studio schema

const componentsList = Object.keys(Components);

// New async function to fetch dynamic components data
const fetchDynamicComponentsData = async (
  schemaType: string,
  fields = {},
  isEcommerce?: boolean
) => {
  const dynamicData = await dynamicComponentsData({
    type: schemaType,
    fields,
    isEcommerce,
  }); // Call the dynamicComponentsData function

  return dynamicData;
};

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

            if (!Component) {
              return field;
            }

            return {
              ...field,
              options: {
                ...field.options,
                list:
                  field.options?.list?.map((item) => {
                    const data = dynamicData?.[schema.name]?.[item?.value]; //|| dynamicData[item?.value]; // Use dynamic data if available

                    if (data) {
                      const component = React.createElement(Component, {
                        data,
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

// Uncomment the block of code below if we have custom components
/**
 *
 * import customSchema from "./custom";
 * const updatedSchemaArray = Object.values(customSchema);
 *
 * const updatedSchemas = mergeReplaceAndAdd(schemasWithComponents, updatedSchemaArray);
 *
 * export const schemaTypes = [pages, ...updatedSchemas];
 *
 */

// NOTE: COMMENT THIS LINE IF WE HAVE CUSTOM COMPONENTS
export const schemaTypes = [pages, ...schemasWithComponents];
