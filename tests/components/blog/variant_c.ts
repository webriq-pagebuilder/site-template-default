import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
  primaryButtonField,
  launchPreview,
} from "../../utils/index";
import { blogInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

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
    initialValue: blogInitialValue,
    commonFieldValues,
  });

  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: blogInitialValue,
    commonFieldValues,
  });

  //Primary Button
  await primaryButtonField.checkAndAddValue({
    page,
    initialValue: blogInitialValue,
    commonFieldValues,
    isInternalLink,
  });

  await expectDocumentPublished(page, pageTitle);
  // Launch preview
  await launchPreview({ page, baseURL, pageTitle });

  // Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  // Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  // Primary Button
  await primaryButtonField.sitePreview({
    pageUrl: page,
    commonFieldValues,
    isInternalLink,
  });

  // @todo: assert individual blog posts
  // const blogPostsLength = 3;
  // for (let i = 0; i < blogPostsLength; i++) {
  //   const blog = commonFieldValues.blogPosts[i];
  //   let button =
  //     i === 0
  //       ? page.getByLabel("View Blog Post").first()
  //       : page.getByLabel("View Blog Post").nth(i);

  //   await assertPageContent(page, blog, commonFieldValues, button);
  //   await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  // }
}

async function assertPageContent(page, blog, commonFieldValues, button) {
  // Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  // Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  await button.click({ force: true });
  await page.waitForLoadState("domcontentloaded");

  // @todo: Assert blog page title
  // await expect(page.getByRole("heading", { name: blog.title })).toBeVisible();

  // await expect(
  //   page.locator(`span:has-text("${blog.publishedAt}")`)
  // ).toBeVisible();
}
