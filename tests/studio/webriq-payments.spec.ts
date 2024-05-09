import { test, expect } from "@playwright/test";
import {
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_STRIPE_SECRET_KEY,
} from "studio/config";

const paymentName = `Payment ` + new Date().getTime();
const publishableKey = NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const secretKey = NEXT_PUBLIC_STRIPE_SECRET_KEY;

test.describe("Main Workflow", () => {
  console.log("[INFO] Run WebriQ Payments tests ~ Main Workflow");

  test.describe.configure({ timeout: 600_000, mode: "serial" });

  // Check if the Inputs with no value should display required.
  test("Payment Input Required", async ({ page }) => {
    await navigateToPayments({ page });

    await expect(page.getByRole("button", { name: "Add API" })).toBeVisible({
      timeout: 20_000,
    });
    await page.getByRole("button", { name: "Add API" }).click();
    await page.getByRole("button", { name: "Add Account" }).click();

    // Asserting the presence of "Required" text in multiple places
    const accountNameRequired = page.getByText("Required").first();
    const publishableKeyRequired = page.getByText("Required").nth(1);
    const secretKeyRequired = page.getByText("Required").nth(2);

    await expect(
      accountNameRequired || publishableKeyRequired || secretKeyRequired
    ).toBeVisible({ timeout: 20_000 });

    await page.getByPlaceholder("Publishable Key").click();
    await page.getByPlaceholder("Publishable Key").fill(`${publishableKey}`);
    await page.getByPlaceholder("Secret Key").click();
    await page.getByPlaceholder("Secret Key").fill(`${secretKey}`);
    await page.getByRole("button", { name: "Add Account" }).click();
    await expect(accountNameRequired).toBeVisible({ timeout: 20_000 });

    await page.getByPlaceholder("Account Name").click();
    await page.getByPlaceholder("Account Name").press("CapsLock");
    await page.getByPlaceholder("Account Name").fill(paymentName);
    await page.getByPlaceholder("Publishable Key").dblclick();
    await page.getByPlaceholder("Publishable Key").press("Meta+a");
    await page.getByPlaceholder("Publishable Key").fill("");
    await page.getByRole("button", { name: "Add Account" }).click();
    await expect(publishableKeyRequired).toBeVisible({ timeout: 20_000 });

    await page.getByPlaceholder("Publishable Key").click();
    await page.getByPlaceholder("Publishable Key").fill(`${publishableKey}`);
    await page.getByPlaceholder("Secret Key").click();
    await page.getByPlaceholder("Secret Key").press("Meta+a");
    await page.getByPlaceholder("Secret Key").fill("");
    await page.getByRole("button", { name: "Add Account" }).click();
    await expect(secretKeyRequired).toBeVisible({ timeout: 20_000 });

    console.log("[DONE] Testing Payment Input Required 🚀");
  });

  // TODO: Network Error
  test.skip("Create Payment Account", async ({ page }) => {
    await navigateToPayments({ page });
    await page.getByRole("button", { name: "Add API" }).click();
    await page.getByPlaceholder("Account Name").click();
    await page.getByPlaceholder("Account Name").fill(paymentName);
    await page.getByPlaceholder("Publishable Key").click();
    await page.getByPlaceholder("Publishable Key").fill(`${publishableKey}`);
    await page.getByPlaceholder("Secret Key").click();
    await page.getByPlaceholder("Secret Key").fill(`${secretKey}`);

    await page
      .getByRole("button", { name: "Add Account" })
      .click({ force: true });
    await expect(
      page
        .locator('[id="__next"]')
        .getByRole("alert")
        .locator("div")
        .nth(1)
        .getByText("Stripe Secret Key Valid:")
    ).toBeVisible();

    const addedAccountName = page.locator(
      `div span:has-text("${paymentName}")`
    );

    // Assert that the added account is visible
    await expect(addedAccountName).toBeVisible({ timeout: 20_000 });
  });

  //View Payments
  test.skip("View Payment", async ({ page }) => {
    await navigateToPayments({ page });

    const addedAccountName = page.locator(
      `div span:has-text("${paymentName}")`
    );
    await expect(addedAccountName).toBeVisible({ timeout: 20_000 });

    // edit button
    await page
      .locator('button.sc-gHJCvS.kewqlp[data-ui="Button"]:has(span > svg)')
      .last()
      .click();

    await expect(
      page.getByRole("cell", { name: "Product Name" })
    ).toBeVisible();
    await expect(
      page.getByLabel("Active Products").locator("div")
    ).toBeVisible();
    await page.getByLabel("Close dialog").click();
  });

  test.skip("Delete Payment", async ({ page }) => {
    await navigateToPayments({ page });
    const addedAccountName = page.locator(
      `div span:has-text("${paymentName}")`
    );
    await expect(addedAccountName).toBeVisible({ timeout: 20_000 });

    // delete button
    await page
      .locator('button.sc-gHJCvS.hRJPpX[data-ui="Button"]:has(span > svg)')
      .last()
      .click();
    await expect(page.getByLabel("Confirm Delete")).toBeVisible({
      timeout: 20_000,
    });
    await page.getByRole("button", { name: "Confirm" }).click();

    await expect(
      page
        .locator('[id="__next"]')
        .getByRole("alert")
        .locator("div")
        .nth(1)
        .getByText("Stripe Account Successfully Deleted")
    ).toBeVisible();

    await expect(addedAccountName).toBeHidden({ timeout: 20_000 });
  });
});

const navigateToPayments = async ({ page }) => {
  await page.goto(`./studio`);
  await page.getByRole("link", { name: "Payments" }).click();
};
