import { test, expect } from "@playwright/test";
import {
  deletePageVariant,
  newPageTitle,
  beforeEachTest,
  createNewPage,
  navigateToPages,
  searchForName,
} from "tests/utils";
import VariantA from "./variant_a";
import VariantB from "./variant_b";
import ms from "ms";

const variantModules = {
  // variant_a: VariantA,
  variant_b: VariantB,
};

const commonFieldValues = {
  subtitle: "Subtitle Input Test",
  formName: "Form Name Test",
  signInButton: "Sign In Button Test",
  internalLinkUrl: `/thank-you`,
  externalLinkUrl: "https://webriq.com",
  formFields: [
    {
      name: "First Name",
      updatedName: "Name First",
      placeholder: "First Name",
      input: "First name",
    },
    {
      name: "Last Name",
      updatedName: "Name Last",
      placeholder: "Last Name",
      input: "Last name",
    },
    {
      name: "Email",
      updatedName: "Updated Email",
      placeholder: "Enter your email address",
      input: "test@gmail.com",
    },
    {
      name: "Password",
      updatedName: "Updated Password",
      placeholder: "Enter your password",
      input: "Test Password",
    },
  ],
  formLinks: [
    {
      name: "Police privacy",
      updatedName: "Privacy Policy",
    },
    {
      name: "Terms of Use",
      updatedName: "Use of Terms",
    },
  ],
};

const signInSignupVariantTest = [
  {
    name: "Variant A",
    title: "Sign In Sign Up Variant A",
    label: "Sign In Sign Up New Page A",
    variant: "variant_a",
    isInternalLink: true,
    linkNames: commonFieldValues.formLinks
      .map((link) => link.updatedName)
      .concat(commonFieldValues.signInButton),
  },
  {
    name: "Variant B",
    title: "Sign In Sign Up Variant B",
    label: "Sign In Sign Up New Page B",
    variant: "variant_b",
    isInternalLink: false,
    linkNames: commonFieldValues.formLinks
      .map((link) => link.updatedName)
      .concat(commonFieldValues.signInButton),
  },
];

export async function setupInternalLink(page, fieldId) {
  await page
    .getByTestId(`field-variants.${fieldId}.linkType`)
    .getByText("Internal, inside this website")
    .click();
  // await page.getByTestId("autocomplete").click();
  await page
    .getByTestId(`field-variants.${fieldId}`)
    .getByTestId("autocomplete");
  await page
    .getByTestId(`field-variants.${fieldId}`)
    .getByTestId("autocomplete")
    .fill("thank you");
  await page
    .getByRole("button", { name: "Thank You Page Published No" })
    .click();
  await page
    .getByTestId(`field-variants.${fieldId}.linkTarget`)
    .getByText("Self (default) - open in the")
    .click();
}

export async function setupExternalLink(
  page,
  fieldId,
  externalLinkUrl,
  isOpenInNewTab = false
) {
  await page
    .getByTestId(`field-variants.${fieldId}.linkType`)
    .getByText("External, outside this website")
    .click();
  await page
    .getByTestId(`field-variants.${fieldId}.linkExternal`)
    .getByLabel("URL")
    .click();
  await page
    .getByTestId(`field-variants.${fieldId}.linkExternal`)
    .getByLabel("URL")
    .fill(externalLinkUrl);
  if (isOpenInNewTab) {
    await page
      .getByTestId(`field-variants.${fieldId}.linkTarget`)
      .getByText("Blank - open on a new tab (")
      .click();
  }
}

test.describe.configure({ timeout: 1_000_000, mode: "parallel" });

signInSignupVariantTest.forEach((variants, index) => {
  const { name, title, label, variant, isInternalLink, linkNames } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
    test.beforeEach(async ({ page }) => {
      await navigateToPages(page);
      await searchForName(page, {
        name: "Thank You Page",
      });

      const thankYouPageLink = page.getByRole("link", {
        name: "Thank You Page Published",
      });
      console.log("🚀 ~ test.beforeEach ~ thankYouPageLink:", thankYouPageLink);

      if ((await thankYouPageLink.count()) === 0) {
        console.warn("Thank You Page is not published, creating it!");
        await createNewPage(page, "Thank You Page");
      }
    });

    test(`Create ${label}`, async ({ page, baseURL }) => {
      console.log(`[INFO] - Testing Sign in Sign up ${variant} 🚀`);
      await beforeEachTest(page, pageTitle, "Sign In Sign Up", label, index);
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
      console.log(`[DONE] Sign in Sign up ${variant} 🚀`);
    });
  });
});
