import { expect } from "@playwright/test";
import { blogInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
  primaryButtonField,
  launchPreview,
} from "tests/utils";

export default async function VariantA({
  pageTitle,
  page,
  commonFieldValues,
  isInternalLink,
  baseURL,
}) {
  // Subtitle
  await subtitleField.checkAndAddValue({
    page,
    initialValue: blogInitialValue,
    commonFieldValues,
  });

  // Title
  await titleField.checkAndAddValue({
    page,
    initialValue: blogInitialValue,
    commonFieldValues,
  });

  // Primary Button
  await primaryButtonField.checkAndAddValue({
    page,
    initialValue: blogInitialValue,
    commonFieldValues,
    isInternalLink,
  });

  await expectDocumentPublished(page, pageTitle);
  // Launch preview
  await launchPreview({ page, baseURL, pageTitle });

  // Primary Button
  await primaryButtonField.sitePreview({
    pageUrl: page,
    commonFieldValues,
    isInternalLink,
  });

  for (const blog of commonFieldValues.blogPosts) {
    await assertPageContent(page, blog, commonFieldValues);
    await launchPreview({ page, baseURL, pageTitle });
  }
}

async function assertPageContent(page, blog, commonFieldValues) {
  // Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  // Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  // @todo: Blog title is in displayed
  // await expect(page.getByRole("link", { name: blog?.title })).toBeVisible();

  // @todo: assert blog post are present and that link takes you to the page
  // await page.getByRole("link", { name: blog.title }).click({ force: true });
  // await page.waitForLoadState("domcontentloaded");
  // await expect(page.getByRole("heading", { name: blog.title })).toBeVisible();
}
