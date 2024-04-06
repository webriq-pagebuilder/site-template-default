import { expect, test } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { autologin_studio, createNewPage, expectDocumentPublished, navigateToPage } from "tests/helpers";

const inputPrimaryButton = "Primary Button Test";
const inputSecondaryButton = "Secondary Button Test"
const externalLinkUrl = 'https://facebook.com/'
const internalLinkUrl = `${NEXT_PUBLIC_SITE_URL}/thank-you/`
let newPageTitle;

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  // Pass the environment variable value as an argument to page.evaluate()
  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

async function addNavigationRoutes(page, buttonName, isInternalLink) {
  await page.getByRole('button', { name: buttonName }).click();
  await expect(page.getByLabel('Edit Link')).toBeVisible({ timeout: 75000 });
  //TODO: INTERNAL/EXTERNAL HERE
  const routesExternalLink = await page.locator('.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("External, outside this website")');
  const routesInternalLink = await page.locator('.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("Internal, inside this website")');
  
  const blankLinkTarget = { element: page.locator('.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("Blank - open on a new tab (")'), target: 'Blank - open on a new tab (' };
  const selfLinkTarget = { element: page.locator('.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("Self (default) - open in the")'), target: 'Self (default) - open in the' };

  if(!isInternalLink) {
    await routesExternalLink.click({ force: true });
    await page.locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]').click({ force: true });
    await page.locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]').fill(externalLinkUrl)
    await blankLinkTarget.element.click();
  } else {
    await routesInternalLink.click();
    await page.getByTestId('reference-input').getByLabel('Open').click();
    await page.getByRole('button', { name: 'Thank you Published No' }).click();
    await selfLinkTarget.element.click();
  }

  await page.getByLabel('Close dialog').click();
}

async function assertPageContent(openUrlPage, linkConfiguration, linkName, isInternalLink) {
  const sectionCount = await openUrlPage.locator("div").filter({ hasText: /^No items$/ }).count();

  if (sectionCount > 0) {
    // If the section no items is found, expect the Empty Page element to be visible
    await expect(openUrlPage.getByText("Empty Page")).toBeVisible({ timeout: 20000 });
  } else {
    // If the section no items is not found, expect the Empty Page element to be hidden
    await expect(openUrlPage.getByText("Empty Page")).toBeHidden({ timeout: 20000 });
    await expect(openUrlPage.locator('section')).toBeVisible({ timeout: 20000 });

    // EXPECT THE SAME VALUE FOR NAVIGATION ROUTES LIST.
    await expect(openUrlPage.getByRole('list').locator('li').filter({ hasText: 'Start' })).toBeVisible();
    await expect(openUrlPage.getByRole('list').locator('li').filter({ hasText: 'About Us' })).toBeVisible();
    await expect(openUrlPage.getByRole('list').locator('li').filter({ hasText: 'Services' })).toBeVisible();
    await expect(openUrlPage.getByRole('list').locator('li').filter({ hasText: 'Platform' })).toBeVisible();
    await expect(openUrlPage.getByRole('list').locator('li').filter({ hasText: 'Testimonials' })).toBeVisible();

    let pageToUse;
    if (linkConfiguration.target === 'Blank - open on a new tab (') {
      const page10Promise = openUrlPage.waitForEvent('popup');
      await openUrlPage.getByRole('link', { name: linkName }).click({ force: true });
      const page10 = await page10Promise;
      pageToUse = page10;
    } else {
      pageToUse = openUrlPage;
      await openUrlPage.getByRole('link', { name: linkName }).click({ force: true })
      await openUrlPage.waitForLoadState('networkidle');
    }

      if (!isInternalLink) {
        // Normalize URLs for comparison
        const normalizedExpectedUrl = externalLinkUrl.replace("https://www.", "https://");
        const normalizedReceivedUrl = pageToUse.url().replace("https://www.", "https://");
        await expect(normalizedReceivedUrl).toBe(normalizedExpectedUrl);
        await expect(pageToUse.getByRole('img', { name: 'Facebook' })).toBeVisible({ timeout: 150000 });
      } else if (isInternalLink) {
        await expect(pageToUse.getByText('Success!')).toBeVisible({ timeout: 20000 })
        const expectedUrl = linkConfiguration?.url.endsWith('/') ? linkConfiguration?.url : `${linkConfiguration?.url}/`;
        const receivedUrl = pageToUse.url().endsWith('/') ? pageToUse.url() : `${pageToUse.url()}/`;
        await expect(receivedUrl).toBe(expectedUrl);
      }
  }
}

