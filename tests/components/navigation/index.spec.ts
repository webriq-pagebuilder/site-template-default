import ms from "ms";
import { test } from "@playwright/test";
import { navigationInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { beforeEachTest, deletePageVariant, newPageTitle } from "tests/utils";
import { assertPageContent as assertPageContentForVariantA } from "./variant_a";
import { assertPageContent as assertPageContentForVariantB } from "./variant_b";
import { assertPageContent as assertPageContentForVariantC } from "./variant_c";
import { assertPageContent as assertPageContentForVariantD } from "./variant_d";
import { assertPageContent as assertPageContentForVariantE } from "./variant_e";

import {
  addNavigationRoutes,
  expectDocumentPublished,
  launchPreview,
  primaryButtonField,
  secondaryButtonField,
} from "tests/utils";

const variantModules = {
  variant_a: Arrange,
  variant_b: Arrange,
  variant_c: Arrange,
  variant_d: Arrange,
  // variant_e: Arrange,
};

const commonFieldValues = {
  primaryButton: "Primary Button Test",
  secondaryButton: "Secondary Button Test",
  externalLinkUrl: "https://webriq.com",
  internalLinkUrl: `/thank-you`,
  navigationBase: ["Start", "About Us", "Services", "Platform", "Testimonials"],
};

const navigationVariantTest = [
  {
    name: "Variant A",
    title: "Navigation Variant A",
    label: "Navigation New Page A",
    variant: "variant_a",
    isInternalLink: false,
    linkNames: commonFieldValues.navigationBase,
    assertVariant: assertPageContentForVariantA,
  },
  {
    name: "Variant B",
    title: "Navigation Variant B",
    label: "Navigation New Page B",
    variant: "variant_b",
    isInternalLink: false,
    linkNames: commonFieldValues.navigationBase,
    assertVariant: assertPageContentForVariantB,
  },
  {
    name: "Variant C",
    title: "Navigation Variant C",
    label: "Navigation New Page C",
    variant: "variant_c",
    isInternalLink: false,
    linkNames: commonFieldValues.navigationBase,
    assertVariant: assertPageContentForVariantC,
  },
  {
    name: "Variant D",
    title: "Navigation Variant D",
    label: "Navigation New Page D",
    variant: "variant_d",
    isInternalLink: false,
    linkNames: commonFieldValues.navigationBase,
    assertVariant: assertPageContentForVariantD,
  },
  {
    name: "Variant E",
    title: "Navigation Variant E",
    label: "Navigation New Page E",
    variant: "variant_e",
    isInternalLink: false,
    linkNames: commonFieldValues.navigationBase,
    assertVariant: assertPageContentForVariantE,
  },
];

test.describe.configure({ mode: "parallel", timeout: ms("5m") });

export default async function Arrange({
  pageTitle,
  page,
  commonFieldValues,
  linkNames,
  isInternalLink,
  baseURL,
  assertVariant,
}) {
  if (!isInternalLink) {
    //Logo Alt
    const logoAltInput = page
      .getByTestId("field-variants.logo.alt")
      .getByTestId("string-input");
    await logoAltInput.click();
    await logoAltInput.fill("alt text test");
    await page
      .getByTestId("field-variants.logo.linkType")
      .getByText("External, outside this website")
      .click();
    await page.waitForTimeout(1000);
    await page.getByLabel("URL").click();
    await page.getByLabel("URL").fill(commonFieldValues.externalLinkUrl);
    await page.waitForTimeout(1000);
    await page.getByText("Blank - open on a new tab (").click();
  } else {
    await page
      .getByTestId("field-variants.logo.linkType")
      .getByText("Internal, inside this website")
      .click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page
      .getByRole("button", { name: "Thank you Published No" })
      .click({ force: true });
    await page.getByText("Self (default) - open in the").click();
  }

  // Perform navigation clicks
  for (const navigation of commonFieldValues.navigationBase) {
    const buttonName = `${navigation} Internal Link Not Set`;
    await addNavigationRoutes({
      page,
      buttonName,
      commonFieldValues,
      isInternalLink,
    });
  }

  // Primary Button
  await primaryButtonField.checkAndAddValue({
    page,
    initialValue: navigationInitialValue,
    commonFieldValues,
    isInternalLink,
  });

  // Secondary Button
  await secondaryButtonField.checkAndAddValue({
    page,
    initialValue: navigationInitialValue,
    commonFieldValues,
    isInternalLink,
  });

  await expectDocumentPublished(page, pageTitle);

  await launchPreview({ page, baseURL, pageTitle });

  if (typeof assertVariant === "function") {
    assertVariant(page, linkNames, commonFieldValues, isInternalLink);
  }
  // await assertPageContent(page, linkNames, commonFieldValues, isInternalLink);
}

navigationVariantTest.forEach((variants, index) => {
  const { name, title, label, variant, linkNames, isInternalLink } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test(`Create ${label}`, async ({ page, baseURL }) => {
      console.log(`[INFO] - Testing Navigation ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Navigation", label, index);
      const variantTest = variantModules[variant];

      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
        linkNames,
        isInternalLink,
        baseURL,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
      console.log(`[DONE] Navigation ${variant} 🚀`);
    });
  });
});
