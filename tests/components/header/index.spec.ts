import { test } from "@playwright/test";
import { beforeEachTest, deletePageVariant, newPageTitle } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
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

const headersVariantTest = [
  {
    name: "Variant A",
    title: "Header Variant A",
    label: "Header New Page Variant A",
    variant: "variant_a",
    isInternalLink: true,
  },
  {
    name: "Variant B",
    title: "Header Page B",
    label: "Header New Page Variant B",
    variant: "variant_b",
    isInternalLink: true,
  },
  {
    name: "Variant C",
    title: "Header Page C",
    label: "Header New Page Variant C",
    variant: "variant_c",
    isInternalLink: false,
  },
  {
    name: "Variant D",
    title: "Header Page D",
    label: "Header New Page Variant D",
    variant: "variant_d",
    isInternalLink: false,
  },
  {
    name: "Variant E",
    title: "Header Page E",
    label: "Header New Page Variant E",
    variant: "variant_e",
    isInternalLink: false,
  },
];

const commonFieldValues = {
  title: "Title Input Test",
  subtitle: "Subtitle Input Test",
  formName: "Create an account test",
  submitButton: "Button Input Test",
  description: "Description Input Test",
  primaryButton: "Primary Button Test",
  secondaryButton: "Secondary Button Test",
  externalLinkUrl: "https://webriq.com/",
  internalLinkUrl: `${NEXT_PUBLIC_SITE_URL}/thank-you/`,
};

headersVariantTest.forEach((variants, index) => {
  const { name, title, label, variant, isInternalLink } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 600_000, mode: "parallel" });
    const pageTitle = newPageTitle(title);

    test(`Create ${label}`, async ({ page }) => {
      await beforeEachTest(page, pageTitle, "Header", label, index);
      const variantTest = variantModules[variant];

      if (variantTest) {
        await variantTest({
          pageTitle,
          page,
          commonFieldValues,
          isInternalLink,
        });
      } else {
        console.error(`No test module found for variant: ${index}`);
      }
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
    });
  });
});

test.afterAll(async ({ page }) => {
  await page.close();
});
