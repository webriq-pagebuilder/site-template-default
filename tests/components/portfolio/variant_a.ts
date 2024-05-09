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

export default async function VariantA({
  pageTitle,
  page,
  commonFieldValues,
  isInternalLink,
  baseURL,
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

  //Categories
  for (const category of commonFieldValues.categories) {
    await page.getByRole("button", { name: category.name }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
    await page.locator(`input[value="${category.name}"]`).click();
    await page
      .locator(`input[value="${category.name}"]`)
      .fill(category.updatedName);

    await page.getByRole("button", { name: "Primary Button" }).click();
    if (!isInternalLink) {
      await page.locator('input[value="View Project"]').click();
      await page
        .locator('input[value="View Project"]')
        .fill(commonFieldValues.button);
      await page.getByText("External, outside this website").click();
      await page.getByLabel("URL").click();
      await page.getByLabel("URL").fill(commonFieldValues.externalLinkUrl);
      await page.getByText("Blank - open on a new tab (").click();
    } else {
      await page.getByText("Internal, inside this website").click();
      await page.getByTestId("autocomplete").click();
      await page.getByTestId("autocomplete").fill("thank you");
      await page
        .getByRole("button", { name: "Thank you Published No" })
        .click();
      await page.getByText("Self (default) - open in the").click();
    }
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  await assertPageContent(openUrlPage, commonFieldValues, isInternalLink);
}

async function assertPageContent(
  openUrlPage,
  commonFieldValues,
  isInternalLink
) {
  //Title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Categories
  for (const category of commonFieldValues.categories) {
    await openUrlPage.getByLabel(category.updatedName).click();

    for (let i = 1; i <= 8; i++) {
      let imageLocator;

      if (i <= 1) {
        imageLocator = openUrlPage
          .locator(".w-full > .relative > .absolute")
          .first();
      } else {
        imageLocator = openUrlPage.locator(
          `div:nth-child(${i}) > .relative > .absolute`
        );
      }

      await expect(imageLocator).toBeVisible({ timeout: 150_000 });
      await imageLocator.hover();
      await expect(imageLocator).toHaveText("View Project");
    }
  }

  await openUrlPage.locator(".text-center > .inline-block").click();
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
