import { test } from "@playwright/test";
import { newPageTitle, beforeEachTest, deletePageVariant } from "tests/utils";

import VariantA from "./variant_a";
import VariantB from "./variant_b";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
};

const newsletterVariantTests = [
  {
    name: "Variant A",
    title: "Newsletter Variant A",
    label: "New Newsletter A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Newsletter Variant B",
    label: "New Newsletter B",
    variant: "variant_b",
  },
];

const commonFieldValues = {
  title: "Newsletter title",
  description: "Updated description for newsletter.",
  formButtonLabel: "Submit newsletter",
  logoAltText: "Newsletter logo",
  thankYouPageUrl: "https://webriq.com/thank-you",
};

newsletterVariantTests.forEach((variant, index) => {
  test.describe(`${variant?.name}`, () => {
    test.describe.configure({ timeout: 1_000_000 });

    test(`Create ${variant.label}`, async ({ page }) => {
      await beforeEachTest(
        page,
        variant?.title,
        variant?.variant,
        variant?.label,
        index
      );

      const variantTest = variantModules[variant.variant];
      await variantTest({
        newPageTitle,
        page,
        commonFieldValues,
      });
    });

    test.afterEach(`Delete ${variant.label}`, async ({ page }) => {
      await deletePageVariant(page, newPageTitle, variant.label);
    });
  });
});
