import { test } from "@playwright/test";
import { newPageTitle, deletePageVariant, beforeEachTest } from "tests/utils";
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
    name: "Variant A",
    title: "App promo Variant A",
    label: "New App promo A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "App promo Variant B",
    label: "New App promo B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "App promo Variant C",
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
