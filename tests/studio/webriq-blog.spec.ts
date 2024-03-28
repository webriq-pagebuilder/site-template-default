import { test, expect } from "@playwright/test";
import { autologin_studio } from "tests/helpers";

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

// TODO: WIP
test.describe("Features", () => {
  // Applies to all tests in this group.
  test.describe.configure({ timeout: 120000 });

  // CREATE AUTHOR
  test("Create New Author", async ({ page }) => {
    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

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
    await page.getByTestId("action-[object Object]").click({ force: true });

    // check if the author was created, find by name
    await page.getByRole("link", { name: "Blog" }).click({ force: true });
    await page.getByRole("button", { name: "Authors", exact: true }).click();
    await expect(
      page.locator("div").filter({ hasText: newAuthor }).nth(1)
    ).toHaveCount(1, { timeout: 5000 });
  });

  // CREATE CATEGORY
  test("Create New Category", async ({ page }) => {
    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

    await page.getByRole("link", { name: "Blog" }).click();
    await page.getByRole("button", { name: "Create", exact: true }).click();
    await page.getByRole("menuitem", { name: "Category" }).click();
    await page.getByTestId("field-name").getByTestId("string-input").click();
    await page
      .getByTestId("field-name")
      .getByTestId("string-input")
      .fill(newCategory);
    await page.getByLabel("Description").click();
    await page.getByLabel("Description").fill("This is a sample category.");
    await page.getByTestId("action-[object Object]").click({ force: true });

    // check if the category was created, find by name
    await page.getByRole("link", { name: "Blog" }).click({ force: true });
    await page.getByRole("button", { name: "Categories", exact: true }).click();
    await expect(
      page.locator("div").filter({ hasText: newCategory }).nth(1)
    ).toHaveCount(1, { timeout: 5000 });
  });

  // CREATE POST AND LINK NEW AUTHOR AND CATEGORY
  test("Create New Post", async ({ page }) => {
    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

    await page.getByRole("link", { name: "Blog" }).click();
    await page.getByRole("button", { name: "Create", exact: true }).click();
    await page.getByRole("menuitem", { name: "Post" }).click();
    await page.getByTestId("field-name").getByTestId("string-input").click();
    await page
      .getByTestId("field-name")
      .getByTestId("string-input")
      .fill(newBlogPost);
    await page.getByRole("button", { name: "Generate" }).click();

    // add excerpt
    await page.getByLabel("Excerpt").click();
    await page.getByLabel("Excerpt").fill("Sample excerpt");

    // link author
    await page
      .getByTestId("field-authors")
      .getByRole("button", { name: "Add item" })
      .click({ force: true });
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill(newAuthor);
    await page.getByRole("button", { name: newAuthor }).click({ force: true });

    // TODO: add main image
    // await page.getByLabel("Main image").click()
    // await page.getByTestId("file-input-browse-button").click();
    // await page
    //   .getByRole("button", { name: "Insert image post Upload" })
    //   .click();

    // link category
    await page
      .getByTestId("field-categories")
      .getByRole("button", { name: "Add item" })
      .click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill(newCategory);
    await page.getByRole("button", { name: newAuthor }).click({ force: true });

    // add date
    await page.getByTestId("date-input").click();
    await page.getByTestId("select-date-button").click();
    await page
      .getByRole("button", { name: "Set to current time" })
      .click({ force: true });
    await page
      .getByTestId("scroll-container")
      .getByRole("textbox")
      .fill("This is a sample blog post content.");

    // add blog content
    await page.getByLabel("Body").click();
    await page.getByText("Click to activate").click({ force: true });

    // check if the category was created, find by name
    await page.getByRole("link", { name: "Blog" }).click({ force: true });
    await page.getByRole("button", { name: "Posts", exact: true }).click();
    await expect(
      page.locator("div").filter({ hasText: newBlogPost }).nth(1)
    ).toHaveCount(1, { timeout: 5000 });
  });
});
