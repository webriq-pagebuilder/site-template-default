import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { customAlphabet } from "nanoid";

export const newPageTitle = (text = "New Page") => {
  let title: string;

  const uniqueKey =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nanoid = customAlphabet(uniqueKey, 4);

  title = text + nanoid();

  return title;
};

export const launchPreview = async ({ page, baseURL, pageTitle }) => {
  await page.goto(
    `${baseURL}/api/preview?secret=${
      process.env.NEXT_PUBLIC_PREVIEW_SECRET
    }&slug=${createSlug(pageTitle)}`
  );
  await page.waitForLoadState("domcontentloaded");
};

export const createSlug = (pageTitle: string) => {
  let slug: string;

  slug = pageTitle?.toLowerCase()?.replace(/\s+/g, "-").replace(/-+/g, "-");
  return slug;
};

export async function beforeEachTest(
  page,
  title,
  componentName,
  componentLabel,
  variantIndex
) {
  await navigateToPages(page);
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
    await expect(subtitle).toBeVisible();
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
    await expect(heading).toBeVisible();
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
    await expect(title).toBeVisible();
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
    await expect(description).toBeVisible();
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
    await expect(officeInfo).toBeVisible();
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
    await expect(email).toBeVisible();
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
    await expect(number).toBeVisible();
    await expect(number.inputValue()).resolves.toBe(initialValue.contactNumber);
    await number.click();
    await number.press("Meta+a");
    await number.fill(commonFieldValues.number);
    await expect(number.inputValue()).resolves.toBe(commonFieldValues.number);
  },
  async sitePreview({ pageUrl, commonFieldValues }) {
    await expect(pageUrl.getByText(commonFieldValues?.office)).toBeVisible();
    await expect(
      pageUrl.getByRole("link", { name: commonFieldValues?.email })
    ).toBeVisible();
    await expect(
      pageUrl.getByRole("link", { name: commonFieldValues?.number })
    ).toBeVisible();
  },
};

