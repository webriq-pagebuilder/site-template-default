import { test, expect } from "@playwright/test";
import { autologin_studio } from "tests/autologin";
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

  // Navigate to the studio URL and click the Blog menu
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
});

test.describe("Main workflow", () => {
  test.describe.configure({ timeout: 900000, mode: "serial" });

  test.beforeEach(async ({ page }) => {
    await page.getByRole("link", { name: "Blog" }).click();
  });

  test("Create author, category and post", async ({ page }) => {
    // CREATE AUTHOR
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
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 120000 }); // publish document
    await expect(
      page
        .locator("[aria-label='Review changes']")
        .filter({ hasText: "just now" })
    ).toBeVisible({ timeout: 120000 });

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
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 120000 }); // publish document
    await expect(
      page
        .locator("[aria-label='Review changes']")
        .filter({ hasText: "just now" })
    ).toBeVisible({ timeout: 120000 });

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
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 120000 }); // publish document
    await expect(
      page
        .locator("[aria-label='Review changes']")
        .filter({ hasText: "just now" })
    ).toBeVisible({ timeout: 120000 });
  });

  test("Edit author, category and post", async ({ page }) => {
    // EDIT AUTHOR
    await page.getByRole("tab", { name: "Authors", exact: true }).click();
    await expect(
      page.getByText(newAuthor, { exact: true }).first()
    ).toBeVisible({ timeout: 120000 });
    await page
      .getByText(newAuthor, { exact: true })
      .first()
      .click({ force: true });
    await page.getByTestId("field-name").getByTestId("string-input").click();
    await page
      .getByTestId("field-name")
      .getByTestId("string-input")
      .fill(`Author updated - ${getTime}`);
    await page.getByLabel("Bio").click();
    await page.getByLabel("Bio").fill("Updated author sample bio content.");
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 120000 }); // publish document
    await expect(
      page
        .locator("[aria-label='Review changes']")
        .filter({ hasText: "just now" })
    ).toBeVisible({ timeout: 120000 });

    // EDIT CATEGORY
    await page.getByRole("link", { name: "Blog" }).click();
    await page.getByRole("tab", { name: "Categories", exact: true }).click();
    await expect(
      page.getByText(newCategory, { exact: true }).first()
    ).toBeVisible({ timeout: 120000 });
    await page
      .getByText(newCategory, { exact: true })
      .first()
      .click({ force: true });
    await page.getByTestId("string-input").click();
    await page
      .getByTestId("string-input")
      .fill(`Category updated - ${getTime}`);
    await page.getByLabel("Description").click();
    await page.getByLabel("Description").fill("Updated category description.");
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 120000 }); // publish document
    await expect(
      page
        .locator("[aria-label='Review changes']")
        .filter({ hasText: "just now" })
    ).toBeVisible({ timeout: 120000 });

    // EDIT POST
    await page.getByRole("link", { name: "Blog" }).click();
    await page.getByRole("tab", { name: "Posts", exact: true }).click();

    await expect(
      page.getByText(newBlogPost).or(page.getByText(/Post/)).first()
    ).toBeVisible({ timeout: 180000 });
    page
      .getByText(newBlogPost)
      .or(page.getByText(/Post/))
      .first()
      .click({ force: true });
    await page.getByTestId("string-input").click();
    await page
      .getByTestId("string-input")
      .fill(`Updated blog post - ${getTime}`);
    await page.getByLabel("Excerpt").click();
    await page.getByLabel("Excerpt").fill("Updated sample excerpt");
    await page.getByTestId("date-input").click();
    await page.getByTestId("select-date-button").click();
    await page
      .getByRole("button", { name: "Set to current time" })
      .click({ force: true });
    await page.getByTestId("select-date-button").click();
    await page.getByText("Click to activate").click({ force: true });
    await page.getByTestId("scroll-container").getByRole("textbox").fill("");
    await page
      .getByTestId("scroll-container")
      .getByRole("textbox")
      .fill("Updated sample blog post content.");
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 180000 }); // publish document
    await expect(
      page
        .locator("[aria-label='Review changes']")
        .filter({ hasText: "just now" })
    ).toBeVisible({ timeout: 180000 });
  });
});
