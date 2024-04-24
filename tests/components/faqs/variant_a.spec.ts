import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  subtitleFieldInput,
  titleFieldInput,
} from "tests/utils";

export default async function VariantA({
  variantTitle,
  page,
  commonFieldValues,
}) {
  await subtitleFieldInput(page, commonFieldValues.subtitle);
  await titleFieldInput(page, commonFieldValues.title);

  for (const faqs of commonFieldValues.faqsData) {
    await page.getByRole("button", { name: faqs.value }).first().click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
    await page.locator(`input[value^="${faqs.value}"]`).click();
    await page
      .locator(`input[value^="${faqs.value}"]`)
      .fill(faqs.updateQuestion);
    await page.getByLabel("Add its answer").click();
    await page.getByLabel("Add its answer").fill(faqs.updateAnswer);
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, variantTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({ timeout: 20000 });
  await expect(openUrlPage.getByText(commonFieldValues.subtitle)).toBeVisible();
  await expect(
    openUrlPage.getByRole("heading", { name: commonFieldValues.title })
  ).toBeVisible();

  //Test search question and see its answer
  for (const faqs of commonFieldValues.faqsData) {
    await openUrlPage.getByPlaceholder("Search, find any question you").click();
    await openUrlPage
      .getByPlaceholder("Search, find any question you")
      .fill(faqs.updateQuestion);
    await expect(openUrlPage.getByLabel(faqs.updateQuestion)).toBeVisible();
    await openUrlPage.getByLabel(faqs.updateQuestion).click();
    await expect(openUrlPage.getByText("Answer")).toBeVisible();
    await openUrlPage.getByLabel(faqs.updateQuestion).click();
  }
}
