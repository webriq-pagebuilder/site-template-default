import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
} from "../../utils/index";
import { blogInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default async function VariantA({ pageTitle, page, commonFieldValues }) {
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
  await page
    .getByRole("button", { name: commonFieldValues?.referencedBlog })
    .click();
  await expect(
    page.getByRole("link", { name: commonFieldValues?.referencedBlog }).nth(1)
  ).toBeVisible({
    timeout: 75000,
  });

  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  //Title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  await expect(openUrlPage.getByText("All", { exact: true })).toBeVisible({
    timeout: 20_000,
  });
  for (const category of commonFieldValues.categories) {
    await expect(openUrlPage.getByText(category)).toBeVisible({
      timeout: 20_000,
    });
  }

  await openUrlPage.getByText("All", { exact: true }).click();
  await expect(openUrlPage.getByLabel("Page 1")).toBeVisible({
    timeout: 20_000,
  });
  await expect(openUrlPage.getByLabel("Page 2")).toBeVisible({
    timeout: 20_000,
  });

  //All Page 1
  for (const blog of commonFieldValues.blogPosts) {
    await expect(openUrlPage.getByLabel(blog.title)).toBeVisible({
      timeout: 20_000,
    });
  }

  //Add Search
  await openUrlPage.getByPlaceholder("Search posts...").click();
  await openUrlPage
    .getByPlaceholder("Search posts...")
    .fill(commonFieldValues.referencedBlog);
  await expect(
    openUrlPage.getByLabel(commonFieldValues.referencedBlog).nth(1)
  ).toBeVisible({ timeout: 20_000 });

  //Clear Search
  await openUrlPage.getByPlaceholder("Search posts...").click();
  await openUrlPage.getByPlaceholder("Search posts...").fill("");

  await openUrlPage.getByLabel("Page 2").click();
  await expect(
    openUrlPage.getByLabel(commonFieldValues.referencedBlog)
  ).toBeVisible({ timeout: 20_000 });

  //Travel Category
  await openUrlPage.getByText("TRAVEL").click();
  await expect(openUrlPage.getByLabel("Page")).toBeVisible({ timeout: 20_000 });
  await openUrlPage.getByLabel("Page").click();
  await expect(
    openUrlPage.getByLabel("Lorem ipsum dolor sit amet,")
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    openUrlPage.getByLabel("Vestibulum vehicle leo eget")
  ).toBeVisible({ timeout: 20_000 });
  await expect(openUrlPage.getByLabel("Aenean convalli sapone a")).toBeVisible({
    timeout: 20_000,
  });
  await expect(
    openUrlPage.getByLabel(commonFieldValues?.referencedBlog).first()
  ).toBeVisible({ timeout: 20_000 });

  await openUrlPage.getByText("Culture").click();
  await expect(openUrlPage.getByLabel("Page")).toBeVisible({ timeout: 20_000 });
  await openUrlPage.getByLabel("Page").click();
  await expect(
    openUrlPage.getByLabel("Vestibulum vehicle leo eget")
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    openUrlPage.getByLabel("Felis bibendum ut tristique")
  ).toBeVisible({ timeout: 20_000 });

  await openUrlPage.getByText("Engineering").click();
  await expect(openUrlPage.getByLabel("Page")).toBeVisible({ timeout: 20_000 });
  await openUrlPage.getByLabel("Page").click();
  await expect(
    openUrlPage
      .locator(`a[aria-label="${commonFieldValues.referencedBlog}"]`)
      .first()
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    openUrlPage
      .locator(`a[aria-label="${commonFieldValues.referencedBlog}"]`)
      .nth(1)
  ).toBeVisible({ timeout: 20_000 });
}
