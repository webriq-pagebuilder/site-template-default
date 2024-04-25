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

let newPageTitle: string;

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
};

const productInfoTest = [
  {
    name: "Variant A",
    title: "Product Info Variant A",
    label: "Product Info New Page A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Product Info Variant B",
    label: "Product Info New Page B",
    variant: "variant_b",
  },
];

const commonFieldValues = {
  wishlistUrl: `${NEXT_PUBLIC_SITE_URL}/wishlist`,
  socialLinks: [
    { name: "facebook", socialLinkUrl: "https://facebook.com/" },
    { name: "other", socialLinkUrl: "https://instagram.com/" },
    { name: "twitter", socialLinkUrl: "https://twitter.com/" },
  ],
};

productInfoTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 600_000, mode: "serial" });

    test(`Create ${label}`, async ({ page }) => {
      const time = new Date().getTime();
      newPageTitle = `${title} ` + time;

      await navigateToPage(page);
      await createNewPage(page, newPageTitle, "Product Info");
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
