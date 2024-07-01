import { test } from "@playwright/test";
import { beforeEachTest, deletePageVariant, newPageTitle } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import VariantA from "./variant_a";
import VariantB from "./variant_b";
import { isEcommerceEnabled } from "tests/config";

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

test.describe.configure({ timeout: 1_200_000, mode: "parallel" });

featuredProductsTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test.skip(
      !isEcommerceEnabled,
      "E-commerce is not enabled for this StackShift project."
    );

    test(`Create ${label}`, async ({ page, baseURL }) => {
      console.log(`[INFO] - Testing Featured Products ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Featured Products", label, index);
      const variantTest = variantModules[variant];

      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
        baseURL,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
      console.log(`[DONE] Featured Products ${variant} 🚀`);
    });
  });
});
