import { test } from "@playwright/test";
import {
  newPageTitle,
  clickVariantImage,
  createNewPage,
  navigateToPage,
  deletePageVariant,
} from "tests/utils";
import VariantA from "./variant_a";
import VariantB from "./variant_b";
import VariantC from "./variant_c";

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

const commonFieldValues = {
  subtitle: "App promo subtitle", // all variants
  title: "App promo title", // all variants
  description: "Updated description for new App promo.", // variant b and c
};

appPromoVariantTests.forEach((variant, index) => {
  test.beforeEach(async ({ page }) => {
    await navigateToPage(page);
    await createNewPage(page, newPageTitle, "App promo");

    const variantLabel = page
      .getByTestId("field-label")
      .getByTestId("string-input");
    await variantLabel.click();
    await variantLabel.fill("New App promo Test");

    await clickVariantImage(page, index); // select variant
  });

  test.afterEach(async ({ page }) => {
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
