import { expect } from "@playwright/test";
import { expectDocumentPublished, titleField } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { logoCloudInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default async function VariantB({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: logoCloudInitialValue,
    commonFieldValues,
  });

  //Body
  await page.getByLabel("Body").click();
  await page.getByLabel("Body").fill(commonFieldValues.body);

  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  //Title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  await expect(openUrlPage.getByText(commonFieldValues.body)).toBeVisible();

  await expect(
    openUrlPage.locator(".flex > div > div > .flex").first().hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(2) > div > .flex").hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(3) > div > .flex").hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(4) > div > .flex").hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(5) > div > .flex").hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(6) > div > .flex").hover()
  ).toBeTruthy();
}
