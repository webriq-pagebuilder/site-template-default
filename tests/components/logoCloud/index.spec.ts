import { test } from "@playwright/test";
import {
  clickVariantImage,
  createNewPage,
  deletePageVariant,
  navigateToPage,
  variantLabelInput,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
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

const logoCloudVariantTest = [
  {
    name: "Variant A",
    title: "Logo Cloud Variant A",
    label: "Logo Cloud New Page A",
    variant: "variant_a",
    isInternalLink: null,
  },
  {
    name: "Variant B",
    title: "Logo Cloud Variant B",
    label: "Logo Cloud New Page B",
    variant: "variant_b",
    isInternalLink: null,
  },
  {
    name: "Variant C",
    title: "Logo Cloud Variant C",
    label: "Logo Cloud New Page C",
    variant: "variant_c",
    isInternalLink: false,
  },
  {
    name: "Variant D",
    title: "Logo Cloud Variant D",
    label: "Logo Cloud New Page D",
    variant: "variant_d",
    isInternalLink: null,
  },
];

const commonFieldValues = {
  title: "Title Input Test",
  body: "Body Input Test",
  primaryBtn: "Primary Button Test",
  externalLinkUrl: "https://www.webriq.com/",
  internalLinkUrl: `${NEXT_PUBLIC_SITE_URL}/thank-you/`,
};

logoCloudVariantTest.forEach((variants, index) => {
  const { name, title, label, variant, isInternalLink } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 600_000, mode: "serial" });

    test(`Create ${label}`, async ({ page }) => {
      const time = new Date().getTime();
      newPageTitle = `${title} ` + time;

      await navigateToPage(page);
      await createNewPage(page, newPageTitle, "Logo Cloud");
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
