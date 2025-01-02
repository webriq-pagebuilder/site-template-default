import { test, expect } from "@playwright/test";
import {
  newPageTitle,
  publishDocument,
  deleteDocument,
  createSlug,
  launchPreview,
} from "tests/utils";
import { format } from "date-fns";

test.describe("Verify main actions working", () => {
  console.log("[INFO] Run WebriQ Blogs tests ~ Verify main actions working");

  test.describe.configure({ timeout: 900_000, mode: "serial" });

  const authorName = newPageTitle("New Author ");
  const categoryTitle = newPageTitle("New Category ");
  const blogTitle = newPageTitle("New Blog ");
  const publishedAt = format(new Date(), "MMMM dd, yyyy");

  test.beforeEach(async ({ page }) => {
    await page.goto(`./studio/blog`);
  });

  test("Create author page", async ({ page }) => {
    await page.getByRole("button", { name: "Create", exact: true }).click();
    await page.getByRole("menuitem", { name: "Author" }).click();
    await page.getByTestId("field-name").getByTestId("string-input").click();
    await page
      .getByTestId("field-name")
      .getByTestId("string-input")
      .fill(authorName);
    await page.getByRole("button", { name: "Generate" }).click();
    await page.getByLabel("Bio").click();
    await page.getByLabel("Bio").fill("This is a sample author bio.");
    await publishDocument(page);

    console.log("[DONE] Create author page 🚀");
  });

  test("Create category page", async ({ page }) => {
    await page
      .getByRole("button", { name: "Create", exact: true })
      .click({ force: true });
    await page.getByRole("menuitem", { name: "Category" }).click();
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(categoryTitle);
    await page.getByLabel("Description").click();
    await page.getByLabel("Description").fill("This is a sample category.");
    await publishDocument(page);

    console.log("[DONE] Create category page 🚀");
  });

  test("Create blog page", async ({ page }) => {
    await page
      .getByRole("button", { name: "Create", exact: true })
      .click({ force: true });
    await page.getByRole("menuitem", { name: "Post" }).click();
    await page.getByTestId("field-title").getByTestId("string-input").click();
    await page
      .getByTestId("field-title")
      .getByTestId("string-input")
      .fill(blogTitle);
    await page.getByRole("button", { name: "Generate" }).click();
    await page.getByLabel("Excerpt").click();
    await page.getByLabel("Excerpt").fill("Sample excerpt");

    await page
      .getByTestId("field-authors")
      .getByRole("button", { name: "Add item" })
      .click({ force: true });
    await page.getByTestId("autocomplete").click({ force: true });
    await page.getByTestId("autocomplete").fill(authorName);
    await page.getByRole("button", { name: authorName }).click({ force: true });

    await page
      .getByTestId("field-categories")
      .getByRole("button", { name: "Add item" })
      .click({ force: true });
    await page
      .getByTestId("field-categories")
      .getByTestId("autocomplete")
      .click({ force: true });
    await page
      .getByTestId("field-categories")
      .getByTestId("autocomplete")
      .fill(categoryTitle);
    await page
      .getByRole("button", { name: categoryTitle })
      .click({ force: true });

    await page.getByTestId("select-date-button").click({ force: true });
    await page
      .getByRole("button", { name: "Set to current time" })
      .click({ force: true });
    await page.getByTestId("select-date-button").click({ force: true });

    await page.getByText("Click to activate").click({ force: true });
    await page
      .getByTestId("scroll-container")
      .getByRole("textbox")
      .fill("This is a sample blog post content.");

    await expect(page.getByLabel("Validation")).toBeHidden();
    await publishDocument(page);

    console.log("[DONE] Create blog page 🚀");
  });

  test("Check blog page preview", async ({ page, baseURL }) => {
    await page.goto(
      `${baseURL}/api/preview?secret=${
        process.env.NEXT_PUBLIC_PREVIEW_SECRET
      }&slug=${createSlug(blogTitle)}`
    );
    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Add a small delay to ensure dynamic content is rendered
    await page.waitForTimeout(2000);

    await expect(page.getByText(categoryTitle)).toBeVisible();
    await expect(page.getByText(publishedAt)).toBeVisible();
    await expect(page.getByText(blogTitle)).toBeVisible();
    await expect(page.getByText(authorName)).toBeVisible();
    await expect(page.getByText("Author", { exact: true })).toBeVisible();
    await expect(
      page.getByText("This is a sample blog post content.")
    ).toBeVisible();

    console.log("[DONE] Check site preview 🚀");
  });

  test("Delete author, category and post pages", async ({ page }) => {
    await expect(page.getByText("Fetching blog posts...")).toBeHidden();
    await expect(page.getByRole("link", { name: blogTitle })).toBeVisible();
    await page.getByRole("link", { name: blogTitle }).click();

    // delete blog post by removing the author and category references first
    await page
      .getByTestId("field-authors")
      .getByRole("button")
      .nth(1)
      .click({ force: true });
    await page.getByRole("menuitem", { name: "Remove" }).click({ force: true });
    await page
      .getByTestId("field-categories")
      .getByRole("button")
      .nth(1)
      .click({ force: true });
    await page.getByRole("menuitem", { name: "Remove" }).click({ force: true });
    await publishDocument(page);
    await deleteDocument(page);

    // delete author
    await page.getByRole("link", { name: "Blog" }).click({ force: true });
    await page.getByRole("tab", { name: "Authors" }).click({ force: true });
    await page.getByRole("link", { name: authorName }).click({ force: true });
    await expect(page.getByText("Loading document")).toBeHidden();
    await expect(
      page.getByTestId("field-name").getByTestId("string-input")
    ).toHaveValue(authorName);
    await deleteDocument(page);

    // delete category
    await page.getByRole("link", { name: "Blog" }).click({ force: true });
    await page.getByRole("tab", { name: "Categories" }).click({ force: true });
    await page
      .getByRole("link", { name: categoryTitle })
      .click({ force: true });
    await expect(page.getByText("Loading document")).toBeHidden();
    await expect(page.getByTestId("string-input")).toHaveValue(categoryTitle);
    await deleteDocument(page);

    console.log("[DONE] Delete author, category and post pages 🚀");
  });
});
