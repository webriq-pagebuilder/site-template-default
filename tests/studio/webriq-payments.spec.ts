import { test, expect } from "@playwright/test";
import {
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_STRIPE_SECRET_KEY,
} from "studio/config";

const paymentName = `Payment ` + new Date().getTime();
const publishableKey = NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const secretKey = NEXT_PUBLIC_STRIPE_SECRET_KEY;

test.fixme("Main Workflow", () => {
  console.log("[INFO] Run WebriQ Payments tests ~ Main Workflow");

  test.describe.configure({ timeout: 600_000, mode: "serial" });

  // Check if the Inputs with no value should display required.
  test("Payment Input Required", async ({ page }) => {
    await navigateToPayments({ page });

    await expect(page.getByRole("button", { name: "Add API" })).toBeVisible();
    await page.getByRole("button", { name: "Add API" }).click();
    await page.getByRole("button", { name: "Add Account" }).click();

    // Asserting the presence of "Required" text in multiple places
    const accountNameRequired = page.getByText("Required").first();
    const publishableKeyRequired = page.getByText("Required").nth(1);
    const secretKeyRequired = page.getByText("Required").nth(2);

    await expect(
      accountNameRequired || publishableKeyRequired || secretKeyRequired
    ).toBeVisible();

    await page.getByPlaceholder("Publishable Key").click();
    await page.getByPlaceholder("Publishable Key").fill(`${publishableKey}`);
    await page.getByPlaceholder("Secret Key").click();
    await page.getByPlaceholder("Secret Key").fill(`${secretKey}`);
    await page.getByRole("button", { name: "Add Account" }).click();
    await expect(accountNameRequired).toBeVisible();

    await page.getByPlaceholder("Account Name").click();
    await page.getByPlaceholder("Account Name").press("CapsLock");
    await page.getByPlaceholder("Account Name").fill(paymentName);
    await page.getByPlaceholder("Publishable Key").dblclick();
    await page.getByPlaceholder("Publishable Key").press("Meta+a");
    await page.getByPlaceholder("Publishable Key").fill("");
    await page.getByRole("button", { name: "Add Account" }).click();
    await expect(publishableKeyRequired).toBeVisible();

    await page.getByPlaceholder("Publishable Key").click();
    await page.getByPlaceholder("Publishable Key").fill(`${publishableKey}`);
    await page.getByPlaceholder("Secret Key").click();
    await page.getByPlaceholder("Secret Key").press("Meta+a");
    await page.getByPlaceholder("Secret Key").fill("");
    await page.getByRole("button", { name: "Add Account" }).click();
    await expect(secretKeyRequired).toBeVisible();

    console.log("[DONE] Payment Input Required 🚀");
  });

  // TODO: Network Error
  test.fixme("Create Payment Account", async ({ page }) => {
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
    await expect(addedAccountName).toBeVisible();
  });

  //View Payments
  test.fixme("View Payment", async ({ page }) => {
    await navigateToPayments({ page });

    const addedAccountName = page.locator(
      `div span:has-text("${paymentName}")`
    );
    await expect(addedAccountName).toBeVisible();

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

  test.fixme("Delete Payment", async ({ page }) => {
    await navigateToPayments({ page });
    const addedAccountName = page.locator(
      `div span:has-text("${paymentName}")`
    );
    await expect(addedAccountName).toBeVisible();

    // delete button
    await page
      .locator('button.sc-gHJCvS.hRJPpX[data-ui="Button"]:has(span > svg)')
      .last()
      .click();
    await expect(page.getByLabel("Confirm Delete")).toBeVisible();
    await page.getByRole("button", { name: "Confirm" }).click();

    await expect(
      page
        .locator('[id="__next"]')
        .getByRole("alert")
        .locator("div")
        .nth(1)
        .getByText("Stripe Account Successfully Deleted")
    ).toBeVisible();

    await expect(addedAccountName).toBeHidden();
  });
});

const navigateToPayments = async ({ page }) => {
  await page.goto(`./studio`);
  await page.getByRole("link", { name: "Payments" }).click();
};
