import { expect } from "@playwright/test";
import { howItWorksInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
} from "tests/utils";

export default async function VariantE({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  //Subtitle
  await subtitleField.checkAndAddValue({
    page,
    initialValue: howItWorksInitialValue,
    commonFieldValues,
  });

  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: howItWorksInitialValue,
    commonFieldValues,
  });

  for (const step of commonFieldValues.stepsData) {
    await page.getByRole("button", { name: step.title }).first().click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();

    // Update title
    await page.locator(`input[value^="${step.title}"]`).click();
    await page.locator(`input[value^="${step.title}"]`).fill(step.updatedTitle);

    // Update body
    await page.locator("textarea").filter({ hasText: step.body }).click();
    await page
      .locator("textarea")
      .filter({ hasText: step.body })
      .fill(step.updatedBody);
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

  for (const steps of commonFieldValues.stepsData) {
    await expect(page.getByText(steps.updatedTitle)).toBeVisible();
    await expect(page.getByText(steps.updatedBody)).toBeVisible();
  }
}
