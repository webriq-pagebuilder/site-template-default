import { test, expect } from "@playwright/test";
import { newPageTitle } from "tests/utils";

test("Show all components", async ({ page }) => {
  console.log("[INFO] Run WebriQ Components tests ~ Show all components");

  await page.goto(`./studio/components`);
  await page.locator("create-btn-icon").isVisible();

  console.log("[DONE] Show all components 🚀");
});

test.describe("Main document actions", () => {
  console.log("[INFO] Run WebriQ Components tests ~ Main document actions");
  test.describe.configure({ mode: "serial" });

  const newComponentName = newPageTitle("New App promo ");
  const dupeComponentName = newPageTitle("Duplicate App promo ");

  test.beforeEach(async ({ page }) => {
    await page.goto(`./studio/components`);
  });

  test("Can create component", async ({ page }) => {
    await page.waitForLoadState("domcontentloaded");
    await expect(page.getByText("Select...")).toBeVisible();
    await page.getByText("Select...").click();
    await expect(page.getByText("App Promo")).toBeVisible();
    await page.getByText("App Promo").click();
    await expect(page.getByText("APP PROMO", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "New App Promo" })
    ).toBeVisible();
    await page
      .getByRole("button", { name: "New App Promo" })
      .click({ force: true });
    await expect(page.getByText("Loading document")).toBeHidden();

    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(newComponentName);
    await page.getByTestId("field-variant").getByRole("img").nth(2).click();

    await expect(
      page
        .locator('[data-testid="review-changes-button"]')
        .filter({ hasText: "Just now" })
    ).toBeVisible();
    await page.getByTestId("action-Save").click({ force: true });
    await expect(
      page.locator("[aria-label='Last published just now']").first()
    ).toBeVisible();

    console.log("[DONE] Can create component 🚀");
  });

  test("Can search component", async ({ page }) => {
    await expect(page.getByPlaceholder("Search variants")).toBeVisible();
    await page.getByPlaceholder("Search variants").click();
    await page.getByPlaceholder("Search variants").fill(newComponentName);
    await expect(
      page.locator(`button:has-text('${newComponentName}')`).first()
    ).toBeVisible();

    console.log("[DONE] Can search component 🚀");
  });

  test("Can duplicate component", async ({ page }) => {
    const cardName = newComponentName?.toLowerCase()?.replace(/\s/g, "");

    await expect(page.locator(`div.${cardName}`).first()).toBeVisible();
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
    await expect(
      page
        .locator('[data-testid="review-changes-button"]')
        .filter({ hasText: "Just now" })
    ).toBeVisible();
    await page.getByTestId("action-Save").click({ force: true });
    await expect(
      page.locator("[aria-label='Last published just now']").first()
    ).toBeVisible();

    console.log("[DONE] Can duplicate component 🚀");
  });

  test("Can delete component", async ({ page }) => {
    const cardName = newComponentName?.toLowerCase()?.replace(/\s/g, "");
    const dupeCardName = dupeComponentName?.toLowerCase()?.replace(/\s/g, "");

    await expect(page.locator(`div.${cardName}`).first()).toBeVisible();
    await page.locator(`div.${cardName}`).first().hover();
    await expect(
      page.locator(`div.${dupeCardName} button.components-delete-btn`).first()
    ).toBeVisible();
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
    await expect(page.locator(`div.${cardName}`)).toBeVisible();

    await page.locator(`div.${cardName}`).first().hover();
    await expect(
      page.locator(`div.${dupeCardName} button.components-delete-btn`).first()
    ).toBeVisible();
    await page
      .locator(`div.${cardName} button.components-delete-btn`)
      .first()
      .click({ force: true });
    await page
      .locator("[aria-label='Cancel delete component']")
      .first()
      .click({ force: true });
    await expect(page.locator(`div.${cardName}`)).toBeVisible();

    await page.locator(`div.${cardName}`).first().hover();
    await expect(
      page.locator(`div.${dupeCardName} button.components-delete-btn`).first()
    ).toBeVisible();
    await page
      .locator(`div.${cardName} button.components-delete-btn`)
      .first()
      .click({ force: true });
    await page
      .locator("[aria-label='Delete component']")
      .first()
      .click({ force: true });
    await expect(page.locator(`div.${cardName}`).first()).toHaveCount(0);

    console.log("[DONE] Can delete component 🚀");
  });
});

test("Can filter component", async ({ page }) => {
  console.log("[INFO] Run WebriQ Components tests ~ Can filter component");

  await page.goto(`./studio/components`);
  await expect(page.getByText("Select...")).toBeVisible();
  await page.getByText("Select...").click();
  await expect(page.getByText("Call to Action")).toBeVisible();
  await page.getByText("Call to Action").click();
  await expect(page.getByText("CALL TO ACTION", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "New Call to Action" })
  ).toBeVisible();

  console.log("[DONE] Can filter component 🚀");
});
