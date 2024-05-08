import { test, expect } from "@playwright/test";
import { newPageTitle } from "tests/utils";

test.describe.fixme("Main Store Pages", () => {
  test.describe.configure({ timeout: 600_000, mode: "serial" });

  const productName = newPageTitle("New product ");
  const collectionsName = newPageTitle("New collections ");

  test.beforeEach("Go to Store tab", async ({ page }) => {
    await page.goto(`./studio`);

    const element = page.locator('a:has-text("Store")');
    await element.scrollIntoViewIfNeeded();
    await page.waitForSelector('a:has-text("Store")', { state: "visible" });
    await element.click({ force: true });
  });

  test("Store has 3 main subtabs", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Products" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Collections" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Commerce Pages" })
    ).toBeVisible();
  });

  test("Can successfully create product", async ({ page }) => {
    await page.getByRole("link", { name: "Products" }).click({ force: true });
    await page.getByTestId("action-intent-button").click({ force: true });
    await page.getByRole("tab", { name: "Basic Info" }).click({ force: true });
    await page.getByLabel("Name").click();
    await page.getByLabel("Name").fill(productName);
    await page.getByRole("button", { name: "Generate" }).click({ force: true });
    await page.getByLabel("Price").click();
    await page.getByLabel("Price").fill("29.98");
    await page.getByText("Click to activate").click({ force: true });
    await page
      .getByTestId("scroll-container")
      .getByRole("textbox")
      .click({ force: true });
    await page
      .getByTestId("scroll-container")
      .getByRole("textbox")
      .fill("This is a sample product description for the new product.");

    // publish document
    await expect(
      page
        .locator('[data-testid="review-changes-button"]')
        .filter({ hasText: "Just now" })
    ).toBeVisible({ timeout: 150_000 });
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 120_000 });
    await expect(page.getByText("Successfully updated product")).toBeVisible({
      timeout: 150_000,
    });
    await expect(
      page
        .locator('[id="__next"]')
        .getByRole("alert")
        .locator("div")
        .filter({ hasText: "The document was published" })
        .nth(1)
    ).toBeVisible({ timeout: 150_000 });
    await expect(
      page.getByRole("button", { name: "Last published just now" })
    ).toBeVisible({ timeout: 150_000 });

    const getEcwidProdId = page.locator("input#ecwidProductId").inputValue();
    expect(getEcwidProdId).not.toBeUndefined();
  });

  test("Can successfully create collections", async ({ page }) => {
    await page
      .getByRole("link", { name: "Collections" })
      .click({ force: true });
    await page.getByTestId("action-intent-button").click({ force: true });
    await page.getByRole("tab", { name: "Design" }).click();
    await expect(
      page.getByRole("link", { name: "Default Slot for Collection" })
    ).toBeVisible();
    await page.getByRole("tab", { name: "Basic Info" }).click({ force: true });
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(collectionsName);
    await page.getByRole("button", { name: "Generate" }).click({ force: true });
    await page.getByRole("button", { name: "Add item" }).click();
    await page.getByTestId("autocomplete").fill(productName);
    await page
      .getByRole("button", { name: productName })
      .click({ force: true });

    // publish document
    await page
      .getByTestId("action-[object Object]")
      .click({ force: true, timeout: 120_000 });
    await expect(page.getByText("The document was published")).toBeVisible();
  });
});

test.describe("Store Commerce Pages", () => {
  test.describe.configure({ timeout: 600_000, mode: "serial" });

  test.beforeEach("Go to Store tab", async ({ page }) => {
    await page.goto(`./studio`);

    const element = page.locator('a:has-text("Store")');
    await element.scrollIntoViewIfNeeded();
    await page.waitForSelector('a:has-text("Store")', { state: "visible" });
    await element.click({ force: true });
  });

  test("Store Commerce Pages has subtabs", async ({ page }) => {
    await page
      .getByRole("link", { name: "Commerce Pages" })
      .click({ force: true });
    await expect(
      page
        .getByLabel("List of Commerce Pages")
        .getByRole("link", { name: "Products" })
    ).toBeVisible();
    await expect(
      page
        .getByLabel("List of Commerce Pages")
        .getByRole("link", { name: "Collections" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Cart" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Wishlist" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Search" })).toBeVisible();
  });

  // the default slot pages seem to have been deleted from the default StackShift studio
  // newly created StackShift studio have the default slot pages
  test.fixme("Default common slot sections are found", async ({ page }) => {
    await page
      .getByRole("link", { name: "Commerce Pages" })
      .click({ force: true });

    // Store > Commerce Pages > Products
    await page
      .getByLabel("List of Commerce Pages")
      .getByRole("link", { name: "Products" })
      .click({ force: true });
    await expect(
      page.getByRole("link", { name: "Default C-Studio Navigation" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Default Common Slot for" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Default C-Studio Footer" })
    ).toBeVisible();

    // Store > Commerce Pages > Collections
    await page
      .getByLabel("List of Commerce Pages")
      .getByRole("link", { name: "Collections" })
      .click({ force: true });
    await expect(
      page.getByRole("link", { name: "Default C-Studio Navigation" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Default Common Slot for" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Default C-Studio Footer" })
    ).toBeVisible();

    // Store > Commerce Pages > Cart
    await page.getByRole("link", { name: "Cart" }).click({ force: true });
    await expect(
      page.getByRole("link", { name: "Default C-Studio Navigation" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Default Slot for Cart" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Default C-Studio Footer" })
    ).toBeVisible();

    // Store > Commerce Pages > Wishlist
    await page.getByRole("link", { name: "Wishlist" }).click({ force: true });
    await expect(
      page.getByRole("link", { name: "Default C-Studio Navigation" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Default Slot for Wishlist" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Default C-Studio Footer" })
    ).toBeVisible();

    // Store > Commerce Pages > Search
    await page.getByRole("link", { name: "Search" }).click({ force: true });
    await expect(
      page.getByRole("link", { name: "Default C-Studio Navigation" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Default All Products All" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Default C-Studio Footer" })
    ).toBeVisible();
  });
});
