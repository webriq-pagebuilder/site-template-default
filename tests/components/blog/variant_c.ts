import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
  primaryButtonField,
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

  const blogPostsLength = 3;
  for (let i = 0; i < blogPostsLength; i++) {
    const blog = commonFieldValues.blogPosts[i];
    let button =
      i === 0
        ? page.getByLabel("View Blog Post").first()
        : page.getByLabel("View Blog Post").nth(i);

    await assertPageContent(page, blog, commonFieldValues, button);
    await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  }
}

async function assertPageContent(page, blog, commonFieldValues, button) {
  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  await button.click({ force: true });
  await page.waitForLoadState("domcontentloaded");
  await expect(page.getByRole("heading", { name: blog.title })).toBeVisible();
  await expect(
    page.locator(`span:has-text("${blog.publishedAt}")`)
  ).toBeVisible();
}
