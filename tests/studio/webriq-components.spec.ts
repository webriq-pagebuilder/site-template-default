import { test, expect } from "@playwright/test";
import { autologin_studio } from "tests/basic.spec";

const newComponentName = `New App Promo - ` + new Date().getTime();
const dupeComponentName = `App promo - ` + new Date().getTime();

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  await page.evaluate(autologin_studio, { token, projectId });
});

test("test it can create a new component", async ({ page }) => {
  await page.goto("http://localhost:3000/studio");

  // create new component (select any component since their logic is the same, only difference is the schema type)
  await page.getByRole("link", { name: "Components" }).click();
  await page.getByRole("button", { name: "New App Promo" }).click();
  await page.getByTestId("string-input").click();
  await page.getByTestId("string-input").fill(newComponentName);
  await page.getByTestId("field-variant").getByRole("img").nth(2).click();
  await page.getByTestId("action-Save").click();

  // check if the component was created, find by name
  await page.getByRole("link", { name: "Components" }).click();
  await page.waitForLoadState(); // The promise resolves after 'load' event.

  // find element
  await expect(
    page.locator("div").filter({ hasText: newComponentName }).nth(1)
  ).toHaveCount(1);
});

test("test it can duplicate existing component", async ({ page }) => {
  await page.goto("http://localhost:3000/studio");

  await page.getByRole("link", { name: "Components" }).click();
  // Hover over the div that contains the newComponentName
  const componentToDuplicate = page
    .locator("div")
    .filter({ hasText: newComponentName })
    .nth(1);
  await componentToDuplicate.hover();

  // Duplicate action
  await componentToDuplicate.locator("button").first().click();

  // Fill in the duplicate component name
  await page.getByTestId("field-label").getByTestId("string-input").click();
  await page
    .getByTestId("field-label")
    .getByTestId("string-input")
    .fill(dupeComponentName);
  await page.getByTestId("action-Save").click();

  // Check if component dupe was created
  await page.getByRole("link", { name: "Components" }).click();
  await page.waitForLoadState(); // The promise resolves after 'load' event.

  // Find element
  await expect(
    page.locator("div").filter({ hasText: dupeComponentName }).nth(2)
  ).toHaveCount(1);
});

test("test it can delete existing component", async ({ page }) => {
  await page.goto("http://localhost:3000/studio");

  await page.getByRole("link", { name: "Components" }).click();
  // Hover over the div that contains the dupeComponentName
  const componentToDelete = page
    .locator("div")
    .filter({ hasText: dupeComponentName })
    .nth(1);
  await componentToDelete.hover();

  // Delete actions
  await componentToDelete.locator("button").nth(2).click();
  await page.getByLabel("Close dialog").click();

  await componentToDelete.locator("button").nth(2).click();
  await page.getByRole("button", { name: "Cancel" }).click();

  await componentToDelete.locator("button").nth(2).click();
  await page.getByRole("button", { name: "Yes, delete component" }).click();

  await page.goto("http://localhost:3000/studio/components");

  // check if dupe component was deleted
  await expect(
    page.locator("div").filter({ hasText: dupeComponentName }).nth(2)
  ).toHaveCount(0);
});
