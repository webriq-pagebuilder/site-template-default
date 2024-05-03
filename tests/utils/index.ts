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

export const subtitleField = {
  async checkAndAddValue({ page, initialValue, commonFieldValues }) {
    const subtitle = page
      .getByTestId("field-variants.subtitle")
      .getByTestId("string-input");
    await expect(subtitle.inputValue()).resolves.toBe(initialValue.subtitle);
    await subtitle.click();
    await subtitle.press("Meta+a");
    await subtitle.fill(commonFieldValues?.subtitle);
    await expect(subtitle.inputValue()).resolves.toBe(
      commonFieldValues?.subtitle
    );
  },
  async sitePreview({ pageUrl, commonFieldValues }) {
    await expect(pageUrl.getByText(commonFieldValues?.subtitle)).toBeVisible();
  },
};

export const headingField = {
  async checkAndAddValue({ page, initialValue, commonFieldValues }) {
    const heading = page
      .getByTestId("field-variants.heading")
      .getByTestId("string-input");
    await expect(heading.inputValue()).resolves.toBe(initialValue.heading);
    await heading.click();
    await heading.press("Meta+a");
    await heading.fill(commonFieldValues?.heading);
    await expect(heading.inputValue()).resolves.toBe(
      commonFieldValues?.heading
    );
  },
  async sitePreview({ pageUrl, commonFieldValues }) {
    await expect(pageUrl.getByText(commonFieldValues.heading)).toBeVisible();
  },
};

export const titleField = {
  async checkAndAddValue({ page, initialValue, commonFieldValues }) {
    const title = page
      .getByTestId("field-variants.title")
      .getByTestId("string-input");
    await expect(title.inputValue()).resolves.toBe(initialValue.title);
    await title.click();
    await title.press("Meta+a");
    await title.fill(commonFieldValues?.title);
    await expect(title.inputValue()).resolves.toBe(commonFieldValues?.title);
  },
  async sitePreview({ pageUrl, commonFieldValues }) {
    await expect(
      pageUrl
        .getByRole("heading", {
          name: commonFieldValues?.title,
          exact: true,
        })
        .first()
    ).toBeVisible();
  },
};

export const descriptionField = {
  async checkAndAddValue({
    page,
    initialValue,
    placeholder,
    commonFieldValues,
  }) {
    const description = page.getByPlaceholder(placeholder);
    await expect(description.inputValue()).resolves.toBe(
      initialValue.description
    );
    await description.click();
    await description.press("Meta+a");
    await description.fill(commonFieldValues?.description);
    await expect(description.inputValue()).resolves.toBe(
      commonFieldValues?.description
    );
  },
  async sitePreview({ pageUrl, commonFieldValues }) {
    await expect(
      pageUrl.getByText(commonFieldValues?.description)
    ).toBeVisible();
  },
};

export const contactDetails = {
  async officeInput({ page, initialValue, commonFieldValues }) {
    const officeInfo = page
      .getByTestId("field-variants.officeInformation")
      .getByTestId("string-input");
    await expect(officeInfo.inputValue()).resolves.toBe(
      initialValue.officeInformation
    );
    await officeInfo.click();
    await officeInfo.press("Meta+a");
    await officeInfo.fill(commonFieldValues.office);
    await expect(officeInfo.inputValue()).resolves.toBe(
      commonFieldValues.office
    );
  },
  async emailInput({ page, initialValue, commonFieldValues }) {
    const email = page
      .getByTestId("field-variants.contactEmail")
      .getByTestId("string-input");
    await expect(email.inputValue()).resolves.toBe(initialValue.contactEmail);
    await email.click();
    await email.press("Meta+a");
    await email.fill(commonFieldValues.email);
    await expect(email.inputValue()).resolves.toBe(commonFieldValues.email);
  },
  async numberInfo({ page, initialValue, commonFieldValues }) {
    const number = page
      .getByTestId("field-variants.contactNumber")
      .getByTestId("string-input");
    await expect(number.inputValue()).resolves.toBe(initialValue.contactNumber);
    await number.click();
    await number.press("Meta+a");
    await number.fill(commonFieldValues.number);
    await expect(number.inputValue()).resolves.toBe(commonFieldValues.number);
  },
  async sitePreview({ pageUrl, commonFieldValues }) {
    await expect(pageUrl.getByText(commonFieldValues?.office)).toBeVisible({
      timeout: 180_000,
    });
    await expect(
      pageUrl.getByRole("link", { name: commonFieldValues?.email })
    ).toBeVisible({ timeout: 180_000 });
    await expect(
      pageUrl.getByRole("link", { name: commonFieldValues?.number })
    ).toBeVisible({ timeout: 180_000 });
  },
};

