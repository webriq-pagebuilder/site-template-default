import { test } from "@playwright/test";
import { newPageTitle, beforeEachTest, deletePageVariant } from "tests/utils";
import VariantA from "./variant_a";
import VariantB from "./variant_b";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
};

const contactVariantTests = [
  {
    name: "Variant A",
    title: "Contact Variant A",
    label: "New Contact A",
    variant: "variant_a",
  },
  {
    name: "Variant A",
    title: "Contact Variant B",
    label: "New Contact B",
    variant: "variant_b",
  },
];

const commonFieldValues = {
  title: "Contact title",
  description: "Updated description for new contact.",
  socialLinks: {
    facebook: "https://www.facebook.com/webriq",
    twitter: "https://twitter.com/WebriQGoesMad",
    instagram: "https://www.instagram.com/webriqgoesmad/",
  },
  contactDetails: {
    office: "123 Sample Address",
    number: "+12 34567",
    email: "sample@webriq.com",
  },
  formButtonLabel: "Submit Contact",
  thankYouPageUrl: "https://webriq.com/thank-you",
};

contactVariantTests?.forEach((variant, index) => {
  test.describe(`${variant.name}`, () => {
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

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, newPageTitle, variant.label);
    });
  });
});

test.afterAll(async ({ page }) => {
  await page.close();
});
