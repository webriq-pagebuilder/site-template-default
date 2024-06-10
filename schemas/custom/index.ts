/* 
  Import ALL custom component folders here. 
  The directories point to the index files of schema folders
*
*/
import { default as customSchemaBlog } from "./sanity-plugin-schema-blog/src";
import { default as customSchemaDefault } from "./sanity-plugin-schema-default/src/schemas/sections";
import { default as customSchemaCommerce } from "./sanity-plugin-schema-commerce/src/schemas/sections";

const schemas = {
  ...customSchemaBlog,
  ...customSchemaDefault,
  ...customSchemaCommerce,
};

export default schemas;
