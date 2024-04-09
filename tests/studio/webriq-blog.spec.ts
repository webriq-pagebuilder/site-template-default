import { test, expect } from "@playwright/test";
import { autologin_studio } from "../utils/index";

import {
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SANITY_STUDIO_URL,
} from "studio/config";

const getTime = new Date().getTime();

const newAuthor = `New Author - ` + getTime;
const newCategory = `New Category - ` + getTime;
const newBlogPost = `New Post - ` + getTime;

test.beforeEach(async ({ page }) => {
  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  await page.evaluate(autologin_studio, { token, projectId });
});

test("Create new author, category and post", async ({ page }) => {
  // Navigate to the studio URL
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  test.setTimeout(300000);

  // CREATE AUTHOR
  await page.getByRole("link", { name: "Blog" }).click();
  await page.getByRole("button", { name: "Create", exact: true }).click();
  await page.getByRole("menuitem", { name: "Author" }).click();
  await page.getByTestId("field-name").getByTestId("string-input").click();
  await page
    .getByTestId("field-name")
    .getByTestId("string-input")
    .fill(newAuthor);
  await page.getByRole("button", { name: "Generate" }).click();
  await page.getByLabel("Bio").click();
  await page.getByLabel("Bio").fill("This is a sample author bio.");
  await page.getByTestId("action-[object Object]").click({ force: true }); // publish document
  await expect(
    page
      .locator("[aria-label='Review changes']")
      .filter({ hasText: "just now" })
  ).toHaveCount(1, { timeout: 10000 });

  // CREATE CATEGORY
  await page.getByRole("link", { name: "Blog" }).click();
  await page
    .getByRole("button", { name: "Create", exact: true })
    .click({ force: true });
  await page.getByRole("menuitem", { name: "Category" }).click();
  await page.getByTestId("string-input").click();
  await page.getByTestId("string-input").fill(newCategory);
  await page.getByLabel("Description").click();
  await page.getByLabel("Description").fill("This is a sample category.");
  await page.getByTestId("action-[object Object]").click({ force: true }); // publish document
  await expect(
    page
      .locator("[aria-label='Review changes']")
      .filter({ hasText: "just now" })
  ).toHaveCount(1, { timeout: 10000 });

  // CREATE POST
  await page.getByRole("link", { name: "Blog" }).click();
  await page
    .getByRole("button", { name: "Create", exact: true })
    .click({ force: true });
  await page.getByRole("menuitem", { name: "Post" }).click();
  await page.getByTestId("string-input").click();
  await page.getByTestId("string-input").fill(newBlogPost);
  await page.getByRole("button", { name: "Generate" }).click();
  await page.getByLabel("Excerpt").click();
  await page.getByLabel("Excerpt").fill("Sample excerpt");
  await page
    .getByTestId("field-authors")
    .getByRole("button", { name: "Add item" })
    .click({ force: true });
  await page.getByTestId("autocomplete").click();
  await page.getByTestId("autocomplete").fill("New Author");
  await page.locator("button:has-text('New Author -')").first().click();
  await page
    .getByTestId("field-categories")
    .getByRole("button", { name: "Add item" })
    .click();
  await page.getByTestId("autocomplete").click();
  await page.getByTestId("autocomplete").fill("New Category");
  await page.locator("button:has-text('New Category -')").first().click();
  await page.getByTestId("date-input").click();
  await page.getByTestId("select-date-button").click();
  await page
    .getByRole("button", { name: "Set to current time" })
    .click({ force: true });
  await page.getByTestId("select-date-button").click();
  await page.getByText("Click to activate").click({ force: true });
  await page
    .getByTestId("scroll-container")
    .getByRole("textbox")
    .fill("This is a sample blog post content.");
  await page.getByTestId("action-[object Object]").click({ force: true }); // publish document
  await expect(
    page
      .locator("[aria-label='Review changes']")
      .filter({ hasText: "just now" })
  ).toHaveCount(1, { timeout: 10000 });
});

test.afterEach(async ({ page }) => {
  await page.getByRole("link", { name: "Blog" }).click();
  await page.getByRole("tab", { name: "Posts", exact: true }).click();
  await expect(
    page.getByText(newBlogPost, { exact: true }).first()
  ).toHaveCount(1);

  await page.getByRole("tab", { name: "Authors", exact: true }).click();
  await expect(page.getByText(newAuthor, { exact: true }).first()).toHaveCount(
    1
  );

  await page.getByRole("tab", { name: "Categories", exact: true }).click();
  await expect(
    page.getByText(newCategory, { exact: true }).first()
  ).toHaveCount(1);
});

test.afterAll(async () => {
  console.log("[DONE] Successfully run all tests for WebriQ Blogs");
});
