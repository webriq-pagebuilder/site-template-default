import { test, expect, type Page } from "@playwright/test";
import { autologin_studio, createNewPage, expectDocumentPublished, navigateToPage } from "./utils/index";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";

let page: Page;
const newPageTitle = "New Page - " + new Date().getTime();

test.beforeAll(async ({ browser }) => {
  page= await browser.newPage();

  //navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

test.describe("Main Workflow", () => {
  test.describe.configure({ timeout: 900000, mode: "serial" });

  //PUBLISH PAGES
  test("Test to Publish a Page and Open Live URL", async () => {
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
        timeout: 20000,
      });
    } else {
      // If the section is not found, expect the Empty Page element to be hidden
      await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
        timeout: 20000,
      });
    }
  });

  //Duplicate Pages Action
  test("Pages Duplicate Action and Open Live URL", async () => {
    const duplicatePageName = `Dupe Page ` + new Date().getTime();
    await navigateToPage(page);

    await page.getByPlaceholder('Search list').click({ force: true })
    await page.getByPlaceholder('Search list').fill(newPageTitle)
    await page.waitForSelector(`a:has-text("${newPageTitle}")`, { state: 'visible' });

    await page.getByRole("link", { name: newPageTitle }).click({ force: true });
    await page.waitForSelector(`a:has-text("${newPageTitle}")`, { state: 'visible' });
    await page.getByLabel('Clear').click({ force: true })
    await page.waitForTimeout(3000);
    await page.getByTestId("action-menu-button").click({ force: true });
    await page.getByTestId("action-Duplicate").click({ force: true });
    await page.getByPlaceholder("Copy of New Page -").click();
    await page.getByPlaceholder("Copy of new Page -").fill(duplicatePageName);
    await page.getByRole("button", { name: "Duplicate" }).click();

    await expect(page.locator('[id="__next"]').getByRole("alert").locator("div").nth(1)).toBeVisible();
    await page.waitForSelector(`a:has-text("${duplicatePageName}")`, { state: 'visible' });
    await expect(page.getByRole("link", { name: duplicatePageName })).toBeVisible();
    await page.getByRole("link", { name: duplicatePageName }).click({ force: true });
    await page.waitForTimeout(5000);
    await page.getByTestId('action-[object Object]').click({ force: true });
    await expect(page.getByTestId('review-changes-button')).toBeHidden({ timeout: 150000 })
    await expect(page.locator('[id="__next"]').getByRole("alert").locator("div").filter({ hasText: "The document was published" }).nth(1)).toBeVisible({ timeout: 150000 });


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

  //Launch Inline Editing - Edit and Close button function
  test("Open Inline Editing", async () => {
    let altText = `Alt text ` + new Date().getTime();

    await navigateToPage(page);
    await page.getByPlaceholder('Search list').click({ force: true })
    await page.getByPlaceholder('Search list').fill(newPageTitle)
    await page.waitForSelector(`a:has-text("${newPageTitle}")`, { state: 'visible' });

    await page.getByRole("link", { name: newPageTitle }).click({ force: true });
    await page.waitForSelector(`a:has-text("${newPageTitle}")`, { state: 'visible' });
    await page.getByLabel('Clear').click({ force: true })
    await page.waitForTimeout(5000);

    const launchInlineEditing = page.waitForEvent("popup");
    await page.waitForTimeout(10000);

    await page.getByLabel("Launch Inline Editing").click();
    const inlineEditPage = await launchInlineEditing;
    await inlineEditPage.locator("#navigation").click(); //Edit button
    await expect(inlineEditPage.locator(".react-split > div:nth-child(2)")).toBeVisible();

    const altTextInput = inlineEditPage.getByTestId("field-variants.logo.alt").getByTestId("string-input")
    await altTextInput.click();
    await altTextInput.fill(altText);

    await inlineEditPage.getByText("External, outside this website").click();
    await inlineEditPage.getByLabel("URL").click();
    await inlineEditPage.getByLabel("URL").fill("https://facebook.com");
    await inlineEditPage.getByText("Blank - open on a new tab (").click();
    await expect(inlineEditPage.locator('[data-testid="review-changes-button"]').filter({ hasText: "Just now" })).toBeVisible({ timeout: 150000 });
    await inlineEditPage.getByTestId("action-Save").click({ force: true });
    await expect(inlineEditPage.getByTestId('review-changes-button')).toBeHidden({ timeout: 150000 });
    await expect(inlineEditPage.locator('[id="__next"]').getByRole("alert").locator("div").filter({ hasText: "The document was published" }).nth(1)).toBeVisible({ timeout: 150000 });

    await inlineEditPage.locator("#navigation").click({ force: true }); //Close Button
    await expect(inlineEditPage.locator(".react-split > div:nth-child(2)")).toBeHidden();
  });

  test("Test with no Section should display Empty Page", async () => {
    await navigateToPage(page);
    await page.getByPlaceholder('Search list').click({ force: true })
    await page.getByPlaceholder('Search list').fill(newPageTitle)
    await page.waitForSelector(`a:has-text("${newPageTitle}")`, { state: 'visible' });

    await page.getByRole("link", { name: newPageTitle }).click({ force: true });
    await page.waitForSelector(`a:has-text("${newPageTitle}")`, { state: 'visible' });
    await page.getByLabel('Clear').click({ force: true })
    await page.waitForTimeout(3000);
    await expect(page.getByText('Loading document')).toBeHidden({ timeout: 150000 });
    await page.getByTestId('field-sections').getByRole('button').nth(1).click();
    await page.getByRole('menuitem', { name: 'Remove' }).click();

    await expect(page.getByTestId('review-changes-button')).toBeVisible({ timeout: 150000 });
    await page.getByTestId('action-[object Object]').click({ force: true });
    await expect(page.getByTestId('review-changes-button')).toBeHidden({ timeout: 150000 });
    await expect(page.locator('[id="__next"]').getByRole('alert').locator('div').filter({ hasText: 'The document was published' }).nth(1)).toBeVisible({ timeout: 150000 });
    await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

    const pagePromise = page.waitForEvent('popup');
    await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
    const openUrlPage = await pagePromise;

    // Wait for the element to become visible or hidden with a longer timeout
    const sectionCount = await page.locator("div").filter({ hasText: /^No items$/ }).count();
    if (sectionCount > 0) {
      // If the section no items is found, expect the Empty Page element to be visible
      await expect(openUrlPage.getByText("Empty Page")).toBeVisible({ timeout: 20000 }).then(() => console.log('There is no Available Content!'));
    }
  })
})

//SEE CURRENT VERSION
test("See Current Version", async () => {
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