import { expect } from "@playwright/test";
import { howItWorksInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
} from "tests/utils";

export default async function VariantD({ pageTitle, page, commonFieldValues }) {
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

  for (const steps of commonFieldValues.stepsData) {
    await expect(openUrlPage.getByText(steps.updatedTitle)).toBeVisible();
    await expect(openUrlPage.getByText(steps.updatedBody)).toBeVisible();
  }
}
