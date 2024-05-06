import { test, expect } from "@playwright/test";
import { newPageTitle } from "tests/utils";
import {
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SANITY_STUDIO_URL,
} from "studio/config";
import { format } from "date-fns";

const inputValues = {
  author: {
    name: newPageTitle("New Author "),
    bio: "This is a sample author bio.",
  },
  category: {
    title: newPageTitle("New Category "),
    description: "This is a sample category.",
  },
  post: {
    title: newPageTitle("New Blog "),
    excerpt: "Sample excerpt",
    body: "This is a sample blog post content.",
  },
};

test.describe("Verify main actions working", () => {
  test.describe.configure({ timeout: 900_000, mode: "serial" });

  const publishedAt = format(new Date(), "MMMM dd, yyyy");

  test.beforeEach(async ({ page }) => {
    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
    await page.getByRole("link", { name: "Blog" }).click();
  });

  test("Create author page", async ({ page }) => {
    await page.getByRole("button", { name: "Create", exact: true }).click();
    await page.getByRole("menuitem", { name: "Author" }).click();
    await page.getByTestId("field-name").getByTestId("string-input").click();
    await page
      .getByTestId("field-name")
      .getByTestId("string-input")
      .fill(inputValues.author.name);
    await page.getByRole("button", { name: "Generate" }).click();
    await page.getByLabel("Bio").click();
    await page.getByLabel("Bio").fill(inputValues.author.bio);

    // publish document
    await expect(
      page
        .locator('[data-testid="review-changes-button"]')
        .filter({ hasText: "Just now" })
    ).toBeVisible({ timeout: 150_000 });
    await page.getByTestId("action-[object Object]").click({ force: true });
    await expect(
      page
        .locator('[id="__next"]')
        .getByRole("alert")
        .locator("div")
        .filter({ hasText: "The document was published" })
        .nth(1)
    ).toBeVisible({ timeout: 150_000 });
    await expect(
      page.getByRole("button", { name: "Last published just now" })
    ).toBeVisible({ timeout: 150_000 });
  });

  test("Create category page", async ({ page }) => {
    await page
      .getByRole("button", { name: "Create", exact: true })
      .click({ force: true });
    await page.getByRole("menuitem", { name: "Category" }).click();
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(inputValues.category.title);
    await page.getByLabel("Description").click();
    await page.getByLabel("Description").fill(inputValues.category.description);

    // publish document
    await expect(
      page
        .locator('[data-testid="review-changes-button"]')
        .filter({ hasText: "Just now" })
    ).toBeVisible({ timeout: 150_000 });
    await page.getByTestId("action-[object Object]").click({ force: true });
    await expect(
      page
        .locator('[id="__next"]')
        .getByRole("alert")
        .locator("div")
        .filter({ hasText: "The document was published" })
        .nth(1)
    ).toBeVisible({ timeout: 150_000 });
    await expect(
      page.getByRole("button", { name: "Last published just now" })
    ).toBeVisible({ timeout: 150_000 });
  });

  test("Create blog page", async ({ page }) => {
    await page
      .getByRole("button", { name: "Create", exact: true })
      .click({ force: true });
    await page.getByRole("menuitem", { name: "Post" }).click();
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(inputValues.post.title);
    await page.getByRole("button", { name: "Generate" }).click();
    await page.getByLabel("Excerpt").click();
    await page.getByLabel("Excerpt").fill(inputValues.post.excerpt);

    await page
      .getByTestId("field-authors")
      .getByRole("button", { name: "Add item" })
      .click({ force: true });
    await page.getByTestId("autocomplete").click({ force: true });
    await page.getByTestId("autocomplete").fill(inputValues.author.name);
    await page
      .getByRole("button", { name: inputValues.author.name })
      .click({ force: true });

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
      .fill(inputValues.category.title);
    await page
      .getByRole("button", { name: inputValues.category.title })
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
      .fill(inputValues.post.body);

    await expect(page.getByLabel("Validation")).toBeHidden({
      timeout: 150_000,
    });
    await expect(
      page
        .locator('[data-testid="review-changes-button"]')
        .filter({ hasText: "Just now" })
    ).toBeVisible({ timeout: 150_000 });
    await page.getByTestId("action-[object Object]").click({ force: true });
    await expect(
      page
        .locator('[id="__next"]')
        .getByRole("alert")
        .locator("div")
        .filter({ hasText: "The document was published" })
        .nth(1)
    ).toBeVisible({ timeout: 150_000 });
    await expect(
      page.getByRole("button", { name: "Last published just now" })
    ).toBeVisible({ timeout: 150_000 });

    // check site preview now all created pages are linked
    const blogPage = page.waitForEvent("popup");
    await page.getByText(`${NEXT_PUBLIC_SITE_URL}/new-`).click({ force: true });
    const blogPagePreview = await blogPage;

    await expect(blogPagePreview.locator("h1")).toContainText(
      inputValues.post.title
    );
    await expect(
      blogPagePreview.getByText(inputValues.category.title.toUpperCase())
    ).toBeVisible();
    console.log("publishedAt: ", publishedAt);
    await expect(blogPagePreview.locator('[id="__next"]')).toContainText(
      publishedAt
    );
    await expect(blogPagePreview.locator("h3")).toContainText(
      inputValues.author.name
    );
    await expect(
      blogPagePreview.getByText("Author", { exact: true })
    ).toBeVisible();
    await expect(blogPagePreview.locator('[id="__next"]')).toContainText(
      inputValues.post.body
    );
  });

  test("Delete author, category and post pages", async ({ page }) => {
    await page
      .getByRole("tab", { name: "Posts", exact: true })
      .click({ force: true });
    await page.getByRole("link", { name: inputValues.post.title }).click();

    // delete blog post by removing the author and category reference first
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
    await expect(
      page
        .locator('[data-testid="review-changes-button"]')
        .filter({ hasText: "Just now" })
    ).toBeVisible({ timeout: 150_000 });
    await page.getByTestId("action-[object Object]").click({ force: true });
    await page.getByTestId("action-menu-button").click({ force: true });
    await page.getByTestId("action-Delete").click({ force: true });
    await page.getByTestId("confirm-delete-button").click({ force: true });
    await expect(
      page
        .locator('[data-testid="review-changes-button"]')
        .filter({ hasText: "Just now" })
    ).toBeVisible({ timeout: 150_000 });
    await page.getByTestId("action-[object Object]").click({ force: true });
    await page.getByTestId("action-menu-button").click({ force: true });
    await page.getByTestId("action-Delete").click({ force: true });
    await expect(page.getByText("Delete document?")).toBeVisible({
      timeout: 120_000,
    });
    await page.getByTestId("confirm-delete-button").click({ force: true });
    await expect(page.getByText("The document was successfully")).toBeVisible({
      timeout: 150_000,
    });

    // delete author
    await page.getByRole("link", { name: "Blog" }).click({ force: true });
    await page.getByRole("tab", { name: "Authors" }).click({ force: true });
    await page
      .getByRole("link", { name: inputValues.author.name })
      .click({ force: true });
    await page.getByTestId("action-menu-button").click({ force: true });
    await page.getByTestId("action-Delete").click({ force: true });
    await expect(page.getByText("Delete document?")).toBeVisible({
      timeout: 120_000,
    });
    await page.getByTestId("confirm-delete-button").click({ force: true });
    await expect(page.getByText("The document was successfully")).toBeVisible({
      timeout: 150_000,
    });

    // delete category
    await page.getByRole("link", { name: "Blog" }).click({ force: true });
    await page.getByRole("tab", { name: "Categories" }).click({ force: true });
    await page
      .getByRole("link", { name: inputValues.category.title })
      .click({ force: true });
    await page.getByTestId("action-menu-button").click({ force: true });
    await page.getByTestId("action-Delete").click({ force: true });
    await expect(page.getByText("Delete document?")).toBeVisible({
      timeout: 120_000,
    });
    await page.getByTestId("confirm-delete-button").click({ force: true });
    await expect(page.getByText("The document was successfully")).toBeVisible({
      timeout: 150_000,
    });
  });
});
