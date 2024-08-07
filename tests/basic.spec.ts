import { test, expect } from "@playwright/test";
import {
  createNewPage,
  createSlug,
  deletePageVariant,
  expectDocumentPublished,
  navigateToPages,
  newPageTitle,
} from "./utils/index";

const pageTitle = newPageTitle("New Page ");
const duplicatePageName = `Dupe Page ` + new Date().getTime();
const variantLabel = "Navigation New Page Variant A";

test.describe("Main Workflow", () => {
  test.describe.configure({ timeout: 900000, mode: "serial" });

  //PUBLISH PAGES
  test("Test to Publish a Page and Open Live URL", async ({
    page,
    baseURL,
  }) => {
    console.log(`[INFO] ~ Testing Publish Page 🚀`);
    await navigateToPages(page);
    await createNewPage(page, pageTitle, "Navigation");

    await page
      .getByTestId("field-label")
      .getByTestId("string-input")
      .click({ force: true });
    await page
      .getByTestId("field-label")
      .getByTestId("string-input")
      .fill(variantLabel);

    await page
      .getByTestId("field-variant")
      .getByRole("img")
      .first()
      .click({ force: true });

    await expectDocumentPublished(page, pageTitle);
    await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
    page.waitForLoadState("domcontentloaded");

    // Wait for the element to become visible or hidden with a longer timeout
    const sectionCount = await page
      .locator("div")
      .filter({ hasText: /^No items$/ })
      .count();
    if (sectionCount > 0) {
      // If the section is found, expect the Empty Page element to be visible
      await expect(page.getByText("Empty Page")).toBeVisible();
    } else {
      // If the section is not found, expect the Empty Page element to be hidden
      await expect(page.getByText("Empty Page")).toBeHidden();
    }

    console.log(`[DONE] - Testing Publish Page 🚀`);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== "passed") {
      await deletePageVariant(page, pageTitle, variantLabel);
    }
  });

  //Duplicate Pages Action
  test("Pages Duplicate Action and Open Live URL", async ({
    page,
    baseURL,
  }) => {
    console.log(`[INFO] - Testing Duplicate Page 🚀`);
    await navigateToPages(page);

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
    await page.waitForSelector('text="Duplicate page content"', {
      state: "visible",
    });
    await page.locator(`input[placeholder="Copy of ${pageTitle}"]`).click();
    await page
      .locator(`input[placeholder="Copy of ${pageTitle}"]`)
      .fill(duplicatePageName);

    //duplicate variant
    await page.getByLabel(`New Copy for ${variantLabel}`).click();
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

    const publishButton = page.locator('button:has-text("Publish")');
    await expect(publishButton).toHaveAttribute("data-disabled", "false");
    await publishButton.click();

    await expect(page.getByTestId("review-changes-button")).toBeHidden();
    await expect(
      page
        .locator('[id="__next"]')
        .getByRole("alert")
        .locator("div")
        .filter({ hasText: "The document was published" })
        .nth(1)
    ).toBeVisible();

    //Open Live URL
    await page.goto(`${baseURL}/${createSlug(duplicatePageName)}`);
    page.waitForLoadState("domcontentloaded");

    // If the section is not found, expect the Empty Page element to be hidden
    await expect(page.getByText("Empty Page")).toBeHidden();

    console.log(`[DONE] Testing Duplicate Page 🚀`);
  });

  //Launch Inline Editing - Edit and Close button function
  test("Open Inline Editing and Edit Texts should display in realtime", async ({
    page,
  }) => {
    console.log(`[INFO] - Testing Inline Edit Text 🚀`);
    await navigateToPages(page);
    await page.getByPlaceholder("Search list").click({ force: true });
    await page.getByPlaceholder("Search list").fill(pageTitle);
    await page.waitForSelector(`a:has-text("${pageTitle}")`, {
      state: "visible",
    });

    let variantLabelVisible = false;
    let variantClicks = 0;

    while (!variantLabelVisible && variantClicks <= 5) {
      await page.getByRole("link", { name: pageTitle }).click({ force: true });
      await expect(page.getByText("Loading document")).toBeHidden();

      try {
        await expect(
          page.getByRole("link", { name: variantLabel })
        ).toBeVisible();

        variantLabelVisible = true;
      } catch (error) {
        console.error("Variant Label not visible, retrying...", error);
      }

      variantClicks++;
    }

    const launchInlineEditing = page.waitForEvent("popup");
    await page.getByLabel("Launch Inline Editing").click();
    const inlineEditPage = await launchInlineEditing;
    await expect(inlineEditPage.getByText("Loading...")).toBeVisible();
    await expect(inlineEditPage.getByText("Loading...")).toBeHidden();

    let attempts = 0;
    let maxTries = 5;

    while (attempts <= maxTries) {
      const unhandledRuntimeError = inlineEditPage.locator(
        'h1:has-text("Unhandled Runtime Error")'
      );
      const isErrorVisible = await unhandledRuntimeError.isVisible();

      if (isErrorVisible) {
        attempts++;
        console.warn(
          "Unhandled Runtime Error detected, reloading... (attempt",
          attempts,
          ")"
        );

        await inlineEditPage.reload();
      } else {
        break;
      }
    }

    if (attempts === maxTries) {
      console.error(
        "Failed to close Unhandled Runtime Error after",
        maxTries,
        "attempts."
      );
    }

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
    ).toBeVisible();
    await inlineEditPage.getByTestId("action-Save").click({ force: true });
    await expect(
      inlineEditPage.getByTestId("review-changes-button")
    ).toBeHidden();
    await expect(
      inlineEditPage
        .locator('[id="__next"]')
        .getByRole("alert")
        .locator("div")
        .filter({ hasText: "The document was published" })
        .nth(1)
    ).toBeVisible();

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

    console.log(`[DONE] - Testing Inline Edit Text 🚀`);
  });

  test("Test with no Section should display Empty Page", async ({
    page,
    baseURL,
  }) => {
    console.log(
      `[INFO] - Testing Page with no Section should display empty page 🚀`
    );
    await navigateToPages(page);
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

    await expect(page.getByText("Loading document")).toBeHidden();
    await expect(page.getByRole("link", { name: variantLabel })).toBeVisible();
    await page.getByRole("link", { name: variantLabel }).click();
    await page.getByRole("button", { name: pageTitle }).click();
    await page.getByTestId("field-sections").getByRole("button").nth(1).click();

    //Remove section
    await expect(page.getByRole("menuitem", { name: "Remove" })).toBeVisible();
    await page.getByRole("menuitem", { name: "Remove" }).click();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^No items$/ })
        .nth(3)
    ).toBeVisible();

    //Publish with no referenced section to delete the component variant
    await expect(
      page.getByTestId("review-changes-button").filter({ hasText: "Just now" })
    ).toBeVisible();
    await expect(page.locator('a[target="_blank"]')).toHaveCSS(
      "color",
      "rgb(149, 130, 40)"
    );

    const publishButton = page.locator('button:has-text("Publish")');
    let publishedCSS = false;
    let clicks = 0;

    while (!publishedCSS && clicks <= 5) {
      await expect(publishButton).toHaveAttribute("data-disabled", "false");
      await publishButton.click();

      await expect(page.locator('a[target="_blank"]')).toHaveCSS(
        "color",
        "rgb(49, 151, 94)"
      );
      publishedCSS = true;

      clicks++;
    }

    await expect(page.locator('a[target="_blank"]')).toHaveCSS(
      "color",
      "rgb(49, 151, 94)"
    );

    //Delete Component Variant
    await page.getByRole("button", { name: variantLabel }).click();
    await expect(page.getByTestId("reference-changed-banner")).toBeVisible();
    await page.getByRole("button", { name: "Open document actions" }).click();
    await expect(page.getByTestId("action-Delete")).toBeVisible();
    await page.getByTestId("action-Delete").click();
    await expect(page.getByText("Looking for referring")).toBeHidden();
    await expect(page.getByLabel("Delete document?")).toBeVisible();
    await page.getByTestId("confirm-delete-button").click();
    await expect(
      page.getByTestId("document-panel-scroller").nth(1)
    ).toBeHidden();

    await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
    page.waitForLoadState("domcontentloaded");

    // Wait for the element to become visible or hidden with a longer timeout
    const sectionCount = await page
      .locator("div")
      .filter({ hasText: /^No items$/ })
      .count();
    if (sectionCount > 0) {
      // If the section no items is found, expect the Empty Page element to be visible
      await expect(page.getByText("Empty Page"))
        .toBeVisible()
        .then(() => console.log("There is no Available Content!"));
    }

    console.log(`[DONE] Page with no Section should display empty page 🚀`);
  });

  test("Delete Published Page", async ({ page }) => {
    console.log(`[INFO] - Testing Delete Published Page 🚀`);
    await deletePublishedPage(page);
    console.log(`[DONE] Delete Published Page 🚀`);
  });

  test("Delete Duplicate Page", async ({ page }) => {
    console.log(`[INFO] - Testing Delete Duplicate Page 🚀`);
    await deletePageVariant(page, duplicatePageName, `Copy of ${variantLabel}`);
    console.log(`[DONE] Delete Duplicate Page  🚀`);
  });
});

//SEE CURRENT VERSION
test("See Current Version", async ({ page }) => {
  console.log(`[INFO] - Testing See Current Version 🚀`);
  await page.goto("./studio");

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

  console.log(`[DONE] See Current Version 🚀`);
});

async function deletePublishedPage(page) {
  await navigateToPages(page);
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
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^No items$/ })
      .nth(3)
  ).toBeVisible();

  //Delete Page
  await page.locator('button[data-testid="action-menu-button"]').click();
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
  await expect(page.getByRole("link", { name: pageTitle })).toBeHidden();
}
