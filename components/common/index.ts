import { Variants } from "types";

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
