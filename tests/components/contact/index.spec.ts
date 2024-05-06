import { test, expect } from "@playwright/test";
import {
  newPageTitle,
  beforeEachTest,
  checkFormSubmission,
  deletePageVariant,
  generateFormId,
} from "tests/utils";
import { contactInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

import VariantA from "./variant_a";
import VariantB from "./variant_b";

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
};

const contactVariantTests = [
  {
    name: "Variant A",
    title: "Contact Page A",
    label: "New Contact A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Contact Page B",
    label: "New Contact B",
    variant: "variant_b",
  },
];

const initialValue = {
  title: contactInitialValue?.title,
  description: contactInitialValue?.contactDescription,
  officeInformation: contactInitialValue?.officeInformation,
  contactEmail: contactInitialValue?.contactEmail,
  contactNumber: contactInitialValue?.contactNumber,
  socialLinks: contactInitialValue?.socialLinks,
  form: {
    buttonLabel: contactInitialValue?.form?.buttonLabel,
    block: contactInitialValue?.block?.[0]?.children?.[0]?.text,
  },
};

const commonFieldValues = {
  title: "Contact title",
  description: "Updated description for new contact.",
  socialLinks: {
    facebook: "https://www.facebook.com/webriq",
    twitter: "https://twitter.com/WebriQGoesMad",
    instagram: "https://www.instagram.com/webriqgoesmad/",
  },
  contactDetails: {
    office: "123 Sample Address",
    number: "+12 34567",
    email: "sample@webriq.com",
  },
  formButtonLabel: "Submit Contact",
  thankYouPageUrl: "https://webriq.com/thank-you",
  formFields: [
    {
      name: "subject",
      placeholder: contactInitialValue?.form?.fields?.[0]?.placeholder,
      value: "Test Form submission",
    },
    {
      name: "name",
      placeholder: contactInitialValue?.form?.fields?.[1]?.placeholder,
      value: "WebriQ Form",
    },
    {
      name: "email",
      placeholder: contactInitialValue?.form?.fields?.[2]?.placeholder,
      value: "sample@webriq.com",
    },
    {
      name: "message",
      placeholder: contactInitialValue?.form?.fields?.[3]?.placeholder,
      value: "This is a sample submission to test WebriQ Forms.",
    },
  ],
  formBlock: "I agree to all the terms and conditions",
};

test.describe.configure({ timeout: 1_000_000, mode: "parallel" });

contactVariantTests?.forEach((variant, index) => {
  test.describe(`${variant.name}`, () => {
    const pageTitle = newPageTitle(variant?.title);

    test(`Create ${variant.label}`, async ({ page }) => {
      await beforeEachTest(page, pageTitle, "Contact", variant?.label, index);

      const variantTest = variantModules[variant.variant];
      await variantTest({
        pageTitle,
        page,
        initialValue,
        commonFieldValues,
      });
    });

    test.afterEach(`Delete ${variant.label}`, async ({ page }) => {
      await deletePageVariant(page, pageTitle, variant.label);
    });
  });
});

export const form = {
  async addContactFormFields({ page, initialValue, commonFieldValues }) {
    await generateFormId({ page });
    await expect(
      page
        .getByTestId("field-variants.form.buttonLabel")
        .getByTestId("string-input")
    ).toHaveValue(initialValue.form.buttonLabel);
    await page
      .getByTestId("field-variants.form.buttonLabel")
      .getByTestId("string-input")
      .fill("");
    await page
      .getByTestId("field-variants.form.buttonLabel")
      .getByTestId("string-input")
      .fill(commonFieldValues?.formButtonLabel);
    await page
      .getByRole("button", { name: "Thank You page" })
      .click({ force: true });
    await page
      .getByLabel("External, outside this website")
      .check({ force: true, timeout: 120_000 });
    await page.getByLabel("URL").click({ force: true });
    await page.getByLabel("URL").fill(commonFieldValues?.thankYouPageUrl);
    await page
      .getByLabel("Self (default) - open in the")
      .check({ force: true });
    await expect(
      page.getByTestId("activate-overlay").locator("div").first()
    ).toBeVisible();
    await page.getByText("Click to activate").click({ force: true });
    await expect(page.getByText("I agree to terms and")).toContainText(
      initialValue.form.block
    );
    await page.getByTestId("text-style--normal").nth(1).click({ force: true });
    await page.getByTestId("scroll-container").getByRole("textbox").fill("");
    await page
      .getByTestId("scroll-container")
      .getByRole("textbox")
      .fill(commonFieldValues.formBlock);
  },
  async contactSitePreview({ page, pageUrl, commonFieldValues }) {
    await expect(pageUrl.getByPlaceholder("Subject")).toBeVisible();
    await expect(
      pageUrl.getByPlaceholder("Name", { exact: true })
    ).toBeVisible();
    await expect(pageUrl.getByPlaceholder("name@example.com")).toBeVisible();
    await expect(pageUrl.getByPlaceholder("Message...")).toBeVisible();
    await expect(pageUrl.getByLabel("Add file")).toBeVisible();
    await expect(pageUrl.getByLabel("Agree to terms")).not.toBeChecked();
    await expect(
      pageUrl.getByLabel(commonFieldValues?.formButtonLabel)
    ).toBeVisible();
    await checkFormSubmission({
      page,
      thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
      pageUrl: pageUrl,
      formFields: commonFieldValues?.formFields,
      submitBtnLabel: commonFieldValues?.formButtonLabel,
      hasRequiredCheckbox: true,
    });
  },
};
