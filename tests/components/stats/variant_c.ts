import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";

async function VariantC({ pageTitle, page, commonFieldValues }) {
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

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  for (const data of commonFieldValues) {
    await expect(openUrlPage.getByText(data.updatedLabel)).toBeVisible();
    await expect(openUrlPage.getByText(data.updatedValue)).toBeVisible();
  }
}

export default VariantC;
