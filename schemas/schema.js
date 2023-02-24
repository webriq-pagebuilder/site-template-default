// @todo: needs work - error with SANITY_STUDIO_IN_CSTUDIO
import baseSchema from "@webriq-pagebuilder/sanity-plugin-schema-default";
const baseSchemaArray = Object.values(baseSchema);
console.log("🚀 ~ file: schema.js:3 ~ baseSchemaArray:", baseSchemaArray);

export const schemaTypes = [...baseSchemaArray];
