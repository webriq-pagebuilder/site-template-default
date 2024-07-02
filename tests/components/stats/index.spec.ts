import { test } from "@playwright/test";
import { deletePageVariant, beforeEachTest, newPageTitle } from "tests/utils";
import VariantA from "./variant_a";
import VariantB from "./variant_b";
import VariantC from "./variant_c";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
};

const statisticsVariantTest = [
  {
    name: "Variant A",
    title: "Statistics Variant A",
    label: "Statistics New Page A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Statistics Variant B",
    label: "Statistics New Page B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "Statistics Variant C",
    label: "Statistics New Page C",
    variant: "variant_c",
  },
];

const commonFieldValues = [
  {
    label: "Total Revenue",
    value: "$33,261",
    updatedLabel: "Revenue Total",
    updatedValue: "$100",
  },
  {
    label: "Subscribers",
    value: "481,095",
    updatedLabel: "Subscribers Test",
    updatedValue: "10000",
  },
  {
    label: "Conversations",
    value: "643,553",
    updatedLabel: "Conversations Test",
    updatedValue: "50,100",
  },
  {
    label: "Modal Sale Rate",
    value: "25%",
    updatedLabel: "Sale Rate Test",
    updatedValue: "50%",
  },
];

test.describe.configure({ timeout: 600_000, mode: "parallel" });

statisticsVariantTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test(`Create ${label}`, async ({ page, baseURL }) => {
      console.log(`[INFO] - Testing Statistics ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Statistics", label, index);
      const variantTest = variantModules[variant];

      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
        baseURL,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
      console.log(`[DONE] Statistics ${variant} 🚀`);
    });
  });
});
