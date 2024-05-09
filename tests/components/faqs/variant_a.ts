import { expect } from "@playwright/test";
import { faqsInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
} from "tests/utils";

export default async function VariantA({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  //Subtitle
  await subtitleField.checkAndAddValue({
    page,
    initialValue: faqsInitialValue,
    commonFieldValues,
  });

  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: faqsInitialValue,
    commonFieldValues,
  });

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

  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  //Title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

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
