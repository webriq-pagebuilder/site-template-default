import { test, expect, type Page } from "@playwright/test";
import { autologin_studio } from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";

const newAuthor = "New Author page";
const newCategory = "New Category page";
const newBlogPost = "New Blog page";

let page: Page;

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
});

test.describe("Verify main actions working", () => {
  test.describe.configure({ timeout: 900000, mode: "serial" });

  test.beforeEach(async () => {
    await page.getByRole("link", { name: "Blog" }).click();
  });

  test("Can create author, category and post", async () => {
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
    await page.getByTestId("autocomplete").fill(newAuthor);
    await page.locator(`button:has-text(${newAuthor})`).first().click();
    await page
      .getByTestId("field-categories")
      .getByRole("button", { name: "Add item" })
      .click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill(newCategory);
    await page.locator(`button:has-text(${newCategory})`).first().click();
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

  test("Can edit author, category and post", async () => {
    // EDIT AUTHOR
    await page
      .getByRole("tab", { name: "Authors", exact: true })
      .click({ force: true });

    const authorPage = page.locator(`a:has-text(${newAuthor})`).first();
    await authorPage.click({ force: true });
    await page.getByTestId("field-name").getByTestId("string-input").click();
    await page
      .getByTestId("field-name")
      .getByTestId("string-input")
      .fill(`Updated ${newAuthor}`);
    await page.getByLabel("Bio").click();
    await page.getByLabel("Bio").fill("Updated author sample bio content.");
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 180000 }); // publish document

    // EDIT CATEGORY
    await page.getByRole("link", { name: "Blog" }).click();
    await page
      .getByRole("tab", { name: "Categories", exact: true })
      .click({ force: true });

    const categoryPage = page.locator(`a:has-text(${newCategory})`).first();
    await categoryPage.click({ force: true });
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(`Updated ${newCategory}`);
    await page.getByLabel("Description").click();
    await page.getByLabel("Description").fill("Updated category description.");
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 180000 }); // publish document

    // EDIT POST
    await page.getByRole("link", { name: "Blog" }).click();
    await page
      .getByRole("tab", { name: "Posts", exact: true })
      .click({ force: true });
    await page.getByRole("link", { name: newBlogPost }).click({ force: true });
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(`Updated ${newBlogPost}`);
    await page.getByLabel("Excerpt").click();
    await page.getByLabel("Excerpt").fill("Updated sample excerpt");
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
      .press("Meta+a");
    await page
      .getByTestId("scroll-container")
      .getByRole("textbox")
      .fill("Updated sample blog post content.");
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 180000 }); // publish document
  });

  test("Delete created author, category and post", async () => {
    await page
      .getByRole("tab", { name: "Posts", exact: true })
      .click({ force: true });
    await page.getByRole("link", { name: `Updated ${newBlogPost}` }).click();
    await page.getByTestId("field-authors").getByRole("button").nth(1).click();
    await page.getByRole("menuitem", { name: "Remove" }).click();
    await page
      .getByTestId("field-categories")
      .getByRole("button")
      .nth(1)
      .click();
    await page.getByRole("menuitem", { name: "Remove" }).click();
    await page.getByTestId("action-[object Object]").click();
    await page.getByTestId("action-menu-button").click();
    await page.getByTestId("action-Delete").click();
    await expect(page.getByText("Delete document?")).toBeVisible();
    await page.getByTestId("confirm-delete-button").click();
    await expect(page.getByText("The document was successfully")).toBeVisible();

    await page.getByRole("link", { name: "Blog" }).click();
    await page.getByRole("tab", { name: "Authors" }).click();
    await page.getByRole("link", { name: `Updated ${newAuthor}` }).click();
    await page.getByTestId("action-menu-button").click();
    await page.getByTestId("action-Delete").click();
    await expect(page.getByText("Delete document?")).toBeVisible();
    await page.getByTestId("confirm-delete-button").click();
    await expect(page.getByText("The document was successfully")).toBeVisible();

    await page.getByRole("link", { name: "Blog" }).click();
    await page.getByRole("tab", { name: "Categories" }).click();
    await page.getByRole("link", { name: `Updated ${newCategory}` }).click();
    await page.getByTestId("action-menu-button").click();
    await page.getByTestId("action-Delete").click();
    await expect(page.getByText("Delete document?")).toBeVisible();
    await page.getByTestId("confirm-delete-button").click();
    await expect(page.getByText("The document was successfully")).toBeVisible();
  });
});

test.afterAll(async () => {
  await page.close();
});
