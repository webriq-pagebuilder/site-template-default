import { test } from "@playwright/test";
import {
  navigateToPage,
  clickVariantImage,
  createNewPage,
  deletePageVariant,
} from "tests/utils";
import VariantA from "./variant_a.spec";
import VariantB from "./variant_b.spec";
import VariantC from "./variant_c.spec";
import VariantD from "./variant_d.spec";
import VariantE from "./variant_e.spec";

let newPageTitle: string;

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
  variant_d: VariantD,
  variant_e: VariantE,
};

const ctaVariantTests = [
  {
    title: "Variant A",
    label: "New Call to action A",
    variant: "variant_a",
  },
  {
    title: "Variant B",
    label: "New Call to action B",
    variant: "variant_b",
  },
  {
    title: "Variant C",
    label: "New Call to action C",
    variant: "variant_c",
  },
  {
    title: "Variant D",
    label: "New Call to action D",
    variant: "variant_d",
  },
  {
    title: "Variant E",
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

const time = new Date().getTime();
newPageTitle = "New Page " + time;

ctaVariantTests?.forEach((variant, index) => {
  test.describe(`${variant.title}`, async () => {
    test.describe.configure({ timeout: 300000, mode: "serial" });

    test(`Create ${variant.label}`, async ({ page }) => {
      await navigateToPage(page);
      await createNewPage(page, newPageTitle, "Call to action");

      const variantLabel = page
        .getByTestId("field-label")
        .getByTestId("string-input");
      await variantLabel.click();
      await variantLabel.fill("New Call to action Test");

      await clickVariantImage(page, index); // select variant

      const variantTest = variantModules[variant.variant];
      await variantTest({
        newPageTitle,
        page,
        commonFieldValues,
      });
    });

    test(`Delete ${variant.label}`, async ({ page }) => {
      await deletePageVariant(page, newPageTitle, variant.label);
    });
  });
});

test.afterAll(async ({ page }) => {
  await page.close();
});
