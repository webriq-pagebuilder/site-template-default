import { expect } from "@playwright/test";
import { expectDocumentPublished, launchPreview } from "tests/utils";

export default async function VariantA({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  for (const data of commonFieldValues) {
    await page.getByRole("button", { name: `Label: ${data.label}` }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
    await page.locator(`input[value^="${data.label}"]`).click();
    await page.locator(`input[value^="${data.label}"]`).press("Meta+a");
    await page.locator(`input[value^="${data.label}"]`).fill(data.updatedLabel);
    await page.locator(`input[value^="${data.value}"]`).click();
    await page.locator(`input[value^="${data.value}"]`).press("Meta+a");
    await page.locator(`input[value^="${data.value}"]`).fill(data.updatedValue);
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, pageTitle);

  await launchPreview({ page, baseURL, pageTitle });

  for (const data of commonFieldValues) {
    await expect(page.getByText(data.updatedLabel)).toBeVisible();
    await expect(page.getByText(data.updatedValue)).toBeVisible();
  }
}
