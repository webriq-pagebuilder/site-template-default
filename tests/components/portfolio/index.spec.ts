import { test } from "@playwright/test";
import { beforeEachTest, deletePageVariant, newPageTitle } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
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

const portfolioVariantTest = [
  {
    name: "Variant A",
    title: "Portfolio Variant A ",
    label: "Portfolio New Page A",
    variant: "variant_a",
    isInternalLink: true,
  },
  {
    name: "Variant B",
    title: "Portfolio Variant B ",
    label: "Portfolio New Page B",
    variant: "variant_b",
    isInternalLink: true,
  },
  {
    name: "Variant C",
    title: "Portfolio Variant C ",
    label: "Portfolio New Page C",
    variant: "variant_c",
    isInternalLink: false,
  },
  {
    name: "Variant D",
    title: "Portfolio Variant D ",
    label: "Portfolio New Page D",
    variant: "variant_d",
    isInternalLink: false,
  },
];

const commonFieldValues = {
  title: "Title Test Input",
  subtitle: "Subtitle Test Input",
  button: "View Project Test",
  externalLinkUrl: "https://webriq.com",
  internalLinkUrl: `${NEXT_PUBLIC_SITE_URL}/thank-you`,
  categories: [
    {
      name: "Category 1",
      updatedName: "Test Category 1",
    },
    {
      name: "Category 2",
      updatedName: "Test Category 2",
    },
    {
      name: "Category 3",
      updatedName: "Test Category 3",
    },
    {
      name: "Category 4",
      updatedName: "Test Category 4",
    },
  ],
};

portfolioVariantTest.forEach((variants, index) => {
  const { name, title, label, variant, isInternalLink } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 1_200_000, mode: "parallel" });
    const pageTitle = newPageTitle(title);

    test(`Create ${label}`, async ({ page }) => {
      await beforeEachTest(page, pageTitle, "Portfolio", label, index);
      const variantTest = variantModules[variant];

      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
        isInternalLink,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
    });
  });
});
