import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
} from "tests/utils";
import { blogInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default async function VariantB({
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
    page.getByRole("heading", { name: commonFieldValues.title })
  ).toBeVisible();
  await expect(page.getByText(commonFieldValues.subtitle)).toBeVisible();

  await expect(
    page.getByRole("link", { name: commonFieldValues.button })
  ).toBeVisible();

  if (!isInternalLink) {
    await expect(
      page.getByRole("link", { name: commonFieldValues.button })
    ).toHaveAttribute("target", "_blank");
  } else {
    await expect(
      page.getByRole("link", { name: commonFieldValues.button })
    ).toHaveAttribute("target", "_self");
  }

  const blogPostsLength = 5;
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

  //Blog title
  await expect(page.getByRole("heading", { name: blog.title })).toBeVisible();

  await expect(button).toBeVisible();
  await button.click({ force: true });
  await page.waitForLoadState("domcontentloaded");
  await expect(page.locator(`h1:has-text("${blog.title}")`)).toBeVisible();
  await expect(
    page.locator(`span:has-text("${blog.publishedAt}")`)
  ).toBeVisible();
}
