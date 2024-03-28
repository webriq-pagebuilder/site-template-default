import { test } from "@playwright/test";
import { autologin_studio, createNavigationVariant, navigateToPage } from "tests/helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  // Pass the environment variable value as an argument to page.evaluate()
  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

//Create Navigation Page
test("Create Navigation A", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page A", "Navigation New Page Variant A", "https://facebook.com", 0);
});

test("Create Navigation B", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page B", "Navigation New Page Variant B", "https://facebook.com", 1);
});

test("Create Navigation C", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page C", "Navigation New Page Variant C", "https://facebook.com", 2);
});

test("Create Navigation D", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page D", "Navigation New Page Variant D", "https://facebook.com", 3);
});

test("Create Navigation E", async ({ page }) => {
  await createNavigationVariant(page, "Navigation Page E", "Navigation New Page Variant E", "https://facebook.com", 4);
});