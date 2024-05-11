import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  createSlug,
  addNavigationRoutes,
} from "tests/utils";

export default async function VariantC({
  pageTitle,
  page,
  commonFieldValues,
  linkNames,
  isInternalLink,
  baseURL,
}) {
  if (!isInternalLink) {
    //Logo Alt
    const logoAltInput = page
      .getByTestId("field-variants.logo.alt")
      .getByTestId("string-input");
    await logoAltInput.click();
    await logoAltInput.fill("alt text test");
    await page
      .getByTestId("field-variants.logo.linkType")
      .getByText("External, outside this website")
      .click();
    await page.waitForTimeout(1000);
    await page.getByLabel("URL").click();
    await page.getByLabel("URL").fill(commonFieldValues.externalLinkUrl);
    await page.waitForTimeout(1000);
    await page.getByText("Blank - open on a new tab (").click();
  } else {
    await page
      .getByTestId("field-variants.logo.linkType")
      .getByText("Internal, inside this website")
      .click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page
      .getByRole("button", { name: "Thank you Published No" })
      .click({ force: true });
    await page.getByText("Self (default) - open in the").click();
  }

  // Perform navigation clicks
  for (const navigation of commonFieldValues.navigationBase) {
    const buttonName = `${navigation} Internal Link Not Set`;
    await addNavigationRoutes({
      page,
      buttonName,
      commonFieldValues,
      isInternalLink,
    });
  }

  //Primary Button
  await page.getByRole("button", { name: "Primary Button" }).click();
  await expect(
    page
      .getByTestId("field-variants.primaryButton.label")
      .getByTestId("string-input")
  ).toBeVisible();
  await page
    .getByTestId("field-variants.primaryButton.label")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.primaryButton.label")
    .getByTestId("string-input")
    .fill(commonFieldValues.primaryButton);

  if (isInternalLink) {
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page.getByRole("button", { name: "Thank you Published No" }).click();
    await page
      .getByTestId("field-variants.primaryButton.linkType")
      .getByLabel("Internal, inside this website")
      .click();
  } else {
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
  }
  //Close primary button toggle
  await page.getByRole("button", { name: "Primary Button" }).click();

  //Secondary Button
  await page.getByRole("button", { name: "Secondary Button" }).click();
  await expect(
    page
      .getByTestId("field-variants.secondaryButton.label")
      .getByTestId("string-input")
  ).toBeVisible();
  await page
    .getByTestId("field-variants.secondaryButton.label")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.secondaryButton.label")
    .getByTestId("string-input")
    .fill(commonFieldValues.secondaryButton);

  if (isInternalLink) {
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page.getByRole("button", { name: "Thank you Published No" }).click();
    await page
      .getByTestId("field-variants.secondaryButton.linkTarget")
      .getByText("Self (default) - open in the")
      .click();
  } else {
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
  }
  //Close secondary button toggle
  await page.getByRole("button", { name: "Secondary Button" }).click();

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  // Default should just be available routes - no buttons in variant E
  let logoImg = isInternalLink
    ? "Go to /thank-you"
    : `Go to ${commonFieldValues.externalLinkUrl}`;

  await assertPageContent(page, logoImg, isInternalLink);

  // Loops all routes
  for (const linkName of linkNames) {
    await assertPageContent(page, linkName, isInternalLink);
  }
}

async function assertPageContent(page, linkName, isInternalLink) {
  await page.waitForSelector(`a[aria-label="${linkName}"]`, {
    visible: true,
  });

  await expect(
    page.locator(`a[aria-label="${linkName}"]`).first()
  ).toBeVisible();

  if (!isInternalLink) {
    await expect(
      page.locator(`a[aria-label="${linkName}"]`).first()
    ).toHaveAttribute("target", "_blank");
  } else {
    await expect(
      page.locator(`a[aria-label="${linkName}"]`).first()
    ).toHaveAttribute("target", "_self");
  }
}
