import { dynamicComponentsData } from "components/data/dynamic";

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
