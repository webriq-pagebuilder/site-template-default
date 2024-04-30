import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  titleField,
  verifyExternalUrl,
  verifyInternalUrl,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { logoCloudInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default async function VariantC({
  pageTitle,
  page,
  commonFieldValues,
  isInternalLink,
}) {
  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: logoCloudInitialValue,
    commonFieldValues,
  });

  await page.getByRole("button", { name: "Primary Button" }).click();
  await page
    .getByTestId("field-variants.primaryButton.label")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.primaryButton.label")
    .getByTestId("string-input")
    .fill(commonFieldValues.primaryBtn);

  if (isInternalLink) {
    await page.getByText("Internal, inside this website").click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page.getByRole("button", { name: "Thank you Published No" }).click();
    await page.getByText("Self (default) - open in the").click();
  } else {
    await page.getByText("External, outside this website").click();
    await page.getByLabel("URL").click();
    await page.getByLabel("URL").fill(commonFieldValues.externalLinkUrl);
    await page.getByText("Blank - open on a new tab (").click();
  }

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
    openUrlPage.locator(".mx-auto > .relative > div").first().hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator(".relative > div:nth-child(2)").hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(3)").first().hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(4)").first().hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(5)").first().hover()
  ).toBeTruthy();
  await expect(
    openUrlPage.locator("div:nth-child(6)").first().hover()
  ).toBeTruthy();

  await openUrlPage.getByLabel(commonFieldValues.primaryBtn).click();
  if (!isInternalLink) {
    const page10Promise = openUrlPage.waitForEvent("popup");
    await openUrlPage
      .getByRole("link", { name: commonFieldValues.primaryBtn })
      .click({ force: true });
    const page10 = await page10Promise;
    await verifyExternalUrl(page10, commonFieldValues.externalLinkUrl);
  } else {
    await openUrlPage.waitForLoadState("networkidle");
    await expect(openUrlPage.getByText("Success!")).toBeVisible({
      timeout: 20_000,
    });
    await verifyInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
  }
}
