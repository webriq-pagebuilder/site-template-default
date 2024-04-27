import { test } from "@playwright/test";
import { deletePageVariant, beforeEachTest, newPageTitle } from "tests/utils";
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

const blogVariantTest = [
  {
    name: "Variant A",
    title: "Blog Variant A",
    label: "Blog New Page A",
    variant: "variant_a",
    isInternalLink: true,
  },
  {
    name: "Variant B",
    title: "Blog Page B",
    label: "Blog New Page B",
    variant: "variant_b",
    isInternalLink: true,
  },
  {
    name: "Variant C",
    title: "Blog Page C",
    label: "Blog New Page C",
    variant: "variant_c",
    isInternalLink: false,
  },
  {
    name: "Variant D",
    title: "Blog Page D",
    label: "Blog New Page D",
    variant: "variant_d",
    isInternalLink: false,
  },
];

const commonFieldValues = {
  title: "Blog Title Test",
  subtitle: "Subtitle Test",
  referencedBlog: "Mariel test blogs",
  button: "View More",
  internalLinkUrl: `${NEXT_PUBLIC_SITE_URL}/thank-you`,
  externalLinkUrl: "https://webriq.com",
};

blogVariantTest.forEach((variants, index) => {
  const { name, title, label, variant, isInternalLink } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 600_000, mode: "parallel" });
    const pageTitle = newPageTitle(title);

    test(`Create ${label}`, async ({ page }) => {
      await beforeEachTest(page, pageTitle, "Blog", label, index);
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

test.afterAll(async ({ page }) => {
  await page.close();
});
