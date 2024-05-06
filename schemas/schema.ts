import pages from "./documents/pages";
import { mergeReplaceAndAdd } from "studio/utils";

import { baseSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
const baseSchemaArray = Object.values(baseSchema);

import { blogSchema } from "@webriq-pagebuilder/sanity-plugin-schema-blog";
const blogSchemaArray = Object.values(blogSchema);

import { commerceSchema } from "@webriq-pagebuilder/sanity-plugin-schema-commerce";
const commerceSchemaArray = Object.values(commerceSchema);

const defaultSchemas = [...baseSchemaArray, ...blogSchemaArray];
const allSchemas = mergeReplaceAndAdd(defaultSchemas, commerceSchemaArray); // with C-Studio schema

// uncomment the block of code below if we have custom components
import customSchema from "./custom";
const updatedSchemaArray = Object.values(customSchema);
const updatedSchemas = mergeReplaceAndAdd(allSchemas, updatedSchemaArray);
export const schemaTypes = [pages, ...updatedSchemas];

// NOTE: COMMENT THIS LINE IF WE HAVE CUSTOM COMPONENTS
// export const schemaTypes = [pages, ...allSchemas];
