import { test, expect } from "@playwright/test";
import { autologin_studio, createNewPage, expectDocumentPublished, navigateToPage } from "tests/helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  // Pass the environment variable value as an argument to page.evaluate()
  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

export async function createBlogVariant(page, pageTitle, variantLabel, variantIndex) {
    const time = new Date().getTime()
    const newBlogTitle =  pageTitle + time
    const inputContentSubtitle = `Subtitle ` + time
    const inputContentTitle = `Blog Title ` + time
    const referencedBlog = 'Mariel test blog Mariel test'
    const buttonInputValue = "View More"
    
    await navigateToPage(page)
    await createNewPage(page, newBlogTitle, "Blog")

    const variantTitle = page.getByTestId("field-label").getByTestId("string-input")
    await variantTitle.click({ force: true });
    await variantTitle.fill(variantLabel);
    
    //Variant
    if(variantIndex <= 0) {
        await page.getByTestId("field-variant").getByRole("img").first().click({ force: true });
    } else {
        await page.getByTestId("field-variant").getByRole("img").nth(variantIndex).click({ force: true })
    }
    
    //Subtitle
    const contentSubtitle = page.getByTestId('field-variants.subtitle').getByTestId('string-input');``
    contentSubtitle.click();
    await contentSubtitle.press('Meta+a');
    await contentSubtitle.fill(inputContentSubtitle);
    await expect(contentSubtitle.inputValue()).resolves.toBe(inputContentSubtitle)
    
    //Title
    const contentTitle = page.getByTestId('field-variants.title').getByTestId('string-input')
    await contentTitle.click();
    await contentTitle.press('Meta+a');
    await contentTitle.fill(inputContentTitle);
    await expect(contentTitle.inputValue()).resolves.toBe(inputContentTitle);

    //Blog Posts
    await page.getByRole('button', { name: 'Add item' }).click();
    await page.getByTestId('reference-input').getByLabel('Open').click();
    await page.getByRole('button', { name: referencedBlog }).click();

    let linkConfiguration;

    if(variantIndex < 3 ) {
        //Button
        await page.getByRole('button', { name: 'Primary Button' }).click();
        const buttonInput = page.getByTestId('field-variants.primaryButton.label').getByTestId('string-input')
        await buttonInput.click();
        await buttonInput.press('Meta+a');
        await buttonInput.fill(buttonInputValue);
        await expect(buttonInput.inputValue()).resolves.toBe(buttonInputValue)

        const externalLink = page.getByText('External, outside this website');
        const internalLink = page.getByText('Internal, inside this website');
        const blankLinkTarget = page.getByText('Blank - open on a new tab (');
        const selfLinkTarget = page.getByText('Self (default) - open in the');
        const url = 'https://facebook.com'

        // Determine if the link is internal or external
        const isExternalLinkOptionSelected = await externalLink.isVisible();
        const linkType = isExternalLinkOptionSelected ? 'external' : 'internal';

        // await page.getByText('External, outside this website').click()
        // await page.waitForTimeout(1000)
        // await page.getByLabel('URL').click()
        // await page.getByLabel('URL').fill(url)
        // await page.waitForTimeout(1000)
        // await page.getByText('Blank - open on a new tab (').click()
        if (linkType === 'external') {
            await externalLink.click();
            await page.getByLabel('URL').click();
            await page.getByLabel('URL').fill(url);
            await blankLinkTarget.click();
            linkConfiguration = { url: url, target: '_blank' };
        } 
        else if (linkType === 'internal') {
            await internalLink.click();
            // Handle internal links logic here
        }
    }
        
    //Save Button
    await expectDocumentPublished(page)
    await expect(page.getByRole("link", { name: newBlogTitle })).toBeVisible();

    const pagePromise = page.waitForEvent('popup');
    // TODO: DOMAIN SHOULD BE DYNAMIC EITHER http://localhost:3000/ / https://stackshift-
    await page.getByText('http://localhost:3000/').click({ force: true });
    const openUrlPage = await pagePromise;

    // TODO: EXPECT SECTIONS TO BE VIEWED HERE. ALSO TRY THE BUTTON LINKS IT SHOULD REDIRECT TO THE INTERNAL PAGES / EXTERNAL URL
    // Wait for the element to become visible or hidden with a longer timeout
  const sectionCount = await page.locator("div").filter({ hasText: /^No items$/ }).count();
  if (sectionCount > 0) {
    // If the section no items is found, expect the Empty Page element to be visible
    await expect(openUrlPage.getByText("Empty Page")).toBeVisible();
  } else {
    // If the section no items is not found, expect the Empty Page element to be hidden
    await expect(openUrlPage.getByText("Empty Page")).toBeHidden();
    await openUrlPage.waitForTimeout(10000)
    await expect(openUrlPage.locator('section')).toBeVisible();
    
    if(variantIndex < 3) {
        //TODO: Solve issue here, redirecting to /studio instead of its url links
        await openUrlPage.getByRole('link', { name: buttonInputValue }).click();
        const page6Promise = openUrlPage.waitForEvent('popup');
        const page6 = await page6Promise;
        console.log('page6', page6);
        await page6.waitForLoadState('networkidle');
        console.log('Page 6 URL:', page6.url());
        const normalizedExpectedUrl = linkConfiguration.url.replace("https://www.", "https://");
        await expect(page6).toHaveURL(normalizedExpectedUrl);
    }
  }
}

test("Create Blog Variant A", async ({page}) => {
    await createBlogVariant(page, "Blog Page A - ", 'New Blog Page A', 0)
})

test("Create Blog Variant B", async ({page}) => {
    await createBlogVariant(page, "Blog Page B - ", 'New Blog Page B', 1)
})

test("Create Blog Variant C", async ({page}) => {
    await createBlogVariant(page, "Blog Page C - ", 'New Blog Page C', 2)
})

test("Create Blog Variant D", async ({page})=> {
    await createBlogVariant(page, "Blog Page D - ", 'New Blog Page D', 3)
})