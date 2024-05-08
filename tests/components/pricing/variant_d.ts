import { expect } from "@playwright/test";
import { pricingInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  descriptionField,
  expectDocumentPublished,
  subtitleField,
  titleField,
  assertExternalUrl,
  assertInternalUrl,
} from "tests/utils";

export default async function VariantD({
  pageTitle,
  page,
  commonFieldValues,
  isInternalLink,
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
  await page.getByLabel("Choose Stripe Account").click();
  await page
    .getByLabel("Choose Stripe Account")
    .selectOption("Mariel Stripe Test 2");

  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  //Title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  await descriptionField.sitePreview({
    pageUrl: openUrlPage,
    commonFieldValues,
  });

  await expect(openUrlPage.getByText("Monthly Billing")).toBeVisible();
  await expect(openUrlPage.getByText("Annual Billing")).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues.blockText)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues.monthlyBilling)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues.annualBilling)
  ).toBeVisible();
  await expect(openUrlPage.getByText(commonFieldValues.formName)).toBeVisible();
  await expect(
    openUrlPage.getByLabel(commonFieldValues.signInLink)
  ).toBeVisible();
  await expect(
    openUrlPage.locator(`button[aria-label="Submit Pricing Form button"]`)
  ).toBeDisabled();

  for (let i = 0; i < commonFieldValues.formBanner.length; i++) {
    const banner = commonFieldValues.formBanner[i];
    await openUrlPage.getByLabel(`Page ${i} button`).click();

    await expect(
      openUrlPage.getByRole("img", { name: "pricing-image-" })
    ).toBeVisible();
    await expect(openUrlPage.getByText(banner.name)).toBeVisible();
  }

  await openUrlPage.getByLabel(commonFieldValues.signInLink).click();
  if (isInternalLink) {
    await openUrlPage.waitForLoadState("networkidle");
    await expect(openUrlPage.getByText("Success!")).toBeVisible({
      timeout: 20_000,
    });
    await assertInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
  } else if (!isInternalLink) {
    const externalPagePromise = openUrlPage.waitForEvent("popup");
    const externalPage = await externalPagePromise;
    await assertExternalUrl(externalPage, commonFieldValues.externalLinkUrl);
  }
}
