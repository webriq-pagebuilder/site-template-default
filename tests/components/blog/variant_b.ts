import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  assertExternalUrl,
  assertInternalUrl,
} from "../../utils/index";
import { blogInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default async function VariantB({
  pageTitle,
  page,
  commonFieldValues,
  isInternalLink,
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

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20_000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({
    timeout: 20_000,
  });

  await expect(
    openUrlPage.getByRole("heading", { name: commonFieldValues.title })
  ).toBeVisible();
  await expect(openUrlPage.getByText(commonFieldValues.subtitle)).toBeVisible();

  await openUrlPage
    .getByRole("link", { name: commonFieldValues.button })
    .click({ force: true });
  if (!isInternalLink) {
    const externalPagePromise = openUrlPage.waitForEvent("popup");
    const externalPage = await externalPagePromise;
    await assertExternalUrl(externalPage, commonFieldValues.externalLinkUrl);
  } else {
    await openUrlPage.waitForLoadState("networkidle");
    await expect(openUrlPage.getByText("Success!")).toBeVisible({
      timeout: 20000,
    });
    await assertInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
  }

  const slug = pageTitle
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const blogPostsLength = 5;
  for (let i = 0; i < blogPostsLength; i++) {
    const blog = commonFieldValues.blogPosts[i];
    let button =
      i === 0
        ? openUrlPage.getByLabel("View Blog Post").first()
        : openUrlPage.getByLabel("View Blog Post").nth(i);

    await openUrlPage.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`);
    await assertPageContent(openUrlPage, blog, commonFieldValues, button);
  }
}

async function assertPageContent(openUrlPage, blog, commonFieldValues, button) {
  await expect(openUrlPage.getByText("Empty Page")).toBeHidden();
  await expect(openUrlPage.locator("section")).toBeVisible();

  //Title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Blog title
  await expect(
    openUrlPage.getByRole("heading", { name: blog.title })
  ).toBeVisible({ timeout: 150_000 });

  await button.click({ force: true });
  await openUrlPage.waitForLoadState("networkidle");
  await expect(
    openUrlPage.getByRole("heading", { name: blog.title })
  ).toBeVisible({ timeout: 150_000 });
  await expect(
    openUrlPage.locator(`span:has-text("${blog.publishedAt}")`)
  ).toBeVisible({ timeout: 150_000 });

  await assertInternalUrl(openUrlPage, `${NEXT_PUBLIC_SITE_URL}/${blog.slug}`);
}
