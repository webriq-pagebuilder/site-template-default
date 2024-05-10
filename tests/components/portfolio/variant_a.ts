import { expect } from "@playwright/test";
import { portfolioInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
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
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  await assertPageContent(page, commonFieldValues, isInternalLink);
}

async function assertPageContent(page, commonFieldValues, isInternalLink) {
  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Categories
  for (const category of commonFieldValues.categories) {
    await page.getByLabel(category.updatedName).click();

    for (let i = 1; i <= 8; i++) {
      let imageLocator;

      if (i <= 1) {
        imageLocator = page.locator(".w-full > .relative > .absolute").first();
      } else {
        imageLocator = page.locator(
          `div:nth-child(${i}) > .relative > .absolute`
        );
      }

      await expect(imageLocator).toBeVisible();
      await imageLocator.hover();
      await expect(imageLocator).toHaveText("View Project");
    }
  }

  await expect(
    page.locator(`a[aria-label="${commonFieldValues.button}"]`)
  ).toBeVisible();

  if (!isInternalLink) {
    await expect(
      page.locator(`a[aria-label="${commonFieldValues.button}"]`).first()
    ).toHaveAttribute("target", "_blank");
  } else if (isInternalLink) {
    await expect(
      page.locator(`a[aria-label="${commonFieldValues.button}"]`).first()
    ).toHaveAttribute("target", "_self");
  }
}
