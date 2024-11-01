import { StoryConfigs } from "utils/stories";

// filter out args that are not listed on hidden array
export const filterArgsByVariant = (
  component: any,
  args: any,
  variant: string
) => {
  return Object.keys(args).reduce((result, key) => {
    if (
      component?.some(
        (schema) =>
          schema?.name === key &&
          (!schema?._hideInVariants ||
            !schema?._hideInVariants?.includes(variant))
      )
    ) {
      result[key] = args[key];
    }

    if (args?.template) {
      return { ...result, template: args?.template };
    }

    return result;
  }, {});
};

export function dynamicStoryData({
  data,
  schemaFields = {},
  isEcommerce = false,
  isCustomArgs = false, // set to 'true' if we're using custom values and not from the queried studio data
}) {
  const result: StoryConfigs = {};

  data?.map((item) => {
    if (!item || !item.variants) return; // Skip iteration if item or item.variants is falsy

    // for named exports format see this reference from storybook: https://storybook.js.org/docs/api/csf#named-story-exports
    const trimmedLabel = item?.label.trim();
    const label = trimmedLabel
      .toLowerCase()
      .replace(/[^\w\s]/g, "_")
      .replace(/\s/g, "_"); // Replace special characters and white spaces with underscores

    const variants =
      isEcommerce || isCustomArgs
        ? schemaFields
        : filterArgsByVariant(schemaFields, item.variants, item.variant);

    result[`${label}_${item?.variant}`] = {
      args: {
        variant: item.variant,
        label: item.label,
        ...variants,
      },
    };
  });

  return result;
}

export function dynamicComponents({
  data,
  schemaFields = {},
  schemaType,
  isEcommerce = false,
}) {
  const schema = {};

  // Initialize the schema for the given schemaType
  schema[`${schemaType}`] = {};

  // Map over the data to populate the schema
  data?.forEach((item) => {
    if (!item || !item.variants) return; // Skip iteration if item or item.variants is falsy

    const variants = isEcommerce
      ? schemaFields
      : filterArgsByVariant(schemaFields, item.variants, item.variant);

    // Set the variant as a key in the schema object
    schema[schemaType][item.variant] = {
      variant: item.variant,
      variants,
    };
  });

  return schema;
}
