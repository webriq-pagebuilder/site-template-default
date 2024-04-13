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

async function createLogoCloudVariant(pageTitle, variantLabel, variantIndex) {
    const newTextComponentTitle = `${pageTitle} ` + new Date().getTime();

    await navigateToPage(page);
    await createNewPage(page, newTextComponentTitle, "Statistics");

    //Variant
    if (variantIndex <= 0) {
        await page.getByTestId("field-variant").getByRole("img").first().click({ force: true });
    } else {
        await page.getByTestId("field-variant").getByRole("img").nth(variantIndex).click({ force: true });
    }

    //Section Name
    await page.getByTestId('field-label').getByTestId('string-input').click();
    await page.getByTestId('field-label').getByTestId('string-input').fill(variantLabel);

    const statisticsData = [
        {
            label: "Total Revenue",
            value: "$33,261",
            updatedLabel: "Revenue Total",
            updatedValue: "$100"
        },
        {
            label: "Subscribers",
            value: "481,095",
            updatedLabel: "Subscribers Test",
            updatedValue: "10000"
        },
        {
            label: "Conversations",
            value: "643,553",
            updatedLabel: "Conversations Test",
            updatedValue: "50,100"
        },
        {
            label: "Modal Sale Rate",
            value: "25%",
            updatedLabel: "Sale Rate Test",
            updatedValue: "50%"
        },
    ]

    for (const data of statisticsData) {
        await page.getByRole('button', { name: `Label: ${data.label}` }).click();
        await expect(page.getByLabel('Edit', { exact: true })).toBeVisible();
        await page.locator(`input[value^="${data.label}"]`).click();
        await page.locator(`input[value^="${data.label}"]`).press('Meta+a');
        await page.locator(`input[value^="${data.label}"]`).fill(data.updatedLabel);
        await page.locator(`input[value^="${data.value}"]`).click();
        await page.locator(`input[value^="${data.value}"]`).press('Meta+a');
        await page.locator(`input[value^="${data.value}"]`).fill(data.updatedValue);
        await page.getByLabel('Close dialog').click();
    }


    await expectDocumentPublished(page);
    await expect(page.getByRole('link', { name: newTextComponentTitle })).toBeVisible();

    const pagePromise = page.waitForEvent('popup');
    await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
    const openUrlPage = await pagePromise;

    await expect(openUrlPage.getByText("Empty Page")).toBeHidden({ timeout: 20000 });
    await expect(openUrlPage.locator('section')).toBeVisible({ timeout: 20000 });

    for (const data of statisticsData) {
        await expect(openUrlPage.getByText(data.updatedLabel)).toBeVisible();
        await expect(openUrlPage.getByText(data.updatedValue)).toBeVisible();
    }
}

test("Create Statistics Variant A", async () => {
    await createLogoCloudVariant("Statistics Variant A", "New Statistics Section A", 0);
})

test("Create Statistics Variant B", async () => {
    await createLogoCloudVariant("Statistics Variant B", "New Statistics Section B", 1);
})

test("Create Statistics Variant C", async () => {
    await createLogoCloudVariant("Statistics Variant C", "New Statistics Section C", 2);
})

test.afterAll(async () => {
  await page.close();
});