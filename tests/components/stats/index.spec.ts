import { test } from "@playwright/test";
import {
  navigateToPage,
  clickVariantImage,
  createNewPage,
  deletePageVariant,
  variantLabelInput,
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

statisticsVariantTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 600_000, mode: "serial" });

    test(`Create ${label}`, async ({ page }) => {
      const time = new Date().getTime();
      newPageTitle = `${title} ` + time;

      await navigateToPage(page);
      await createNewPage(page, newPageTitle, "Statistics");
      await variantLabelInput(page, label);
      await clickVariantImage(page, index); // select variant

      const variantTest = variantModules[variant];

      if (variantTest) {
        await variantTest({
          variantTitle: newPageTitle,
          page,
          commonFieldValues,
        });
      } else {
        console.error(`No test module found for variant: ${index}`);
      }
    });

    test(`Delete ${title}`, async ({ page }) => {
      await deletePageVariant(page, newPageTitle, label);
    });
  });
});

test.afterAll(async ({ page }) => {
  await page.close();
});
