import { test } from "@playwright/test";
import { deletePageVariant, newPageTitle, beforeEachTest } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import VariantA from "./variant_a";
import VariantB from "./variant_b";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
};

const commonFieldValues = {
  subtitle: "Subtitle Input Test",
  formName: "Form Name Test",
  signInButton: "Sign In Button Test",
  internalLinkUrl: `${NEXT_PUBLIC_SITE_URL}/thank-you`,
  externalLinkUrl: "https://facebook.com",
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
    isInternalLink: false,
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

test.describe.configure({ timeout: 1_000_000, mode: "parallel" });

signInSignupVariantTest.forEach((variants, index) => {
  const { name, title, label, variant, isInternalLink, linkNames } = variants;
  const pageTitle = newPageTitle(title);

  test.describe(`${name}`, () => {
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
