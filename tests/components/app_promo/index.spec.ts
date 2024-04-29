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
    title: "App promo Page A",
    label: "New App promo A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "App promo Page B",
    label: "New App promo B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "App promo Page C",
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

    const pageTitle = newPageTitle(variant?.title);

    test(`Create ${variant.label}`, async ({ page }) => {
      await beforeEachTest(page, pageTitle, "App promo", variant?.label, index);

      const variantTest = variantModules[variant.variant];
      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, newPageTitle, variant.label);
    });
  });
});
