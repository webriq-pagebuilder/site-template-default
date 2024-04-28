import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  subtitleFieldInput,
  titleFieldInput,
} from "../../utils/index";

export default async function VariantA({ pageTitle, page, commonFieldValues }) {
  await subtitleFieldInput(page, commonFieldValues.subtitle);
  await titleFieldInput(page, commonFieldValues.title);

  //Blog Posts
  await page.getByRole("button", { name: "Add item" }).click();
  await page.getByTestId("reference-input").getByLabel("Open").click();
  await page
    .getByRole("button", { name: commonFieldValues.referencedBlog })
    .click();
  await expect(
    page.getByRole("link", { name: commonFieldValues.referencedBlog })
  ).toBeVisible({
    timeout: 75000,
  });

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

  await expect(openUrlPage.getByText("All", { exact: true })).toBeVisible();
  for (const category of commonFieldValues.categories) {
    await expect(openUrlPage.getByText(category)).toBeVisible();
  }

  await openUrlPage.getByText("All", { exact: true }).click();
  await expect(openUrlPage.getByLabel("Page 1")).toBeVisible();
  await expect(openUrlPage.getByLabel("Page 2")).toBeVisible();

  //All Page 1
  for (const blog of commonFieldValues.blogPosts) {
    await expect(openUrlPage.getByLabel(blog.title)).toBeVisible();
  }

  //Add Search
  await openUrlPage.getByPlaceholder("Search posts...").click();
  await openUrlPage
    .getByPlaceholder("Search posts...")
    .fill(commonFieldValues.referencedBlog);
  await expect(
    openUrlPage.getByLabel(commonFieldValues.referencedBlog)
  ).toBeVisible();

  //Clear Search
  await openUrlPage.getByPlaceholder("Search posts...").click();
  await openUrlPage.getByPlaceholder("Search posts...").fill("");

  await openUrlPage.getByLabel("Page 2").click();
  await expect(
    openUrlPage.getByLabel(commonFieldValues.referencedBlog)
  ).toBeVisible();

  //Travel Category
  await openUrlPage.getByText("TRAVEL").click();
  await expect(openUrlPage.getByLabel("Page")).toBeVisible();
  await openUrlPage.getByLabel("Page").click();
  await expect(
    openUrlPage.getByLabel("Lorem ipsum dolor sit amet,")
  ).toBeVisible();
  await expect(
    openUrlPage.getByLabel("Vestibulum vehicle leo eget")
  ).toBeVisible();
  await expect(
    openUrlPage.getByLabel("Aenean convalli sapone a")
  ).toBeVisible();
  await expect(openUrlPage.getByLabel("Ph12")).toBeVisible();

  await openUrlPage.getByText("Culture").click();
  await expect(openUrlPage.getByLabel("Page")).toBeVisible();
  await openUrlPage.getByLabel("Page").click();
  await expect(
    openUrlPage.getByLabel("Vestibulum vehicle leo eget")
  ).toBeVisible();
  await expect(
    openUrlPage.getByLabel("Felis bibendum ut tristique")
  ).toBeVisible();

  await openUrlPage.getByText("Engineering").click();
  await expect(openUrlPage.getByLabel("Page")).toBeVisible();
  await openUrlPage.getByLabel("Page").click();
  await expect(openUrlPage.getByLabel("Ph12")).toBeVisible();
}