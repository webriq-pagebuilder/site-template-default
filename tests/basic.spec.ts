import { test, expect } from "@playwright/test";
import { autologin_studio } from "./autologin";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  // Pass the environment variable value as an argument to page.evaluate()
  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

test("Test to Publish a Page", async ({ page }) => {
  await page.goto("http://localhost:3000/studio");

  // Find the element you want to click
  const element = page.locator('a:has-text("Pages")');

  // Scroll the page to the element
  await element.scrollIntoViewIfNeeded();

  // Wait for the element to be fully visible
  await page.waitForSelector('a:has-text("Pages")', { state: "visible" });

  // Click on the element
  await element.click({ force: true });

  // Click new page button
  const newPageButtonElement = page.locator(
    `a[href="/studio/intent/create/template=page;type=page/"]`
  );
  await newPageButtonElement.click({ force: true });

  // We input a new title
  const newPageTitle = "New Page - " + new Date().getTime();

  const inputTitle = page.locator("input#title");
  await page.waitForSelector("input#title", { state: "visible" });
  await inputTitle.click({ force: true });
  await inputTitle.fill(newPageTitle);

  await page.getByRole("button", { name: "Generate" }).click({ force: true });
  await page.getByRole("button", { name: "Add item…" }).click({ force: true });
  await page
    .getByRole("menuitem", { name: "Navigation" })
    .click({ force: true });
  await page
    .getByTestId("reference-input")
    .getByRole("button", { name: "Create new" })
    .click({ force: true });
  await page
    .getByTestId("field-label")
    .getByTestId("string-input")
    .click({ force: true });
  await page
    .getByTestId("field-label")
    .getByTestId("string-input")
    .fill("Navigation New Page Variant A");

  await page
    .getByTestId("field-variant")
    .getByRole("img")
    .first()
    .click({ force: true });
  await page.getByTestId("action-Save").click({ force: true });
  await page.waitForTimeout(10000);
  await page
    .getByRole("link", { name: "Close pane group" })
    .click({ force: true });
  await expect(
    page
      .getByTestId("field-sections")
      .getByTestId("input-validation-icon-error")
  ).toBeHidden();

  // Once the error is hidden, proceed with clicking the action
  await page.getByTestId("action-[object Object]").click({ force: true });

  await page.getByTestId("action-[object Object]").click({ force: true });
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();
});

test("See Current Version", async ({ page }) => {
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
