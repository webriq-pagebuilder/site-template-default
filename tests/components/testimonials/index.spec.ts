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
import VariantD from "./variant_d.spec";

let newPageTitle: string;

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
    test.describe.configure({ timeout: 600_000, mode: "serial" });

    test(`Create ${label}`, async ({ page }) => {
      const time = new Date().getTime();
      newPageTitle = `${title} ` + time;

      await navigateToPage(page);
      await createNewPage(page, newPageTitle, "Testimonial");
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
