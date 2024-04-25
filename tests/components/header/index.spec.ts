import { test } from "@playwright/test";
import {
  autologin_studio,
  navigateToPage,
  clickVariantImage,
  createNewPage,
  deletePageVariant,
  variantLabelInput,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import VariantA from "./variant_a.spec";
import VariantB from "./variant_b.spec";
import VariantC from "./variant_c.spec";
import VariantD from "./variant_d.spec";
import VariantE from "./variant_e.spec";

let newPageTitle: string;

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
    test.describe.configure({ timeout: 600_000, mode: "serial" });

    test(`Create ${label}`, async ({ page }) => {
      const time = new Date().getTime();
      newPageTitle = `${title} ` + time;

      await createNewPage(page, newPageTitle, "Header");
      await variantLabelInput(page, label);
      await clickVariantImage(page, index); // select variant
      const variantTest = variantModules[variant];

      if (variantTest) {
        await variantTest({
          variantTitle: newPageTitle,
          page,
          commonFieldValues,
          isInternalLink,
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
