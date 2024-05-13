import { test } from "@playwright/test";
import { deletePageVariant, newPageTitle, beforeEachTest } from "tests/utils";
import VariantA from "./variant_a";
import VariantB from "./variant_b";
import VariantC from "./variant_c";
import VariantD from "./variant_d";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
  variant_d: VariantD,
};

const teamVariantTest = [
  {
    name: "Variant A",
    title: "Team Variant A",
    label: "Team New Page A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Team Variant B",
    label: "Team New Page B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "Team Variant C",
    label: "Team New Page C",
    variant: "variant_c",
  },
  {
    name: "Variant D",
    title: "Team Variant D",
    label: "Team New Page D",
    variant: "variant_d",
  },
];

const commonFieldValues = {
  subtitle: "Subtitle Input Test",
  title: "Title Input Test",
  peopleData: [
    {
      newName: "Bailey Danny",
      newJob: "Development of Product",
      body: "Test Body Input 1",
    },
    {
      newName: "Brown Ian",
      newJob: "Development Head",
      body: "Test Body Input 2",
    },
    {
      newName: "Carter Daisy",
      newJob: "Development of Products",
      body: "Test Body Input 3",
    },
    {
      newName: "Robertson Dennis",
      newJob: "Backend Developer",
      body: "Test Body Input 4",
    },
    {
      newName: "Bradley Alice",
      newJob: "Fullstack Developer",
      body: "Test Body Input 5",
    },
    {
      newName: "Ortiz Sahra",
      newJob: "UI/UX Designer",
      body: "Test Body Input 6",
    },
  ],
};

test.describe.configure({ timeout: 1_000_000, mode: "parallel" });

teamVariantTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test(`Create ${label}`, async ({ page, baseURL }) => {
      console.log(`[INFO] - Testing Team ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Team", label, index);
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
      console.log(`[DONE] Team ${variant} 🚀`);
    });
  });
});
