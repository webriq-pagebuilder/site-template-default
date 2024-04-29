import { test } from "@playwright/test";
import { newPageTitle, beforeEachTest, deletePageVariant } from "tests/utils";
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

const ctaVariantTests = [
  {
    name: "Variant A",
    title: "Call to action Variant A",
    label: "New Call to action A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Call to action Variant B",
    label: "New Call to action B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "Call to action Variant C",
    label: "New Call to action C",
    variant: "variant_c",
  },
  {
    name: "Variant D",
    title: "Call to action Variant D",
    label: "New Call to action D",
    variant: "variant_d",
  },
  {
    name: "Variant E",
    title: "Call to action Variant E",
    label: "New Call to action E",
    variant: "variant_e",
  },
];

const commonFieldValues = {
  title: "Call to action title",
  description: "Updated description for new call to action.",
  ctaLogoAltText: "Call to action logo",
  primaryButtonLabel: "CTA Primary",
  externalLinkUrl: "https://webriq.com",
  formFields: [
    {
      name: "firstName",
      placeholder: "First name",
      value: "WebriQ",
    },
    {
      name: "lastName",
      placeholder: "Last name",
      value: "Test",
    },
    {
      name: "email",
      placeholder: "Enter your email address",
      value: "sample@webriq.com",
    },
    {
      name: "password",
      placeholder: "Enter your password",
      value: "12345",
    },
  ],
  formButtonLabel: "Submit CTA",
};

ctaVariantTests?.forEach((variant, index) => {
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
