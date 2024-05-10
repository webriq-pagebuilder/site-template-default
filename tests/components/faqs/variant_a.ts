import { expect } from "@playwright/test";
import { faqsInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
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

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Test search question and see its answer
  for (const faqs of commonFieldValues.faqsData) {
    await page.getByPlaceholder("Search, find any question you").click();
    await page
      .getByPlaceholder("Search, find any question you")
      .fill(faqs.updateQuestion);
    await expect(page.getByLabel(faqs.updateQuestion)).toBeVisible();
    await page.getByLabel(faqs.updateQuestion).click();
    await expect(page.getByText("Answer")).toBeVisible();
    await page.getByLabel(faqs.updateQuestion).click();
  }
}
