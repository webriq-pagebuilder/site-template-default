import { test } from "@playwright/test";
import { newPageTitle, beforeEachTest, deletePageVariant } from "tests/utils";
import VariantA from "./variant_a";
import VariantB from "./variant_b";
import VariantC from "./variant_c";
import VariantD from "./variant_d";
import VariantE from "./variant_e";
import VariantF from "./variant_f";
import VariantG from "./variant_g";
import VariantH from "./variant_h";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
  variant_d: VariantD,
  variant_e: VariantE,
  variant_f: VariantF,
  variant_g: VariantG,
  variant_h: VariantH,
};

const featuresVariantTests = [
  {
    name: "Variant A",
    title: "Features Variant A",
    label: "New Features A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Features Variant B",
    label: "New Features B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "Features Variant C",
    label: "New Features C",
    variant: "variant_c",
  },
  {
    name: "Variant D",
    title: "Features Variant D",
    label: "New Features D",
    variant: "variant_d",
  },
  {
    name: "Variant E",
    title: "Features Variant E",
    label: "New Features E",
    variant: "variant_e",
  },
  {
    name: "Variant F",
    title: "Features Variant F",
    label: "New Features F",
    variant: "variant_f",
  },
  {
    name: "Variant G",
    title: "Features Variant G",
    label: "New Features G",
    variant: "variant_g",
  },
  {
    name: "Variant H",
    title: "Features Variant H",
    label: "New Features H",
    variant: "variant_h",
  },
];

const commonFieldValues = {
  subtitle: "Subtitle Features",
  title: "New Features title",
  description: "Updated description for new features.",
  tag: "new feature tag",
  primaryButtonLabel: "Features Primary",
};

featuresVariantTests?.forEach((variant, index) => {
  test.describe(`${variant?.name}`, () => {
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

    test.afterEach(`Delete ${variant.label}`, async ({ page }) => {
      await deletePageVariant(page, newPageTitle, variant?.label);
    });
  });
});

test.afterAll(async ({ page }) => {
  await page.close();
});
