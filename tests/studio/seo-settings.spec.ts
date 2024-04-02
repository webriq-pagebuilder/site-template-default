import { test, expect } from "@playwright/test";
import { autologin_studio } from "tests/autologin";
import {
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SANITY_STUDIO_URL,
} from "studio/config";

let globalSeo = {
  title: "",
  keywords: "",
  synonyms: "",
  description: "",
};

const defaultKeywordFld =
  "/studio/intent/edit/id=0eb5e38b-33e2-46c9-a1eb-0bac24e14294;type=defaultSeo;field=defaultSeoKeywords";
const defaultSynonymFld =
  "/studio/intent/edit/id=0eb5e38b-33e2-46c9-a1eb-0bac24e14294;type=defaultSeo;field=defaultSeoSynonyms";
const defaultDescriptionFld =
  "/studio/intent/edit/id=0eb5e38b-33e2-46c9-a1eb-0bac24e14294;type=defaultSeo;field=defaultSeoDescription";

test.beforeEach(async ({ page }) => {
  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  await page.evaluate(autologin_studio, { token, projectId });
});

test.skip("Add Global SEO", async ({ page }) => {
  test.setTimeout(600000);

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
    .fill("");
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
    .fill("");
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
    .fill("");
  await page
    .getByTestId("field-defaultSeoSynonyms")
    .getByTestId("string-input")
    .fill("stackshift page,page");
  globalSeo.synonyms = await page
    .locator("input#defaultSeoSynonyms")
    .inputValue();

  await page.getByLabel("Description").click();
  await page.getByLabel("Description").fill("");
  await page
    .getByLabel("Description")
    .fill("Stackshift powers microsites with audience-specific content.");
  globalSeo.description = await page
    .locator("textarea#defaultSeoDescription")
    .inputValue();

  await page.getByTestId("action-Save").click({ force: true, timeout: 180000 });
});

test.describe("Redirect to Global SEO links", () => {
  test.describe.configure({ timeout: 600000, mode: "serial" });

  test.beforeEach(async ({ page }) => {
    // Navigate to the studio URL
    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}/desk`);

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

  test("Keywords", async ({ page }) => {
    await page.getByTestId("field-seo.seoKeywords").fill("");
    await expect(
      page
        .getByText(
          "No value specified. The default SEO keywords value will be used."
        )
        .and(page.locator(`a[href=${defaultKeywordFld}]`))
    ).toBeVisible({ timeout: 60000 });
    await page
      .getByRole("link", { name: "default SEO keywords" })
      .click({ force: true });
    await page.waitForURL(
      `${NEXT_PUBLIC_SANITY_STUDIO_URL}/desk/__edit__0eb5e38b-33e2-46c9-a1eb-0bac24e14294,type=defaultSeo,field=defaultSeoKeywords`
    );
    await expect(page.getByTestId("field-defaultSeoKeywords")).toBeVisible();
  });

  test("Synonyms", async ({ page }) => {
    await page.getByTestId("field-seo.seoSynonyms").fill("");
    await expect(
      page
        .getByText(
          "No value specified. The default SEO synonyms value will be used."
        )
        .and(page.locator(`a[href=${defaultSynonymFld}]`))
    ).toBeVisible({ timeout: 60000 });
    await page
      .getByRole("link", { name: "default SEO synonyms" })
      .click({ force: true });
    await page.waitForURL(
      `${NEXT_PUBLIC_SANITY_STUDIO_URL}/desk/__edit__0eb5e38b-33e2-46c9-a1eb-0bac24e14294,type=defaultSeo,field=defaultSeoSynonyms`
    );
    await expect(page.getByTestId("field-defaultSeoSynonyms")).toBeVisible();
  });

  test("Description", async ({ page }) => {
    await page.getByTestId("field-seo.seoDescription").fill("");
    await expect(
      page
        .getByText(
          "No value specified. The default SEO description value will be used."
        )
        .and(page.locator(`a[href=${defaultDescriptionFld}]`))
    ).toBeVisible({ timeout: 60000 });
    await page
      .locator(`a[href=${defaultDescriptionFld}]`)
      .click({ force: true });
    await page.waitForURL(
      `${NEXT_PUBLIC_SANITY_STUDIO_URL}/desk/__edit__0eb5e38b-33e2-46c9-a1eb-0bac24e14294,type=defaultSeo,field=defaultSeoDescription`
    );
    await expect(page.getByTestId("field-defaultSeoDescription")).toBeVisible({
      timeout: 120000,
    });
  });
});

test("Add Page SEO", async ({ page }) => {
  test.setTimeout(600000);

  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}/desk`);
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

  const pageTitle = await page.locator("input#title").inputValue();

  // SEO title
  await page.getByTestId("field-seo.seoTitle").fill("");
  await expect(page.getByText("Page title value will be used.")).toBeVisible({
    timeout: 60000,
  });
  await page.getByTestId("field-seo.seoTitle").fill("Stackshift | New Page");

  // SEO keywords
  await page.getByTestId("field-seo.seoKeywords").fill("");
  await expect(
    page.getByText(
      "No value specified. The default SEO keywords value will be used."
    )
  ).toBeVisible({ timeout: 60000 });
  await page.getByTestId("field-seo.seoKeywords").fill("new page");

  // SEO synonyms
  await page.getByTestId("field-seo.seoSynonyms").click();
  await page.getByTestId("field-seo.seoSynonyms").fill("");
  await expect(
    page.getByText(
      "No value specified. The default SEO synonyms value will be used."
    )
  ).toBeVisible({ timeout: 60000 });
  await page.getByTestId("field-seo.seoSynonyms").fill("test page");

  // SEO description
  await page.getByTestId("field-seo.seoDescription").click();
  await page.getByTestId("field-seo.seoDescription").fill("");
  await expect(
    page.getByText(
      "No value specified. The default SEO description value will be used."
    )
  ).toBeVisible({ timeout: 60000 });
  await page
    .getByTestId("field-seo.seoDescription")
    .fill("This is the SEO description of this page.");

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
