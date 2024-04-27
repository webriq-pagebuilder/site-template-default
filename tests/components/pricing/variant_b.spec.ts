import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  subtitleFieldInput,
  titleFieldInput,
} from "tests/utils";

export default async function VariantB({ pageTitle, page, commonFieldValues }) {
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

  for (const payment of commonFieldValues.paymentPlans) {
    await expect(
      openUrlPage.getByRole("heading", { name: payment.updatedPlan })
    ).toBeVisible();

    await expect(openUrlPage.getByText(payment.updatedMonthly)).toBeVisible();

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
