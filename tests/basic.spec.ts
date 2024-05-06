import { test, expect } from "@playwright/test";
import {
  createNewPage,
  deletePageVariant,
  expectDocumentPublished,
  navigateToPage,
  newPageTitle,
} from "./utils/index";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";

const pageTitle = newPageTitle("New Page");
const duplicatePageName = `Dupe Page ` + new Date().getTime();
const variantLabel = "Navigation New Page Variant A";

test.describe("Main Workflow", () => {
  test.describe.configure({ timeout: 900000, mode: "serial" });

  //PUBLISH PAGES
  test("Test to Publish a Page and Open Live URL", async ({ page }) => {
    await navigateToPage(page);
    await createNewPage(page, pageTitle, "Navigation");

    await page
      .getByTestId("field-label")
      .getByTestId("string-input")
      .click({ force: true });
    await page
      .getByTestId("field-label")
      .getByTestId("string-input")
      .fill("Navigation New Page Variant A");

    await page
      .getByTestId("field-variant")
      .getByRole("img")
      .first()
      .click({ force: true });

    await expectDocumentPublished(page, pageTitle);

    //Open Live URL
    await page.getByRole("link", { name: pageTitle }).click({ force: true });
    await page.waitForTimeout(5000);

    const pagePromise = page.waitForEvent("popup");
    await page.getByText("http://localhost:3000/new-").click();
    const openUrlPage = await pagePromise;

    // Wait for the element to become visible or hidden with a longer timeout
    const sectionCount = await page
      .locator("div")
      .filter({ hasText: /^No items$/ })
      .count();
    if (sectionCount > 0) {
      // If the section is found, expect the Empty Page element to be visible
      await expect(openUrlPage.getByText("Empty Page")).toBeVisible({
        timeout: 20000,
      });
    } else {
      // If the section is not found, expect the Empty Page element to be hidden
      await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
        timeout: 20000,
      });
    }
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== "passed") {
      await deletePageVariant(page, pageTitle, variantLabel);
    }
  });

  //Duplicate Pages Action
  test("Pages Duplicate Action and Open Live URL", async ({ page }) => {
    await navigateToPage(page);

    await page.getByPlaceholder("Search list").click({ force: true });
    await page.getByPlaceholder("Search list").fill(pageTitle);
    await page.waitForSelector(`a:has-text("${pageTitle}")`, {
      state: "visible",
    });

    await page.getByRole("link", { name: pageTitle }).click({ force: true });
    await page.waitForSelector(`a:has-text("${pageTitle}")`, {
      state: "visible",
    });
    await page.getByLabel("Clear").click({ force: true });
    await page.waitForTimeout(3000);
    await expect(page.getByText("Loading document")).toBeHidden();
    await expect(page.getByRole("link", { name: variantLabel })).toBeVisible();

    await page.getByTestId("action-menu-button").click({ force: true });
    await expect(page.getByTestId("action-Duplicate")).toBeVisible();
    await page.getByTestId("action-Duplicate").click({ force: true });
    await expect(page.getByText("Duplicate page content")).toBeVisible();
    await page.locator(`input[placeholder="Copy of ${pageTitle}"]`).click();
    await page
      .locator(`input[placeholder="Copy of ${pageTitle}"]`)
      .fill(duplicatePageName);
    const button = page.getByRole("button", { name: "Duplicate" });
    await expect(button).toHaveAttribute("data-disabled", "false");
    await button.click();

    await expect(
      page.locator('[id="__next"]').getByRole("alert").locator("div").nth(1)
    ).toBeVisible();
    await page.waitForSelector(`a:has-text("${duplicatePageName}")`, {
      state: "visible",
    });
    await expect(
      page.getByRole("link", { name: duplicatePageName })
    ).toBeVisible();
    await page
      .getByRole("link", { name: duplicatePageName })
      .click({ force: true });
    await page.waitForTimeout(5000);
    await page.getByTestId("action-[object Object]").click({ force: true });
    await expect(page.getByTestId("review-changes-button")).toBeHidden({
      timeout: 150000,
    });
    await expect(
      page
        .locator('[id="__next"]')
        .getByRole("alert")
        .locator("div")
        .filter({ hasText: "The document was published" })
        .nth(1)
    ).toBeVisible({ timeout: 150000 });

    //Open Live URL
    await page
      .getByRole("link", { name: duplicatePageName })
      .click({ force: true });
    await page.waitForTimeout(5000);

    const pagePromise = page.waitForEvent("popup");
    await page.getByText("http://localhost:3000/dupe-page-").click();
    const openUrlPage = await pagePromise;

    // If the section is not found, expect the Empty Page element to be hidden
    await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
      timeout: 20_000,
    });
  });

  //Launch Inline Editing - Edit and Close button function
  test("Open Inline Editing and Edit Texts should display in realtime", async ({
    page,
  }) => {
    await navigateToPage(page);
    await page.getByPlaceholder("Search list").click({ force: true });
    await page.getByPlaceholder("Search list").fill(pageTitle);
    await page.waitForSelector(`a:has-text("${pageTitle}")`, {
      state: "visible",
    });

    await page.getByRole("link", { name: pageTitle }).click({ force: true });
    await page.waitForSelector(`a:has-text("${pageTitle}")`, {
      state: "visible",
    });
    await page.getByLabel("Clear").click({ force: true });
    await page.waitForTimeout(5000);

    const launchInlineEditing = page.waitForEvent("popup");
    await page.waitForTimeout(10000);

    await page.getByLabel("Launch Inline Editing").click();
    const inlineEditPage = await launchInlineEditing;
    await expect(inlineEditPage.getByText("Loading...")).toBeHidden({
      timeout: 150000,
    });
    await inlineEditPage.locator("#navigation").click(); //Edit button
    await expect(
      inlineEditPage.locator(".react-split > div:nth-child(2)")
    ).toBeVisible();

    const routes = [
      {
        name: "Start Internal Link Not Set",
        currentRoute: "Start",
        updatedRoute: "Start Test",
      },
      {
        name: "About Us Internal Link Not Set",
        currentRoute: "About Us",
        updatedRoute: "About Us Test",
      },
      {
        name: "Services Internal Link Not Set",
        currentRoute: "Services",
        updatedRoute: "Services Test",
      },
      {
        name: "Platform Internal Link Not Set",
        currentRoute: "Platform",
        updatedRoute: "Platform Test",
      },
      {
        name: "Testimonials Internal Link Not Set",
        currentRoute: "Testimonials",
        updatedRoute: "Testimonials Test",
      },
    ];

    //Edit Routes
    for (const route of routes) {
      await inlineEditPage.getByRole("button", { name: route.name }).click();
      await expect(inlineEditPage.getByLabel("Edit Link")).toBeVisible();
      await inlineEditPage
        .locator(`input[value="${route.currentRoute}"]`)
        .click();
      await inlineEditPage
        .locator(`input[value="${route.currentRoute}"]`)
        .fill(route.updatedRoute);
      await inlineEditPage.getByLabel("Close dialog").click();
    }

    await expect(
      inlineEditPage
        .locator('[data-testid="review-changes-button"]')
        .filter({ hasText: "Saved!" })
    ).toBeVisible({ timeout: 150000 });
    await inlineEditPage.getByTestId("action-Save").click({ force: true });
    await expect(
      inlineEditPage.getByTestId("review-changes-button")
    ).toBeHidden({ timeout: 150000 });
    await expect(
      inlineEditPage
        .locator('[id="__next"]')
        .getByRole("alert")
        .locator("div")
        .filter({ hasText: "The document was published" })
        .nth(1)
    ).toBeVisible({ timeout: 150000 });

    await inlineEditPage.locator("#navigation").click({ force: true }); //Close Button
    await expect(
      inlineEditPage.locator(".react-split > div:nth-child(2)")
    ).toBeHidden();

    //Expect updated route names
    for (const route of routes) {
      await expect(
        inlineEditPage.getByRole("link", { name: route.updatedRoute })
      ).toBeVisible();
    }
  });

  test("Test with no Section should display Empty Page", async ({ page }) => {
    await navigateToPage(page);
    await page.getByPlaceholder("Search list").click({ force: true });
    await page.getByPlaceholder("Search list").fill(pageTitle);
    await page.waitForSelector(`a:has-text("${pageTitle}")`, {
      state: "visible",
    });

    await page.getByRole("link", { name: pageTitle }).click({ force: true });
    await page.waitForSelector(`a:has-text("${pageTitle}")`, {
      state: "visible",
    });
    await page.getByLabel("Clear").click({ force: true });
    await page.waitForTimeout(3000);
    await expect(page.getByText("Loading document")).toBeHidden({
      timeout: 150000,
    });
    await page.getByTestId("field-sections").getByRole("button").nth(1).click();
    await page.getByRole("menuitem", { name: "Remove" }).click();

    await expect(
      page.getByTestId("review-changes-button").filter({ hasText: "Just now" })
    ).toBeVisible({ timeout: 150000 });
    await page.getByTestId("action-[object Object]").click({ force: true });
    await expect(page.getByTestId("review-changes-button")).toBeHidden({
      timeout: 150000,
    });
    await expect(
      page
        .locator('[id="__next"]')
        .getByRole("alert")
        .locator("div")
        .filter({ hasText: "The document was published" })
        .nth(1)
    ).toBeVisible({ timeout: 150000 });
    await expect(page.getByRole("link", { name: pageTitle })).toBeVisible();

    const pagePromise = page.waitForEvent("popup");
    await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
    const openUrlPage = await pagePromise;

    // Wait for the element to become visible or hidden with a longer timeout
    const sectionCount = await page
      .locator("div")
      .filter({ hasText: /^No items$/ })
      .count();
    if (sectionCount > 0) {
      // If the section no items is found, expect the Empty Page element to be visible
      await expect(openUrlPage.getByText("Empty Page"))
        .toBeVisible({ timeout: 20000 })
        .then(() => console.log("There is no Available Content!"));
    }
  });

  test("Delete Duplicate Page", async ({ page }) => {
    // await deletePageVariant(page, duplicatePageName, variantLabel);
    await navigateToPage(page);
    await page.getByPlaceholder("Search list").click({ force: true });
    await page.getByPlaceholder("Search list").fill(duplicatePageName);
    await page.waitForSelector(`a:has-text("${duplicatePageName}")`, {
      state: "visible",
    });

    await page
      .getByRole("link", { name: duplicatePageName })
      .click({ force: true });
    await page.waitForSelector(`a:has-text("${duplicatePageName}")`, {
      state: "visible",
    });
    await page.getByLabel("Clear").click({ force: true });
    await page.waitForTimeout(3000);

    await expect(page.getByText("Loading document")).toBeHidden({
      timeout: 150000,
    });
    await page.getByTestId("action-menu-button").click({ force: true });
    await page.getByTestId("action-Delete").click();
    await page.getByTestId("confirm-delete-button").click();
    await expect(
      page
        .locator('[id="__next"]')
        .getByRole("alert")
        .locator("div")
        .filter({ hasText: "The document was successfully" })
        .nth(1)
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: duplicatePageName })
    ).toBeHidden({
      timeout: 150000,
    });
  });

  test("Delete Published Page", async ({ page }) => {
    await deletePageVariant(page, pageTitle, variantLabel);
  });
});

//SEE CURRENT VERSION
test("See Current Version", async ({ page }) => {
  await page.goto("http://localhost:3000/studio");

  // Find the element you want to click
  const element = page.locator('a:has-text("Guide")');

  // Scroll the page to the element
  await element.scrollIntoViewIfNeeded();

  // Wait for the element to be fully visible
  await page.waitForSelector('a:has-text("Guide")', { state: "visible" });

  // Click on the element
  await element.click({ force: true });

  await expect(
    page.getByRole("button", { name: "Help Guide & Version" })
  ).toBeVisible();
});
