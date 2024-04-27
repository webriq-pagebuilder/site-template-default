import { test } from "@playwright/test";
import { deletePageVariant, newPageTitle, beforeEachTest } from "tests/utils";
import VariantA from "./variant_a.spec";
import VariantB from "./variant_b.spec";
import VariantC from "./variant_c.spec";
import VariantD from "./variant_d.spec";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
  variant_d: VariantD,
};

const testimonialVariantTest = [
  {
    name: "Variant A",
    title: "Testimonials Variant A",
    label: "Testimonials New Page A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Testimonials Variant B",
    label: "Testimonials New Page B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "Testimonials Variant C",
    label: "Testimonials New Page C",
    variant: "variant_c",
  },
  {
    name: "Variant D",
    title: "Testimonials Variant D",
    label: "Testimonials New Page D",
    variant: "variant_d",
  },
];

const commonFieldValues = [
  {
    name: "Daisy Carter",
    fullName: "Carter Daisy",
    currentJob: "Product Development",
    jobTitle: "Development of Product",
    testimony: "Carter Daisy Testimony",
  },
  {
    name: "Alice Bradley",
    fullName: "Bradley Alice",
    currentJob: "Backend Developer",
    jobTitle: "Frontend Developer",
    testimony: "Bradley Alice Testimony",
  },
  {
    name: "Ian Brown",
    fullName: "Brown Ian",
    currentJob: "Head of Development",
    jobTitle: "Development Head",
    testimony: "Brown Ian Testimony",
  },
  {
    name: "Dennis Robertson",
    fullName: "Dennis Robertson",
    currentJob: "Frontend Developer",
    jobTitle: "Fullstack Developer",
    testimony: "Dennis Robertson Testimony",
  },
];

testimonialVariantTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 1_000_000, mode: "parallel" });
    const pageTitle = newPageTitle(title);

    test(`Create ${label}`, async ({ page }) => {
      await beforeEachTest(page, pageTitle, "Testimonials", label, index);
      const variantTest = variantModules[variant];

      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
    });
  });
});

test.afterAll(async ({ page }) => {
  await page.close();
});
