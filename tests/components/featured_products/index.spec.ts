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

let newPageTitle: string;

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
};

const featuredProductsTest = [
  {
    name: "Variant A",
    title: "Featured Products Variant A",
    label: "Featured Products New Page A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Featured Products Variant B",
    label: "Featured Products New Page B",
    variant: "variant_b",
  },
];

const commonFieldValues = {
  products: [
    {
      name: "SAMPLE. Yellow Dress",
      price: "$15.00",
      link: `${NEXT_PUBLIC_SITE_URL}/products/sample-yellow-dress`,
    },
    {
      name: "SAMPLE. Black Dress",
      price: "$110.00",
      link: `${NEXT_PUBLIC_SITE_URL}/products/sample-black-dress`,
    },
    {
      name: "SAMPLE. Sunglasses",
      price: "$19.95",
      link: `${NEXT_PUBLIC_SITE_URL}/products/sample-sunglasses`,
    },
    {
      name: "SAMPLE. Boardshorts",
      price: "$55.00",
      link: `${NEXT_PUBLIC_SITE_URL}/products/sample-boardshorts`,
    },
    {
      name: "Staging Sample Products",
      price: "$140.75",
      link: `${NEXT_PUBLIC_SITE_URL}/products/staging-sample-product`,
    },
  ],
  socialLinks: [
    { name: "facebook", socialLinkUrl: "https://facebook.com" },
    { name: "other", socialLinkUrl: "https://instagram.com" },
    { name: "twitter", socialLinkUrl: "https://twitter.com" },
  ],
};

featuredProductsTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 600_000, mode: "serial" });

    test(`Create ${label}`, async ({ page }) => {
      const time = new Date().getTime();
      newPageTitle = `${title} ` + time;

      await navigateToPage(page);
      await createNewPage(page, newPageTitle, "Featured Products");
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
