import { expect } from "@playwright/test";
import { pricingInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  descriptionField,
  expectDocumentPublished,
  launchPreview,
  subtitleField,
  titleField,
} from "tests/utils";

export default async function VariantC({
  pageTitle,
  page,
  commonFieldValues,
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

  //Can select stripe account
  // await page.getByLabel("Choose Stripe Account").click();
  // await page
  //   .getByLabel("Choose Stripe Account")
  //   .selectOption("Mariel Stripe Test 2");

  //Payment Plans
  for (const payment of commonFieldValues.paymentPlans) {
    await page.getByRole("button", { name: payment.plan }).click();
    await expect(page.getByLabel("Edit Plans")).toBeVisible();
    await page.locator(`input[value^="${payment.plan}"]`).click();
    await page
      .locator(`input[value^="${payment.plan}"]`)
      .fill(payment.updatedPlan);

    //Monthly
    await page
      .locator('input[id^="variants.plans"][id*=".monthlyPrice"]')
      .click();
    await page
      .locator('input[id^="variants.plans"][id*=".monthlyPrice"]')
      .fill(payment.updatedMonthly);

    //Yearly
    await page.locator(`input[value^="${payment.yearly}"]`).click();
    await page
      .locator(`input[value^="${payment.yearly}"]`)
      .fill(payment.updatedYearly);

    //Description
    await page.locator(`textarea:has-text("${payment.description}")`).click();
    await page
      .locator(`textarea:has-text("${payment.description}")`)
      .fill(payment.updatedDescription);

    //Checkout Button
    await page.locator(`input[value^="${payment.checkoutBtn}"]`).click();
    await page
      .locator(`input[value^="${payment.checkoutBtn}"]`)
      .fill(payment.updatedCheckoutBtn);

    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, pageTitle);

  await launchPreview({ page, baseURL, pageTitle });

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Description
  await descriptionField.sitePreview({
    pageUrl: page,
    commonFieldValues,
  });

  await expect(page.getByLabel("Monthly Plan")).toBeVisible();
  await expect(page.getByLabel("Yearly Plan")).toBeVisible();

  const planLabel = ["Monthly Plan", "Yearly Plan"];

  for (const label of planLabel) {
    await page.getByLabel(label).click();

    for (const payment of commonFieldValues.paymentPlans) {
      await expect(
        page.getByRole("heading", { name: payment.updatedPlan })
      ).toBeVisible();

      const updatedPrice =
        label === "Monthly Plan"
          ? payment.updatedMonthly
          : payment.updatedYearly;
      await expect(page.getByText(updatedPrice)).toBeVisible();

      await expect(
        page.getByText(payment.updatedDescription).first()
      ).toBeVisible();

      await expect(page.getByLabel(payment.updatedCheckoutBtn)).toBeVisible();
    }
  }
}
