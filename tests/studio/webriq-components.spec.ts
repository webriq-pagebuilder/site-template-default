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

test.describe("Workflow", () => {
  test.describe.configure({ timeout: 300000, mode: "serial" });

  test("Show all components", async ({ page }) => {
    // Navigate to the studio URL
    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

    await page.getByRole("link", { name: "Components" }).click();
    await page
      .locator("create-btn-icon")
      .isVisible()
      .then(() => {
        console.log("[DONE] All components are loaded");
      });
  });

  test("Create, duplicate and delete components", async ({ page }) => {
    const cardName = newComponentName?.toLowerCase()?.replace(/\s/g, "");

    // Navigate to the studio URL
    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
    await page.getByRole("link", { name: "Components" }).click({ force: true });

    console.log("[INFO] Creating a new component...");
    await page.getByRole("button", { name: "New App Promo" }).click();
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(newComponentName);
    await page.getByTestId("field-variant").getByRole("img").nth(2).click();
    await page.getByTestId("action-Save").click({ force: true });
    await expect(page.locator("[aria-label='Last published just now']"))
      .toHaveCount(2, { timeout: 10000 })
      .then(() => {
        console.log("[DONE] Component successfully created!");
      });

    // DUPLICATE COMPONENT
    console.log("[INFO] Duplicating component...");
    await page.getByRole("link", { name: "Components" }).click({ force: true });
    await expect(page.locator(`div.${cardName}`).first()).toHaveCount(1, {
      timeout: 10000,
    });
    await page.locator(`div.${cardName}`).first().hover();
    await page
      .locator(`div.${cardName} button.components-dupe-btn`)
      .first()
      .click({ force: true });
    await page.getByTestId("field-label").getByTestId("string-input").click();
    await page.getByTestId("field-label").getByTestId("string-input").fill("");
    await page
      .getByTestId("field-label")
      .getByTestId("string-input")
      .fill(dupeComponentName);
    await page.getByTestId("action-Save").click({ force: true });
    await expect(page.locator("[aria-label='Last published just now']"))
      .toHaveCount(2, { timeout: 10000 })
      .then(() => {
        console.log("[DONE] Component successfully duplicated!");
      });

    // DELETE COMPONENT
    console.log("[INFO] Deleting component...");
    await page.getByRole("link", { name: "Components" }).click({ force: true });
    await expect(page.locator(`div.${cardName}`).first()).toHaveCount(1, {
      timeout: 10000,
    });
    await page.locator(`div.${cardName}`).first().hover();
    await page
      .locator(`div.${cardName} button.components-delete-btn`)
      .first()
      .click({ force: true });
    await expect(page.locator("[id=confirm-delete_label]").first()).toHaveCount(
      1
    );
    // Delete actions
    await page
      .locator("[aria-label='Close dialog']")
      .first()
      .click({ force: true });
    await expect(
      page.locator("div").filter({ hasText: newComponentName }).first()
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
      page.locator("div").filter({ hasText: newComponentName }).first()
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
    await expect(page.locator(`div.${cardName}`).first())
      .toHaveCount(0, {
        timeout: 10000,
      })
      .then(() => {
        console.log("[DONE] Successfully deleted component...");
      });
  });

  // TODO: Get the document selected on page reference to resolve issue
  test.fixme("Add component reference to a page", async ({ page }) => {
    // Navigate to the studio URL
    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

    const element = page.locator('a:has-text("Pages")');
    await element.scrollIntoViewIfNeeded();
    await page.waitForSelector('a:has-text("Pages")', { state: "visible" });
    await element.click({ force: true });
    // Add new component as reference
    const nextElement = page.locator('a:has-text("New Page -")').first();
    await nextElement.scrollIntoViewIfNeeded();
    await page.waitForSelector('a:has-text("New Page -")', {
      state: "visible",
    });
    await nextElement.click({ force: true });
    await page.getByRole("button", { name: "Add item…" }).click();
    await page.getByRole("menuitem", { name: "App Promo" }).click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("App Promo -");
    await page.locator("button:has-text('App Promo -')").first().click();
    await page.getByTestId("action-[object Object]").click({ force: true }); // publish page
    await expect(
      page
        .locator("[aria-label='Review changes']")
        .filter({ hasText: "just now" })
    ).toHaveCount(1, { timeout: 10000 });
    await page.getByRole("link", { name: "Components" }).click({ force: true });
    await expect(
      page
        .locator("div")
        .filter({ hasText: dupeComponentName })
        .and(page.getByText(`${dupeComponentName}New Page -`))
        .first()
    )
      .toHaveCount(1)
      .then(() => {
        console.log("[DONE] Successfully added component reference to page!");
      });
  });

  // TODO: Use the same document on previous test to proceed
  test.fixme("Can't delete referenced component", async ({ page }) => {
    const dupeCardName = dupeComponentName?.toLowerCase()?.replace(/\s/g, "");

    // Navigate to the studio URL
    await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
    await page.getByRole("link", { name: "Components" }).click({ force: true });

    await page.locator(`div.${dupeCardName}`).first().hover();
    await page
      .locator(`div.${dupeCardName} button.components-delete-btn`)
      .first()
      .click({ force: true });
    await expect(page.getByText("Failed to delete component")).toHaveCount(1);
    await page.getByRole("button", { name: "Got it", exact: true }).click();
    await expect(page.locator(`div.${dupeCardName}`).first())
      .toHaveCount(0, {
        timeout: 10000,
      })
      .then(() => {
        console.log(
          "[INFO] Cannot delete component that is being referenced by a page!"
        );
      });
  });
});

test.afterAll(async () => {
  console.log("[DONE] Successfully run all tests for WebriQ Components");
});
