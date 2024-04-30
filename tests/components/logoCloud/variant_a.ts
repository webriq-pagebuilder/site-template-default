import { expect } from "@playwright/test";
import { expectDocumentPublished, titleField } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { logoCloudInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default async function VariantA({ pageTitle, page, commonFieldValues }) {
  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: logoCloudInitialValue,
    commonFieldValues,
  });

  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20_000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({ timeout: 20_000 });

  //Title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  await expect(
    openUrlPage.locator(".flex > div > .flex").first().hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(2) > .flex").hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(3) > .flex").hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(4) > .flex").hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(5) > .flex").hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(6) > .flex").hover()
  ).toBeTruthy();
}