export const socialLinks = {
  async fillSocialMediaLink({ page, socialPlatform, link }) {
    await page.getByRole("button", { name: socialPlatform }).click();
    await page.getByLabel("Social Media Link").click();
    await page.getByLabel("Social Media Link").press("Meta+a");
    await page.getByLabel("Social Media Link").fill(link);
    await page.getByLabel("Close dialog").click();
  },
  async checkAndAddValues({ page, initialValue, commonFieldValues }) {
    await expect(
      page
        .getByTestId("field-variants.socialLinks")
        .locator("div")
        .filter({ hasText: "Social Links" })
        .nth(3)
    ).toBeVisible();

    const socialPlatforms = ["facebook", "twitter", "instagram"];
    const fillPromises = socialPlatforms.map((social) => {
      const linkValue = commonFieldValues[social];
      return this.fillSocialMediaLink({ page, social, linkValue });
    });

    try {
      await Promise.all(fillPromises);
    } catch (error) {
      console.error("Failed to fill social media links:", error);
    }
  },
  async sitePreview({ pageUrl, commonFieldValues }) {
    await expect(pageUrl.getByLabel("facebook")).toBeVisible();
    expect(pageUrl.locator(`a[href=${commonFieldValues?.facebook}]`));
    await expect(pageUrl.getByLabel("twitter")).toBeVisible();
    expect(pageUrl.locator(`a[href=${commonFieldValues?.twitter}]`));
    await expect(pageUrl.getByLabel("instagram")).toBeVisible();
    expect(pageUrl.locator(`a[href=${commonFieldValues?.instagram}]`));
  },
};

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

export async function expectDocumentPublished(page, pageTitle) {
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
  ).toBeVisible({ timeout: 150_000 });
  await page
    .getByRole("link", { name: "Close pane group" })
    .click({ force: true });
  await expect(
    page
      .getByTestId("field-sections")
      .getByTestId("input-validation-icon-error")
  ).toBeHidden({ timeout: 150_000 });

  // Once the error is hidden, proceed with clicking the action
  await expect(
    page
      .locator('[id="__next"]')
      .getByRole("alert")
      .locator("div")
      .filter({ hasText: "The document was published" })
      .nth(1)
  ).toBeHidden({ timeout: 150_000 });
  await page.getByTestId("action-[object Object]").click({ force: true });
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
  await expect(page.getByRole("link", { name: pageTitle })).toBeVisible();
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
  await page.waitForTimeout(2_000);
  await page.getByTestId("action-[object Object]").click({ force: true });
  await expect(
    page.getByTestId("review-changes-button").filter({ hasText: "Just now" })
  ).toBeHidden();
  // await expect(
  //   page
  //     .locator('[id="__next"]')
  //     .getByRole("alert")
  //     .locator("div")
  //     .filter({ hasText: "The document was published" })
  //     .nth(1)
  // ).toBeVisible({ timeout: 150_000 });
  await expect(
    page.getByRole("button", { name: "Last published just now" })
  ).toBeVisible({ timeout: 150_000 });

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

export async function assertInternalUrl(page, expectedUrlBase) {
  const expectedUrl = expectedUrlBase.endsWith("/")
    ? expectedUrlBase
    : `${expectedUrlBase}/`;
  const receivedUrl = page.url().endsWith("/") ? page.url() : `${page.url()}/`;
  await expect(receivedUrl).toBe(expectedUrl);
}

export async function assertExternalUrl(page, expectedUrlBase) {
  const normalizationPattern = "https://www.";

  const normalizedExpectedUrl = expectedUrlBase.endsWith("/")
    ? expectedUrlBase
    : `${expectedUrlBase}/`;

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
  await expect(
    page.getByLabel("Internal, inside this website").first()
  ).toBeChecked();

  await page
    .getByLabel("External, outside this website")
    .first()
    .click({ force: true });
  await expect(page.getByLabel("URL")).toBeVisible();
  await page.getByLabel("URL").fill("https://webriq.com");
  await expect(
    page.getByLabel("Self (default) - open in the").first()
  ).toBeChecked();
  await page.getByLabel("Blank - open on a new tab (").click();
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
  hasRequiredCheckbox = false,
}) {
  formFields?.forEach(async (field) => {
    console.log("[INFO] form values: ", field);

    const fieldElement = await pageUrl.getByPlaceholder(field.placeholder, {
      exact: true,
    });
    await fieldElement.click({ force: true });
    await fieldElement.press("Meta+a");
    await fieldElement.fill(field.value);
  });

  if (hasRequiredCheckbox) {
    // Contact variant A
    await page
      .getByLabel("Agree to terms")
      .check({ force: true, timeout: 180_000 });
  }

  await pageUrl.getByLabel(submitBtnLabel).click({ force: true });
  await expect(pageUrl.getByText("Sending form data...")).toBeVisible({
    timeout: 180_000,
  });
  await expect(pageUrl.getByText("✔ Successfully sent form data")).toBeVisible(
    { timeout: 180_000 }
  );

  await page.goto(thankYouPageUrl ?? `${NEXT_PUBLIC_SITE_URL}/thank-you`);
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
