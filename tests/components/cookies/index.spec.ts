import { test } from "@playwright/test";
import { beforeEachTest, deletePageVariant, newPageTitle } from "tests/utils";
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

const faqsVariantTest = [
  {
    name: "Variant A",
    title: "Cookies Variant A",
    label: "Cookies New Page A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Cookies Variant B",
    label: "Cookies New Page B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "Cookies Variant C",
    label: "Cookies New Page C",
    variant: "variant_c",
  },
  {
    name: "Variant D",
    title: "Cookies Variant D",
    label: "Cookies New Page D",
    variant: "variant_d",
  },
  {
    name: "Variant E",
    title: "Cookies Variant E",
    label: "Cookies New Page E",
    variant: "variant_e",
  },
];

const commonFieldValues = {
  heading: "Cookie Heading",
  acceptButton: "Accept Button",
  declineButton: "Decline Button",
  cookiePolicy: "Cookie Policy Input Test",
};

test.describe.configure({ timeout: 600_000, mode: "parallel" });

faqsVariantTest.forEach((variants, index) => {
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
