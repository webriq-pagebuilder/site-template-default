import { test, expect } from "@playwright/test";
import { autologin_studio, createNewPage, expectDocumentPublished, navigateToPage } from "./helpers";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";

const newPageTitle = "New Page - " + new Date().getTime();

test.beforeEach(async ({ page }) => {
  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);
  // Pass the environment variable value as an argument to page.evaluate()
  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

//PUBLISH PAGES
test("Test to Publish a Page and Open Live URL", async ({ page }) => {
  await navigateToPage(page)
  await createNewPage(page, newPageTitle, 'Navigation')
  
  await page.getByTestId("field-label").getByTestId("string-input").click({ force: true });
  await page.getByTestId("field-label").getByTestId("string-input").fill("Navigation New Page Variant A");

  await page.getByTestId("field-variant").getByRole("img").first().click({ force: true });
  
  await expectDocumentPublished(page);
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  //Open Live URL
  await page.getByRole("link", { name: newPageTitle }).click({ force: true });
  await page.waitForTimeout(5000);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText("http://localhost:3000/new-").click();
  const openUrlPage = await pagePromise;

  // Wait for the element to become visible or hidden with a longer timeout
  const sectionCount = await page.locator("div").filter({ hasText: /^No items$/ }).count();
  if (sectionCount > 0) {
    // If the section is found, expect the Empty Page element to be visible
    await expect(openUrlPage.getByText("Empty Page")).toBeVisible({
      timeout: 10000,
    });
  } else {
    // If the section is not found, expect the Empty Page element to be hidden
    await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
      timeout: 10000,
    });
  }
});

//Launch Inline Editing
test("Open Inline Editing", async ({ page }) => {
  let pageName = "New Page - 1711763124207";
  let altText = `Alt text ` + new Date().getTime();

  await navigateToPage(page);
  await page.getByPlaceholder('Search list').click({ force: true })
  await page.getByPlaceholder('Search list').fill(pageName)
  await page.waitForSelector(`a:has-text("${pageName}")`, { state: 'visible' });

  await page.getByRole("link", { name: pageName }).click({ force: true });
  await page.waitForSelector(`a:has-text("${pageName}")`, { state: 'visible' });
  await page.getByLabel('Clear').click({ force: true })
  await page.waitForTimeout(5000);

  const launchInlineEditing = page.waitForEvent("popup");
  await page.waitForTimeout(10000);

  await page.getByLabel("Launch Inline Editing").click();
  const inlineEditPage = await launchInlineEditing;
  await inlineEditPage.locator("#navigation").click(); //Edit button
  await expect(
    inlineEditPage.locator(".react-split > div:nth-child(2)")
  ).toBeVisible();

  await inlineEditPage
    .getByTestId("field-variants.logo.alt")
    .getByTestId("string-input")
    .click();
  await inlineEditPage
    .getByTestId("field-variants.logo.alt")
    .getByTestId("string-input")
    .fill(altText);
  await inlineEditPage.getByText("External, outside this website").click();
  await inlineEditPage.getByLabel("URL").click();
  await inlineEditPage.getByLabel("URL").fill("https://facebook.com");
  await inlineEditPage.getByText("Blank - open on a new tab (").click();
  await inlineEditPage.getByTestId("action-Save").click({ force: true });
  await inlineEditPage.waitForTimeout(2000);
  await expect(
    inlineEditPage
      .locator('[id="__next"]')
      .getByRole("alert")
      .locator("div")
      .filter({ hasText: "The document was published" })
      .nth(1)
  ).toBeVisible();

  await inlineEditPage.locator("#navigation").click({ force: true }); //Close Button
  await expect(
    inlineEditPage.locator(".react-split > div:nth-child(2)")
  ).toBeHidden();
});

//Duplicate Pages Action
test("Pages Duplicate Action and Open Live URL", async ({ page }) => {
  const duplicatePageName = `Dupe Page ` + new Date().getTime();
  const navigatePageName = "New Page - 1711763289822"
  await navigateToPage(page);

  await page.getByPlaceholder('Search list').click({ force: true })
  await page.getByPlaceholder('Search list').fill(navigatePageName)
  await page.waitForSelector(`a:has-text("${navigatePageName}")`, { state: 'visible' });

  await page.getByRole("link", { name: navigatePageName }).click({ force: true });
  await page.waitForSelector(`a:has-text("${navigatePageName}")`, { state: 'visible' });
  await page.getByLabel('Clear').click({ force: true })
  await page.waitForTimeout(3000);
  await page.getByTestId("action-menu-button").click({ force: true });
  await page.getByTestId("action-Duplicate").click({ force: true });
  await page.getByPlaceholder("Copy of New Page -").fill(duplicatePageName);
  await page.getByRole("button", { name: "Duplicate" }).click();

  await expect(page.locator('[id="__next"]').getByRole("alert").locator("div").nth(1)).toBeVisible();
  await page.waitForSelector(`a:has-text("${duplicatePageName}")`, { state: 'visible' });
  await expect(page.getByRole("link", { name: duplicatePageName })).toBeVisible();
  await page.getByRole("link", { name: duplicatePageName }).click({ force: true });
  await page.waitForTimeout(5000);
  await page.getByTestId("action-[object Object]").click({ force: true });
  await expect(page
      .locator('[id="__next"]')
      .getByRole("alert")
      .locator("div")
      .filter({ hasText: "The document was published" })
      .nth(1)
  ).toBeVisible();

  //Open Live URL
  await page.getByRole("link", { name: duplicatePageName }).click({ force: true });
  await page.waitForTimeout(5000);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText("http://localhost:3000/dupe-page-").click();
  const openUrlPage = await pagePromise;

  // Wait for the element to become visible or hidden with a longer timeout
  const sectionCount = await page.locator("div").filter({ hasText: /^No items$/ }).count();
  if (sectionCount > 0) {
    // If the section is found, expect the Empty Page element to be visible
    await expect(openUrlPage.getByText("Empty Page")).toBeVisible({
      timeout: 10000,
    });
  } else {
    // If the section is not found, expect the Empty Page element to be hidden
    await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
      timeout: 10000,
    });
  }
});

//SEE CURRENT VERSION
test("See Current Version", async ({ page }) => {
  await page.goto("http://localhost:3000/studio");

  // Find the element you want to click
  const element = page.locator('a:has-text("Guide")');

  // Scroll the page to the element
  await element.scrollIntoViewIfNeeded();

  // Wait for the element to be fully visible
  await page.waitForSelector('a:has-text("Guide")', { state: "visible" });

  // Click on the element
  await element.click({ force: true });

  await expect(
    page.getByRole("button", { name: "Help Guide & Version" })
  ).toBeVisible();
});