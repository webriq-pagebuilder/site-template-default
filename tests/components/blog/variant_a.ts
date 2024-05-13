import { expect } from "@playwright/test";
import { blogInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
  primaryButtonField,
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

  // Primary Button
  await primaryButtonField.checkAndAddValue({
    page,
    initialValue: blogInitialValue,
    commonFieldValues,
    isInternalLink,
  });

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  // Primary Button
  await primaryButtonField.sitePreview({
    pageUrl: page,
    commonFieldValues,
    isInternalLink,
  });

  for (const blog of commonFieldValues.blogPosts) {
    await assertPageContent(page, blog, commonFieldValues);
    await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  }
}

async function assertPageContent(page, blog, commonFieldValues) {
  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Blog title
  await expect(page.getByRole("link", { name: blog?.title })).toBeVisible();

  await page.getByRole("link", { name: blog.title }).click({ force: true });
  await page.waitForLoadState("domcontentloaded");
  await expect(page.getByRole("heading", { name: blog.title })).toBeVisible();
}
