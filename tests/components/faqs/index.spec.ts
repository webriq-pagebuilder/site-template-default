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

let newPageTitle: string;

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
};

const faqsVariantTest = [
  {
    name: "Variant A",
    title: "Faqs Variant A",
    label: "Faqs New Page A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Faqs Variant B",
    label: "Faqs New Page B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "Faqs Variant C",
    label: "Faqs New Page C",
    variant: "variant_c",
  },
];

const commonFieldValues = {
  title: "Title Input Test",
  subtitle: "Subtitle Input Test",
  faqsData: [
    {
      value: "Lorem ipsum dolor sit amet",
      updateQuestion: "Question 1",
      updateAnswer: "Answer 1",
    },
    {
      value: "Nunc maximus",
      updateQuestion: "Question 2",
      updateAnswer: "Answer 2",
    },
    {
      value: "Nam feugiat ex",
      updateQuestion: "Question 3",
      updateAnswer: "Answer 3",
    },
    {
      value: "In hac habitasse",
      updateQuestion: "Question 4",
      updateAnswer: "Answer 4",
    },
    {
      value: "Nullam congue",
      updateQuestion: "Question 5",
      updateAnswer: "Answer 5",
    },
  ],
};

faqsVariantTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 1000000, mode: "serial" });

    test(`Create ${label}`, async ({ page }) => {
      const time = new Date().getTime();
      newPageTitle = `${title} ` + time;

      await navigateToPage(page);
      await createNewPage(page, newPageTitle, "Faqs");
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
