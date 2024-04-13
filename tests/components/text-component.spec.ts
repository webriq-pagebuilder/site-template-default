import { test, expect, type Page } from "@playwright/test";
import { NEXT_PUBLIC_SANITY_STUDIO_URL, NEXT_PUBLIC_SITE_URL } from "studio/config";
import { autologin_studio, createNewPage, expectDocumentPublished, navigateToPage } from "tests/utils";

let page: Page;

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

async function createTextComponentVariant(pageTitle, variantLabel, variantIndex) {
    const newTextComponentTitle = `${pageTitle} ` + new Date().getTime();

    await navigateToPage(page);
    await createNewPage(page, newTextComponentTitle, "Text Component");

    //Variant
    if (variantIndex <= 0) {
        await page.getByTestId("field-variant").getByRole("img").first().click({ force: true });
    } else {
        await page.getByTestId("field-variant").getByRole("img").nth(variantIndex).click({ force: true });
    }

    //Section Name
    await page.getByTestId('field-label').getByTestId('string-input').click();
    await page.getByTestId('field-label').getByTestId('string-input').fill(variantLabel);

    //Title
    const titleInput = 'Greate Quality Title'
    await page.getByTestId('field-variants.title').getByTestId('string-input').click();
    await page.getByTestId('field-variants.title').getByTestId('string-input').fill(titleInput);

    //Content
    const firstContentInput = 'Phasellus consequat vehicula metus non sagittis. Sed quis ipsum non velit tempus consequat sit amet eget augue.';
    await page.getByTestId('activate-overlay').locator('div').first().click();
    await page.getByText('Etiam facilisis mauris leo,').click();
    await page.getByText('Etiam facilisis mauris leo,').press("Meta+a");
    await page.getByText('Etiam facilisis mauris leo,').fill(firstContentInput);

    await expectDocumentPublished(page);
    await expect(page.getByRole('link', { name: newTextComponentTitle })).toBeVisible();

    const pagePromise = page.waitForEvent('popup');
    await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
    const openUrlPage = await pagePromise;
}

test("Create Text Component Variant A", async () => {
    await createTextComponentVariant("Text Component Variant A", "New Text Component Section A", 0);
})

test("Create Text Component Variant B", async () => {
    await createTextComponentVariant("Text Component Variant B", "New Text Component Section B", 1);
})

test("Create Text Component Variant C", async () => {
    await createTextComponentVariant("Text Component Variant C", "New Text Component Section C", 2);
})

test.afterAll(async () => {
  await page.close();
});