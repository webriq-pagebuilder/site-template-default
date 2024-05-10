import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  assertExternalUrl,
  assertInternalUrl,
  createSlug,
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

  await page
    .getByRole("link", { name: commonFieldValues.button })
    .click({ force: true });

  // TODO
  if (!isInternalLink) {
    const externalPagePromise = page.waitForEvent("popup");
    const externalPage = await externalPagePromise;
    await assertExternalUrl(externalPage, commonFieldValues.externalLinkUrl);
  } else {
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByText("Success!")).toBeVisible({
      timeout: 20000,
    });
    await assertInternalUrl(page, commonFieldValues.internalLinkUrl);
  }

  const blogPostsLength = 3;
  for (let i = 0; i < blogPostsLength; i++) {
    const blog = commonFieldValues.blogPosts[i];
    let button =
      i === 0
        ? page.getByLabel("View Blog Post").first()
        : page.getByLabel("View Blog Post").nth(i);

    await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
    await assertPageContent(page, blog, commonFieldValues, button, baseURL);
  }
}

async function assertPageContent(
  page,
  blog,
  commonFieldValues,
  button,
  baseURL
) {
  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  await button.click({ force: true });
  await page.waitForLoadState("domcontentloaded");
  await expect(page.getByRole("heading", { name: blog.title })).toBeVisible({
    timeout: 150_000,
  });
  await expect(
    page.locator(`span:has-text("${blog.publishedAt}")`)
  ).toBeVisible({ timeout: 150_000 });

  await assertInternalUrl(page, `${baseURL}/${blog.slug}`);
}
