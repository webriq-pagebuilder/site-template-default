import { test } from "@playwright/test";
import { beforeEachTest, deletePageVariant, newPageTitle } from "tests/utils";
import VariantA from "./variant_a";

const variantModules = {
  variant_a: VariantA,
};

const cookiesVariantTest = [
  {
    name: "Variant A",
    title: "Cookies Variant A",
    label: "Cookies New Page A",
    variant: "variant_a",
  },
];

const commonFieldValues = {
  heading: "Cookie Heading",
  description: "Cookie Description",
  siteName: "WebriQ",
  acceptButton: "Accept Button",
  declineButton: "Decline Button",
  cookiePolicy: "Cookie Policy Input Test",
};

test.describe.configure({ timeout: 600_000, mode: "parallel" });

cookiesVariantTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test(`Create ${label}`, async ({ page, baseURL }) => {
      console.log(`[INFO] - Testing Cookies ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Cookies", label, index);
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
      console.log(`[DONE] Cookies ${variant} 🚀`);
    });
  });
});