export async function createNavigationVariant(page, pageTitle, variantLabel, variantIndex, isInternalLink) {
   newPageTitle = pageTitle + " - " + new Date().getTime()

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

  //TODO: ADD LINK INTERNAL/EXTERNAL, AND TARGET SELF/BLANK.
  // Perform navigation clicks
  await addNavigationRoutes(page, 'Start Internal Link Not Set', isInternalLink);
  await addNavigationRoutes(page, 'About Us Internal Link Not Set', isInternalLink);
  await addNavigationRoutes(page, 'Services Internal Link Not Set', isInternalLink);
  await addNavigationRoutes(page, 'Platform Internal Link Not Set', isInternalLink);
  await addNavigationRoutes(page, 'Testimonials Internal Link', isInternalLink);

  if (variantIndex < 4) {
      const primaryButton = page.getByRole('button', { name: 'Primary Button' });
      const primaryButtonLabel = page.getByTestId('field-variants.primaryButton.label').getByTestId('string-input');
      const primaryButtonLinkExternal = page.getByTestId('field-variants.primaryButton.linkExternal').getByLabel('URL');
      const primaryButtonLinkTarget = page.getByTestId('field-variants.primaryButton.linkTarget');

      const secondaryButton = page.getByRole('button', { name: 'Secondary Button' });
      const secondaryButtonLabel = page.getByTestId('field-variants.secondaryButton.label').getByTestId('string-input');
      const secondaryButtonLinkExternal = page.getByTestId('field-variants.secondaryButton.linkExternal').getByLabel('URL');
      const secondaryButtonLinkTarget = page.getByTestId('field-variants.secondaryButton.linkTarget');

      await primaryButton.click();
      await primaryButtonLabel.click();
      await primaryButtonLabel.fill(inputPrimaryButton);
      await expect(primaryButtonLabel.inputValue()).resolves.toBe(inputPrimaryButton);
      
      if (isInternalLink) {
          await page.getByTestId('reference-input').getByLabel('Open').click({ force: true });
          await page.getByRole('button', { name: 'Thank you Published No' }).click();
          await primaryButtonLinkTarget.getByText('Self (default) - open in the').click();
          linkConfiguration = { url: internalLinkUrl, target: selfLinkTarget.target }
      } else {
          await page.getByTestId('field-variants.primaryButton.linkType').getByText('External, outside this website').click();
          await primaryButtonLinkExternal.click();
          await primaryButtonLinkExternal.fill(externalLinkUrl);
          await expect(primaryButtonLinkExternal.inputValue()).resolves.toBe(externalLinkUrl);
          await primaryButtonLinkTarget.getByText('Blank - open on a new tab (').click();
          linkConfiguration = { url: externalLinkUrl, target: blankLinkTarget.target }
      }

      await secondaryButton.click();
      await secondaryButtonLabel.click();
      await secondaryButtonLabel.fill(inputSecondaryButton);
      await expect(secondaryButtonLabel.inputValue()).resolves.toBe(inputSecondaryButton);
      
      if (isInternalLink) {
          await page.getByTestId('reference-input').getByLabel('Open').click({ force: true });
          await page.getByRole('button', { name: 'Thank you Published No' }).click();
          await secondaryButtonLinkTarget.getByText('Self (default) - open in the').click();
          linkConfiguration = { url: internalLinkUrl, target: selfLinkTarget.target }
      } else {
          await page.getByTestId('field-variants.secondaryButton.linkType').getByText('External, outside this website').click();
          await secondaryButtonLinkExternal.click();
          await secondaryButtonLinkExternal.fill(externalLinkUrl);
          await expect(secondaryButtonLinkExternal.inputValue()).resolves.toBe(externalLinkUrl);
          await secondaryButtonLinkTarget.getByText('Blank - open on a new tab (').click();
          linkConfiguration = { url: externalLinkUrl, target: blankLinkTarget.target }
      }
  }
    
  await expectDocumentPublished(page)
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  const pagePromise = page.waitForEvent('popup');
  await page.getByText(NEXT_PUBLIC_SITE_URL).click({ force: true });
  const openUrlPage = await pagePromise;
    
  // Default should just be available routes - no buttons in variant E
  await assertPageContent(openUrlPage, linkConfiguration, "Start", isInternalLink);
}

const createNavigationTest = async ({ page }, pageTitle, variantName, variantIndex, isInternalLink, linkNames) => {
  await createNavigationVariant(page, pageTitle, variantName, variantIndex, isInternalLink);
  const blankLinkTarget = { target: 'Blank - open on a new tab (' };
  const selfLinkTarget = { target: 'Self (default) - open in the' };
  let linkConfiguration
  
  if(!isInternalLink) {
    linkConfiguration = { url: externalLinkUrl, target: blankLinkTarget.target }    
  } else {
    linkConfiguration = { url: internalLinkUrl, target: selfLinkTarget.target };
  }

  
  // Loops all routes
  for(const linkName of linkNames) {
    const slug = newPageTitle?.toLowerCase()?.replace(/\s+/g, "-").replace(/-+/g, "-");
    await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`)

    await assertPageContent(page, linkConfiguration, linkName, isInternalLink);
  }
};

test("Create Navigation A", async ({ page }) => {
  const linkNames = ["Start", "About Us", "Services", "Platform", "Testimonials", inputPrimaryButton, inputSecondaryButton];
  await createNavigationTest({ page }, "Navigation Page A", "Navigation New Page Variant A", 0, false, linkNames);
});

test("Create Navigation B", async ({ page }) => {
  const linkNames = ["Start", "About Us", "Services", "Platform", "Testimonials", inputPrimaryButton, inputSecondaryButton];
  await createNavigationTest({ page }, "Navigation Page B", "Navigation New Page Variant B", 1, false, linkNames);
});

test("Create Navigation C", async ({ page }) => {
  const linkNames = ["Start", "About Us", "Services", "Platform", "Testimonials", inputPrimaryButton, inputSecondaryButton];
  await createNavigationTest({ page }, "Navigation Page C", "Navigation New Page Variant C", 2, true, linkNames);
});

test("Create Navigation D", async ({ page }) => {
  const linkNames = ["Start", "About Us", "Services", "Platform", "Testimonials", inputPrimaryButton, inputSecondaryButton];
  await createNavigationTest({ page }, "Navigation Page D", "Navigation New Page Variant D", 3, true, linkNames);
});

test("Create Navigation E", async ({ page }) => {
  const linkNames = ["Start", "About Us", "Services", "Platform", "Testimonials"];
  await createNavigationTest({ page }, "Navigation Page E", "Navigation New Page Variant E", 4, true, linkNames);
});

test.afterAll(async () => {
  console.log("[DONE] Successfully run all tests for Navigation Component");
});