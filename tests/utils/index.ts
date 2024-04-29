import { expect } from "@playwright/test";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import { nanoid } from "nanoid";

export const newPageTitle = (text = "New Page") => {
  let title: string;

  const uniqueKey = nanoid(4);
  title = text + uniqueKey;

  return title;
};

export async function beforeEachTest(
  page,
  title,
  componentName,
  componentLabel,
  variantIndex
) {
  await navigateToPage(page);
  await createNewPage(page, title, componentName);
  await variantLabelInput(page, componentLabel);
  await clickVariantImage(page, variantIndex);
}

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

export async function variantLabelInput(page, variantLabel) {
  await page
    .getByTestId("field-label")
    .getByTestId("string-input")
    .click({ force: true });
  await page
    .getByTestId("field-label")
    .getByTestId("string-input")
    .fill(variantLabel);
}

export async function titleFieldInput(page, title) {
  await page
    .getByTestId("field-variants.title")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.title")
    .getByTestId("string-input")
    .fill(title);
}

export async function subtitleFieldInput(page, subtitle) {
  await page
    .getByTestId("field-variants.subtitle")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.subtitle")
    .getByTestId("string-input")
    .fill(subtitle);
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

export async function deletePageVariant(page, pageTitle, variantLabel) {
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
  await page.getByRole("link", { name: variantLabel }).click();
  await page.getByRole("button", { name: pageTitle }).click();
  await page.getByTestId("field-sections").getByRole("button").nth(1).click();

  //Remove section
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
  await page.getByTestId("action-[object Object]").click({ force: true });
  await expect(
    page.getByTestId("review-changes-button").filter({ hasText: "Just now" })
  ).toBeHidden();
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

  //Delete Component Variant
  await page.getByRole("button", { name: variantLabel }).click();
  await expect(page.getByTestId("reference-changed-banner")).toBeVisible();
  await page.getByRole("button", { name: "Open document actions" }).click();
  await page.getByTestId("action-Delete").click();
  await expect(page.getByText("Looking for referring")).toBeHidden();
  await expect(page.getByLabel("Delete document?")).toBeVisible();
  await page.getByTestId("confirm-delete-button").click();
  await expect(
    page
      .locator('[id="__next"]')
      .getByRole("alert")
      .locator("div")
      .filter({ hasText: "The document was successfully" })
      .nth(1)
  ).toBeVisible();

  //Delete Page
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

export async function verifyInternalUrl(page, expectedUrlBase) {
  const expectedUrl = expectedUrlBase.endsWith("/")
    ? expectedUrlBase
    : `${expectedUrlBase}/`;
  const receivedUrl = page.url().endsWith("/") ? page.url() : `${page.url()}/`;
  await expect(receivedUrl).toBe(expectedUrl);
}

export async function verifyExternalUrl(page, externalLinkUrl) {
  const normalizationPattern = "https://www.";

  const normalizedExpectedUrl = externalLinkUrl.endsWith("/")
    ? externalLinkUrl
    : `${externalLinkUrl}/`;

  const normalizedReceivedUrl = page.url().endsWith("/")
    ? page.url()
    : `${page.url()}/`;

  // Remove normalization pattern if present
  const adjustedNormalizedExpectedUrl = normalizedExpectedUrl.replace(
    normalizationPattern,
    "https://"
  );
  const adjustedNormalizedReceivedUrl = normalizedReceivedUrl.replace(
    normalizationPattern,
    "https://"
  );

  await expect(adjustedNormalizedReceivedUrl).toBe(
    adjustedNormalizedExpectedUrl
  );
}

export async function updateLogoLink(page, altText) {
  await page
    .getByTestId("field-variants.logo.alt")
    .getByTestId("string-input")
    .fill(altText);
  await expect(page.getByLabel("Internal, inside this website")).toBeChecked();
  await page
    .getByLabel("External, outside this website")
    .check({ force: true });
  await expect(page.getByLabel("URL")).toBeVisible();
  await page.getByLabel("URL").fill("https://webriq.com");
  await expect(page.getByLabel("Self (default) - open in the")).toBeChecked();
  await page.getByLabel("Blank - open on a new tab (").check();
}

export async function generateFormId({ page }) {
  const currentPageUrl = await page.evaluate(() => document.location.href);
  await page
    .getByRole("button", { name: "Generate ID" })
    .click({ force: true });
  expect(page.getByLabel("Form ID")).not.toBeUndefined();
  await expect(page.getByRole("button", { name: "Generate ID" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Manage" })).toBeVisible();
  await page.getByRole("link", { name: "Manage" }).click();

  const pagePromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Manage" }).click();

  const activePage = await pagePromise;
  await activePage.locator('input[name="name"]').click();
  await activePage.locator('input[name="name"]').press("Meta+a");
  await activePage.locator('input[name="name"]').fill("Test WebriQ Form");
  await activePage
    .locator('input[name="notifications\\[email\\]\\[to\\]"]')
    .click();
  await activePage
    .locator('input[name="notifications\\[email\\]\\[to\\]"]')
    .fill(
      "mariel.filosopo@webriq.services,roseller.enriquez@webriq.services,dorelljames@webriq.com"
    );
  await activePage.locator('input[name="testUrls"]').click();
  await activePage.locator('input[name="testUrls"]').fill(NEXT_PUBLIC_SITE_URL);
  await activePage.getByRole("button", { name: "Update" }).click();
  await expect(
    activePage.getByText("Successfully updated form!")
  ).toBeVisible();
  await activePage.goto(currentPageUrl);
}

export async function checkFormSubmission({
  page,
  pageUrl,
  formFields,
  submitBtnLabel,
  thankYouPageUrl,
}) {
  Promise.allSettled(
    formFields?.map(async (fields) => {
      await pageUrl.getByPlaceholder(fields.placeholder).click();
      await pageUrl.getByPlaceholder(fields.placeholder).fill(fields.value);
    })
  ).then(async (response) => {
    console.log("[INFO] Test has been run", response);

    await pageUrl.getByLabel(submitBtnLabel).click();
    await expect(pageUrl.getByText("Sending form data...")).toBeVisible();
    await expect(
      pageUrl.getByText("✔ Successfully sent form data")
    ).toBeVisible({ timeout: 60000 });

    await page.goto(thankYouPageUrl ?? `${NEXT_PUBLIC_SITE_URL}/thank-you`);
  });
}

export async function CTAWebriQForm({
  page,
  hasOtherLinks,
  initialValues,
  formButtonLabel,
}) {
  await generateFormId({ page });

  // check CTA form initial fields
  await expect(
    page.getByRole("button", {
      name: initialValues.form.fields?.[0]?.name,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: initialValues.form.fields?.[1]?.name,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: initialValues.form.fields?.[2]?.name,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: initialValues.form.fields?.[3]?.name,
    })
  ).toBeVisible();
  // TODO: edit a single form field to test if we can update the fields array

  // CTA form button label
  await expect(
    page
      .getByTestId("field-variants.form.buttonLabel")
      .getByTestId("string-input")
  ).toHaveValue(initialValues.form.buttonLabel);
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .fill("Meta+a");
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .fill(formButtonLabel);

  // CTA form thank you page link
  await page
    .getByRole("button", { name: "Thank You page" })
    .click({ force: true });
  await page
    .getByLabel("External, outside this website")
    .check({ force: true });
  await expect(page.getByLabel("URL")).toBeVisible();
  await page.getByLabel("URL").fill("https://webriq.com");
  await expect(page.getByText("Link Target")).toBeVisible();

  // CTA Sign in links + form links
  if (hasOtherLinks) {
    await expect(
      page
        .getByTestId("field-variants.signInLink.linkType")
        .getByLabel("Internal, inside this website")
    ).toBeChecked();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Page Reference$/ })
        .nth(1)
    ).toBeVisible();
    await page.getByTestId("autocomplete").click();
    await page
      .getByTestId("field-variants.signInLink.linkType")
      .getByLabel("External, outside this website")
      .check();
    await expect(
      page
        .getByTestId("field-variants.signInLink.linkExternal")
        .getByLabel("URL")
    ).toBeVisible();
    await page.getByLabel("URL").fill("https://webriq.com");
    await expect(
      page
        .getByTestId("field-variants.signInLink.linkTarget")
        .getByLabel("Self (default) - open in the")
    ).toBeChecked();

    // CTA form links
    await expect(
      page.getByRole("button", { name: "Police privacy Internal Link" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Terms of Use Internal Link" })
    ).toBeVisible();
  }
}
