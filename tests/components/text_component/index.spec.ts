import { test } from "@playwright/test";
import { deletePageVariant, newPageTitle, beforeEachTest } from "tests/utils";
import VariantA from "./variant_a";
import VariantB from "./variant_b";
import VariantC from "./variant_c";

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

test.describe.configure({ timeout: 600_000, mode: "serial" });

textVariantTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
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
