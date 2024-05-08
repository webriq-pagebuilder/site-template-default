import { test, expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  deleteDocument,
  navigateToStore,
  newPageTitle,
  publishDocument,
} from "tests/utils";

test("Store has 3 main subtabs", async ({ page }) => {
  await navigateToStore(page);

  await expect(page.getByRole("link", { name: "Products" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Collections" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Commerce Pages" })
  ).toBeVisible();
});

test("Store Commerce Pages has subtabs", async ({ page }) => {
  await navigateToStore(page);

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

test.describe("Main Store Pages", () => {
  test.describe.configure({ timeout: 600_000, mode: "serial" });

  const collections = {
    name: newPageTitle("New collections "),
  };

  const product = {
    name: newPageTitle("New product "),
    price: "29.98",
    description: "This is a sample product description for the new product.",
  };

  test.beforeEach("Go to Store tab", async ({ page }) => {
    await navigateToStore(page);
  });

  test("Create product page", async ({ page }) => {
    await page.getByRole("link", { name: "Products" }).click({ force: true });
    await page.getByTestId("action-intent-button").click({ force: true });
    await page.getByLabel("Name").click();
    await page.getByLabel("Name").fill(product?.name);
    await page.getByRole("button", { name: "Generate" }).click({ force: true });
    await page.getByLabel("Price").click();
    await page.getByLabel("Price").fill(product?.price);
    await page.getByText("Click to activate").click({ force: true });
    await page
      .getByTestId("scroll-container")
      .getByRole("textbox")
      .click({ force: true });
    await page
      .getByTestId("scroll-container")
      .getByRole("textbox")
      .fill(product?.description);

    // publish document
    await publishDocument(page);

    const getEcwidProdId = page.locator("input#ecwidProductId").inputValue();
    expect(getEcwidProdId).not.toBeUndefined();

    // check site preview
    const productPagePromise = page.waitForEvent("popup");
    await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
    const productPage = await productPagePromise;

    await expect(productPage.locator("h1")).toContainText(product?.name);
    await expect(productPage.locator('[id="__next"]')).toContainText(
      product?.price
    );
    await expect(productPage.locator('[id="__next"]')).toContainText(
      product?.description
    );
    await expect(productPage.getByText("Qty")).toBeVisible();
    await expect(productPage.getByText("-+")).toBeVisible();
    await expect(productPage.getByLabel("Add to Bag button")).toBeVisible();
    await expect(productPage.getByLabel("Add to Wishlist")).toBeVisible();
  });

  test("Create collections page", async ({ page }) => {
    await page
      .getByRole("link", { name: "Collections" })
      .click({ force: true });
    await page.getByTestId("action-intent-button").click({ force: true });
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(collections?.name);
    await page.getByRole("button", { name: "Generate" }).click({ force: true });
    await page.getByRole("button", { name: "Add item" }).click();
    await page.getByTestId("autocomplete").fill(product?.name);
    await page
      .getByRole("button", { name: product?.name })
      .click({ force: true });

    // publish document
    await publishDocument(page);

    // check site preview
    const collectionsPagePromise = page.waitForEvent("popup");
    await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
    const collectionsPage = await collectionsPagePromise;

    await expect(collectionsPage.locator('[id="__next"]')).toContainText(
      product?.name
    );
    await expect(collectionsPage.locator('[id="__next"]')).toContainText(
      product?.price
    );
  });

  test("Delete category page", async ({ page }) => {
    await page
      .getByRole("link", { name: "Collections" })
      .click({ force: true });
    await page
      .getByRole("link", { name: collections?.name })
      .click({ force: true });

    // remove product reference
    await page
      .getByTestId("field-products")
      .getByRole("button")
      .nth(1)
      .click({ force: true });
    await page.getByRole("menuitem", { name: "Remove" }).click({ force: true });

    // publish changes
    await publishDocument(page);

    // proceed delete
    await deleteDocument(page);
  });

  test("Delete product page", async ({ page }) => {
    await page.getByRole("link", { name: "Products" }).click({ force: true });
    await page
      .getByRole("link", { name: product?.name })
      .click({ force: true });
    await expect(page.getByText("Loading document")).toBeHidden();
    await expect(page.getByLabel("Name")).toHaveValue(product?.name);
    // proceed delete
    await deleteDocument(page);
  });
});

test.describe("Store Commerce Pages", () => {
  test.describe.configure({ timeout: 600_000 });

  test.beforeEach("Go to Store Commerce Pages", async ({ page }) => {
    await navigateToStore(page);
    await page
      .getByRole("link", { name: "Commerce Pages" })
      .click({ force: true });
  });

  // check cart page preview
  test("Check Cart page preview", async ({ page }) => {
    await page.getByRole("link", { name: "Cart" }).click({ force: true });

    const cartPagePromise = page.waitForEvent("popup");
    await page.getByText(`${NEXT_PUBLIC_SITE_URL}/cart`).click({ force: true });

    const cartPage = await cartPagePromise;
    await cartPage.goto(`${NEXT_PUBLIC_SITE_URL}/cart?store-page=cart`);

    await expect(cartPage.locator(".ecwid-productBrowser")).toBeVisible({
      timeout: 150_000,
    });
    await expect(cartPage.getByRole("heading")).toContainText("Shopping cart");
    await expect(
      cartPage.getByText("Your shopping cart is empty")
    ).toBeVisible();
    await expect(
      cartPage.getByRole("button", { name: "Browse Store" })
    ).toBeVisible();
    await expect(cartPage.getByRole("link", { name: "Cart" })).toBeVisible();
  });

  // check wishlist page preview
  test("Check Wishlist page preview", async ({ page }) => {
    await page
      .getByRole("link", { name: "Wishlist", exact: true })
      .click({ force: true });

    const wishlistPagePromise = page.waitForEvent("popup");
    await page
      .getByText(`${NEXT_PUBLIC_SITE_URL}/wishlist`)
      .click({ force: true });

    const wishlistPage = await wishlistPagePromise;
    await expect(
      wishlistPage
        .locator("div")
        .filter({
          hasText:
            /^Wishlist is emptyAdd your favorite products to wishlist to display them here\.$/,
        })
        .nth(2)
    ).toBeVisible({ timeout: 120_000 });
  });
});
