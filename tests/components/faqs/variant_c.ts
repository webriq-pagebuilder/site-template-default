import { expect } from "@playwright/test";
import { faqsInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
  launchPreview,
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
  // Launch preview
  await launchPreview({ page, baseURL, pageTitle });

  //title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  for (const faqs of commonFieldValues.faqsData) {
    await expect(page.getByText(faqs.updateQuestion)).toBeVisible();
    await expect(page.getByText(faqs.updateAnswer)).toBeVisible();
  }
}
