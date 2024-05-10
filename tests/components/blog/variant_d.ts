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

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  await expect(page.getByText("All", { exact: true })).toBeVisible();

  for (const category of commonFieldValues.categories) {
    await expect(page.getByText(category)).toBeVisible();
  }

  await page.getByText("All", { exact: true }).click();
  await expect(page.getByLabel("Page 1")).toBeVisible();

  //All Page 1
  for (const blog of commonFieldValues.blogPosts) {
    await expect(page.getByLabel(blog.title)).toBeVisible();
  }

  //Add Search
  await page.getByPlaceholder("Search posts...").click();
  await page.getByPlaceholder("Search posts...").fill("Lorem ipsum");
  await expect(page.getByLabel("Lorem ipsum dolor sit amet,")).toBeVisible();

  //Clear Search
  await page.getByPlaceholder("Search posts...").click();
  await page.getByPlaceholder("Search posts...").fill("");

  //Travel Category
  await page.getByText("TRAVEL").click();
  await expect(page.getByLabel("Page")).toBeVisible();
  await page.getByLabel("Page").click();
  await expect(page.getByLabel("Lorem ipsum dolor sit amet,")).toBeVisible();
  await expect(page.getByLabel("Vestibulum vehicle leo eget")).toBeVisible();
  await expect(page.getByLabel("Aenean convalli sapone a")).toBeVisible();

  await page.getByText("Culture").click();
  await expect(page.getByLabel("Page")).toBeVisible();
  await page.getByLabel("Page").click();
  await expect(page.getByLabel("Vestibulum vehicle leo eget")).toBeVisible();
  await expect(page.getByLabel("Felis bibendum ut tristique")).toBeVisible();

  await page.getByText("Engineering").click();
  await expect(page.getByLabel("Page")).toBeVisible();
  await page.getByLabel("Page").click();
}
