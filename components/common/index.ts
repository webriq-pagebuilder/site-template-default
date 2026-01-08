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
