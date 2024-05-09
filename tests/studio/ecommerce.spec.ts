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

  test.fixme("Create product page", async ({ page }) => {
    await page.getByRole("link", { name: "Products" }).click({ force: true });
    await page.waitForLoadState();

    await expect(page.getByTestId("action-intent-button")).toBeVisible();
    await page.getByTestId("action-intent-button").click({ force: true });
    await page.waitForLoadState();

    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByRole("button", { name: "Generate" })).toBeVisible();
    await expect(page.getByLabel("Price")).toBeVisible();
    await expect(page.getByText("Click to activate")).toBeVisible();

    await page.getByLabel("Name").fill(product?.name);
    await page.getByRole("button", { name: "Generate" }).click({ force: true });
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
    await expect(page.getByTestId("review-changes-button")).toBeHidden();

    await page.goto(
      `${NEXT_PUBLIC_SITE_URL}/products/${product?.name
        ?.toLowerCase()
        ?.replace(/\s/g, "-")}`
    );
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toContainText(product?.name);
    await expect(page.locator('[id="__next"]')).toContainText(product?.price);
    await expect(page.locator('[id="__next"]')).toContainText(
      product?.description
    );
    await expect(page.getByText("Qty")).toBeVisible();
    await expect(page.getByText("-+")).toBeVisible();
    await expect(page.getByLabel("Add to Bag button")).toBeVisible();
    await expect(page.getByLabel("Add to Wishlist")).toBeVisible();
  });

  test.fixme("Create collections page", async ({ page }) => {
    await page
      .getByRole("link", { name: "Collections" })
      .click({ force: true });
    await page.waitForLoadState();

    await expect(page.getByTestId("action-intent-button")).toBeVisible();
    await page.getByTestId("action-intent-button").click({ force: true });
    await page.waitForLoadState();

    await expect(page.getByTestId("string-input")).toBeVisible();
    await expect(page.getByRole("button", { name: "Generate" })).toBeVisible();

    await page.getByTestId("string-input").fill(collections?.name);
    await page.getByRole("button", { name: "Generate" }).click({ force: true });
    await page.getByRole("button", { name: "Add item" }).click({ force: true });
    await page.getByTestId("autocomplete").fill(product?.name);
    await expect(
      page.getByRole("button", { name: product?.name })
    ).toBeVisible();
    await page
      .getByRole("button", { name: product?.name })
      .click({ force: true });

    // publish document
    await publishDocument(page);

    // check site preview
    await expect(page.getByTestId("review-changes-button")).toBeHidden();

    await page.goto(
      `${NEXT_PUBLIC_SITE_URL}/collections/${collections?.name
        ?.toLowerCase()
        ?.replace(/\s/g, "-")}`
    );
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator('[id="__next"]')).toContainText(product?.name);
    await expect(page.locator('[id="__next"]')).toContainText(product?.price);
  });

  test.fixme("Delete category page", async ({ page }) => {
    await page
      .getByRole("link", { name: "Collections" })
      .click({ force: true });

    await expect(
      page.getByRole("link", { name: collections?.name })
    ).toBeVisible();
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

  test.fixme("Delete product page", async ({ page }) => {
    await page.getByRole("link", { name: "Products" }).click({ force: true });

    await expect(page.getByRole("link", { name: product?.name })).toBeVisible();
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

    await expect(page.getByText("Loading document")).toBeHidden();
    await expect(
      page
        .getByTestId("field-cartSectionVariant")
        .locator("div")
        .filter({ hasText: "Cart Section Variant" })
        .first()
    ).toBeVisible();

    const publishButton = page.locator('button:has-text("Publish")');
    const isEnabledPublishBtn =
      (await publishButton.getAttribute("data-disabled")) === "false";

    if (isEnabledPublishBtn) {
      await expect(publishButton).toHaveAttribute("data-disabled", "false");
      await publishButton.click();
    }
    await expect(publishButton).toHaveAttribute("data-disabled", "true");

    await page.goto(`${NEXT_PUBLIC_SITE_URL}/cart?store-page=cart`);
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator(".ecwid-productBrowser")).toBeVisible({
      timeout: 150_000,
    });
    await expect(page.locator('h1:has-text("Shopping cart")')).toBeVisible();
    await expect(page.getByText("Your shopping cart is empty")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Browse Store" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Cart" })).toBeVisible();
  });

  // check wishlist page preview
  test("Check Wishlist page preview", async ({ page }) => {
    await page
      .getByRole("link", { name: "Wishlist", exact: true })
      .click({ force: true });

    await expect(page.getByText("Loading document")).toBeHidden();
    await expect(
      page
        .getByTestId("field-wishlistSectionVariant")
        .locator("div")
        .filter({ hasText: "Wishlist Section Variant" })
        .first()
    ).toBeVisible();

    await page.goto(`${NEXT_PUBLIC_SITE_URL}/wishlist`);
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator('p:has-text("Wishlist is empty")')).toBeVisible();
    await expect(
      page.locator(
        'p:has-text("Add your favorite products to wishlist to display them here.")'
      )
    ).toBeVisible();
  });
});
