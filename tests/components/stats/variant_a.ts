import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";

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
  await expect(page.getByText(`${baseURL}`)).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  for (const data of commonFieldValues) {
    await expect(openUrlPage.getByText(data.updatedLabel)).toBeVisible();
    await expect(openUrlPage.getByText(data.updatedValue)).toBeVisible();
  }
}
