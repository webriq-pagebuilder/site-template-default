import { test } from "@playwright/test";
import {
  newPageTitle,
  createNewPage,
  clickVariantImage,
  navigateToPage,
  deletePageVariant,
} from "tests/utils";
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
    title: "Variant A",
    label: "New Features A",
    variant: "variant_a",
  },
  {
    title: "Variant B",
    label: "New Features B",
    variant: "variant_b",
  },
  {
    title: "Variant C",
    label: "New Features C",
    variant: "variant_c",
  },
  {
    title: "Variant D",
    label: "New Features D",
    variant: "variant_d",
  },
  {
    title: "Variant E",
    label: "New Features E",
    variant: "variant_e",
  },
  {
    title: "Variant F",
    label: "New Features F",
    variant: "variant_f",
  },
  {
    title: "Variant G",
    label: "New Features G",
    variant: "variant_g",
  },
  {
    title: "Variant H",
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
  test.beforeEach(async ({ page }) => {
    await navigateToPage(page);
    await createNewPage(page, newPageTitle, "Features");

    const variantLabel = page
      .getByTestId("field-label")
      .getByTestId("string-input");
    await variantLabel.click();
    await variantLabel.fill("New Features Test");

    await clickVariantImage(page, index); // select variant
  });

  test.afterEach(`Delete ${variant.label}`, async ({ page }) => {
    await deletePageVariant(page, newPageTitle, variant?.label);
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
