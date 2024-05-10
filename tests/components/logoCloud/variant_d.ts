import { expect } from "@playwright/test";
import { createSlug, expectDocumentPublished } from "tests/utils";

export default async function VariantD({ pageTitle, page, baseURL }) {
  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  await expect(
    page.locator('img[alt="logoCloud-image"]').first()
  ).toBeVisible();
  await expect(page.locator('img[alt="logoCloud-image"]').nth(1)).toBeVisible();
  await expect(page.locator('img[alt="logoCloud-image"]').nth(2)).toBeVisible();
  await expect(page.locator('img[alt="logoCloud-image"]').nth(3)).toBeVisible();
  await expect(page.locator('img[alt="logoCloud-image"]').nth(4)).toBeVisible();
  await expect(page.locator('img[alt="logoCloud-image"]').nth(5)).toBeVisible();
}
