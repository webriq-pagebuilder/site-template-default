import { test } from "@playwright/test";
import {
  navigateToPage,
  clickVariantImage,
  createNewPage,
  deletePageVariant,
} from "tests/utils";
import VariantA from "./variant_a.spec";
import VariantB from "./variant_b.spec";

let newPageTitle: string;

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

const time = new Date().getTime();
newPageTitle = "New Page " + time;

contactVariantTests?.forEach((variant, index) => {
  test.describe(`${variant.title}`, () => {
    test.describe.configure({ timeout: 300000, mode: "serial" });

    test(`Create ${variant.label}`, async ({ page }) => {
      await navigateToPage(page);
      await createNewPage(page, newPageTitle, "Contact");

      const variantLabel = page
        .getByTestId("field-label")
        .getByTestId("string-input");
      await variantLabel.click();
      await variantLabel.fill("New Contact Test");

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
