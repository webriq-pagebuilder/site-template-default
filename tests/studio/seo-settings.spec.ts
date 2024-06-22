import { test, expect } from "@playwright/test";
import {
  createNewPage,
  deleteDocument,
  navigateToPages,
  newPageTitle,
  publishDocument,
  searchForName,
} from "tests/utils";

let globalSeo = {
  title: "",
  keywords: "",
  synonyms: "",
  description: "",
};

const newSeoPage = newPageTitle("SEO Page ");

test.describe("Verify SEO Settings", () => {
  console.log("[INFO] Run SEO Settings tests ~ Verify SEO Settings");

  test.describe.configure({ mode: "serial" });

  test("Create test page for SEO", async ({ page }) => {
    await navigateToPages(page);
    await createNewPage(page, newSeoPage, null);

    await publishDocument(page);

    console.log("[DONE] Create test page for SEO 🚀", newSeoPage);
  });

  test("Can add global SEO values", async ({ page }) => {
    await navigateToPages(page);
    await searchForName(page, { name: newSeoPage });
    await expect(
      await page.getByRole("link", { name: newSeoPage })
    ).toBeVisible();
    await page.getByRole("link", { name: newSeoPage }).click({ force: true });
    await page
      .getByRole("button", { name: "SEO Settings" })
      .click({ force: true });

    // click the SEO link from the first field
    await page
      .getByRole("link", { name: "default SEO keywords" })
      .click({ force: true });
    await expect(page.getByText("SEO Title")).toBeVisible({ timeout: 120_000 });

    // input global SEO
    await page
      .getByTestId("field-defaultSeoTitle")
      .getByTestId("string-input")
      .click();
    await page
      .getByTestId("field-defaultSeoTitle")
      .getByTestId("string-input")
      .press("Meta+a");
    await page
      .getByTestId("field-defaultSeoTitle")
      .getByTestId("string-input")
      .fill("Stackshift Page");
    globalSeo.title = await page.locator("input#defaultSeoTitle").inputValue();

    await page
      .getByTestId("field-defaultSeoKeywords")
      .getByTestId("string-input")
      .click();
    await page
      .getByTestId("field-defaultSeoKeywords")
      .getByTestId("string-input")
      .fill("stackshift");
    globalSeo.keywords = await page
      .locator("input#defaultSeoKeywords")
      .inputValue();

    await page
      .getByTestId("field-defaultSeoSynonyms")
      .getByTestId("string-input")
      .click();
    await page
      .getByTestId("field-defaultSeoSynonyms")
      .getByTestId("string-input")
      .fill("stackshift page,page");
    globalSeo.synonyms = await page
      .locator("input#defaultSeoSynonyms")
      .inputValue();

    await page.getByLabel("Description").click();
    await page
      .getByLabel("Description")
      .fill("Stackshift powers microsites with audience-specific content.");
    globalSeo.description = await page
      .locator("textarea#defaultSeoDescription")
      .inputValue();

    await page.getByTestId("action-Save").click({ force: true });
    await expect(
      page.getByRole("button", { name: "Last published just now" })
    ).toBeVisible();

    console.log("[DONE] Can add global SEO values 🚀");
  });

  test("Sets global SEO values when page SEO is undefined", async ({
    page,
  }) => {
    await navigateToPages(page);
    await searchForName(page, { name: newSeoPage });
    await expect(page.getByRole("link", { name: newSeoPage })).toBeVisible();
    await page.getByRole("link", { name: newSeoPage }).click({ force: true });
    await expect(page.getByText("Loading document")).toBeHidden();
    await page
      .getByRole("button", { name: "SEO Settings" })
      .click({ force: true });

    // SEO title
    await expect(page.locator("input#title")).toBeVisible();
    const pageTitle = await page.locator("input#title").inputValue();
    const seoTitleFld = page
      .getByTestId("field-seo.seoTitle")
      .getByRole("textbox");
    await expect(seoTitleFld).toHaveAttribute("placeholder", pageTitle);

    // SEO keywords
    const seoKeywordsField = page
      .getByTestId("field-seo.seoKeywords")
      .getByRole("textbox");
    await expect(seoKeywordsField).toBeVisible();
    await expect(seoKeywordsField).toHaveAttribute(
      "placeholder",
      globalSeo?.keywords
    );

    // SEO synonyms
    const seoSynonymsFld = page
      .getByTestId("field-seo.seoSynonyms")
      .getByRole("textbox");
    await expect(seoSynonymsFld).toBeVisible();
    await expect(seoSynonymsFld).toHaveAttribute(
      "placeholder",
      globalSeo?.synonyms
    );

    // SEO description
    await expect(page.getByPlaceholder(globalSeo?.description)).toBeVisible();

    console.log("[DONE] Sets global SEO values when page SEO is undefined 🚀");
  });

  test.describe("Redirects to global SEO page", () => {
    test.beforeEach(async ({ page }) => {
      await navigateToPages(page);
      await searchForName(page, { name: newSeoPage });
      await expect(page.getByRole("link", { name: newSeoPage })).toBeVisible();
      await page.getByRole("link", { name: newSeoPage }).click({ force: true });
      await expect(
        page.getByRole("button", { name: "SEO Settings" })
      ).toBeVisible();
      await page
        .getByRole("button", { name: "SEO Settings" })
        .click({ force: true });
    });

    test("SEO keywords", async ({ page }) => {
      const seoKeywordsFld = page
        .getByTestId("field-seo.seoKeywords")
        .getByRole("textbox");

      await expect(seoKeywordsFld).toBeVisible();
      seoKeywordsFld.click({ force: true });
      seoKeywordsFld.press("Meta+a");
      await expect(
        page
          .getByTestId("field-seo.seoKeywords")
          .getByTestId("change-bar__field-wrapper")
          .locator("div")
      ).toContainText(
        "No value specified. The default SEO keywords value will be used."
      );
      await page
        .getByRole("link", { name: "default SEO keywords" })
        .click({ force: true });
      await expect(
        page.getByTestId("field-defaultSeoKeywords").getByTestId("string-input")
      ).toBeVisible();
    });

    test("SEO synonyms", async ({ page }) => {
      const seoSynonymsFld = page
        .getByTestId("field-seo.seoSynonyms")
        .getByRole("textbox");

      await expect(seoSynonymsFld).toBeVisible();
      seoSynonymsFld.click({ force: true });
      seoSynonymsFld.press("Meta+a");
      await expect(
        page
          .getByTestId("field-seo.seoSynonyms")
          .getByTestId("change-bar__field-wrapper")
          .locator("div")
      ).toContainText(
        "No value specified. The default SEO synonyms value will be used."
      );
      await page
        .getByRole("link", { name: "default SEO synonyms" })
        .click({ force: true });
      await expect(
        page.getByTestId("field-defaultSeoSynonyms").getByTestId("string-input")
      ).toBeVisible();
    });

    test("SEO description", async ({ page }) => {
      await expect(page.getByPlaceholder(globalSeo?.description)).toBeVisible();
      await expect(
        page
          .getByTestId("field-seo.seoDescription")
          .getByTestId("change-bar__field-wrapper")
      ).toContainText(
        "No value specified. The default SEO description value will be used."
      );
      await page
        .getByRole("link", { name: "default SEO description" })
        .click({ force: true });
      await expect(
        page
          .getByLabel("Description")
          .and(page.locator("textarea#defaultSeoDescription"))
      ).toBeVisible();
    });

    console.log("[DONE] Redirects to global SEO page 🚀");
  });

  test("Can add page SEO values", async ({ page }) => {
    await navigateToPages(page);
    await searchForName(page, { name: newSeoPage });
    await expect(page.getByRole("link", { name: newSeoPage })).toBeVisible();
    await page.getByRole("link", { name: newSeoPage }).click({ force: true });
    await page
      .getByRole("button", { name: "SEO Settings" })
      .click({ force: true });

    // SEO title
    const seoTitleFld = page
      .getByTestId("field-seo.seoTitle")
      .getByRole("textbox");
    await expect(seoTitleFld).toBeVisible();
    seoTitleFld.fill("Stackshift | New Page");

    // SEO keywords
    const seoKeywordsFld = page
      .getByTestId("field-seo.seoKeywords")
      .getByRole("textbox");
    await expect(seoKeywordsFld).toBeVisible();
    seoKeywordsFld.fill("new page");

    // SEO synonyms
    const seoSynonymsFld = page
      .getByTestId("field-seo.seoSynonyms")
      .getByRole("textbox");
    await expect(seoSynonymsFld).toBeVisible();
    seoSynonymsFld.fill("test page");

    // SEO description
    await expect(page.getByPlaceholder(globalSeo?.description)).toBeVisible();
    await page
      .getByPlaceholder(globalSeo?.description)
      .fill("This is the SEO description of this page.");

    console.log("[DONE] Can add page SEO values 🚀");
  });

  test("Delete test page for SEO", async ({ page }) => {
    await navigateToPages(page);
    await searchForName(page, { name: newSeoPage });
    await expect(page.getByRole("link", { name: newSeoPage })).toBeVisible();
    await page.getByRole("link", { name: newSeoPage }).click({ force: true });
    await page.waitForSelector(`a:has-text("${newSeoPage}")`, {
      state: "visible",
    });
    await page.getByLabel("Clear").click({ force: true });
    await expect(page.getByText("Loading document")).toBeHidden();

    // delete test page
    await deleteDocument(page);

    console.log("[DONE] Delete test page for SEO 🚀");
  });
});
