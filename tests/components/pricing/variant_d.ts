import { expect } from "@playwright/test";
import { pricingInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  descriptionField,
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
} from "tests/utils";

export default async function VariantD({
  pageTitle,
  page,
  commonFieldValues,
  isInternalLink,
  baseURL,
}) {
  //Subtitle
  await subtitleField.checkAndAddValue({
    page,
    initialValue: pricingInitialValue,
    commonFieldValues,
  });

  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: pricingInitialValue,
    commonFieldValues,
  });

  //Description
  await descriptionField.checkAndAddValue({
    page,
    initialValue: pricingInitialValue,
    placeholder: pricingInitialValue.description,
    commonFieldValues,
  });

  //Monthly Billing
  await page
    .getByTestId("field-variants.monthlyBilling")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.monthlyBilling")
    .getByTestId("string-input")
    .fill(commonFieldValues.monthlyBilling);

  //Annual Billing
  await page
    .getByTestId("field-variants.annualBilling")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.annualBilling")
    .getByTestId("string-input")
    .fill(commonFieldValues.annualBilling);

  // 05-03-2024 defer tests for forms
  //Generate Form Id
  // await generateFormId({ page });
  // await page
  //   .getByRole("button", { name: "Generate ID" })
  //   .click({ force: true });
  // expect(page.getByLabel("Form ID")).not.toBeUndefined();
  // await expect(page.getByRole("button", { name: "Generate ID" })).toBeVisible();
  // await expect(page.getByRole("link", { name: "Manage" })).toBeVisible();

  //Form Subtitle
  await page
    .getByTestId("field-variants.form.subtitle")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.form.subtitle")
    .getByTestId("string-input")
    .fill(commonFieldValues.formSubtitle);

  //Form Name
  await page
    .getByTestId("field-variants.form.name")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.form.name")
    .getByTestId("string-input")
    .fill(commonFieldValues.formName);

  const formFields = [
    { name: "Email" },
    { name: "Password" },
    { name: "Card number" },
  ];

  for (const form of formFields) {
    await page.getByRole("button", { name: form.name }).click();
    await expect(page.getByLabel("Edit WebriQ Form Field")).toBeVisible();
    await page.locator(`input[value^="${form.name}"]`).click();
    await page
      .locator(`input[value^="${form.name}"]`)
      .fill(`Updated ${form.name}`);
    await page.getByLabel("Is this field Required?").click();
    await page.getByLabel("Close dialog").click();
  }

  //Form Button Label
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .fill(commonFieldValues.formButton);

  //Sign in Link
  await page.locator(`input[value="Sign In"]`).click();
  await page
    .locator(`input[value="Sign In"]`)
    .fill(commonFieldValues.signInLink);

  if (isInternalLink) {
    await page.getByText("Internal, inside this website").click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page.getByRole("button", { name: "Thank you Published No" }).click();
    await page.getByText("Self (default) - open in the").click();
  } else {
    await page.getByText("External, outside this website").click();
    await page.getByLabel("URL").click();
    await page.getByLabel("URL").fill(commonFieldValues.externalLinkUrl);
    await page.getByText("Blank - open on a new tab (").click();
  }

  for (const banner of commonFieldValues.formBanner) {
    await page.getByRole("button", { name: banner.name }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
    await page.locator(`input[value^="${banner.name}"]`).click();
    await page
      .locator(`input[value^="${banner.name}"]`)
      .fill(`Updated ${banner.name}`);
    await page.getByLabel("Close dialog").click();
  }

  //Block text
  await expect(
    page.getByTestId("activate-overlay").locator("div").first()
  ).toBeVisible();
  await page.getByText("Click to activate").first().click({ force: true });
  await page.getByTestId("text-style--normal").nth(1).click({ force: true });
  await page.getByTestId("scroll-container").getByRole("textbox").fill("");
  await page
    .getByTestId("scroll-container")
    .getByRole("textbox")
    .fill(commonFieldValues.blockText);

  //Can select stripe account
  // await page.getByLabel("Choose Stripe Account").click();
  // await page
  //   .getByLabel("Choose Stripe Account")
  //   .selectOption("Mariel Stripe Test 2");

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  await descriptionField.sitePreview({
    pageUrl: page,
    commonFieldValues,
  });

  await expect(page.getByText("Monthly Billing")).toBeVisible();
  await expect(page.getByText("Annual Billing")).toBeVisible();
  await expect(page.getByText(commonFieldValues.blockText)).toBeVisible();
  await expect(page.getByText(commonFieldValues.monthlyBilling)).toBeVisible();
  await expect(page.getByText(commonFieldValues.annualBilling)).toBeVisible();
  await expect(page.getByText(commonFieldValues.formName)).toBeVisible();
  await expect(page.getByLabel(commonFieldValues.signInLink)).toBeVisible();
  await expect(
    page.locator(`button[aria-label="Submit Pricing Form button"]`)
  ).toBeDisabled();

  for (let i = 0; i < commonFieldValues.formBanner.length; i++) {
    const banner = commonFieldValues.formBanner[i];
    await page.getByLabel(`Page ${i} button`).click();

    await expect(
      page.getByRole("img", { name: "pricing-image-" })
    ).toBeVisible();
    await expect(page.getByText(banner.name)).toBeVisible();
  }

  await expect(page.getByLabel(commonFieldValues.signInLink)).toBeVisible();
  if (!isInternalLink) {
    await expect(
      page.locator(`a[aria-label="${commonFieldValues.signInLink}"]`)
    ).toHaveAttribute("target", "_blank");
  } else {
    await expect(
      page.locator(`a[aria-label="${commonFieldValues.signInLink}"]`)
    ).toHaveAttribute("target", "_self");
  }
}
