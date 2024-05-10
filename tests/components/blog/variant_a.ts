import { expect } from "@playwright/test";
import { blogInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
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
  await expect(page.getByText(`${baseURL}`)).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  await openUrlPage
    .getByRole("link", { name: commonFieldValues.button })
    .click({ force: true });

  for (const blog of commonFieldValues.blogPosts) {
    await assertPageContent(openUrlPage, blog, commonFieldValues, baseURL);
  }
}

async function assertPageContent(
  openUrlPage,
  blog,
  commonFieldValues,
  baseURL
) {
  //Title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Blog title
  await expect(openUrlPage.getByRole("link", { name: blog.title })).toBeVisible(
    { timeout: 150_000 }
  );

  await openUrlPage
    .getByRole("link", { name: blog.title })
    .click({ force: true });
  await openUrlPage.waitForLoadState("domcontentloaded");
  await expect(
    openUrlPage.getByRole("heading", { name: blog.title })
  ).toBeVisible({ timeout: 150_000 });
  await expect(
    openUrlPage.locator(`span:has-text("${blog.publishedAt}")`)
  ).toBeVisible({ timeout: 150_000 });

  await assertInternalUrl(openUrlPage, `${baseURL}/${blog.slug}`);
}
