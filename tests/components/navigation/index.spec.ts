import { test } from "@playwright/test";
import {
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

const commonFieldValues = {
  primaryButton: "Primary Button Test",
  secondaryButton: "Secondary Button Test",
  externalLinkUrl: "https://facebook.com",
  internalLinkUrl: `${NEXT_PUBLIC_SITE_URL}/thank-you/`,
  navigationBase: ["Start", "About Us", "Services", "Platform", "Testimonials"],
};

const navigationVariantTest = [
  {
    name: "Variant A",
    title: "Navigation Variant A",
    label: "Navigation New Page A",
    variant: "variant_a",
    isInternalLink: true,
    linkNames: commonFieldValues.navigationBase.concat(
      commonFieldValues.primaryButton,
      commonFieldValues.secondaryButton
    ),
  },
  {
    name: "Variant B",
    title: "Navigation Variant B",
    label: "Navigation New Page B",
    variant: "variant_b",
    isInternalLink: true,
    linkNames: commonFieldValues.navigationBase.concat(
      commonFieldValues.primaryButton,
      commonFieldValues.secondaryButton
    ),
  },
  {
    name: "Variant C",
    title: "Navigation Variant C",
    label: "Navigation New Page C",
    variant: "variant_c",
    isInternalLink: false,
    linkNames: commonFieldValues.navigationBase.concat(
      commonFieldValues.primaryButton,
      commonFieldValues.secondaryButton
    ),
  },
  {
    name: "Variant D",
    title: "Navigation Variant D",
    label: "Navigation New Page D",
    variant: "variant_d",
    isInternalLink: false,
    linkNames: commonFieldValues.navigationBase.concat(
      commonFieldValues.primaryButton,
      commonFieldValues.secondaryButton
    ),
  },
  {
    name: "Variant E",
    title: "Navigation Variant E",
    label: "Navigation New Page E",
    variant: "variant_e",
    isInternalLink: false,
    linkNames: commonFieldValues.navigationBase,
  },
];

navigationVariantTest.forEach((variants, index) => {
  const { name, title, label, variant, linkNames, isInternalLink } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 600_000, mode: "serial" });

    test(`Create ${label}`, async ({ page }) => {
      const time = new Date().getTime();
      newPageTitle = `${title} ` + time;

      await navigateToPage(page);
      await createNewPage(page, newPageTitle, "Navigation");
      await variantLabelInput(page, label);
      await clickVariantImage(page, index); // select variant
      const variantTest = variantModules[variant];

      if (variantTest) {
        await variantTest({
          variantTitle: newPageTitle,
          page,
          commonFieldValues,
          linkNames,
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
