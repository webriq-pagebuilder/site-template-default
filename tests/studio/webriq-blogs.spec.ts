import { test, expect } from "@playwright/test";
import { newPageTitle, publishDocument, deleteDocument } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
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
  console.log("[INFO] Run WebriQ Blogs tests ~ Verify main actions working");

  test.describe.configure({ timeout: 900_000, mode: "serial" });

  const publishedAt = format(new Date(), "MMMM dd, yyyy");

  test.beforeEach(async ({ page }) => {
    await page.goto(`./studio`);
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
    await publishDocument(page);

    console.log("[DONE] Testing Create author page 🚀");
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
    await publishDocument(page);

    console.log("[DONE] Testing Create category page 🚀");
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
    await publishDocument(page);

    console.log("[DONE] Testing Create blog page 🚀");
  });

  test("Check site preview", async ({ page }) => {
    await page
      .getByRole("tab", { name: "Posts", exact: true })
      .click({ force: true });
    await page.getByRole("link", { name: inputValues.post.title }).click();

    await expect(page.getByText("Loading document")).toBeHidden();
    await expect(page.getByTestId("string-input")).toBeVisible();

    await page.goto(
      `${NEXT_PUBLIC_SITE_URL}/${inputValues.post.title
        ?.toLowerCase()
        ?.replace(/\s/g, "-")}`
    );
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByText(inputValues?.category?.title)).toBeVisible({
      timeout: 150_000,
    });
    await expect(page.getByText(publishedAt)).toBeVisible();
    await expect(
      page.locator(`h1:has-text("${inputValues.post.title}")`)
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: inputValues?.author?.name })
    ).toBeVisible();
    await expect(page.getByText("Author", { exact: true })).toBeVisible();
    await expect(page.getByText(inputValues?.post?.body)).toBeVisible();

    console.log("[DONE] Testing Check site preview 🚀");
  });

  test("Delete author, category and post pages", async ({ page }) => {
    await page
      .getByRole("tab", { name: "Posts", exact: true })
      .click({ force: true });
    await page.getByRole("link", { name: inputValues.post.title }).click();

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
    await page
      .getByRole("link", { name: inputValues.author.name })
      .click({ force: true });
    await expect(page.getByText("Loading document")).toBeHidden();
    await expect(
      page.getByTestId("field-name").getByTestId("string-input")
    ).toHaveValue(inputValues.author.name);
    await deleteDocument(page);

    // delete category
    await page.getByRole("link", { name: "Blog" }).click({ force: true });
    await page.getByRole("tab", { name: "Categories" }).click({ force: true });
    await page
      .getByRole("link", { name: inputValues.category.title })
      .click({ force: true });
    await expect(page.getByText("Loading document")).toBeHidden();
    await expect(page.getByTestId("string-input")).toHaveValue(
      inputValues.category.title
    );
    await deleteDocument(page);

    console.log("[DONE] Testing Delete author, category and post pages 🚀");
  });
});
