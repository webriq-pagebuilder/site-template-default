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
    title: "Features Page A",
    label: "New Features A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Features Page B",
    label: "New Features B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "Features Page C",
    label: "New Features C",
    variant: "variant_c",
  },
  {
    name: "Variant D",
    title: "Features Page D",
    label: "New Features D",
    variant: "variant_d",
  },
  {
    name: "Variant E",
    title: "Features Page E",
    label: "New Features E",
    variant: "variant_e",
  },
  {
    name: "Variant F",
    title: "Features Page F",
    label: "New Features F",
    variant: "variant_f",
  },
  {
    name: "Variant G",
    title: "Features Page G",
    label: "New Features G",
    variant: "variant_g",
  },
  {
    name: "Variant H",
    title: "Features Page H",
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

test.describe.configure({ timeout: 1_200_000, mode: "parallel" });

featuresVariantTests?.forEach((variants, index) => {
  const { name, title, label, variant } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test(`Create ${label}`, async ({ page }) => {
      console.log(`[INFO] - Testing Features ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Features", label, index);

      const variantTest = variantModules[variant];
      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
      });
    });

    test.afterEach(`Delete ${label}`, async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
      console.log(`[DONE] Features ${variant} 🚀`);
    });
  });
});
