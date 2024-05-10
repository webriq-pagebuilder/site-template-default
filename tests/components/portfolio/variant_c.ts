import { expect } from "@playwright/test";
import { portfolioInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  assertExternalUrl,
  assertInternalUrl,
  createSlug,
} from "tests/utils";

export default async function VariantC({
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
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  await assertPageContent({ page, commonFieldValues, isInternalLink });
}

async function assertPageContent({ page, commonFieldValues, isInternalLink }) {
  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Categories
  for (let i = 1; i <= 6; i++) {
    let imageLocator;
    if (i <= 1) {
      imageLocator = page.locator(".p-6").first();
    } else {
      imageLocator = page.locator(`div:nth-child(${i}) > .h-full > .p-6`);
    }

    await expect(
      imageLocator.locator('p:has-text("2021-01-24")')
    ).toBeVisible();
    await expect(
      imageLocator.locator('p:has-text("Lorem ipsum dolor sit amet")')
    ).toBeVisible();
    await expect(
      imageLocator.locator('a[aria-label="View Project"]')
    ).toBeVisible();

    await expect(imageLocator.first()).toBeVisible();
  }

  await expect(
    page.locator(`a:has-text("${commonFieldValues.button}")`).first()
  ).toBeVisible();

  if (!isInternalLink) {
    await expect(
      page.locator(`a:has-text("${commonFieldValues.button}")`).first()
    ).toHaveAttribute("target", "_blank");
  } else if (isInternalLink) {
    await expect(
      page.locator(`a:has-text("${commonFieldValues.button}")`).first()
    ).toHaveAttribute("target", "_self");
  }
}
