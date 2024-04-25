import { test } from "@playwright/test";
import {
  clickVariantImage,
  createNewPage,
  deletePageVariant,
  navigateToPage,
  variantLabelInput,
} from "tests/utils";
import VariantA from "./variant_a.spec";
import VariantB from "./variant_b.spec";
import VariantC from "./variant_c.spec";
import VariantD from "./variant_d.spec";
import VariantE from "./variant_e.spec";

let newPageTitle: string;

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
  variant_d: VariantD,
  variant_e: VariantE,
};

const howItWorksVariantTest = [
  {
    name: "Variant A",
    title: "How It Works Variant A",
    label: "New How It Works A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "How It Works Variant B",
    label: "New How It Works B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "How It Works Variant C",
    label: "New How It Works C",
    variant: "variant_c",
  },
  {
    name: "Variant D",
    title: "How It Works Variant D",
    label: "New How It Works D",
    variant: "variant_d",
  },
  {
    name: "Variant E",
    title: "How It Works Variant E",
    label: "New How It Works E",
    variant: "variant_e",
  },
];

const commonFieldValues = {
  title: "Title Input Test",
  subtitle: "Subtitle Input Test",
  body: "Body Input Test",
  stepsData: [
    {
      title: "Lorem ipsum",
      body: "Fusce quam tellus",
      updatedTitle: "Updated Title 1",
      updatedBody: "Updated Body 1",
    },
    {
      title: "Lorem ipsum",
      body: "Fusce quam tellus",
      updatedTitle: "Updated Title 2",
      updatedBody: "Updated Body 2",
    },
    {
      title: "Lorem ipsum",
      body: "Fusce quam tellus",
      updatedTitle: "Updated Title 3",
      updatedBody: "Updated Body 3",
    },
  ],
};

howItWorksVariantTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;
  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 600_000, mode: "serial" });

    test(`Create ${label}`, async ({ page }) => {
      const time = new Date().getTime();
      newPageTitle = `${title} ` + time;

      await navigateToPage(page);
      await createNewPage(page, newPageTitle, "How It Works");
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
        console.error(`No test module found for variant: ${variant}`);
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
