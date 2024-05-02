import { test, expect } from "@playwright/test";
import {
  newPageTitle,
  beforeEachTest,
  deletePageVariant,
  generateFormId,
  checkFormSubmission,
} from "tests/utils";
import { newsletterInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

import VariantA from "./variant_a";
import VariantB from "./variant_b";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
};

const newsletterVariantTests = [
  {
    name: "Variant A",
    title: "Newsletter Page A",
    label: "New Newsletter A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Newsletter Page B",
    label: "New Newsletter B",
    variant: "variant_b",
  },
];

const commonFieldValues = {
  title: "Newsletter title",
  description: "Updated description for newsletter.",
  formButtonLabel: "Submit newsletter",
  logoAltText: "Newsletter logo",
  thankYouPageUrl: "https://webriq.com/thank-you",
  formFields: [
    {
      name: "email",
      placeholder: newsletterInitialValue?.form?.fields?.[0]?.placeholder,
      value: "sample@webriq.com",
    },
  ],
};

newsletterVariantTests.forEach((variants, index) => {
  const { name, title, label, variant } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 1_000_000, mode: "parallel" });
    const pageTitle = newPageTitle(title);

    test(`Create ${label}`, async ({ page }) => {
      await beforeEachTest(page, pageTitle, "Newsletter", label, index);

      const variantTest = variantModules[variant];
      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
      });
    });

    test.afterEach(`Delete ${label}`, async ({ page }) => {
      await deletePageVariant(page, pageTitle, label);
    });
  });
});

export const form = {
  async addFormFields({ page }) {
    await expect(
      page
        .getByTestId("field-variants.form.subtitle")
        .getByTestId("string-input")
    ).toBeEmpty();
    await expect(
      page.getByTestId("field-variants.form.name").getByTestId("string-input")
    ).toBeEmpty();
    await generateFormId({ page });
    await page.getByRole("button", {
      name: newsletterInitialValue.form?.[0]?.name,
    });
    await page
      .getByTestId("field-variants.form.buttonLabel")
      .getByTestId("string-input")
      .click();
    await page
      .getByTestId("field-variants.form.buttonLabel")
      .getByTestId("string-input")
      .press("Meta+a");
    await page
      .getByTestId("field-variants.form.buttonLabel")
      .getByTestId("string-input")
      .fill(commonFieldValues?.formButtonLabel);
    await page.getByRole("button", { name: "Thank You page" }).click();
    await page
      .getByTestId("field-variants.form.thankYouPage.linkType")
      .getByLabel("External, outside this website")
      .check();
    await page
      .getByTestId("field-variants.form.thankYouPage.linkExternal")
      .getByLabel("URL")
      .click();
    await page
      .getByTestId("field-variants.form.thankYouPage.linkExternal")
      .getByLabel("URL")
      .fill(commonFieldValues?.thankYouPageUrl);
    await page
      .getByTestId("field-variants.form.thankYouPage.linkTarget")
      .getByLabel("Self (default) - open in the")
      .check();
  },
  async sitePreview({ page, pageUrl }) {
    await expect(
      pageUrl.getByPlaceholder(newsletterInitialValue.form.fields?.[0]?.name)
    ).toBeVisible();
    await expect(
      pageUrl.getByLabel(commonFieldValues?.formButtonLabel)
    ).toBeVisible();
    await checkFormSubmission({
      pageUrl: pageUrl,
      formFields: commonFieldValues?.formFields,
      submitBtnLabel: commonFieldValues?.formButtonLabel,
      thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
      page,
    });
  },
};
