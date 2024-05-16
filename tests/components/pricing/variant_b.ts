import { expect } from "@playwright/test";
import { pricingInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  descriptionField,
  expectDocumentPublished,
  launchPreview,
  subtitleField,
  titleField,
} from "tests/utils";

export default async function VariantB({
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

    //Price
    await page.locator(`input[value="${payment.monthly}"]`).click();
    await page
      .locator(`input[value="${payment.monthly}"]`)
      .fill(payment.updatedMonthly);

    //Description
    await page.locator(`textarea:has-text("${payment.description}")`).click();
    await page
      .locator(`textarea:has-text("${payment.description}")`)
      .fill(payment.updatedDescription);

    //Plan Includes
    for (const plan of payment.planType) {
      await page.locator(`input[value^="${plan.name}"]`).click();
      await page.locator(`input[value^="${plan.name}"]`).fill(plan.updatedName);
    }

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

  for (const payment of commonFieldValues.paymentPlans) {
    await expect(
      page.getByRole("heading", { name: payment.updatedPlan })
    ).toBeVisible();

    await expect(page.getByText(payment.updatedMonthly)).toBeVisible();

    //Plan Type
    for (const plan of payment.planType) {
      await expect(page.getByText(plan.updatedName).first()).toBeVisible();
      await expect(page.getByText(plan.updatedName).nth(1)).toBeVisible();
      await expect(page.getByText(plan.updatedName).nth(2)).toBeVisible();
    }

    await expect(page.getByLabel(payment.updatedCheckoutBtn)).toBeVisible();
  }
}
