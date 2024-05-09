import { test } from "@playwright/test";
import { deletePageVariant, newPageTitle, beforeEachTest } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import VariantA from "./variant_a";
import VariantB from "./variant_b";
import VariantC from "./variant_c";
import VariantD from "./variant_d";
import VariantE from "./variant_e";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
  variant_d: VariantD,
  variant_e: VariantE,
};

const commonFieldValues = {
  primaryButton: "Primary Button Test",
  secondaryButton: "Secondary Button Test",
  externalLinkUrl: "https://facebook.com",
  internalLinkUrl: `${NEXT_PUBLIC_SITE_URL}/thank-you/`,
  navigationBase: ["Start", "About Us", "Services", "Platform", "Testimonials"],
};

const navigationVariantTest = [
  {
    name: "Variant A",
    title: "Navigation Variant A",
    label: "Navigation New Page A",
    variant: "variant_a",
    isInternalLink: true,
    linkNames: commonFieldValues.navigationBase.concat(
      commonFieldValues.primaryButton,
      commonFieldValues.secondaryButton
    ),
  },
  {
    name: "Variant B",
    title: "Navigation Variant B",
    label: "Navigation New Page B",
    variant: "variant_b",
    isInternalLink: true,
    linkNames: commonFieldValues.navigationBase.concat(
      commonFieldValues.primaryButton,
      commonFieldValues.secondaryButton
    ),
  },
  {
    name: "Variant C",
    title: "Navigation Variant C",
    label: "Navigation New Page C",
    variant: "variant_c",
    isInternalLink: false,
    linkNames: commonFieldValues.navigationBase.concat(
      commonFieldValues.primaryButton,
      commonFieldValues.secondaryButton
    ),
  },
  {
    name: "Variant D",
    title: "Navigation Variant D",
    label: "Navigation New Page D",
    variant: "variant_d",
    isInternalLink: false,
    linkNames: commonFieldValues.navigationBase.concat(
      commonFieldValues.primaryButton,
      commonFieldValues.secondaryButton
    ),
  },
  {
    name: "Variant E",
    title: "Navigation Variant E",
    label: "Navigation New Page E",
    variant: "variant_e",
    isInternalLink: false,
    linkNames: commonFieldValues.navigationBase,
  },
];

test.describe.configure({ timeout: 1_200_000, mode: "parallel" });

navigationVariantTest.forEach((variants, index) => {
  const { name, title, label, variant, linkNames, isInternalLink } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test(`Create ${label}`, async ({ page, baseURL }) => {
      console.log(`[INFO] - Testing Navigation ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Navigation", label, index);
      const variantTest = variantModules[variant];

      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
        linkNames,
        isInternalLink,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
      console.log(`[DONE] Navigation ${variant} 🚀`);
    });
  });
});
