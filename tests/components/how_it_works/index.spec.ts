import { test } from "@playwright/test";
import { beforeEachTest, deletePageVariant, newPageTitle } from "tests/utils";
import VariantA from "./variant_a";
import VariantB from "./variant_b";
import VariantC from "./variant_c";
import VariantD from "./variant_d";
import VariantE from "./variant_e";

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

test.describe.configure({ timeout: 1_200_000, mode: "parallel" });

howItWorksVariantTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test(`Create ${label}`, async ({ page, baseURL }) => {
      console.log(`[INFO] - Testing How It Works ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "How It Works", label, index);
      const variantTest = variantModules[variant];

      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
      console.log(`[DONE] How It Works ${variant} 🚀`);
    });
  });
});
