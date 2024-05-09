import { test, expect } from "@playwright/test";
import { newPageTitle } from "tests/utils";

test("Show all components", async ({ page }) => {
  console.log("[INFO] Run WebriQ Components tests");

  test.setTimeout(120_000);

  await page.goto(`./studio`);
  await page.getByRole("link", { name: "Components" }).click({ force: true });
  await page.locator("create-btn-icon").isVisible();
});

test.describe("Main document actions", () => {
  test.describe.configure({ timeout: 1_500_000, mode: "serial" });

  const newComponentName = newPageTitle("New App promo ");
  const dupeComponentName = newPageTitle("Duplicate App promo ");

  test.beforeEach(async ({ page }) => {
    await page.goto(`./studio`);
    await page.getByRole("link", { name: "Components" }).click({ force: true });
  });

  test("Can create component", async ({ page }) => {
    await page.waitForLoadState("domcontentloaded");
    await page.getByText("Select...").click();
    await expect(
      page.locator("div").filter({ hasText: /^New App Promo$/ })
    ).toBeVisible({ timeout: 150_000 });
    await page
      .getByRole("button", { name: "New App Promo" })
      .click({ force: true });
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(newComponentName);
    await page.getByTestId("field-variant").getByRole("img").nth(2).click();
    await page.getByTestId("action-Save").click({ force: true });
    await expect(
      page.locator("[aria-label='Last published just now']").first()
    ).toBeVisible({ timeout: 180_000 });
  });

  test("Can search component", async ({ page }) => {
    await expect(page.getByPlaceholder("Search variants")).toBeVisible();
    await page.getByPlaceholder("Search variants").click();
    await page.getByPlaceholder("Search variants").fill("New App Promo");
    await expect(
      page.locator("button:has-text('New App Promo')").first()
    ).toBeVisible({ timeout: 180_000 });
  });

  test("Can duplicate component", async ({ page }) => {
    const cardName = newComponentName?.toLowerCase()?.replace(/\s/g, "");

    await expect(page.locator(`div.${cardName}`).first()).toBeVisible({
      timeout: 180_000,
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
    await expect(
      page.locator("[aria-label='Last published just now']").first()
    ).toBeVisible({ timeout: 300_000 });
  });

  test("Can delete component", async ({ page }) => {
    const cardName = newComponentName?.toLowerCase()?.replace(/\s/g, "");
    const dupeCardName = dupeComponentName?.toLowerCase()?.replace(/\s/g, "");

    await expect(page.locator(`div.${cardName}`).first()).toBeVisible({
      timeout: 180_000,
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
    ).toBeVisible({ timeout: 180_000 });

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
    ).toBeVisible({ timeout: 180_000 });

    await page.locator(`div.${cardName}`).first().hover();
    await page
      .locator(`div.${cardName} button.components-delete-btn`)
      .first()
      .click({ force: true });
    await page
      .locator("[aria-label='Delete component']")
      .first()
      .click({ force: true });
    await expect(page.locator(`div.${cardName}`).first()).toHaveCount(0, {
      timeout: 180_000,
    });

    await page.locator(`div.${dupeCardName}`).first().hover();
    await page
      .locator(`div.${dupeCardName} button.components-delete-btn`)
      .first()
      .click({ force: true });
    await page
      .locator("[aria-label='Delete component']")
      .first()
      .click({ force: true });
    await expect(page.locator(`div.${dupeCardName}`).first()).toHaveCount(0, {
      timeout: 180_000,
    });
  });
});

test("Can filter component", async ({ page }) => {
  test.setTimeout(120_000);

  await page.goto(`./studio`);
  await page.getByRole("link", { name: "Components" }).click({ force: true });
  await expect(page.getByText("Select...")).toBeVisible();
  await page
    .locator("div")
    .filter({ hasText: /^Select\.\.\.$/ })
    .first()
    .click({ force: true });
  await expect(page.locator("#react-select-2-option-0")).toBeVisible();
  await page.locator("#react-select-2-option-0").click({ force: true });
  await expect(page.locator("[data-ui='Container']").first()).toHaveCount(1);
});
