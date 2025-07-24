import { sanityClient } from "@/lib/sanity.client";
import { componentsQuery } from "@/pages/api/query";
import { dynamicComponents } from "@/components/common";
import {
  appPromoInitialValue,
  appPromoVariants,
  blogInitialValue,
  blogVariants,
  callToActionInitialValue,
  callToActionVariants,
  contactInitialValue,
  contactVariants,
  cookiesInitialValue,
  cookiesVariants,
  faqsInitialValue,
  faqsVariants,
  featuresInitialValue,
  featuresVariants,
  footerInitialValue,
  footerVariants,
  headerInitialValue,
  headerVariants,
  howItWorksInitialValue,
  howItWorksVariants,
  logoCloudInitialValue,
  logoCloudVariants,
  navigationInitialValue,
  navigationVariants,
  newsletterInitialValue,
  newsletterVariants,
  portfolioInitialValue,
  portfolioVariants,
  pricingInitialValue,
  pricingVariants,
  signInSignUpInitialValue,
  signInSignUpVariants,
  statsInitialValue,
  statsVariants,
  teamInitialValue,
  teamVariants,
  testimonialInitialValue,
  testimonialVariants,
  textComponentInitialValue,
  textComponentVariants,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";

const initialValuesMap = {
  appPromo: appPromoInitialValue,
  blog: blogInitialValue,
  callToAction: callToActionInitialValue,
  contact: contactInitialValue,
  cookies: cookiesInitialValue,
  faqs: faqsInitialValue,
  features: featuresInitialValue,
  footer: footerInitialValue,
  header: headerInitialValue,
  howItWorks: howItWorksInitialValue,
  logoCloud: logoCloudInitialValue,
  navigation: navigationInitialValue,
  newsletter: newsletterInitialValue,
  portfolio: portfolioInitialValue,
  pricing: pricingInitialValue,
  signInSignUp: signInSignUpInitialValue,
  stats: statsInitialValue,
  team: teamInitialValue,
  testimonial: testimonialInitialValue,
  textComponent: textComponentInitialValue,
};

// Creating a variants map to associate each type with its variants
const variantsMap = {
  appPromo: appPromoVariants,
  blog: blogVariants,
  callToAction: callToActionVariants,
  contact: contactVariants,
  cookies: cookiesVariants,
  faqs: faqsVariants,
  features: featuresVariants,
  footer: footerVariants,
  header: headerVariants,
  howItWorks: howItWorksVariants,
  logoCloud: logoCloudVariants,
  navigation: navigationVariants,
  newsletter: newsletterVariants,
  portfolio: portfolioVariants,
  pricing: pricingVariants,
  signInSignUp: signInSignUpVariants,
  stats: statsVariants,
  team: teamVariants,
  testimonial: testimonialVariants,
  textComponent: textComponentVariants,
};

export async function dynamicComponentsData({ type, fields, isEcommerce }) {
  const schemaData =
    (await sanityClient.fetch(componentsQuery, {
      schema: type,
    })) || [];

  // Check if schemaData is empty
  if (!schemaData.length) {
    const initialValues = initialValuesMap[type];
    const variantList = variantsMap[type];

    if (initialValues && variantList) {
      // Create an array of default variants based on the variantList
      const defaultVariants = variantList.map((variant, index) => {
        return {
          _type: type,
          variant: variant.value,
          _id: `${new Date().getTime()}_${index}`, // Generate a unique ID
          label: `Default ${type} Label for ${variant.title}`,
          variants: [initialValues],
          _updatedAt: new Date().toISOString(), // Use current timestamp
          _createdAt: new Date().toISOString(), // Use current timestamp
        };
      });

      return dynamicComponents({
        data: defaultVariants,
        schemaFields: fields,
        schemaType: type,
        isEcommerce,
        isInitial: true,
      });
    }
  }

  return dynamicComponents({
    data: schemaData,
    schemaFields: fields,
    schemaType: type,
    isEcommerce,
  });
}
