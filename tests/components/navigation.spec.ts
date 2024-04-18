import { expect, test, type Page } from "@playwright/test";
import { NEXT_PUBLIC_SANITY_STUDIO_URL, NEXT_PUBLIC_SITE_URL } from "studio/config";
import { autologin_studio, createNewPage, deletePageVariant, expectDocumentPublished, navigateToPage } from "../utils/index";

const inputPrimaryButton = "Primary Button Test";
const inputSecondaryButton = "Secondary Button Test"
const externalLinkUrl = 'https://facebook.com/'
const internalLinkUrl = `${NEXT_PUBLIC_SITE_URL}/thank-you/`
let newPageTitle;

let page: Page;

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

async function addNavigationRoutes(buttonName, isInternalLink) {
  await page.getByRole('button', { name: buttonName }).click();
  await expect(page.getByLabel('Edit Link')).toBeVisible({ timeout: 75000 });
  // NAVIGATION INTERNAL/EXTERNAL SELECTOR
  const routesExternalLink = await page.locator('.sc-jdUcAg > div:nth-child(2) > div label[data-ui="Flex"] span:has-text("External, outside this website"):nth-child(1)');
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
    // await page.getByTestId('reference-input').getByLabel('Open').click();
    await page.getByTestId('autocomplete').click();
    await page.getByTestId('autocomplete').fill('thank you');
    await page.getByRole('button', { name: 'Thank you Published No' }).click();
    await selfLinkTarget.element.click();
  }

  await page.getByLabel('Close dialog').click();
}

export async function createNavigationVariant(pageTitle, variantLabel, variantIndex, isInternalLink) {
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
  
  const blankLinkTarget = { element: page.getByText('Blank - open on a new tab ('), target: 'Blank - open on a new tab (' };
  const selfLinkTarget = { element: page.getByText('Self (default) - open in the'), target: 'Self (default) - open in the' };

  if(!isInternalLink) {
    //Logo Alt
    const logoAltInput = page.getByTestId('field-variants.logo.alt').getByTestId('string-input');
    await logoAltInput.click();
    await logoAltInput.fill("alt text test");
    await page.getByTestId('field-variants.logo.linkType').getByText('External, outside this website').click();
    await page.waitForTimeout(1000)
    await page.getByLabel('URL').click()
    await page.getByLabel('URL').fill(externalLinkUrl)
    await page.waitForTimeout(1000)
    await page.getByText('Blank - open on a new tab (').click()
  } else { 
    await page.getByTestId('field-variants.logo.linkType').getByText('Internal, inside this website').click();
    //  await page.getByTestId('reference-input').getByLabel('Open').click();
    await page.getByTestId('autocomplete').click();
    await page.getByTestId('autocomplete').fill('thank you');
    await page.getByRole('button', { name: 'Thank you Published No' }).click({ force: true });
    await selfLinkTarget.element.click();
   }

  // Perform navigation clicks
  await addNavigationRoutes('Start Internal Link Not Set', isInternalLink);
  await addNavigationRoutes('About Us Internal Link Not Set', isInternalLink);
  await addNavigationRoutes('Services Internal Link Not Set', isInternalLink);
  await addNavigationRoutes('Platform Internal Link Not Set', isInternalLink);
  await addNavigationRoutes('Testimonials Internal Link', isInternalLink);

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
        // await page.getByTestId('reference-input').getByLabel('Open').click({ force: true });
        await page.getByTestId('autocomplete').click();
        await page.getByTestId('autocomplete').fill('thank you');
        await page.getByRole('button', { name: 'Thank you Published No' }).click();
        await primaryButtonLinkTarget.getByText('Self (default) - open in the').click();
      } else {
        await page.getByTestId('field-variants.primaryButton.linkType').getByText('External, outside this website').click();
        await primaryButtonLinkExternal.click();
        await primaryButtonLinkExternal.fill(externalLinkUrl);
        await expect(primaryButtonLinkExternal.inputValue()).resolves.toBe(externalLinkUrl);
        await primaryButtonLinkTarget.getByText('Blank - open on a new tab (').click();
      }
      //Close primary button toggle
      await primaryButton.click();

      await secondaryButton.click();
      await secondaryButtonLabel.click();
      await secondaryButtonLabel.fill(inputSecondaryButton);
      await expect(secondaryButtonLabel.inputValue()).resolves.toBe(inputSecondaryButton);
      
      if (isInternalLink) {
        // await page.getByTestId('reference-input').getByLabel('Open').click({ force: true });
        await page.getByTestId('autocomplete').click();
        await page.getByTestId('autocomplete').fill('thank you');
        await page.getByRole('button', { name: 'Thank you Published No' }).click();
        await secondaryButtonLinkTarget.getByText('Self (default) - open in the').click();
      } else {
        await page.getByTestId('field-variants.secondaryButton.linkType').getByText('External, outside this website').click();
        await secondaryButtonLinkExternal.click();
        await secondaryButtonLinkExternal.fill(externalLinkUrl);
        await expect(secondaryButtonLinkExternal.inputValue()).resolves.toBe(externalLinkUrl);
        await secondaryButtonLinkTarget.getByText('Blank - open on a new tab (').click();
      }
    //Close secondary button toggle
    await secondaryButton.click();
  }
    
  await expectDocumentPublished(page)
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  const pagePromise = page.waitForEvent('popup');
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;
    
  // Default should just be available routes - no buttons in variant E
  let logoImg;
  isInternalLink ? (logoImg = "Go to /thank-you") : (logoImg = "Go to https://facebook.com/");
  await assertPageContent(openUrlPage, logoImg, isInternalLink);
}

