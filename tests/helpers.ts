import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SANITY_STUDIO_URL } from "studio/config";

export function autologin_studio({ token, projectId }) {
  console.log("🚀 ~ autologin_studio ~ { token, projectId }:", {
    token,
    projectId,
  });
  window.localStorage.setItem(
    `__studio_auth_token_${projectId}`,
    JSON.stringify({
      token,
      time: "2024-03-11T07:00:27.633Z",
    })
  );
}

export async function navigateToPage(page) {
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  // Find the element you want to click
  const element = page.locator('a:has-text("Pages")');
  // Scroll the page to the element
  await element.scrollIntoViewIfNeeded();
  // Wait for the element to be fully visible
  await page.waitForSelector('a:has-text("Pages")', { state: "visible" });
  // Click on the element
  await element.click({ force: true });
}

// TODO: Test buttons, and new routes for navigation menu
export async function createNavigationVariant(page, pageTitle, variantLabel, externalLinks, variantIndex) {
  const newPageTitle = pageTitle + " - " + new Date().getTime()
  await navigateToPage(page);

   // Click new page button
  const newPageButtonElement = page.locator(`a[href="/studio/intent/create/template=page;type=page/"]`);
  await newPageButtonElement.click({ force: true });

  const inputTitle = page.locator("input#title");
  await page.waitForSelector("input#title", { state: "visible" });
  await inputTitle.click({ force: true });
  await inputTitle.fill(newPageTitle);

  await page.getByRole("button", { name: "Generate" }).click({ force: true });
  await page.getByRole("button", { name: "Add item…" }).click({ force: true });
  await page.getByRole("menuitem", { name: "Navigation" }).click({ force: true });
  await page.getByTestId("reference-input").getByRole("button", { name: "Create new" }).click({ force: true });
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

  await page.getByTestId('field-variants.logo.alt').getByTestId('string-input').click()
  await page.getByTestId('field-variants.logo.alt').getByTestId('string-input').fill("alt text test")
  await page.getByText('External, outside this website').click()
  await page.waitForTimeout(1000)
  await page.getByLabel('URL').click()
  await page.getByLabel('URL').fill(externalLinks)
  await page.waitForTimeout(1000)
  await page.getByText('Blank - open on a new tab (').click()

  //SELECT THE NAVIGATION MENU ROUTES HERE.
  //RESEARCH WHY THE ROUTES ARE NOT CLICKABLE? UNABLE TO UPDATE THE NAV MENU ITEMS.

  if(variantIndex < 4) {
    await page.getByRole('button', { name: 'Primary Button' }).click()
    await page.getByTestId('field-variants.primaryButton.label').getByTestId('string-input').click()
    await page.getByTestId('field-variants.primaryButton.label').getByTestId('string-input').fill('Primary Button Test')
    await page.getByTestId('field-variants.primaryButton.linkType').getByText('External, outside this website').click()
    await page.getByTestId('field-variants.primaryButton.linkExternal').getByLabel('URL').click()
    await page.getByTestId('field-variants.primaryButton.linkExternal').getByLabel('URL').fill(externalLinks)
    await page.getByTestId('field-variants.primaryButton.linkTarget').getByText('Blank - open on a new tab (').click()
    
    await page.getByRole('button', { name: 'Secondary Button' }).click();
    await page.getByTestId('field-variants.secondaryButton.label').getByTestId('string-input').click();
    await page.getByTestId('field-variants.secondaryButton.label').getByTestId('string-input').fill('Secondary Button Test');
    await page.getByTestId('field-variants.secondaryButton.label').getByTestId('string-input').press('CapsLock');
    await page.getByTestId('field-variants.secondaryButton.label').getByTestId('string-input').fill('Secondary Button Test');
    await page.getByTestId('field-variants.secondaryButton.linkType').getByText('External, outside this website').click();
    await page.getByTestId('field-variants.secondaryButton.linkExternal').getByLabel('URL').click();
    await page.getByTestId('field-variants.secondaryButton.linkExternal').getByLabel('URL').fill(externalLinks);
    await page.getByTestId('field-variants.secondaryButton.linkTarget').getByText('Blank - open on a new tab (').click();
  }
    
  await page.getByTestId("action-Save").click({ force: true });
  await expect(page.locator('[id="__next"]').getByRole('alert').locator('div').filter({ hasText: 'The document was published' }).nth(1)).toBeVisible()
  await page.waitForTimeout(10000);
  await page.getByRole("link", { name: "Close pane group" }).click({ force: true });
  await page.waitForTimeout(5000)
  await expect(page.getByTestId("field-sections").getByTestId("input-validation-icon-error")).toBeHidden();
    
  // Once the error is hidden, proceed with clicking the action
  await page.getByTestId("action-[object Object]").click({ force: true });
  await expect(page.locator('[id="__next"]').getByRole('alert').locator('div').filter({ hasText: 'The document was published' }).nth(1)).toBeVisible();
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  // TODO: DOMAIN SHOULD BE DYNAMIC EITHER http://localhost:3000/https://stackshift-
  const pagePromise = page.waitForEvent('popup');
  await page.getByText('http://localhost:3000/').click({ force: true });
  const openUrlPage = await pagePromise;

  
  if (variantIndex === 4) {
    const navigationPromise = openUrlPage.waitForNavigation();
    await navigationPromise;
    await expect(openUrlPage.getByRole('navigation')).toBeVisible();
  } else {
    const page10Promise = openUrlPage.waitForEvent('popup');
    await openUrlPage.getByRole('link', { name: 'Primary Button Test' }).click();
    const page10 = await page10Promise;
    console.log(page10);
  }
}