import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";

export default async function VariantD({ pageTitle, page, baseURL }) {
  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(
    openUrlPage.locator(".object-scale-down").first().hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(2) > .flex > .object-scale-down").hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(3) > .flex > .object-scale-down").hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(4) > .flex > .object-scale-down").hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(5) > .flex > .object-scale-down").hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(6) > .flex > .object-scale-down").hover()
  ).toBeTruthy();
}
