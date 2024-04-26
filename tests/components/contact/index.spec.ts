import { test } from "@playwright/test";
import {
  newPageTitle,
  navigateToPage,
  clickVariantImage,
  createNewPage,
  deletePageVariant,
} from "tests/utils";
import VariantA from "./variant_a";
import VariantB from "./variant_b";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
};

const contactVariantTests = [
  {
    title: "Variant A",
    label: "New Contact A",
    variant: "variant_a",
  },
  {
    title: "Variant B",
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
  test.beforeEach(async ({ page }) => {
    await navigateToPage(page);
    await createNewPage(page, newPageTitle, "Contact");

    const variantLabel = page
      .getByTestId("field-label")
      .getByTestId("string-input");
    await variantLabel.click();
    await variantLabel.fill("New Contact Test");

    await clickVariantImage(page, index); // select variant
  });

  test.afterEach(`Delete ${variant.label}`, async ({ page }) => {
    await deletePageVariant(page, newPageTitle, variant.label);
  });

  test(`Create ${variant.label}`, async ({ page }) => {
    const variantTest = variantModules[variant.variant];
    await variantTest({
      newPageTitle,
      page,
      commonFieldValues,
    });
  });
});

test.afterAll(async ({ page }) => {
  await page.close();
});
