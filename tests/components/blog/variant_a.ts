import { expect } from "@playwright/test";
import { blogInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
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
    initialValue: blogInitialValue,
    commonFieldValues,
  });

  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: blogInitialValue,
    commonFieldValues,
  });

  //Button
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
    await page
      .getByRole("button", { name: "Thank you Published No" })
      .click({ force: true });
    await page.getByText("Self (default) - open in the").click();
  }

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  await expect(
    page.locator(`a[aria-label="${commonFieldValues.button}"]`)
  ).toBeVisible();

  if (!isInternalLink) {
    await expect(
      page.locator(`a[aria-label="${commonFieldValues.button}"]`)
    ).toHaveAttribute("target", "_blank");
  } else {
    await expect(
      page.locator(`a[aria-label="${commonFieldValues.button}"]`)
    ).toHaveAttribute("target", "_self");
  }

  for (const blog of commonFieldValues.blogPosts) {
    await assertPageContent(page, blog, commonFieldValues);
  }
}

async function assertPageContent(page, blog, commonFieldValues) {
  //Title
  await expect(
    page.locator(`h1:has-text("${commonFieldValues?.title}")`)
  ).toBeVisible();

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Blog title
  await expect(page.getByRole("link", { name: blog?.title })).toBeVisible({
    timeout: 150_000,
  });

  await page.getByRole("link", { name: blog.title }).click({ force: true });
  await page.waitForLoadState("domcontentloaded");
  await expect(page.getByRole("heading", { name: blog.title })).toBeVisible({
    timeout: 150_000,
  });
}
