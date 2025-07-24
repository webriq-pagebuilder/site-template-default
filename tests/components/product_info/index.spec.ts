import { test } from "@playwright/test";
import { deletePageVariant, newPageTitle, beforeEachTest } from "@/tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "@/studio/config";
import { isEcommerceEnabled } from "@/tests/config";
import VariantA from "./variant_a";
import VariantB from "./variant_b";

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

test.describe.configure({ timeout: 1_000_000, mode: "parallel" });

productInfoTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test.skip(
      !isEcommerceEnabled,
      "E-commerce is not enabled for this StackShift project."
    );

    test(`Create ${label}`, async ({ page, baseURL }) => {
      console.log(`[INFO] - Testing Product Info ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Product Info", label, index);
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
      console.log(`[DONE] Product Info ${variant} 🚀`);
    });
  });
});
