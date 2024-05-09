import { test } from "@playwright/test";
import { deletePageVariant, beforeEachTest, newPageTitle } from "tests/utils";
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

const commonFieldValues = {
  footerBody: "Footer Body Input",
  copyrightText: "Copyright Input",
  externalLinkUrl: "https://facebook.com",
  internalLinkUrl: `${NEXT_PUBLIC_SITE_URL}/thank-you/`,
  contactInfo: [
    { name: "359 Hidden Valley Road", updatedName: "Contact Address" },
    { name: "hello@webriq.com", updatedName: "webriq@test.com" },
    { name: "+48 698 033 101", updatedName: "00 000 000 000" },
  ],
  navigationBase: [
    "facebook",
    "twitter",
    "instagram",
    "Start",
    "About Us",
    "Services",
    "Platform",
    "Testimonials",
  ],
  exploreLinks: ["Terms and Conditions", "Privacy Policy", "Cookies"],
};

const footerVariantTest = [
  {
    name: "Variant A",
    title: "Footer Page A",
    label: "Footer New Page A",
    variant: "variant_a",
    isInternalLink: true,
    linkNames: commonFieldValues.navigationBase.slice(0, 3),
  },
  {
    name: "Variant B",
    title: "Footer Page B",
    label: "Footer New Page B",
    variant: "variant_b",
    isInternalLink: true,
    linkNames: commonFieldValues.navigationBase,
  },
  {
    name: "Variant C",
    title: "Footer Page C",
    label: "Footer New Page C",
    variant: "variant_c",
    isInternalLink: false,
    linkNames: commonFieldValues.navigationBase,
  },
  {
    name: "Variant D",
    title: "Footer Page D",
    label: "Footer New Page D",
    variant: "variant_d",
    isInternalLink: false,
    linkNames: [
      ...commonFieldValues.navigationBase,
      ...commonFieldValues.exploreLinks,
    ],
  },
];

test.describe.configure({ timeout: 1_500_000, mode: "parallel" });

footerVariantTest.forEach((variants, index) => {
  const { name, title, label, variant, linkNames, isInternalLink } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test(`Create ${label}`, async ({ page }) => {
      console.log(`[INFO] - Testing Footer ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Footer", label, index);
      const variantTest = variantModules[variant];

      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
        linkNames,
        isInternalLink,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
      console.log(`[DONE] Footer ${variant} 🚀`);
    });
  });
});
