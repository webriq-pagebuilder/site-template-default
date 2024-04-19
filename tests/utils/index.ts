import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SANITY_STUDIO_URL } from "studio/config";

export function autologin_studio({ token, projectId }) {
  console.log("🚀 ~ autologin_studio ~ { token, projectId }:", {
    token,
    projectId,
  });

  window.localStorage.setItem(
    `__studio_auth_token_${projectId}`,
    JSON.stringify({
      token,
      time: "2024-03-11T07:00:27.633Z",
    })
  );
}

export async function clickVariantImage(page, variantIndex) {
  const imageSelector =
    variantIndex <= 0
      ? page.getByTestId("field-variant").getByRole("img").first()
      : page.getByTestId("field-variant").getByRole("img").nth(variantIndex);

  await imageSelector.click({ force: true });
}

export async function navigateToPage(page) {
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  // Find the element you want to click
  const element = page.locator('a:has-text("Pages")');
  // Scroll the page to the element
  await element.scrollIntoViewIfNeeded();
  // Wait for the element to be fully visible
  await page.waitForSelector('a:has-text("Pages")', { state: "visible" });
  // Click on the element
  await element.click({ force: true });
}

export async function createNewPage(page, sectionTitle, sections) {
  // Click new page button
  const newPageButtonElement = page.locator(
    `a[href="/studio/intent/create/template=page;type=page/"]`
  );
  await newPageButtonElement.click({ force: true });

  const inputTitle = page.locator("input#title");
  await page.waitForSelector("input#title", { state: "visible" });
  await inputTitle.click({ force: true });
  await inputTitle.fill(sectionTitle);

  await page.getByRole("button", { name: "Generate" }).click({ force: true });
  await page.getByRole("button", { name: "Add item…" }).click({ force: true });
  await page.getByRole("menuitem", { name: sections }).click({ force: true });
  await page
    .getByTestId("reference-input")
    .getByRole("button", { name: "Create new" })
    .click({ force: true });
}

export async function expectDocumentPublished(page, newPageTitle) {
  await expect(
    page
      .locator('[data-testid="review-changes-button"]')
      .filter({ hasText: "Just now" })
  ).toBeVisible({ timeout: 150000 });
  await page.getByTestId("action-Save").click({ force: true });
  await expect(
    page
      .locator('[id="__next"]')
      .getByRole("alert")
      .locator("div")
      .filter({ hasText: "The document was published" })
      .nth(1)
  ).toBeVisible({ timeout: 150000 });
  await page
    .getByRole("link", { name: "Close pane group" })
    .click({ force: true });
  await expect(
    page
      .getByTestId("field-sections")
      .getByTestId("input-validation-icon-error")
  ).toBeHidden({ timeout: 150000 });

  // Once the error is hidden, proceed with clicking the action
  await expect(
    page
      .locator('[id="__next"]')
      .getByRole("alert")
      .locator("div")
      .filter({ hasText: "The document was published" })
      .nth(1)
  ).toBeHidden({ timeout: 150000 });
  await page.getByTestId("action-[object Object]").click({ force: true });
  await expect(
    page
      .locator('[id="__next"]')
      .getByRole("alert")
      .locator("div")
      .filter({ hasText: "The document was published" })
      .nth(1)
  ).toBeVisible({ timeout: 150000 });
  await expect(
    page.getByRole("button", { name: "Last published just now" })
  ).toBeVisible({ timeout: 150000 });
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();
}

export async function deletePageVariant(page, pageTitle) {
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
  await expect(page.getByRole("link", { name: pageTitle })).toBeHidden({
    timeout: 150000,
  });
}

export async function updateLogoLink({ page }) {
  await page
    .getByTestId("field-variants.logo.alt")
    .getByTestId("string-input")
    .fill("App promo logo");
  await page
    .getByLabel("External, outside this website")
    .check({ force: true });
  await expect(page.getByLabel("URL")).toBeVisible();
  await page.getByLabel("URL").fill("https://webriq.com");
  await expect(
    page
      .getByTestId("field-variants.logo.linkTarget")
      .locator("div")
      .filter({ hasText: "Link Target" })
      .nth(3)
  ).toBeVisible();
  await page.getByLabel("Internal, inside this website").check({ force: true });
  await expect(page.getByTestId("autocomplete")).toBeVisible();
  await page.getByTestId("autocomplete").fill("New Page");
  await page
    .locator("button:has-text('New Page')")
    .first()
    .click({ force: true });
  await expect(
    page
      .getByTestId("field-variants.logo.linkTarget")
      .locator("div")
      .filter({ hasText: "Link Target" })
      .nth(3)
  ).toBeVisible();
}