async function assertPageContent(openUrlPage, linkName, isInternalLink) {
  const sectionCount = await openUrlPage.locator("div").filter({ hasText: /^No items$/ }).count();

  if (sectionCount > 0) {
    // If the section no items is found, expect the Empty Page element to be visible
    await expect(openUrlPage.getByText("Empty Page")).toBeVisible({ timeout: 20000 }).then(() => console.log('There is no Available Content!'));
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

    if (!isInternalLink) {
      const page10Promise = openUrlPage.waitForEvent('popup');
        await openUrlPage.getByRole('link', { name: linkName }).click({ force: true });
      const page10 = await page10Promise;
      // Normalize URLs for comparison
      const normalizedExpectedUrl = externalLinkUrl.replace("https://www.", "https://");
      const normalizedReceivedUrl = page10.url().replace("https://www.", "https://");
      await expect(normalizedReceivedUrl).toBe(normalizedExpectedUrl);
    } else {
      await openUrlPage.getByRole('link', { name: linkName }).click({ force: true });
      await openUrlPage.waitForLoadState('networkidle');
      await expect(openUrlPage.getByText('Success!')).toBeVisible({ timeout: 150000 })
      const expectedUrl = internalLinkUrl.endsWith('/') ? internalLinkUrl : `${internalLinkUrl}/`;
      const receivedUrl = openUrlPage.url().endsWith('/') ? openUrlPage.url() : `${openUrlPage.url()}/`;
      await expect(receivedUrl).toBe(expectedUrl);
    }
  }
}

const createNavigationTest = async (pageTitle, variantName, variantIndex, isInternalLink, linkNames) => {
  await createNavigationVariant(pageTitle, variantName, variantIndex, isInternalLink);
  // Loops all routes
  for(const linkName of linkNames) {
    const slug = newPageTitle?.toLowerCase()?.replace(/\s+/g, "-").replace(/-+/g, "-");
    await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`)

    await assertPageContent(page, linkName, isInternalLink);
  }
};

test.describe("Navigation Variant A Workflow", () => {
  test.describe.configure({ timeout: 900000, mode: "serial" });

  test("Create Navigation Variant A", async () => {
    const linkNames = ["Start", "About Us", "Services", "Platform", "Testimonials", inputPrimaryButton, inputSecondaryButton];
    await createNavigationTest("Navigation Page A", "Navigation New Page Variant A", 0, false, linkNames);
  })

  test("Delete Navigation Variant A", async () => {
    await deletePageVariant(page, newPageTitle);
  })
});

test.describe("Navigation Variant B Workflow", () => {
  test.describe.configure({ timeout: 900000, mode: "serial" });
  
  test("Create Navigation Variant B", async () => {
    const linkNames = ["Start", "About Us", "Services", "Platform", "Testimonials", inputPrimaryButton, inputSecondaryButton];
    await createNavigationTest("Navigation Page B", "Navigation New Page Variant B", 1, true, linkNames);
  });

  test("Delete Navigation Variant B", async () => {
    await deletePageVariant(page, newPageTitle);
  })
})

test.describe("Navigation Variant C Workflow", () => {
  test.describe.configure({ timeout: 900000, mode: "serial" });

  test("Create Navigation Variant C", async () => {
    const linkNames = ["Start", "About Us", "Services", "Platform", "Testimonials", inputPrimaryButton, inputSecondaryButton];
    await createNavigationTest("Navigation Page C", "Navigation New Page Variant C", 2, false, linkNames);
  });

  test("Delete Navigation Variant C", async () => {
    await deletePageVariant(page, newPageTitle);
  })
})

test.describe("Navigation Variant D Workflow", () => {
  test.describe.configure({ timeout: 900000, mode: "serial" });

  test("Create Navigation Variant D", async () => {
    const linkNames = ["Start", "About Us", "Services", "Platform", "Testimonials", inputPrimaryButton, inputSecondaryButton];
    await createNavigationTest("Navigation Page D", "Navigation New Page Variant D", 3, true, linkNames);
  });

  test("Delete Navigation Variant D", async () => {
    await deletePageVariant(page, newPageTitle);
  })
})

test.describe("Navigation Variant E Workflow", () => {
  test.describe.configure({ timeout: 900000, mode: "serial" });

  test("Create Navigation Variant E", async () => {
    const linkNames = ["Start", "About Us", "Services", "Platform", "Testimonials"];
    await createNavigationTest("Navigation Page E", "Navigation New Page Variant E", 4, false, linkNames);
  });

  test("Delete Navigation Variant E", async () => {
    await deletePageVariant(page, newPageTitle);
  })
})

test.afterAll(async () => {
  await page.close();
});