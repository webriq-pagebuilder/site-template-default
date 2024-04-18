import { test, expect, type Page } from "@playwright/test";
import { autologin_studio } from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";

const newComponentName = "New WebriQ Component App promo";
const dupeComponentName = "Duplicate WebriQ Component App promo";

let page: Page;

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
});

test.describe("Verify main document actions working", () => {
  test.describe.configure({ timeout: 1500000, mode: "serial" });

  test("Show all components", async () => {
    await page.getByRole("link", { name: "Components" }).click({ force: true });
    await page
      .locator("create-btn-icon")
      .isVisible()
      .then(() => {
        console.log("[DONE] All components are loaded");
      });
  });

  test("Can create component", async () => {
    console.log("[INFO] Creating a new component...");
    await page.getByRole("link", { name: "Components" }).click({ force: true });
    await page.getByRole("button", { name: "New App Promo" }).click();
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(newComponentName);
    await page.getByTestId("field-variant").getByRole("img").nth(2).click();
    await page.getByTestId("action-Save").click({ force: true });
    await expect(page.locator("[aria-label='Last published just now']").first())
      .toBeVisible({ timeout: 180000 })
      .then(() => {
        console.log("[DONE] Component successfully created!");
      });
  });

  test("Can search component", async () => {
    await page.getByRole("link", { name: "Components" }).click({ force: true });
    await page.getByPlaceholder("Search variants").click();
    await page.getByPlaceholder("Search variants").fill("New App Promo");
    await expect(
      page.locator("button:has-text('New App Promo')").first()
    ).toBeVisible({ timeout: 180000 });
  });

  test("Can duplicate component", async () => {
    const cardName = newComponentName?.toLowerCase()?.replace(/\s/g, "");

    console.log("[INFO] Duplicating component...");
    await page.getByRole("link", { name: "Components" }).click({ force: true });
    await expect(page.locator(`div.${cardName}`).first()).toBeVisible({
      timeout: 180000,
    });
    await page.locator(`div.${cardName}`).first().hover();
    await page
      .locator(`div.${cardName} button.components-dupe-btn`)
      .first()
      .click({ force: true });
    await page.getByTestId("field-label").getByTestId("string-input").click();
    await page
      .getByTestId("field-label")
      .getByTestId("string-input")
      .press("Meta+a");
    await page
      .getByTestId("field-label")
      .getByTestId("string-input")
      .fill(dupeComponentName);
    await page.getByTestId("action-Save").click({ force: true });
    await expect(page.locator("[aria-label='Last published just now']").first())
      .toBeVisible({ timeout: 300000 })
      .then(() => {
        console.log("[DONE] Component successfully duplicated!");
      });
  });

  test("Can delete created component", async () => {
    console.log("[INFO] Deleting component...");

    await page.getByRole("link", { name: "Components" }).click({ force: true });

    const cardName = newComponentName?.toLowerCase()?.replace(/\s/g, "");
    await expect(page.locator(`div.${cardName}`).first()).toBeVisible({
      timeout: 180000,
    });
    await page.locator(`div.${cardName}`).first().hover();
    await page
      .locator(`div.${cardName} button.components-delete-btn`)
      .first()
      .click({ force: true });
    await expect(
      page.locator("[id=confirm-delete_label]").first()
    ).toBeVisible();

    // Delete actions
    await page
      .locator("[aria-label='Close dialog']")
      .first()
      .click({ force: true });
    await expect(
      page.locator("div").filter({ hasText: dupeComponentName }).first()
    ).toBeVisible({ timeout: 180000 });

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
      page.locator("div").filter({ hasText: dupeComponentName }).first()
    ).toBeVisible({ timeout: 180000 });

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
        timeout: 180000,
      })
      .then(() => {
        console.log("[DONE] Successfully deleted component...");
      });
  });

  test("Can delete duplicate component", async () => {
    console.log("[INFO] Deleting component...");

    await page.getByRole("link", { name: "Components" }).click({ force: true });

    const dupeCardName = dupeComponentName?.toLowerCase()?.replace(/\s/g, "");
    await expect(page.locator(`div.${dupeCardName}`).first()).toBeVisible({
      timeout: 180000,
    });
    await page.locator(`div.${dupeCardName}`).first().hover();
    await page
      .locator(`div.${dupeCardName} button.components-delete-btn`)
      .first()
      .click({ force: true });
    await expect(
      page.locator("[id=confirm-delete_label]").first()
    ).toBeVisible();

    // Delete dupe
    await page.locator(`div.${dupeCardName}`).first().hover();
    await page
      .locator(`div.${dupeCardName} button.components-delete-btn`)
      .first()
      .click({ force: true });
    await page
      .locator("[aria-label='Delete component']")
      .first()
      .click({ force: true });
    await expect(page.locator(`div.${dupeCardName}`).first())
      .toHaveCount(0, {
        timeout: 180000,
      })
      .then(() => {
        console.log("[DONE] Successfully deleted component...");
      });
  });

  test.fixme("Can't delete referenced component", async () => {
    await page.getByRole("link", { name: "Components" }).click({ force: true });

    await page.locator("div.referenced-by-pages").first().hover();
    await page
      .locator("div.referenced-by-pages button.components-delete-btn")
      .first()
      .click({ force: true });
    await expect(page.getByText("Failed to delete component")).toBeVisible({
      timeout: 120000,
    });
    await page
      .getByRole("button", { name: "Got it", exact: true })
      .click({ force: true });
    await expect(
      page
        .locator("div.referenced-by-pages button.components-delete-btn")
        .first()
    )
      .toBeVisible({ timeout: 180000 })
      .then(() => {
        console.log(
          "[INFO] Cannot delete component that is being referenced by a page!"
        );
      });
  });
});

test("Can filter component", async () => {
  test.setTimeout(120000);

  await page.getByRole("link", { name: "Components" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Select\.\.\.$/ })
    .first()
    .click({ force: true });
  await page.locator("#react-select-2-option-0").click({ force: true });
  await expect(page.locator("[data-ui='Container']").first()).toHaveCount(1);
});

test.afterAll(async () => {
  await page.close();
});
