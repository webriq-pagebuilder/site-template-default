import { expect, test } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { autologin_studio, createNewPage, expectDocumentPublished, navigateToPage } from "tests/helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  // Pass the environment variable value as an argument to page.evaluate()
  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

// TODO: Test buttons, and new routes for navigation menu
export async function createNavigationVariant(page, pageTitle, variantLabel, variantIndex, isInternalLink) {
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
  
  const externalLink = page.getByTestId('field-variants.logo.linkType').getByText('External, outside this website');
  const internalLink = page.getByTestId('field-variants.logo.linkType').getByText('Internal, inside this website');
  const blankLinkTarget = { element: page.getByText('Blank - open on a new tab ('), target: 'Blank - open on a new tab (' };
  const selfLinkTarget = { element: page.getByText('Self (default) - open in the'), target: 'Self (default) - open in the' };
  const externalLinkUrl = 'https://facebook.com/'
  const internalLinkUrl = `${NEXT_PUBLIC_SITE_URL}/thank-you/`
  
  let linkConfiguration;

  if(!isInternalLink) {
    //Logo Alt
    const logoAltInput = page.getByTestId('field-variants.logo.alt').getByTestId('string-input');
    await logoAltInput.click();
    await logoAltInput.fill("alt text test");
    await externalLink.click()
    await page.waitForTimeout(1000)
    await page.getByLabel('URL').click()
    await page.getByLabel('URL').fill(externalLinkUrl)
    await page.waitForTimeout(1000)
    await page.getByText('Blank - open on a new tab (').click()
    linkConfiguration = { url: externalLinkUrl, target: blankLinkTarget.target}
  } else { 
     await internalLink.click();
     await page.getByTestId('reference-input').getByLabel('Open').click();
     await page.getByRole('button', { name: 'Thank you Published No' }).click({ force: true });
     await selfLinkTarget.element.click();
     linkConfiguration = { url: internalLinkUrl, target: selfLinkTarget.target }
   }

  //TODO: SELECT THE NAVIGATION MENU ROUTES HERE.
  //TODO: RESEARCH WHY THE ROUTES ARE NOT CLICKABLE? UNABLE TO UPDATE THE NAV MENU ITEMS.
  // await page.getByRole('button', { name: 'Start Internal Link Not Set' }).click();
  // await expect(page.getByLabel('Edit Link')).toBeVisible({ timeout: 75000 });
  // const startElement = await page.locator('label:has-text=Start');
  // await startElement.click();
  // await startElement.fill("test");

  if(variantIndex < 4) {
    if(!isInternalLink) {
      //Primary Button Input
      await page.getByRole('button', { name: 'Primary Button' }).click()
      const primaryButtonInput = page.getByTestId('field-variants.primaryButton.label').getByTestId('string-input')
      await primaryButtonInput.click();
      await primaryButtonInput.fill(inputPrimaryButton);
      await expect(primaryButtonInput.inputValue()).resolves.toBe(inputPrimaryButton);
      
      const primaryButtonLinkType = page.getByTestId('field-variants.primaryButton.linkType').getByText('External, outside this website')
      await primaryButtonLinkType.click()
      const primaryBtnLinkUrl = page.getByTestId('field-variants.primaryButton.linkExternal').getByLabel('URL');
      await primaryBtnLinkUrl.click();
      await primaryBtnLinkUrl.fill(externalLinkUrl);
      await expect(primaryBtnLinkUrl.inputValue()).resolves.toBe(externalLinkUrl);
      await page.getByTestId('field-variants.primaryButton.linkExternal').getByLabel('URL').fill(externalLinkUrl);
      await page.getByTestId('field-variants.primaryButton.linkTarget').getByText('Blank - open on a new tab (').click();
      
      //Secondary Button Input
      await page.getByRole('button', { name: 'Secondary Button' }).click();
      const secondaryButtonInput = page.getByTestId('field-variants.secondaryButton.label').getByTestId('string-input')
      await secondaryButtonInput.click();
      await secondaryButtonInput.fill(inputSecondaryButton);
      await expect(secondaryButtonInput.inputValue()).resolves.toBe(inputSecondaryButton);
      
      const secondaryButtonLinkType = page.getByTestId('field-variants.secondaryButton.linkType').getByText('External, outside this website');
      await secondaryButtonLinkType.click();
      await page.getByTestId('field-variants.secondaryButton.linkExternal').getByLabel('URL').click();
      await page.getByTestId('field-variants.secondaryButton.linkExternal').getByLabel('URL').fill(externalLinkUrl);
      await page.getByTestId('field-variants.secondaryButton.linkTarget').getByText('Blank - open on a new tab (').click();
      } else {
      //Primary Button
      await page.getByRole('button', { name: 'Primary Button' }).click();
      await page.getByTestId('field-variants.primaryButton.label').getByTestId('string-input').click();
      await page.getByTestId('field-variants.primaryButton.label').getByTestId('string-input').fill(inputPrimaryButton);

      await page.getByTestId('field-variants.primaryButton.linkType').getByText('Internal, inside this website').click();
      await page.getByTestId('reference-input').getByLabel('Open').click({ force: true });
      await page.getByRole('button', { name: 'Thank you Published No' }).click();
      await page.getByTestId('field-variants.primaryButton.linkTarget').getByText('Self (default) - open in the').click();

      //Secondary Button
      await page.getByRole('button', { name: "Secondary Button" }).click();
      await page.getByTestId('field-variants.secondaryButton.label').getByTestId('string-input').click();
      await page.getByTestId('field-variants.secondaryButton.label').getByTestId('string-input').fill(inputSecondaryButton);
      await page.getByTestId('field-variants.secondaryButton.linkType').getByText('Internal, inside this website').click();
      await page.getByTestId('reference-input').getByLabel('Open').click();
      await page.getByRole('button', { name: 'Thank you Published No' }).click();
      await page.getByTestId('field-variants.secondaryButton.linkTarget').getByText('Self (default) - open in the').click();
      }
    }
    
    await expectDocumentPublished(page)
    await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  const pagePromise = page.waitForEvent('popup');
  await page.getByText(NEXT_PUBLIC_SITE_URL).click({ force: true });
  const openUrlPage = await pagePromise;
  
  const sectionCount = await page.locator("div").filter({ hasText: /^No items$/ }).count();
  if (sectionCount > 0) {
    // If the section no items is found, expect the Empty Page element to be visible
    await expect(openUrlPage.getByText("Empty Page")).toBeVisible({ timeout: 20000 });
  } else { 
    // If the section no items is not found, expect the Empty Page element to be hidden
    await expect(openUrlPage.getByText("Empty Page")).toBeHidden({ timeout: 20000 });
    await expect(openUrlPage.locator('section')).toBeVisible({ timeout: 20000 });

    if (variantIndex === 4) {
      //TODO: ADD TESTS IN VARIANT E
      await openUrlPage.waitForLoadState("networkidle");
      await expect(openUrlPage.getByRole('navigation')).toBeVisible({ timeout: 10000 });
    } else {
      // TODO: PUT LOGIC HERE TO EXPECT THE SAME VALUE FOR NAVIGATION ROUTES LIST.
      // PAGE TO USE IF ITS SELF OR BLANK
      let pageToUse;
      if(linkConfiguration.target === 'Blank - open on a new tab (') {
        const page10Promise = openUrlPage.waitForEvent('popup');
        await openUrlPage.getByRole('link', { name: inputPrimaryButton }).click({ force: true });
        const page10 = await page10Promise;
        pageToUse = page10;
      } else {
        pageToUse = openUrlPage;
        await openUrlPage.getByRole('link', { name: inputPrimaryButton }).click({ force: true })
        await openUrlPage.waitForLoadState('networkidle');
      }

      if(!isInternalLink) {
        // Normalize URLs for comparison
        const normalizedExpectedUrl = externalLinkUrl.replace("https://www.", "https://");
        const normalizedReceivedUrl = pageToUse.url().replace("https://www.", "https://");
        await expect(normalizedReceivedUrl).toBe(normalizedExpectedUrl);
      } else if(isInternalLink) {
        await expect(pageToUse.getByText('Success!')).toBeVisible({ timeout: 20000 })
        const expectedUrl = linkConfiguration?.url.endsWith('/') ? linkConfiguration?.url : `${linkConfiguration?.url}/`;
        const receivedUrl = pageToUse.url().endsWith('/') ? pageToUse.url() : `${pageToUse.url()}/`;
        await expect(receivedUrl).toBe(expectedUrl);
      }
    }
  }
}

//Create Navigation Page
test("Create Navigation A", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page A", "Navigation New Page Variant A", 0, true);
});

test("Create Navigation B", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page B", "Navigation New Page Variant B", 1, false);
});

test("Create Navigation C", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page C", "Navigation New Page Variant C", 2, true);
});

test("Create Navigation D", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page D", "Navigation New Page Variant D", 3, false);
});

test("Create Navigation E", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page E", "Navigation New Page Variant E", 4, true);
});

test.afterAll(async () => {
  console.log("[DONE] Successfully run all tests for Navigation Component");
});