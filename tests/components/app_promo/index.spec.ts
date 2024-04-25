import { test } from "@playwright/test";
import {
  clickVariantImage,
  createNewPage,
  navigateToPage,
  deletePageVariant,
} from "tests/utils";
import VariantA from "./variant_a.spec";
import VariantB from "./variant_b.spec";
import VariantC from "./variant_c.spec";

let newPageTitle: string;

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
};

const appPromoVariantTests = [
  {
    title: "Variant A",
    label: "New App promo A",
    variant: "variant_a",
  },
  {
    title: "Variant B",
    label: "New App promo B",
    variant: "variant_b",
  },
  {
    title: "Variant C",
    label: "New App promo C",
    variant: "variant_c",
  },
];

const time = new Date().getTime();
newPageTitle = "New Page" + time;

const commonFieldValues = {
  subtitle: "App promo subtitle", // all variants
  title: "App promo title", // all variants
  description: "Updated description for new App promo.", // variant b and c
};

appPromoVariantTests.forEach((variant, index) => {
  test.describe(`${variant.title}`, async () => {
    test.describe.configure({ timeout: 300_000, mode: "serial" });

    test(`Create ${variant.label}`, async ({ page }) => {
      await navigateToPage(page);
      await createNewPage(page, newPageTitle, "App promo");

      const variantLabel = page
        .getByTestId("field-label")
        .getByTestId("string-input");
      await variantLabel.click();
      await variantLabel.fill("New App promo Test");

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
