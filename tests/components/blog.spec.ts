import { test, expect, type Page } from "@playwright/test";
import { NEXT_PUBLIC_SANITY_STUDIO_URL, NEXT_PUBLIC_SITE_URL } from "studio/config";
import { autologin_studio, createNewPage, expectDocumentPublished, navigateToPage } from "../utils/index"

let page: Page;

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

export async function createBlogVariant(pageTitle, variantLabel, variantIndex, isInternalLink) {
    const time = new Date().getTime()
    const newBlogTitle =  pageTitle + time
    const inputContentSubtitle = `Subtitle ` + time
    const inputContentTitle = `Blog Title ` + time
    const referencedBlog = 'Mariel test blogs'
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
    const contentSubtitle = page.getByTestId('field-variants.subtitle').getByTestId('string-input');
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
    await expect(page.getByRole('link', { name: referencedBlog })).toBeVisible({ timeout: 75000 });
    
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
        const blankLinkTarget = { element: page.getByText('Blank - open on a new tab ('), target: 'Blank - open on a new tab (' };
        const selfLinkTarget = { element: page.getByText('Self (default) - open in the'), target: 'Self (default) - open in the' };
        const externalUrl = 'https://facebook.com/'
        const internalLinkUrl = `${NEXT_PUBLIC_SITE_URL}/thank-you/`

        //Determine the proceeds if it is internal or external link
        if (!isInternalLink) {
            await externalLink.click();
            await page.getByLabel('URL').click();
            await page.getByLabel('URL').fill(externalUrl);
            await blankLinkTarget.element.click();
            externalUrl.replace("https://www.", "https://")
            linkConfiguration = { url: externalUrl, target: blankLinkTarget.target };
        } else  {
            await internalLink.click();
            // await page.getByTestId('reference-input').getByLabel('Open').click();
            await page.getByTestId('autocomplete').click();
            await page.getByTestId('autocomplete').fill('thank you');
            await page.getByRole('button', { name: 'Thank you Published No' }).click({ force: true });
            await selfLinkTarget.element.click();
            linkConfiguration = { url: internalLinkUrl, target: selfLinkTarget.target }
        }
    }
        
    //Save Button
    await expectDocumentPublished(page)
    await expect(page.getByRole("link", { name: newBlogTitle })).toBeVisible();

    const pagePromise = page.waitForEvent('popup');
    await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
    const openUrlPage = await pagePromise;

    // Wait for the element to become visible or hidden with a longer timeout
    const sectionCount = await page.locator("div").filter({ hasText: /^No items$/ }).count();
    if (sectionCount > 0) {
        // If the section no items is found, expect the Empty Page element to be visible
        await expect(openUrlPage.getByText("Empty Page")).toBeVisible({ timeout: 20000 }).then(() => console.log('There is no Available Content!'));
    } else {
        // If the section no items is not found, expect the Empty Page element to be hidden
        await expect(openUrlPage.getByText("Empty Page")).toBeHidden({ timeout: 20000 });
        await expect(openUrlPage.locator('section')).toBeVisible({ timeout: 20000 });
        await expect(openUrlPage.getByRole('heading', { name: inputContentTitle })).toBeVisible();
        await expect(openUrlPage.getByText(inputContentSubtitle)).toBeVisible();

        if(variantIndex === 3) {
            await openUrlPage.getByPlaceholder('Search posts...').click();
            await openUrlPage.getByPlaceholder('Search posts...').fill(referencedBlog);
            await expect(openUrlPage.getByLabel(referencedBlog)).toBeVisible();
        }
    
    if(variantIndex < 3) {
        let pageToUse;
        if (linkConfiguration?.target === 'Blank - open on a new tab (') {
            const page6Promise = openUrlPage.waitForEvent('popup');
            await openUrlPage.getByRole('link', { name: buttonInputValue }).click({ force: true })
            const page6 = await page6Promise;
            // console.log('page6', page6);
            // console.log('Page 6 URL:', page6.url());
            pageToUse = page6;
        } else {
            pageToUse = openUrlPage;
            await openUrlPage.getByRole('link', { name: buttonInputValue }).click({ force: true })
            await openUrlPage.waitForLoadState('networkidle');
        }

        if(!isInternalLink) {
            const expectedUrl = pageToUse.url().replace("https://www.", "https://");
            // console.log(linkConfiguration?.target)
            await expect(expectedUrl).toBe(linkConfiguration?.url);
            // console.log('Page 6 URL:', pageToUse.url());
        } else if (isInternalLink) {
            await expect(pageToUse.getByText('Success!')).toBeVisible({ timeout: 20000 })
            const expectedUrl = linkConfiguration?.url.endsWith('/') ? linkConfiguration?.url : `${linkConfiguration?.url}/`;
            const receivedUrl = pageToUse.url().endsWith('/') ? pageToUse.url() : `${pageToUse.url()}/`;
            await expect(receivedUrl).toBe(expectedUrl);
        }
    }
  }
}

test("Create Blog Variant A", async () => {
    await createBlogVariant("Blog Page A - ", 'New Blog Section A', 0, true)
})

test("Create Blog Variant B", async () => {
    await createBlogVariant("Blog Page B - ", 'New Blog Section B', 1, false)
})

test("Create Blog Variant C", async () => {
    await createBlogVariant("Blog Page C - ", 'New Blog Section C', 2, false)
})

test("Create Blog Variant D", async ()=> {
    await createBlogVariant("Blog Page D - ", 'New Blog Section D', 3, true)
})

test.afterAll(async () => {
  await page.close();
});