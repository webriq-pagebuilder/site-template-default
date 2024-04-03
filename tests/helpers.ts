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
  const newPageButtonElement = page.locator(`a[href="/studio/intent/create/template=page;type=page/"]`);
  await newPageButtonElement.click({ force: true });

  const inputTitle = page.locator("input#title");
  await page.waitForSelector("input#title", { state: "visible" });
  await inputTitle.click({ force: true });
  await inputTitle.fill(sectionTitle);

  await page.getByRole("button", { name: "Generate" }).click({ force: true });
  await page.getByRole("button", { name: "Add item…" }).click({ force: true });
  await page.getByRole("menuitem", { name: sections }).click({ force: true });
  await page.getByTestId("reference-input").getByRole("button", { name: "Create new" }).click({ force: true });
}

// TODO: Bottlenecks in alert, sometimes it will be error, sometimes working.
export async function expectDocumentPublished(page) {
  await page.getByTestId("action-Save").click({ force: true });
  await expect(page.locator('[id="__next"]').getByRole('alert').locator('div').filter({ hasText: 'The document was published' }).nth(1)).toBeVisible({ timeout: 75000 });
  await page.getByRole("link", { name: "Close pane group" }).click({ force: true });
  await expect(page.getByTestId("field-sections").getByTestId("input-validation-icon-error")).toBeHidden({ timeout: 75000 });

  // Once the error is hidden, proceed with clicking the action
  await page.getByTestId("action-[object Object]").click({ force: true });
  await expect(page.locator('[id="__next"]').getByRole('alert').locator('div').filter({ hasText: 'The document was published' }).nth(1)).toBeVisible({ timeout: 75000 });
  await expect(page.getByTestId('review-changes-button')).toBeHidden({ timeout: 75000 })
}