import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";

export default async function VariantD({ pageTitle, page }) {
  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20_000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({ timeout: 20_000 });

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
