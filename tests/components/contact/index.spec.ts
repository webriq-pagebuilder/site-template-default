import { test, expect } from "@playwright/test";
import {
  newPageTitle,
  beforeEachTest,
  deletePageVariant,
  checkFormSubmission,
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
};

contactVariantTests?.forEach((variant, index) => {
  test.describe(`${variant.name}`, () => {
    test.describe.configure({ timeout: 1_000_000 });

    const pageTitle = newPageTitle(variant?.title);

    test(`Create ${variant.label}`, async ({ page }) => {
      await beforeEachTest(page, pageTitle, "Contact", variant?.label, index);

      const variantTest = variantModules[variant.variant];
      await variantTest({
        pageTitle,
        page,
        commonFieldValues,
      });
    });

    test.afterEach(async ({ page }) => {
      await deletePageVariant(page, newPageTitle, variant.label);
    });
  });
});

export const form = {
  async addFormFields({ page, initialValue, commonFieldValues }) {
    await generateFormId({ page });
    await expect(page.getByRole("button", { name: "Subject" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Name", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "name@example.com" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Message..." })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Add file" })).toBeVisible();
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
    await expect(
      page.getByTestId("activate-overlay").locator("div").first()
    ).toBeVisible();
    await page.getByText("Click to activate").click({ force: true });
    await expect(page.getByText("I agree to terms and")).toContainText(
      initialValue.block?.[0]?.children?.[0]?.text
    );
    await page.getByTestId("text-style--normal").nth(1).click({ force: true });
    await page.getByTestId("scroll-container").getByRole("textbox").fill("");
    await page
      .getByTestId("scroll-container")
      .getByRole("textbox")
      .fill("I agree to all the terms and conditions");
  },
  async sitePreview({ page, pageUrl, commonFieldValues }) {
    await expect(pageUrl.getByPlaceholder("Subject")).toBeVisible();
    await expect(
      pageUrl.getByPlaceholder("Name", { exact: true })
    ).toBeVisible();
    await expect(pageUrl.getByPlaceholder("name@example.com")).toBeVisible();
    await expect(pageUrl.getByPlaceholder("Message...")).toBeVisible();
    await expect(pageUrl.getByLabel("Add file")).toBeVisible();
    await expect(pageUrl.getByLabel("Agree to terms")).not.toBeChecked();
    await expect(pageUrl.getByText("I agree to terms and")).toBeVisible();
    await expect(
      pageUrl.getByLabel(commonFieldValues?.formButtonLabel)
    ).toBeVisible();

    await checkFormSubmission({
      page,
      thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
      pageUrl: pageUrl,
      formFields: commonFieldValues?.formFields,
      submitBtnLabel: commonFieldValues?.formButtonLabel,
    });
  },
};
