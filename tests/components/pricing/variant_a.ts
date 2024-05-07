import { expect } from "@playwright/test";
import { pricingInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  descriptionField,
  expectDocumentPublished,
  subtitleField,
  titleField,
} from "tests/utils";

export default async function VariantA({ pageTitle, page, commonFieldValues }) {
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
  await page.getByLabel("Choose Stripe Account").click();
  await page
    .getByLabel("Choose Stripe Account")
    .selectOption("Mariel Stripe Test 2");

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

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 150_000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({
    timeout: 150_000,
  });

  //Title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Description
  await descriptionField.sitePreview({
    pageUrl: openUrlPage,
    commonFieldValues,
  });

  await expect(openUrlPage.getByLabel("Monthly Plan")).toBeVisible();
  await expect(openUrlPage.getByLabel("Yearly Plan")).toBeVisible();

  const planLabel = ["Monthly Plan", "Yearly Plan"];

  for (const label of planLabel) {
    await openUrlPage.getByLabel(label).click();

    for (const payment of commonFieldValues.paymentPlans) {
      await expect(
        openUrlPage.getByRole("heading", { name: payment.updatedPlan })
      ).toBeVisible();

      const updatedPrice =
        label === "Monthly Plan"
          ? payment.updatedMonthly
          : payment.updatedYearly;
      await expect(openUrlPage.getByText(updatedPrice)).toBeVisible();

      await expect(
        openUrlPage.getByText(payment.updatedDescription).first()
      ).toBeVisible();

      //Plan Type
      for (const plan of payment.planType) {
        await expect(
          openUrlPage.getByText(plan.updatedName).first()
        ).toBeVisible();
        await expect(
          openUrlPage.getByText(plan.updatedName).nth(1)
        ).toBeVisible();
        await expect(
          openUrlPage.getByText(plan.updatedName).nth(2)
        ).toBeVisible();
      }

      await expect(
        openUrlPage.getByLabel(payment.updatedCheckoutBtn)
      ).toBeVisible();
    }
  }
}
