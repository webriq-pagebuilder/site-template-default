import { test, expect, type Page } from "@playwright/test";
import { autologin_studio } from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";

let globalSeo = {
  title: "",
  keywords: "",
  synonyms: "",
  description: "",
};

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

test.describe("Verify Global SEO Settings", () => {
  test.describe.configure({ timeout: 600000, mode: "serial" });

  test("Can add Global SEO values", async () => {
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
      .click({ force: true, timeout: 180000 });
  });

  test.describe("Empty SEO settings matches Global SEO values", () => {
    test.describe.configure({ timeout: 300000 });

    test.beforeEach(async () => {
      const element = page.locator('a:has-text("Pages")');
      await element.scrollIntoViewIfNeeded();
      await page.waitForSelector('a:has-text("Pages")', { state: "visible" });
      await element.click({ force: true });

      const nextElement = page.locator('a:has-text("New Page -")').first();
      await nextElement.scrollIntoViewIfNeeded();
      await page.waitForSelector('a:has-text("New Page -")', {
        state: "visible",
      });
      await nextElement.click({ force: true });

      await page
        .getByRole("button", { name: "SEO Settings" })
        .click({ force: true });
    });

    test("SEO title", async () => {
      const pageTitle = await page.locator("input#title").inputValue();

      const seoTitleFld = page
        .getByTestId("field-seo.seoTitle")
        .getByRole("textbox");
      seoTitleFld.click({ force: true });
      seoTitleFld.press("Meta+a");

      await expect(seoTitleFld).toHaveAttribute("placeholder", pageTitle);
    });

    test("SEO keywords", async () => {
      const seoKeywordsFld = page
        .getByTestId("field-seo.seoKeywords")
        .getByRole("textbox");
      seoKeywordsFld.click({ force: true });
      seoKeywordsFld.press("Meta+a");

      await expect(seoKeywordsFld).toHaveAttribute(
        "placeholder",
        globalSeo?.keywords
      );
    });

    test("SEO synonyms", async () => {
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
    });

    test("SEO description", async () => {
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
  });
});

test.describe("Redirects to Global SEO links", () => {
  test.describe.configure({ timeout: 300000 });

  test.beforeEach(async () => {
    const element = page.locator('a:has-text("Pages")');
    await element.scrollIntoViewIfNeeded();
    await page.waitForSelector('a:has-text("Pages")', { state: "visible" });
    await element.click({ force: true });

    const nextElement = page.locator('a:has-text("New Page -")').first();
    await nextElement.scrollIntoViewIfNeeded();
    await page.waitForSelector('a:has-text("New Page -")', {
      state: "visible",
    });
    await nextElement.click({ force: true });

    await page
      .getByRole("button", { name: "SEO Settings" })
      .click({ force: true });
  });

  test("SEO Keywords", async () => {
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
      timeout: 120000,
    });
  });

  test("SEO Synonyms", async () => {
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
      timeout: 120000,
    });
  });

  test("SEO Description", async () => {
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
    ).toBeVisible({ timeout: 120000 });
  });
});

test("Can add SEO values to page", async () => {
  test.setTimeout(300000);

  const element = page.locator('a:has-text("Pages")');
  await element.scrollIntoViewIfNeeded();
  await page.waitForSelector('a:has-text("Pages")', { state: "visible" });
  await element.click({ force: true });

  const nextElement = page.locator('a:has-text("New Page -")').first();
  await nextElement.scrollIntoViewIfNeeded();
  await page.waitForSelector('a:has-text("New Page -")', {
    state: "visible",
  });
  await nextElement.click({ force: true });

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
    .click({ force: true, timeout: 120000 });
  await expect(
    page
      .locator("[aria-label='Review changes']")
      .filter({ hasText: "just now" })
  ).toBeVisible({ timeout: 120000 });
});

test.afterAll(async () => {
  await page.close();
});
