import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
} from "tests/utils";
import { blogInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default async function VariantA({
  pageTitle,
  page,
  commonFieldValues,
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

  //Blog Posts
  await page.getByRole("button", { name: "Add item" }).click();
  await page
    .getByTestId("autocomplete")
    .fill(commonFieldValues?.referencedBlog);
  await page.waitForSelector(
    `button:has-text("${commonFieldValues?.referencedBlog}")`,
    { state: "visible" }
  );
  await expect(
    page.getByRole("button", { name: commonFieldValues?.referencedBlog })
  ).toBeVisible();
  await page
    .getByRole("button", { name: commonFieldValues?.referencedBlog })
    .click();
  await expect(
    page.getByRole("link", { name: commonFieldValues?.referencedBlog }).nth(1)
  ).toBeVisible({
    timeout: 75000,
  });

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  await expect(page.getByText("All", { exact: true })).toBeVisible({
    timeout: 20_000,
  });

  for (const category of commonFieldValues.categories) {
    await expect(page.getByText(category)).toBeVisible();
  }

  await page.getByText("All", { exact: true }).click();
  await expect(page.getByLabel("Page 1")).toBeVisible();
  await expect(page.getByLabel("Page 2")).toBeVisible();

  //All Page 1
  for (const blog of commonFieldValues.blogPosts) {
    await expect(page.getByLabel(blog.title)).toBeVisible();
  }

  //Add Search
  await page.getByPlaceholder("Search posts...").click();
  await page
    .getByPlaceholder("Search posts...")
    .fill(commonFieldValues.referencedBlog);
  await expect(
    page.getByLabel(commonFieldValues.referencedBlog).nth(1)
  ).toBeVisible();

  //Clear Search
  await page.getByPlaceholder("Search posts...").click();
  await page.getByPlaceholder("Search posts...").fill("");

  await page.getByLabel("Page 2").click();
  await expect(page.getByLabel(commonFieldValues.referencedBlog)).toBeVisible({
    timeout: 20_000,
  });

  //Travel Category
  await page.getByText("TRAVEL").click();
  await expect(page.getByLabel("Page")).toBeVisible();
  await page.getByLabel("Page").click();
  await expect(page.getByLabel("Lorem ipsum dolor sit amet,")).toBeVisible();
  await expect(page.getByLabel("Vestibulum vehicle leo eget")).toBeVisible();
  await expect(page.getByLabel("Aenean convalli sapone a")).toBeVisible();
  await expect(
    page.getByLabel(commonFieldValues?.referencedBlog).first()
  ).toBeVisible();

  await page.getByText("Culture").click();
  await expect(page.getByLabel("Page")).toBeVisible();
  await page.getByLabel("Page").click();
  await expect(page.getByLabel("Vestibulum vehicle leo eget")).toBeVisible();
  await expect(page.getByLabel("Felis bibendum ut tristique")).toBeVisible();

  await page.getByText("Engineering").click();
  await expect(page.getByLabel("Page")).toBeVisible();
  await page.getByLabel("Page").click();
  await expect(
    page.locator(`a[aria-label="${commonFieldValues.referencedBlog}"]`).first()
  ).toBeVisible();
  await expect(
    page.locator(`a[aria-label="${commonFieldValues.referencedBlog}"]`).nth(1)
  ).toBeVisible();
}