export const socialLinks = {
  async fillSocialMediaLink({ page, socialPlatform, link }) {
    await page.getByRole("button", { name: socialPlatform }).click();
    await page.getByLabel("Social Media Link").click();
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
    await page.getByRole("button", { name: "facebook" }).click();
    await page.getByLabel("Social Media Link").click();
    await page.getByLabel("Social Media Link").press("Meta+a");
    await page
      .getByLabel("Social Media Link")
      .fill(commonFieldValues?.facebook);
    await page.getByLabel("Close dialog").click();
    await page.getByRole("button", { name: "twitter" }).click();
    await page.getByLabel("Social Media Link").click();
    await page.getByLabel("Social Media Link").press("Meta+a");
    await page.getByLabel("Social Media Link").fill(commonFieldValues?.twitter);
    await page.getByLabel("Close dialog").click();
    await page.getByRole("button", { name: "instagram" }).click();
    await page.getByLabel("Social Media Link").click();
    await page.getByLabel("Social Media Link").press("Meta+a");
    await page
      .getByLabel("Social Media Link")
      .fill(commonFieldValues?.instagram);
    await page.getByLabel("Close dialog").click();
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

export async function navigateToPages(page) {
  await page.goto(`./studio`);

  // Find the element you want to click
  const element = page.locator('a:has-text("Pages")');
  // Scroll the page to the element
  await element.scrollIntoViewIfNeeded();
  // Wait for the element to be fully visible
  await page.waitForSelector('a:has-text("Pages")', { state: "visible" });
  // Click on the element
  await element.click({ force: true });
  await expect(page.locator('p:has-text("Loading...")')).toBeHidden();
}

export async function searchForName(page, { name }) {
  await page.getByPlaceholder("Search list").click();

  await page.getByPlaceholder("Search list").fill(name);
}

export async function navigateToStore(page) {
  await page.goto(`./studio`);

  const element = page.locator('a:has-text("Store")');
  await element.scrollIntoViewIfNeeded();
  await page.waitForSelector('a:has-text("Store")', { state: "visible" });
  await element.click({ force: true });
}

export async function createNewPage(page, sectionTitle, sections) {
  // Click new page button
  const newPageButtonElement = `a[href="/studio/intent/create/template=page;type=page/"]`;
  await page.waitForSelector(newPageButtonElement, { state: "visible" });

  const button = await page.locator(newPageButtonElement);

  // Check for disabled attribute using data-disabled
  if (await button.evaluate((el) => el.dataset.disabled === "true")) {
    console.warn("Create new page button is disabled, reloading...");
    await page.reload();
  }

  await page.locator(newPageButtonElement).click({ force: true });

  const inputTitle = page.locator("input#title");
  await expect(page.locator('p:has-text("Loading...")')).toBeHidden();
  await page.waitForSelector("input#title", { state: "visible" });
  await inputTitle.click({ force: true });
  await inputTitle.fill(sectionTitle);

  await page.getByRole("button", { name: "Generate" }).click({ force: true });
  await page.getByRole("button", { name: "Add item…" }).click({ force: true });

  if (sections) {
    await expect(page.getByRole("menuitem", { name: sections })).toBeVisible();
    await page.getByRole("menuitem", { name: sections }).click({ force: true });
    await expect(
      page
        .getByTestId("reference-input")
        .getByRole("button", { name: "Create new" })
    ).toBeVisible();
    await page
      .getByTestId("reference-input")
      .getByRole("button", { name: "Create new" })
      .click({ force: true });
  }
}

export async function publishDocument(page) {
  await expect(
    page
      .locator('[data-testid="review-changes-button"]')
      .filter({ hasText: "Just now" })
  ).toBeVisible();
  await expect(page.locator('button:has-text("Publish")')).toBeVisible();
  await page.getByTestId("action-[object Object]").click({ force: true });
  await expect(
    page
      .locator('[id="__next"]')
      .getByRole("alert")
      .locator("div")
      .filter({ hasText: "The document was published" })
      .nth(1)
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Last published just now" })
  ).toBeVisible();
}

export async function deleteDocument(page) {
  await expect(page.getByTestId("document-panel-scroller").nth(1)).toBeHidden();
  await expect(
    page.locator('button[data-testid="action-menu-button"]')
  ).toBeVisible();
  await page.locator('button[data-testid="action-menu-button"]').click();
  await page.getByTestId("action-Delete").click();
  await expect(page.getByText("Delete document?")).toBeVisible();
  await expect(
    page.getByTestId("loading-container").getByRole("img")
  ).toBeVisible();
  await page.getByTestId("confirm-delete-button").click();
  await expect(
    page.getByTestId("document-panel-scroller").first()
  ).toBeHidden();
  await expect(
    page
      .locator('[id="__next"]')
      .getByRole("alert")
      .locator("div")
      .filter({ hasText: "The document was successfully" })
      .nth(1)
  ).toBeVisible();
}

export async function expectDocumentPublished(page, pageTitle) {
  await expect(
    page
      .locator('[data-testid="review-changes-button"]')
      .filter({ hasText: "Just now" })
  ).toBeVisible();

  const saveButton = page.locator('button:has-text("Save")');
  let isSaved = false;
  let saveBtnClicks = 0;

  await expect(saveButton).toBeVisible();
  while (!isSaved && saveBtnClicks <= 5) {
    await expect(saveButton).toHaveAttribute("data-disabled", "false");
    await saveButton.click();

    try {
      await expect(
        page
          .locator('[data-testid="review-changes-button"]')
          .filter({ hasText: "Just now" })
      ).toBeHidden();
      await expect(saveButton).toHaveAttribute("data-disabled", "true");

      isSaved = true;
    } catch (error) {
      console.error("Publish check failed, retrying... ", saveBtnClicks);
    }

    saveBtnClicks++;
  }

  await expect(saveButton).toHaveAttribute("data-disabled", "true");

  try {
    await page
      .getByRole("link", { name: "Close pane group" })
      .click({ force: true });
    await expect(saveButton).toBeHidden();
  } catch (error) {
    console.warn("Save button is still visible, click close button again...");
    await page
      .getByRole("link", { name: "Close pane group" })
      .click({ force: true });
    await expect(saveButton).toBeHidden();
  }

  await expect(
    page
      .getByTestId("field-sections")
      .getByTestId("input-validation-icon-error")
  ).toBeHidden();

  // Once the error is hidden, proceed with clicking the action
  await expect(
    page
      .locator('[id="__next"]')
      .getByRole("alert")
      .locator("div")
      .filter({ hasText: "The document was published" })
      .nth(1)
  ).toBeHidden();

  await page.waitForSelector('a[target="_blank"]', { state: "visible" });
  await expect(page.locator('a[target="_blank"]')).toHaveCSS(
    "color",
    "rgb(149, 130, 40)"
  );

  const publishButton = page.locator('button:has-text("Publish")');
  let isPublished = false;
  let clicks = 0;

  await expect(publishButton).toBeVisible();

  while (!isPublished && clicks <= 5) {
    await expect(publishButton).toHaveAttribute("data-disabled", "false");
    await publishButton.click();

    try {
      await expect(
        page
          .locator('[data-testid="review-changes-button"]')
          .filter({ hasText: "Just now" })
      ).toBeHidden();
      await expect(publishButton).toHaveAttribute("data-disabled", "true");

      isPublished = true;
    } catch (error) {
      console.error("Publish check failed, retrying... ", clicks);
    }

    clicks++;
  }

  await expect(page.locator('a[target="_blank"]')).toHaveCSS(
    "color",
    "rgb(49, 151, 94)"
  );
}

export async function deletePageVariant(page, pageTitle, variantLabel) {
  await navigateToPages(page);

  await page.waitForSelector('input[placeholder="Search list"]', {
    visible: true,
  });
  await page.getByPlaceholder("Search list").click({ force: true });
  await page.getByPlaceholder("Search list").fill(pageTitle);
  await page.waitForSelector(`a:has-text("${pageTitle}")`, {
    state: "visible",
  });

  let variantLabelVisible = false;
  let variantClicks = 0;

  while (!variantLabelVisible && variantClicks <= 5) {
    await expect(page.locator(`a:has-text("${pageTitle}")`)).toBeVisible();
    await page.locator(`a:has-text("${pageTitle}")`).click({ force: true });

    await expect(page.getByText("Loading document")).toBeHidden();

    try {
      await expect(
        page.getByRole("link", { name: variantLabel })
      ).toBeVisible();

      variantLabelVisible = true;
    } catch (error) {
      console.error("Variant Label not visible, retrying...", variantClicks);
    }

    variantClicks++;
  }

  await page.getByLabel("Clear").click({ force: true });
  await page.getByRole("link", { name: variantLabel }).click();
  await page.getByRole("button", { name: pageTitle }).click();

  //Remove section
  try {
    await page.getByTestId("field-sections").getByRole("button").nth(1).click();
    await page.waitForSelector('button[role="menuitem"]:has-text("Remove")', {
      state: "visible",
    });
  } catch (error) {
    console.warn("Remove menu item is not visible, clicking button again...");
    await page.getByTestId("field-sections").getByRole("button").nth(1).click();
    await page.waitForSelector('button[role="menuitem"]:has-text("Remove")', {
      state: "visible",
    });
  }
  await expect(page.getByRole("menuitem", { name: "Remove" })).toBeVisible();

  try {
    await page.getByRole("menuitem", { name: "Remove" }).click();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^No items$/ })
        .nth(3)
    ).toBeVisible();
  } catch (error) {
    console.warn(
      "No items in section is not visible, clicking remove again..."
    );
    await page.getByRole("menuitem", { name: "Remove" }).click();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^No items$/ })
        .nth(3)
    ).toBeVisible();
  }

  //Publish with no referenced section to delete the component variant
  await page.waitForSelector('a[target="_blank"]', { state: "visible" });
  await expect(page.locator('a[target="_blank"]')).toHaveCSS(
    "color",
    "rgb(149, 130, 40)"
  );

  const publishButton = page.locator('button:has-text("Publish")');
  let isPublished = false;
  let clicks = 0;

  while (!isPublished && clicks <= 5) {
    await expect(publishButton).toHaveAttribute("data-disabled", "false");
    await publishButton.click();

    try {
      await expect(
        page
          .locator('[data-testid="review-changes-button"]')
          .filter({ hasText: "Just now" })
      ).toBeHidden();
      await expect(publishButton).toHaveAttribute("data-disabled", "true");

      isPublished = true;
    } catch (error) {
      console.error("Publish check failed, retrying...", clicks);
    }

    clicks++;
  }

  await expect(page.locator('a[target="_blank"]')).toHaveCSS(
    "color",
    "rgb(49, 151, 94)"
  );

  //Delete Component Variant
  await page.getByRole("button", { name: variantLabel }).click();
  await expect(
    page.getByTestId("document-panel-scroller").nth(1)
  ).toBeVisible();
  await page.getByRole("button", { name: "Open document actions" }).click();
  await page.waitForSelector('button[data-testid="action-Delete"]', {
    visible: true,
  });
  await page.getByTestId("action-Delete").click();
  await expect(page.getByText("Looking for referring")).toBeVisible();
  await expect(page.getByText("Looking for referring")).toBeHidden();
  await expect(page.getByLabel("Delete document?")).toBeVisible();
  await page.getByTestId("confirm-delete-button").click();

  //Delete Page
  await expect(page.getByTestId("document-panel-scroller").nth(1)).toBeHidden();
  await page.locator('button[data-testid="action-menu-button"]').click();
  await expect(page.getByTestId("action-Delete")).toBeVisible();
  await page.getByTestId("action-Delete").click();
  await page.waitForSelector('[data-testid="loading-container"]', {
    visible: true,
  });
  await expect(page.getByTestId("loading-container")).toBeHidden();
  try {
    await page.getByTestId("confirm-delete-button").click();
    await expect(
      page.getByTestId("document-panel-scroller").first()
    ).toBeHidden();
  } catch (error) {
    console.warn("Page still not deleted, clicking confirm delete again...");
    await page.getByTestId("confirm-delete-button").click();
    await expect(
      page.getByTestId("document-panel-scroller").first()
    ).toBeHidden();
  }

  await expect(page.getByRole("link", { name: pageTitle })).toBeHidden();
}

