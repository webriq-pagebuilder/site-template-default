import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  subtitleFieldInput,
  titleFieldInput,
} from "tests/utils";

export default async function VariantC({ pageTitle, page, commonFieldValues }) {
  await subtitleFieldInput(page, commonFieldValues.subtitle);
  await titleFieldInput(page, commonFieldValues.title);

  //Description
  await page.getByPlaceholder("Lorem ipsum dolor sit amet,").click();
  await page
    .getByPlaceholder("Lorem ipsum dolor sit amet,")
    .fill(commonFieldValues.description);

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
    timeout: 20000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({
    timeout: 20000,
  });

  await expect(openUrlPage.getByText(commonFieldValues.subtitle)).toBeVisible();
  await expect(
    openUrlPage.getByRole("heading", { name: commonFieldValues.title })
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues.description)
  ).toBeVisible();

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

      await expect(
        openUrlPage.getByLabel(payment.updatedCheckoutBtn)
      ).toBeVisible();
    }
  }
}
