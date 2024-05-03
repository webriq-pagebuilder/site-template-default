import { test, expect } from "@playwright/test";
import { newPageTitle, expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";

test.describe("Verify main actions working", () => {
  test.describe.configure({ timeout: 900_000, mode: "serial" });

  const currentDate = new Date();
  const publishedAt = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const inputValues = {
    author: {
      name: newPageTitle("New Author"),
      bio: "This is a sample author bio.",
    },
    category: {
      title: newPageTitle("New Category"),
      description: "This is a sample category.",
    },
    post: {
      title: newPageTitle("New Blog"),
      excerpt: "Sample excerpt",
      body: "This is a sample blog post content.",
    },
  };

  test.beforeEach(async ({ page }) => {
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
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 120_000 }); // publish document
    await expect(
      page
        .locator("[aria-label='Review changes']")
        .filter({ hasText: "just now" })
    ).toBeVisible({ timeout: 120_000 });
  });

  test("Create category page", async ({ page }) => {
    await page.getByRole("link", { name: "Blog" }).click();
    await page
      .getByRole("button", { name: "Create", exact: true })
      .click({ force: true });
    await page.getByRole("menuitem", { name: "Category" }).click();
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(inputValues.category.title);
    await page.getByLabel("Description").click();
    await page.getByLabel("Description").fill(inputValues.category.description);
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 120_000 }); // publish document
    await expect(
      page
        .locator("[aria-label='Review changes']")
        .filter({ hasText: "just now" })
    ).toBeVisible({ timeout: 120_000 });
  });

  test("Create blog page", async ({ page }) => {
    await page.getByRole("link", { name: "Blog" }).click();
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
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill(inputValues.author.name);
    await page
      .locator(`button:has-text(${inputValues.author.name})`)
      .first()
      .click();
    await page
      .getByTestId("field-categories")
      .getByRole("button", { name: "Add item" })
      .click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill(inputValues.category.title);
    await page
      .locator(`button:has-text(${inputValues.category.title})`)
      .first()
      .click();
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
      .fill(inputValues.post.body);
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 120_000 }); // publish document
    await expect(
      page
        .locator("[aria-label='Review changes']")
        .filter({ hasText: "just now" })
    ).toBeVisible({ timeout: 120_000 });

    // check site preview now all created pages are linked
    await expectDocumentPublished(page, newPageTitle);
    const pagePromise = page.waitForEvent("popup");
    await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
    const openUrlPage = await pagePromise;

    await expect(page.locator('[id="__next"]')).toContainText(
      inputValues.category.title
    );
    await expect(page.locator('[id="__next"]')).toContainText(publishedAt);
    await expect(openUrlPage.locator("h3")).toContainText(
      inputValues.author.name
    );
    await expect(
      openUrlPage.getByText("Author", { exact: true })
    ).toBeVisible();
    await expect(
      openUrlPage
        .locator("section")
        .filter({ hasText: `${inputValues.category.title}•` })
        .getByRole("img")
    ).toBeVisible();
    await expect(page.locator('[id="__next"]')).toContainText(
      inputValues.post.body
    );
  });

  test("Delete created author, category and post", async ({ page }) => {
    await page
      .getByRole("tab", { name: "Posts", exact: true })
      .click({ force: true });
    await page.getByRole("link", { name: inputValues.post.title }).click();
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
    await page.getByRole("link", { name: inputValues.author.name }).click();
    await page.getByTestId("action-menu-button").click();
    await page.getByTestId("action-Delete").click();
    await expect(page.getByText("Delete document?")).toBeVisible();
    await page.getByTestId("confirm-delete-button").click();
    await expect(page.getByText("The document was successfully")).toBeVisible();

    await page.getByRole("link", { name: "Blog" }).click();
    await page.getByRole("tab", { name: "Categories" }).click();
    await page.getByRole("link", { name: inputValues.category.title }).click();
    await page.getByTestId("action-menu-button").click();
    await page.getByTestId("action-Delete").click();
    await expect(page.getByText("Delete document?")).toBeVisible();
    await page.getByTestId("confirm-delete-button").click();
    await expect(page.getByText("The document was successfully")).toBeVisible();
  });
});
