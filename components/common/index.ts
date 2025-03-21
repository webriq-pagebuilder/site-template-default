import { StoryConfigs } from "utils/stories";

// filter out args that are not listed on hidden array
export const filterArgsByVariant = (
  component: any,
  args: any,
  variant: string
) => {
  return Object.keys(args).reduce((result, key) => {
    if (
      Array.isArray(component) &&
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
    if (!item || !item.variant || !item.variants) return; // Skip iteration if item, item.variant or item.variants is falsy

    // for named exports format see this reference from storybook: https://storybook.js.org/docs/api/csf#named-story-exports
    const trimmedLabel = item.label
      ? item?.label.trim()
      : `${item._type} ${item.variant}`;
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
  isInitial = false,
}) {
  // Initialize schema object with the given schemaType as an empty object
  const schema = { [schemaType]: {} };

  // Map over the data to populate the schema
  data?.forEach((item) => {
    if (!item || !item?.variants || !item?.variant) return; // Skip if item or item.variants is falsy
    let variantDetails;

    if (isInitial) {
      // Initial variant logic for creating default variant details
      const [initialVariant] = item.variants;
      variantDetails = initialVariant
        ? { variant: initialVariant.title, details: initialVariant }
        : null;
    } else {
      variantDetails = isEcommerce
        ? schemaFields
        : filterArgsByVariant(schemaFields, item.variants, item.variant);
    }

    schema[schemaType][item.variant] = {
      variant: item.variant,
      variants: isInitial ? variantDetails?.details : variantDetails,
    };
  });

  return schema;
}
