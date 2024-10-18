import { Components } from "components/list";
import React from "react";
import { mergeReplaceAndAdd } from "studio/utils";
import pages from "./documents/pages";
import { componentsData } from "components/componentsData";
console.log("🚀 ~ componentsData:", componentsData);

import { baseSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
const baseSchemaArray = Object.values(baseSchema);

import { blogSchema } from "@webriq-pagebuilder/sanity-plugin-schema-blog";
const blogSchemaArray = Object.values(blogSchema);

import { commerceSchema } from "@webriq-pagebuilder/sanity-plugin-schema-commerce";
const commerceSchemaArray = Object.values(commerceSchema);

const defaultSchemas = [...baseSchemaArray, ...blogSchemaArray];
const allSchemas = mergeReplaceAndAdd(defaultSchemas, commerceSchemaArray); // with C-Studio schema

// componentsList: "navigation", "header", "features", "portfolio", "blog", "contact", "pricing", "testimonial", "team", "howItWorks", "newsletter", "faqs", "callToAction", "stats", "appPromo", "logoCloud", "footer", "signInSignUp", "textComponent", "cartSection", "featuredProducts", "productInfo", "wishlistSection", "pages_productInfo", "allProducts", "socialMediaFeed"
const componentsList = Object.keys(Components);
const schemasWithComponents = allSchemas.map((schema) => {
  if (componentsList.includes(schema.name)) {
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
                  const data = componentsData?.[schema.name]?.[item?.value];

                  if (data) {
                    const component = React.createElement(Component, { data });
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
});

// uncomment the block of code below if we have custom components
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
