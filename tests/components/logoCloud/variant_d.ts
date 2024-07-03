import { expect } from "@playwright/test";
import { expectDocumentPublished, launchPreview } from "tests/utils";

export default async function VariantD({ pageTitle, page, baseURL }) {
  await expectDocumentPublished(page, pageTitle);

  await launchPreview({ page, baseURL, pageTitle });

  await expect(
    page.locator('img[alt="logoCloud-image"]').first()
  ).toBeVisible();
  await expect(page.locator('img[alt="logoCloud-image"]').nth(1)).toBeVisible();
  await expect(page.locator('img[alt="logoCloud-image"]').nth(2)).toBeVisible();
  await expect(page.locator('img[alt="logoCloud-image"]').nth(3)).toBeVisible();
  await expect(page.locator('img[alt="logoCloud-image"]').nth(4)).toBeVisible();
  await expect(page.locator('img[alt="logoCloud-image"]').nth(5)).toBeVisible();
}
