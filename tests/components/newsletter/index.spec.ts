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

const newsletterVariantTests = [
  {
    title: "Variant A",
    label: "New Newsletter A",
    variant: "variant_a",
  },
  {
    title: "Variant B",
    label: "New Newsletter B",
    variant: "variant_b",
  },
];

const time = new Date().getTime();
newPageTitle = "New Page " + time;

const commonFieldValues = {
  title: "Newsletter title",
  description: "Updated description for newsletter.",
  formButtonLabel: "Submit newsletter",
  logoAltText: "Newsletter logo",
  thankYouPageUrl: "https://webriq.com/thank-you",
};

newsletterVariantTests.forEach((variant, index) => {
  test.describe(`${variant.title}`, async () => {
    test.describe.configure({ timeout: 300000, mode: "serial" });

    test(`Create ${variant.label}`, async ({ page }) => {
      await navigateToPage(page);
      await createNewPage(page, newPageTitle, "Newsletter");

      const variantLabel = page
        .getByTestId("field-label")
        .getByTestId("string-input");
      await variantLabel.click();
      await variantLabel.fill("New Newsletter Test");

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
