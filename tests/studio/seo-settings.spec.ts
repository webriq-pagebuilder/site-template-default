import { test, expect } from "@playwright/test";
import { NEXT_PUBLIC_SANITY_STUDIO_URL } from "studio/config";
import { createNewPage, navigateToPage, newPageTitle } from "tests/utils";

let globalSeo = {
  title: "",
  keywords: "",
  synonyms: "",
  description: "",
};

const newPage = newPageTitle("Test SEO page ");

test.describe("Verify Global SEO Settings", () => {
  test.describe.configure({ timeout: 600_000, mode: "serial" });

  test("Can add Global SEO values", async ({ page }) => {
    await page.goto(
      `${NEXT_PUBLIC_SANITY_STUDIO_URL}/desk/__edit__0eb5e38b-33e2-46c9-a1eb-0bac24e14294,type=defaultSeo`
    );
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
      .press("Meta+a");
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
      .press("Meta+a");
    await page
      .getByTestId("field-defaultSeoSynonyms")
      .getByTestId("string-input")
      .fill("stackshift page,page");
    globalSeo.synonyms = await page
      .locator("input#defaultSeoSynonyms")
      .inputValue();

    await page.getByLabel("Description").click();
    await page.getByLabel("Description").press("Meta+a");
    await page
      .getByLabel("Description")
      .fill("Stackshift powers microsites with audience-specific content.");
    globalSeo.description = await page
      .locator("textarea#defaultSeoDescription")
      .inputValue();

    await page
      .getByTestId("action-Save")
      .click({ force: true, timeout: 180_000 });
  });

  test("Create test page for SEO", async ({ page }) => {
    await navigateToPage(page);

    // Click new page button
    const newPageButtonElement = page.locator(
      `a[href="/studio/intent/create/template=page;type=page/"]`
    );
    await newPageButtonElement.click({ force: true });

    const inputTitle = page.locator("input#title");
    await page.waitForSelector("input#title", { state: "visible" });
    await inputTitle.click({ force: true });
    await inputTitle.fill(newPage);
    await page.getByRole("button", { name: "Generate" }).click({ force: true });
    await page.getByTestId("action-[object Object]").click({ force: true });
    // await expect(
    //   page
    //     .locator('[id="__next"]')
    //     .getByRole("alert")
    //     .locator("div")
    //     .filter({ hasText: "The document was published" })
    //     .nth(1)
    // ).toBeVisible({ timeout: 150_000 });
    // await expect(
    //   page.getByRole("button", { name: "Last published just now" })
    // ).toBeVisible({ timeout: 150_000 });
    await page
      .getByRole("button", { name: "SEO Settings" })
      .click({ force: true });
  });

  test("Empty SEO settings matches Global SEO values", async ({ page }) => {
    test.setTimeout(300_000);

    await navigateToPage(page);
    await page.getByRole("link", { name: newPage }).click({ force: true });
    await page
      .getByRole("button", { name: "SEO Settings" })
      .click({ force: true });

    // SEO title
    const pageTitle = await page.locator("input#title").inputValue();
    const seoTitleFld = page
      .getByTestId("field-seo.seoTitle")
      .getByRole("textbox");
    seoTitleFld.click({ force: true });
    seoTitleFld.press("Meta+a");
    await expect(seoTitleFld).toHaveAttribute("placeholder", pageTitle);

    // SEO keywords
    const seoKeywordsFld = page
      .getByTestId("field-seo.seoKeywords")
      .getByRole("textbox");
    seoKeywordsFld.click({ force: true });
    seoKeywordsFld.press("Meta+a");
    await expect(seoKeywordsFld).toHaveAttribute(
      "placeholder",
      globalSeo?.keywords
    );

    // SEO synonyms
    const seoSynonymsFld = page
      .getByTestId("field-seo.seoSynonyms")
      .getByRole("textbox");
    await seoSynonymsFld.scrollIntoViewIfNeeded();
    seoSynonymsFld.click({ force: true });
    seoSynonymsFld.press("Meta+a");
    await expect(seoSynonymsFld).toHaveAttribute(
      "placeholder",
      globalSeo?.synonyms
    );

    // SEO description
    const seoDescFld = page
      .getByTestId("field-seo.seoDescription")
      .getByRole("textbox");
    await seoDescFld.scrollIntoViewIfNeeded();
    seoDescFld.click({ force: true });
    seoDescFld.press("Meta+a");
    await expect(seoDescFld).toHaveAttribute(
      "placeholder",
      globalSeo?.description
    );
  });

  test.describe("Redirects to Global SEO links", () => {
    test.describe.configure({ timeout: 300_000 });

    test.beforeEach(async ({ page }) => {
      await navigateToPage(page);
      await page.getByRole("link", { name: newPage }).click({ force: true });
      await page
        .getByRole("button", { name: "SEO Settings" })
        .click({ force: true });
    });

    test("SEO keywords", async ({ page }) => {
      // SEO keywords
      const seoKeywordsFld = page
        .getByTestId("field-seo.seoKeywords")
        .getByRole("textbox");
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
      await page.goto(
        `${NEXT_PUBLIC_SANITY_STUDIO_URL}/desk/__edit__0eb5e38b-33e2-46c9-a1eb-0bac24e14294,type=defaultSeo,field=defaultSeoKeywords`
      );
      await expect(
        page.getByTestId("field-defaultSeoKeywords").getByTestId("string-input")
      ).toBeVisible({
        timeout: 120_000,
      });
    });

    test("SEO synonyms", async ({ page }) => {
      const seoSynonymsFld = page
        .getByTestId("field-seo.seoSynonyms")
        .getByRole("textbox");
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
      await page.goto(
        `${NEXT_PUBLIC_SANITY_STUDIO_URL}/desk/__edit__0eb5e38b-33e2-46c9-a1eb-0bac24e14294,type=defaultSeo,field=defaultSeoSynonyms`
      );
      await expect(
        page.getByTestId("field-defaultSeoSynonyms").getByTestId("string-input")
      ).toBeVisible({
        timeout: 120_000,
      });
    });

    test("SEO description", async ({ page }) => {
      const seoDescFld = page
        .getByTestId("field-seo.seoDescription")
        .getByRole("textbox");
      seoDescFld.click({ force: true });
      seoDescFld.press("Meta+a");
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
      await page.goto(
        `${NEXT_PUBLIC_SANITY_STUDIO_URL}/desk/__edit__0eb5e38b-33e2-46c9-a1eb-0bac24e14294,type=defaultSeo,field=defaultSeoDescription`
      );
      await expect(
        page
          .getByLabel("Description")
          .and(page.locator("textarea#defaultSeoDescription"))
      ).toBeVisible({ timeout: 120_000 });
    });
  });

  test("Can add SEO values to page", async ({ page }) => {
    test.setTimeout(300_000);

    await navigateToPage(page);
    await page.getByRole("link", { name: newPage }).click({ force: true });
    await page
      .getByRole("button", { name: "SEO Settings" })
      .click({ force: true });

    // SEO title
    const seoTitleFld = page
      .getByTestId("field-seo.seoTitle")
      .getByRole("textbox");
    seoTitleFld.click({ force: true });
    seoTitleFld.press("Meta+a");
    seoTitleFld.fill("Stackshift | New Page");

    // SEO keywords
    const seoKeywordsFld = page
      .getByTestId("field-seo.seoKeywords")
      .getByRole("textbox");
    seoKeywordsFld.click({ force: true });
    seoKeywordsFld.press("Meta+a");
    seoKeywordsFld.fill("new page");

    // SEO synonyms
    const seoSynonymsFld = page
      .getByTestId("field-seo.seoSynonyms")
      .getByRole("textbox");
    seoSynonymsFld.click({ force: true });
    seoSynonymsFld.press("Meta+a");
    seoSynonymsFld.fill("test page");

    // SEO description
    const seoDescFld = page
      .getByTestId("field-seo.seoDescription")
      .getByRole("textbox");
    seoDescFld.click({ force: true });
    seoDescFld.press("Meta+a");
    seoDescFld.fill("This is the SEO description of this page.");

    // publish document
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 120_000 });
    await expect(
      page
        .locator("[aria-label='Review changes']")
        .filter({ hasText: "just now" })
    ).toBeVisible({ timeout: 120_000 });
  });
});
