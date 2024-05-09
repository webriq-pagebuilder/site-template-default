import { test } from "@playwright/test";
import { beforeEachTest, deletePageVariant, newPageTitle } from "tests/utils";
import VariantA from "./variant_a";
import VariantB from "./variant_b";
import VariantC from "./variant_c";

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

test.describe.configure({ timeout: 600_000, mode: "parallel" });
faqsVariantTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test(`Create ${label}`, async ({ page }) => {
      console.log(`[INFO] - Testing Faqs ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Faqs", label, index);
      const variantTest = variantModules[variant];

      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
      console.log(`[DONE] Faqs ${variant} 🚀`);
    });
  });
});