export async function assertInternalUrl(page, expectedUrlBase) {
  // Wait for the page to be fully loaded
  await page.waitForLoadState("load");

  const expectedUrl = expectedUrlBase.endsWith("/")
    ? expectedUrlBase
    : `${expectedUrlBase}/`;

  const receivedUrl = page.url().endsWith("/") ? page.url() : `${page.url()}/`;
  await expect(receivedUrl).toBe(expectedUrl);
}

export async function assertExternalUrl(page, expectedUrlBase) {
  // Wait for the page to be fully loaded
  await page.waitForLoadState("load");

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

  let urlInputVisible = false;
  let clicks = 0;

  while (!urlInputVisible && clicks <= 5) {
    await page
      .locator('span:has-text("External, outside this website")')
      .first()
      .click({ force: true });

    urlInputVisible = await page
      .locator('input[inputmode="url"]')
      .first()
      .isVisible();

    clicks++;
  }

  await page
    .locator('input[inputmode="url"]')
    .first()
    .fill("https://webriq.com");
  await expect(
    page.getByLabel("Self (default) - open in the").first()
  ).toBeChecked();
  await page.getByLabel("Blank - open on a new tab (").click();
}

export async function generateFormId({ page, baseURL }) {
  const currentPageUrl = await page.evaluate(() => document.location.href);
  await page
    .getByRole("button", { name: "Generate ID" })
    .click({ force: true });
  expect(page.getByLabel("Form ID")).not.toBeUndefined();
  await expect(page.getByRole("button", { name: "Generate ID" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Manage" })).toBeVisible();
  await page.getByRole("link", { name: "Manage" }).click();

  const pagePromise = page.waitForEvent("popup");
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
  await activePage.locator('input[name="testUrls"]').fill(baseURL);
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
    await page.getByLabel("Agree to terms").check({ force: true });
  }

  await pageUrl.getByLabel(submitBtnLabel).click({ force: true });
  await expect(pageUrl.getByText("Sending form data...")).toBeVisible({});
  await expect(
    pageUrl.getByText("✔ Successfully sent form data")
  ).toBeVisible();

  await page.goto(thankYouPageUrl ?? `${NEXT_PUBLIC_SITE_URL}/thank-you`);
}

export async function CTAWebriQForm({
  page,
  hasOtherLinks,
  initialValues,
  formButtonLabel,
}) {
  await generateFormId(page);

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

export async function addNavigationRoutes({
  page,
  buttonName,
  commonFieldValues,
  isInternalLink,
}) {
  await expect(page.getByRole("button", { name: buttonName })).toBeVisible();

  try {
    await page.getByRole("button", { name: buttonName }).click({ force: true });
    await expect(page.getByLabel("Edit Link")).toBeVisible();
  } catch (error) {
    console.warn("Edit Link is not visible, clicking button again...");
    await page.getByRole("button", { name: buttonName }).click();
    await expect(page.getByLabel("Edit Link")).toBeVisible();
  }

  // NAVIGATION INTERNAL/EXTERNAL SELECTOR
  const routesExternalLink = await page.locator(
    'div:nth-child(2) label[data-ui="Flex"] span:has-text("External, outside this website")'
  );
  const routesInternalLink = await page.locator(
    'div:nth-child(2) label[data-ui="Flex"] span:has-text("Internal, inside this website")'
  );

  const blankLinkTarget = page.locator(
    'div:nth-child(2) > div label[data-as="label"] span:has-text("Blank - open on a new tab (")'
  );
  const selfLinkTarget = page.locator(
    'div:nth-child(2) > div label[data-as="label"] span:has-text("Self (default) - open in the")'
  );

  if (!isInternalLink) {
    await expect(routesExternalLink.nth(1)).toBeVisible();

    try {
      await routesExternalLink.nth(1).click({ force: true });
      await expect(
        page.locator('div input[inputmode="url"]').nth(1)
      ).toBeVisible();
    } catch (error) {
      console.warn("URL Input is not visible, click on text external again.");
      await routesExternalLink.nth(1).click({ force: true });
      await expect(
        page.locator('div input[inputmode="url"]').nth(1)
      ).toBeVisible();
    }

    await page
      .locator('div input[inputmode="url"]')
      .nth(1)
      .click({ force: true });
    await page
      .locator('div input[inputmode="url"]')
      .nth(1)
      .fill(commonFieldValues.externalLinkUrl);
    await expect(blankLinkTarget.nth(1)).toBeVisible();
    await blankLinkTarget.nth(1).click();
  } else {
    await expect(routesInternalLink.nth(1)).toBeChecked();
    await routesInternalLink.nth(1).click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await expect(
      page.getByRole("button", { name: "Thank you Published No" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Thank you Published No" }).click();
    await expect(selfLinkTarget.nth(1)).toBeVisible();
    await selfLinkTarget.nth(1).click();
  }

  //Text
  const editLinkText = await page.locator('span:has-text("Edit Link")');
  const editText = await page
    .locator('div[data-ui="DialogCard"]:has-text("Edit")')
    .first();

  //Close
  const editLink = await page
    .getByLabel("Edit Link")
    .getByLabel("Close dialog");

  if (editLinkText.isVisible() && editText.isVisible()) {
    try {
      await editLink.click({ force: true });
      await expect(editLink).toBeHidden();
    } catch (error) {
      console.warn("Edit Link is still visible clicking close dialog again...");
      await editLink.click({ force: true });
      await expect(editLink).toBeHidden();
    }
  }

  const closeDialog = await page.getByLabel("Close dialog");

  if (await closeDialog.isVisible()) {
    try {
      await page.getByLabel("Close dialog").click();
      await expect(closeDialog).toBeHidden();
    } catch (error) {
      console.warn(
        "Close dialog is still visible, clicking close dialog again..."
      );
      await page.getByLabel("Close dialog").click();
      await expect(closeDialog).toBeHidden();
    }
  }
}

export const copyrightField = {
  async checkAndAddValue({ page, initialValue, commonFieldValues }) {
    const copyright = page
      .getByTestId("field-variants.copyright")
      .getByTestId("string-input");
    await expect(copyright).toBeVisible();
    await expect(copyright.inputValue()).resolves.toBe(initialValue.copyright);
    await copyright.click();
    await copyright.press("Meta+a");
    await copyright.fill(commonFieldValues?.copyrightText);
    await expect(copyright.inputValue()).resolves.toBe(
      commonFieldValues?.copyrightText
    );
  },
  async sitePreview({ pageUrl, commonFieldValues }) {
    await expect(
      pageUrl.getByText(commonFieldValues?.copyrightText)
    ).toBeVisible();
  },
};

export const bodyField = {
  async checkAndAddValue({ page, initialValue, commonFieldValues }) {
    const body = page.getByLabel("Body");
    await expect(body).toBeVisible();
    await expect(body.inputValue()).resolves.toBe(initialValue.plainText);
    await body.click();
    await body.press("Meta+a");
    await body.fill(commonFieldValues?.body);
    await expect(body.inputValue()).resolves.toBe(commonFieldValues?.body);
  },
  async sitePreview({ pageUrl, commonFieldValues }) {
    await expect(pageUrl.getByText(commonFieldValues.body)).toBeVisible();
  },
};

export const primaryButtonField = {
  async checkAndAddValue({
    page,
    initialValue,
    commonFieldValues,
    isInternalLink,
  }) {
    await expect(
      page.getByRole("button", { name: "Primary Button" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Primary Button" }).click();
    const primaryButton = page
      .getByTestId("field-variants.primaryButton.label")
      .getByTestId("string-input");
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton.inputValue()).resolves.toBe(
      initialValue.primaryButton.label
    );
    await primaryButton.click();
    await primaryButton.press("Meta+a");
    await primaryButton.fill(commonFieldValues?.primaryButton);
    await expect(primaryButton.inputValue()).resolves.toBe(
      commonFieldValues?.primaryButton
    );

    //Determine the proceeds if it is internal or external link
    if (!isInternalLink) {
      await page
        .getByTestId("field-variants.primaryButton.linkType")
        .getByText("External, outside this website")
        .click();
      await page
        .getByTestId("field-variants.primaryButton.linkExternal")
        .getByLabel("URL")
        .click();
      await page
        .getByTestId("field-variants.primaryButton.linkExternal")
        .getByLabel("URL")
        .fill(commonFieldValues.externalLinkUrl);
      await page
        .getByTestId("field-variants.primaryButton.linkTarget")
        .getByText("Blank - open on a new tab (")
        .click();
    } else {
      await page
        .getByTestId("field-variants.primaryButton.linkType")
        .getByText("Internal, inside this website")
        .click();
      await page.getByTestId("autocomplete").click();
      await page.getByTestId("autocomplete").fill("thank you");
      await page
        .getByRole("button", { name: "Thank you Published No" })
        .click({ force: true });
      await page.getByText("Self (default) - open in the").click();
    }

    await page.getByRole("button", { name: "Primary Button" }).click();
  },
  async sitePreview({ pageUrl, commonFieldValues, isInternalLink }) {
    let target: string;
    let href: string;

    // ref: stackoverflow.com/a/71346845
    https: await expect(
      pageUrl.locator(`text=${commonFieldValues.primaryButton} >> visible=true`)
    ).toBeVisible();

    if (isInternalLink) {
      (target = "_self"), (href = commonFieldValues.internalLinkUrl);
    } else {
      (target = "_blank"), (href = commonFieldValues.externalLinkUrl);
    }

    await expect(
      pageUrl.locator(
        `a[aria-label="${commonFieldValues.primaryButton}"][target="${target}"][href="${href}"] >> visible=true`
      )
    ).toBeVisible();
  },
};

export const secondaryButtonField = {
  async checkAndAddValue({
    page,
    initialValue,
    commonFieldValues,
    isInternalLink,
  }) {
    await expect(
      page.getByRole("button", { name: "Secondary Button" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Secondary Button" }).click();
    const secondaryButton = page
      .getByTestId("field-variants.secondaryButton.label")
      .getByTestId("string-input");
    await expect(secondaryButton).toBeVisible();
    await expect(secondaryButton.inputValue()).resolves.toBe(
      initialValue.secondaryButton.label
    );
    await secondaryButton.click();
    await secondaryButton.press("Meta+a");
    await secondaryButton.fill(commonFieldValues?.secondaryButton);
    await expect(secondaryButton.inputValue()).resolves.toBe(
      commonFieldValues?.secondaryButton
    );

    // Determine the proceeds if it is internal or external link
    if (!isInternalLink) {
      await page
        .getByTestId("field-variants.secondaryButton.linkType")
        .getByText("External, outside this website")
        .click();
      await page
        .getByTestId("field-variants.secondaryButton.linkExternal")
        .getByLabel("URL")
        .click();
      await page
        .getByTestId("field-variants.secondaryButton.linkExternal")
        .getByLabel("URL")
        .fill(commonFieldValues.externalLinkUrl);
      await page
        .getByTestId("field-variants.secondaryButton.linkTarget")
        .getByText("Blank - open on a new tab (")
        .click();
    } else {
      await page
        .getByTestId("field-variants.secondaryButton.linkType")
        .getByText("Internal, inside this website")
        .click();
      // await page.getByTestId('reference-input').getByLabel('Open').click();
      await page.getByTestId("autocomplete").click();
      await page.getByTestId("autocomplete").fill("thank you");
      await page
        .getByRole("button", { name: "Thank you Published No" })
        .click({ force: true });
      await page.getByText("Self (default) - open in the").click();
    }

    // await page.getByRole("button", { name: "Secondary Button" }).click();
  },
  async sitePreview({ pageUrl, commonFieldValues, isInternalLink }) {
    let target: string;
    let href: string;

    // ref: https://stackoverflow.com/a/71346845
    await expect(
      pageUrl.locator(
        `text=${commonFieldValues.secondaryButton} >> visible=true`
      )
    ).toBeVisible();

    if (isInternalLink) {
      (target = "_self"), (href = commonFieldValues.internalLinkUrl);
    } else {
      (target = "_blank"), (href = commonFieldValues.externalLinkUrl);
    }

    await expect(
      pageUrl.locator(
        `a[aria-label="${commonFieldValues.secondaryButton}"][target="${target}"][href="${href}"]  >> visible=true`
      )
    ).toBeVisible();
  },
};
