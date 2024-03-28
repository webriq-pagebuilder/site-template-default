import { test, expect } from "@playwright/test";
import { autologin_studio } from "tests/autologin";
import {
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SANITY_STUDIO_URL,
} from "studio/config";

const newComponentName = `New App Promo - ` + new Date().getTime();
const dupeComponentName = `App promo - ` + new Date().getTime();

test.beforeEach(async ({ page }) => {
  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  await page.evaluate(autologin_studio, { token, projectId });
});

test.describe("Features", () => {
  // Applies to all tests in this group.
  test.describe.configure({ timeout: 120000 });

  // CREATE
  test("Create New Component", async ({ page }) => {
    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

    // create new component (select any component since their logic is the same, only difference is the schema type)
    await page.getByRole("link", { name: "Components" }).click();
    await page.getByRole("button", { name: "New App Promo" }).click();
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(newComponentName);
    await page.getByTestId("field-variant").getByRole("img").nth(2).click();
    await page.getByTestId("action-Save").click({ force: true });

    // check if the component was created, find by name
    await page.getByRole("link", { name: "Components" }).click({ force: true });
    await expect(
      page.locator("div").filter({ hasText: newComponentName }).nth(1)
    ).toHaveCount(1);
  });

  // TODO: REFERENCE TO PAGE
  test("Add page component as reference", async ({ page }) => {
    test.skip(); // remove this once this test is finalized

    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

    // Go to "Pages" tab
    const element = page.locator('a:has-text("Pages")');
    await element.scrollIntoViewIfNeeded();
    await page.waitForSelector('a:has-text("Pages")', { state: "visible" });
    await element.click({ force: true });

    // Add new component as section reference
    await page.getByRole("link").first().click({ force: true });
    await page.getByRole("button", { name: "Add item…" }).click();
    await page.getByRole("menuitem", { name: "App Promo" }).click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill(newComponentName);
    await page.getByRole("button", { name: newComponentName }).click();

    // publish page with added component reference
    await page.getByTestId("action-[object Object]").click({ force: true });

    // verify new component is linked/referenced to page
    await page.getByRole("link", { name: "Components" }).click({ force: true });
    await expect(
      page.locator("div").filter({ hasText: newComponentName }).nth(1)
    ).toHaveCount(1);

    const cardName = newComponentName?.toLowerCase()?.replace(/\s/g, "");
    await expect(
      page.locator(`div.${cardName}`).filter({ hasText: "No references" })
    ).toHaveCount(0);
  });

  // TODO: Add test to verify when deleting component with reference shows cannot delete dialog

  test("Duplicate a component", async ({ page }) => {
    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

    await page.getByRole("link", { name: "Components" }).click({ force: true });

    await expect(
      page.locator("div").filter({ hasText: newComponentName }).nth(1)
    ).toHaveCount(1);

    const cardName = newComponentName?.toLowerCase()?.replace(/\s/g, "");

    // Hover on the target element to trigger the appearance of the button
    await page.locator(`div.${cardName}`).first().hover();

    // click on duplicate button
    await page
      .locator(`div.${cardName} button.components-dupe-btn`)
      .first()
      .click({ force: true });

    // Fill in the duplicate component name and save with an increased timeout
    await page.getByTestId("field-label").getByTestId("string-input").click();
    await page.getByTestId("field-label").getByTestId("string-input").fill("");
    await page
      .getByTestId("field-label")
      .getByTestId("string-input")
      .fill(dupeComponentName);
    await page
      .getByTestId("action-Save")
      .click({ force: true, timeout: 60000 });

    // Check if component dupe was created
    await page.getByRole("link", { name: "Components" }).click({ force: true });

    // Find element
    await expect(
      page.locator("div").filter({ hasText: dupeComponentName }).nth(2)
    ).toHaveCount(1, { timeout: 60000 });
  });

  // TODO: WIP - DELETE
  test("Delete a component", async ({ page }) => {
    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

    await page.getByRole("link", { name: "Components" }).click({ force: true });

    await expect(
      page.locator("div").filter({ hasText: dupeComponentName }).nth(2)
    ).toHaveCount(1);

    const cardName = dupeComponentName?.toLowerCase()?.replace(/\s/g, "");

    // Hover on the target element to trigger the appearance of the button and click delete button
    await page.locator(`div.${cardName}`).first().hover();
    await page
      .locator(`div.${cardName} button.components-delete-btn`)
      .first()
      .click({ force: true });

    // Delete actions
    await page
      .locator("[aria-label='Close dialog']")
      .first()
      .click({ force: true });
    await expect(
      page.locator("div").filter({ hasText: dupeComponentName }).nth(2)
    ).toHaveCount(1);

    await page.locator(`div.${cardName}`).first().hover();
    await page
      .locator(`div.${cardName} button.components-delete-btn`)
      .first()
      .click({ force: true });
    await page
      .locator("[aria-label='Cancel delete component']")
      .first()
      .click({ force: true });
    await expect(
      page.locator("div").filter({ hasText: dupeComponentName }).nth(2)
    ).toHaveCount(1);

    await page.locator(`div.${cardName}`).first().hover();
    await page
      .locator(`div.${cardName} button.components-delete-btn`)
      .first()
      .click({ force: true });
    await page
      .locator("[aria-label='Delete component']")
      .first()
      .click({ force: true });
    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}/components`);

    // Find element
    await expect(
      page.locator("div").filter({ hasText: dupeComponentName }).nth(2)
    ).toHaveCount(0, { timeout: 60000 });
  });
});
