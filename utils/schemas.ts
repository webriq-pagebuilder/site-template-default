import React from "react";
import { Components } from "@/components/list";
import { dynamicComponentsData } from "@/components/data/dynamic";

// New async function to fetch dynamic components data
export const fetchDynamicComponentsData = async (
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

// New function to process dynamic components for schema variants
export const processDynamicSchemaVariants = async (
  schemaName: string,
  variantField: any,
  fields: any,
  isEcommerce?: boolean
) => {
  const Component = Components?.[schemaName];

  // Exclude the dynamic components from rendering
  if (
    !Component ||
    schemaName === "cookies" ||
    process.env.NEXT_PUBLIC_RENDER_DYNAMIC_COMPONENTS === "false" ||
    !process.env.NEXT_PUBLIC_RENDER_DYNAMIC_COMPONENTS
  ) {
    return variantField;
  }

  try {
    const dynamicData = await fetchDynamicComponentsData(
      schemaName,
      fields,
      isEcommerce
    );

    return {
      ...variantField,
      options: {
        ...variantField.options,
        list:
          variantField.options?.list?.map((item) => {
            const data = dynamicData?.[schemaName]?.[item?.value];

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
  } catch (error) {
    console.error(
      `Error processing dynamic variants for ${schemaName}:`,
      error
    );
    return variantField;
  }
};

export const renameVariantKeys = (data) => {
  if (!data?.variants) return data;

  const variantMapping = {
    statItems: "stats",
    blogPosts: "posts",
    askedQuestions: "faqs",
    faqsWithCategory: "faqsWithCategories",
  };

  const updatedVariants = Object.entries(variantMapping).reduce(
    (acc, [key, newKey]) => {
      if (data.variants[key]) {
        acc[newKey] = data.variants[key];
      }
      return acc;
    },
    {}
  );

  return {
    ...data,
    variants: {
      ...data.variants,
      ...updatedVariants,
    },
  };
};
