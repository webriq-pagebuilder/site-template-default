import { test } from "@playwright/test";
import { beforeEachTest, deletePageVariant, newPageTitle } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import VariantA from "./variant_a";
import VariantB from "./variant_b";
import VariantC from "./variant_c";
import VariantD from "./variant_d";

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

test.describe.configure({ timeout: 600_000, mode: "serial" });

logoCloudVariantTest.forEach((variants, index) => {
  const { name, title, label, variant, isInternalLink } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test(`Create ${label}`, async ({ page }) => {
      await beforeEachTest(page, pageTitle, "Logo Cloud", label, index);
      const variantTest = variantModules[variant];

      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
        isInternalLink,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
    });
  });
});
