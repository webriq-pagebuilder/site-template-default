import { expect, test } from "@playwright/test";
import { autologin_studio, createNewPage, expectDocumentPublished, navigateToPage } from "tests/helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  // Pass the environment variable value as an argument to page.evaluate()
  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

// TODO: Test buttons, and new routes for navigation menu
export async function createNavigationVariant(page, pageTitle, variantLabel, externalLinks, variantIndex) {
  const newPageTitle = pageTitle + " - " + new Date().getTime()
  const inputPrimaryButton = "Primary Button Test";
  const inputSecondaryButton = "Secondary Button Test"

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Navigation")

  await page.getByTestId("field-label").getByTestId("string-input").click({ force: true });
  await page.getByTestId("field-label").getByTestId("string-input").fill(variantLabel);
  
  if(variantIndex <= 0) {
    await page.getByTestId("field-variant").getByRole("img").first().click({ force: true });
  } else {
    await page.getByTestId("field-variant").getByRole("img").nth(variantIndex).click({ force: true });
  }

  if (variantIndex === 4) {
    await page.getByTestId('scroll-container').getByRole('textbox').click({ force: true });
    await page.getByTestId('scroll-container').getByRole('textbox').fill('Hi, you\'re new here! Get 20% off card! testttttttttt');
  }

  //Logo Alt
  const logoAltInput = page.getByTestId('field-variants.logo.alt').getByTestId('string-input');
  await logoAltInput.click();
  await logoAltInput.fill("alt text test");

  await page.getByText('External, outside this website').click()
  await page.waitForTimeout(1000)
  await page.getByLabel('URL').click()
  await page.getByLabel('URL').fill(externalLinks)
  await page.waitForTimeout(1000)
  await page.getByText('Blank - open on a new tab (').click()

  //TODO: SELECT THE NAVIGATION MENU ROUTES HERE.
  //TODO: RESEARCH WHY THE ROUTES ARE NOT CLICKABLE? UNABLE TO UPDATE THE NAV MENU ITEMS.

  if(variantIndex < 4) {
    //Primary Button Input
    await page.getByRole('button', { name: 'Primary Button' }).click()
    const primaryButtonInput = page.getByTestId('field-variants.primaryButton.label').getByTestId('string-input')
    await primaryButtonInput.click();
    await primaryButtonInput.fill(inputPrimaryButton);
    await expect(primaryButtonInput.inputValue()).resolves.toBe(inputPrimaryButton);

    // TODO: Make dynamic for internal/external
    const primaryButtonLinkType = page.getByTestId('field-variants.primaryButton.linkType').getByText('External, outside this website')
    await primaryButtonLinkType.click()
    await page.getByTestId('field-variants.primaryButton.linkExternal').getByLabel('URL').click()
    await page.getByTestId('field-variants.primaryButton.linkExternal').getByLabel('URL').fill(externalLinks)
    await page.getByTestId('field-variants.primaryButton.linkTarget').getByText('Blank - open on a new tab (').click()

    //Secondary Button Input
    await page.getByRole('button', { name: 'Secondary Button' }).click();
    const secondaryButtonInput = page.getByTestId('field-variants.secondaryButton.label').getByTestId('string-input')
    await secondaryButtonInput.click();
    await secondaryButtonInput.fill(inputSecondaryButton);
    await expect(secondaryButtonInput.inputValue()).resolves.toBe(inputSecondaryButton);

    // TODO: Make dynamic for internal/external
    const secondaryButtonLinkType = page.getByTestId('field-variants.secondaryButton.linkType').getByText('External, outside this website');
    await secondaryButtonLinkType.click();
    await page.getByTestId('field-variants.secondaryButton.linkExternal').getByLabel('URL').click();
    await page.getByTestId('field-variants.secondaryButton.linkExternal').getByLabel('URL').fill(externalLinks);
    await page.getByTestId('field-variants.secondaryButton.linkTarget').getByText('Blank - open on a new tab (').click();
  }
    
  await expectDocumentPublished(page)
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  const pagePromise = page.waitForEvent('popup');

  // TODO: DOMAIN SHOULD BE DYNAMIC EITHER http://localhost:3000/ / https://stackshift-
  await page.getByText('http://localhost:3000/').click({ force: true });
  const openUrlPage = await pagePromise;
  
  const sectionCount = await page.locator("div").filter({ hasText: /^No items$/ }).count();
  if (sectionCount > 0) {
    // If the section no items is found, expect the Empty Page element to be visible
    await expect(openUrlPage.getByText("Empty Page")).toBeVisible();
  } else { 
    // If the section no items is not found, expect the Empty Page element to be hidden
    await expect(openUrlPage.getByText("Empty Page")).toBeHidden();
    await expect(openUrlPage.locator('section')).toBeVisible();

    if (variantIndex === 4) {
      const navigationPromise = openUrlPage.waitForNavigation();
      await navigationPromise;
      await expect(openUrlPage.getByRole('navigation')).toBeVisible({ timeout: 10000 });
    } else {
      const page10Promise = openUrlPage.waitForEvent('popup');
      await openUrlPage.waitForTimeout(5000)
      // TODO: PUT LOGIC HERE TO EXPECT THE SAME VALUE FOR NAVIGATION ROUTES LIST.
      await openUrlPage.getByRole('link', { name: inputPrimaryButton }).click();
      const page10 = await page10Promise;
      
      // Normalize URLs for comparison
      const normalizedExpectedUrl = externalLinks.replace("https://www.", "https://");
      const normalizedReceivedUrl = page10.url().replace("https://www.", "https://");
      await expect(normalizedReceivedUrl).toBe(normalizedExpectedUrl);
    }
  }
}

//Create Navigation Page
test("Create Navigation A", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page A", "Navigation New Page Variant A", "https://facebook.com/", 0);
});

test("Create Navigation B", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page B", "Navigation New Page Variant B", "https://facebook.com/", 1);
});

test("Create Navigation C", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page C", "Navigation New Page Variant C", "https://facebook.com/", 2);
});

test("Create Navigation D", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page D", "Navigation New Page Variant D", "https://facebook.com/", 3);
});

test("Create Navigation E", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page E", "Navigation New Page Variant E", "https://facebook.com/", 4);
});

test.afterAll(async () => {
  console.log("[DONE] Successfully run all tests for Create Navigation Component");
});