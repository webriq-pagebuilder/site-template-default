import { test } from "@playwright/test";
import {
  navigateToPage,
  clickVariantImage,
  createNewPage,
  deletePageVariant,
  variantLabelInput,
  newPageTitle,
  beforeEachTest,
} from "tests/utils";
import VariantA from "./variant_a.spec";
import VariantB from "./variant_b.spec";
import VariantC from "./variant_c.spec";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
};

const textVariantTest = [
  {
    name: "Variant A",
    title: "Text Variant A",
    label: "Text New Page A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Text Variant B",
    label: "Text New Page B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "Text Variant C",
    label: "Text New Page C",
    variant: "variant_c",
  },
];

const commonFieldValues = {
  title: "Great Quality Title",
  firstContent: "First Content Test",
  secondContent: "Second Content Test",
  thirdContent: "Third Content Test",
};

textVariantTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 600_000, mode: "parallel" });
    const pageTitle = newPageTitle(title);

    test(`Create ${label}`, async ({ page }) => {
      await beforeEachTest(page, pageTitle, "Text Component", label, index);
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
