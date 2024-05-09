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
    title: "App Promo Page A",
    label: "New App Promo A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "App Promo Page B",
    label: "New App Promo B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "App Promo Page C",
    label: "New App Promo C",
    variant: "variant_c",
  },
];

const commonFieldValues = {
  subtitle: "App Promo subtitle", // all variants
  title: "App Promo title", // all variants
  description: "Updated description for new App Promo.", // variant b and c
  logoAltText: "App Promo logo",
};

test.describe.configure({ timeout: 1_000_000, mode: "parallel" });
appPromoVariantTests.forEach((variants, index) => {
  const { name, title, label, variant } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test(`Create ${label}`, async ({ page }) => {
      console.log(`[INFO] - Testing App Promo ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "App promo", label, index);

      const variantTest = variantModules[variant];
      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
      console.log(`[DONE] App Promo ${variant} 🚀`);
    });
  });
});
