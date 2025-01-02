import { test, expect } from "@playwright/test";
import {
  newPageTitle,
  publishDocument,
  deleteDocument,
  createSlug,
} from "tests/utils";
import { format } from "date-fns";

test.describe("Verify main actions working", () => {
  console.log("[INFO] Run WebriQ Blogs tests ~ Verify main actions working");

  test.describe.configure({ timeout: 900_000, mode: "serial" });

  let testData: {
    authorName: string;
    categoryTitle: string;
    blogTitle: string;
    publishedAt: string;
  };

  test.beforeAll(() => {
    // Initialize all test data once before any tests run
    testData = {
      authorName: newPageTitle("New Author "),
      categoryTitle: newPageTitle("New Category "),
      blogTitle: newPageTitle("New Blog "),
      publishedAt: format(new Date(), "MMMM dd, yyyy"),
    };
  });

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
      .fill(testData?.authorName);
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
    await page.getByTestId("string-input").fill(testData?.categoryTitle);
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
      .fill(testData?.blogTitle);
    await page.getByRole("button", { name: "Generate" }).click();
    await page.getByLabel("Excerpt").click();
    await page.getByLabel("Excerpt").fill("Sample excerpt");

    await page
      .getByTestId("field-authors")
      .getByRole("button", { name: "Add item" })
      .click({ force: true });
    await page.getByTestId("autocomplete").click({ force: true });
    await page.getByTestId("autocomplete").fill(testData?.authorName);
    await page
      .getByRole("button", { name: testData?.authorName })
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
      .fill(testData?.categoryTitle);
    await page
      .getByRole("button", { name: testData?.categoryTitle })
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
      }&slug=${createSlug(testData?.blogTitle)}`
    );
    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Add a small delay to ensure dynamic content is rendered
    await page.waitForTimeout(2000);

    await expect(page.getByText(testData?.categoryTitle)).toBeVisible();
    await expect(page.getByText(testData?.publishedAt)).toBeVisible();
    await expect(page.getByText(testData?.blogTitle)).toBeVisible();
    await expect(page.getByText(testData?.authorName)).toBeVisible();
    await expect(page.getByText("Author", { exact: true })).toBeVisible();
    await expect(
      page.getByText("This is a sample blog post content.")
    ).toBeVisible();

    console.log("[DONE] Check site preview 🚀");
  });

  test("Delete author, category and post pages", async ({ page }) => {
    await expect(page.getByText("Fetching blog posts...")).toBeHidden();
    await expect(
      page.getByRole("link", { name: testData?.blogTitle })
    ).toBeVisible();
    await page.getByRole("link", { name: testData?.blogTitle }).click();

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
      .getByRole("link", { name: testData?.authorName })
      .click({ force: true });
    await expect(page.getByText("Loading document")).toBeHidden();
    await expect(
      page.getByTestId("field-name").getByTestId("string-input")
    ).toHaveValue(testData?.authorName);
    await deleteDocument(page);

    // delete category
    await page.getByRole("link", { name: "Blog" }).click({ force: true });
    await page.getByRole("tab", { name: "Categories" }).click({ force: true });
    await page
      .getByRole("link", { name: testData?.categoryTitle })
      .click({ force: true });
    await expect(page.getByText("Loading document")).toBeHidden();
    await expect(page.getByTestId("string-input")).toHaveValue(
      testData?.categoryTitle
    );
    await deleteDocument(page);

    console.log("[DONE] Delete author, category and post pages 🚀");
  });
});
