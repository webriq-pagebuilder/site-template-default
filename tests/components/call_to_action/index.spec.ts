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
  // variant_e: VariantE,
};

const ctaVariantTests = [
  {
    name: "Variant A",
    title: "Call To Action Page A",
    label: "New Call To Action A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Call To Action Page B",
    label: "New Call To Action B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "Call To Action Page C",
    label: "New Call To Action C",
    variant: "variant_c",
  },
  {
    name: "Variant D",
    title: "Call To Action Page D",
    label: "New Call To Action D",
    variant: "variant_d",
  },
  // {
  //   name: "Variant E",
  //   title: "Call To Action Page E",
  //   label: "New Call To Action E",
  //   variant: "variant_e",
  // },
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

test.describe.configure({ timeout: 1_000_000, mode: "parallel" });

ctaVariantTests?.forEach((variants, index) => {
  const { name, title, label, variant } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test(`Create ${label}`, async ({ page }) => {
      console.log(`[INFO] - Testing Call to Action ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Call to Action", label, index);

      const variantTest = variantModules[variant];
      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
      console.log(`[DONE] Call to Action ${variant} 🚀`);
    });
  });
});
