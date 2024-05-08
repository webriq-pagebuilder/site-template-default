import { expect } from "@playwright/test";
import { portfolioInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  assertExternalUrl,
  assertInternalUrl,
} from "tests/utils";

export default async function VariantC({
  pageTitle,
  page,
  commonFieldValues,
  isInternalLink,
}) {
  //Subtitle
  await subtitleField.checkAndAddValue({
    page,
    initialValue: portfolioInitialValue,
    commonFieldValues,
  });

  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: portfolioInitialValue,
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
    .fill(commonFieldValues.button);
  if (!isInternalLink) {
    await page.getByText("External, outside this website").click();
    await page.getByLabel("URL").click();
    await page.getByLabel("URL").fill(commonFieldValues.externalLinkUrl);
    await page.getByText("Blank - open on a new tab (").click();
  } else {
    await page.getByText("Internal, inside this website").click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page.getByRole("button", { name: "Thank you Published No" }).click();
    await page.getByText("Self (default) - open in the").click();
  }

  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await assertPageContent({ openUrlPage, commonFieldValues, isInternalLink });
}

async function assertPageContent({
  openUrlPage,
  commonFieldValues,
  isInternalLink,
}) {
  //Title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Categories
  for (let i = 1; i <= 6; i++) {
    let imageLocator;
    if (i <= 1) {
      imageLocator = openUrlPage.locator(".p-6").first();
    } else {
      imageLocator = openUrlPage.locator(
        `div:nth-child(${i}) > .h-full > .p-6`
      );
    }

    await expect(imageLocator.locator('p:has-text("2021-01-24")')).toBeVisible({
      timeout: 20_000,
    });
    await expect(
      imageLocator.locator('p:has-text("Lorem ipsum dolor sit amet")')
    ).toBeVisible({ timeout: 20_000 });
    await expect(
      imageLocator.locator('a[aria-label="View Project"]')
    ).toBeVisible({ timeout: 20_000 });

    await expect(imageLocator.first()).toBeVisible({ timeout: 150_000 });
  }

  await openUrlPage
    .getByRole("link", { name: commonFieldValues.button })
    .click();
  if (isInternalLink) {
    await openUrlPage.waitForLoadState("networkidle");
    await expect(openUrlPage.getByText("Success!")).toBeVisible({
      timeout: 150_000,
    });
    await assertInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
  } else if (!isInternalLink) {
    const page10Promise = openUrlPage.waitForEvent("popup");
    const page10 = await page10Promise;
    await assertExternalUrl(page10, commonFieldValues.externalLinkUrl);
  }
}
