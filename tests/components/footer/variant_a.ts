import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  assertExternalUrl,
  assertInternalUrl,
  createSlug,
} from "tests/utils";

let logoImg: string;

export default async function VariantA({
  pageTitle,
  page,
  commonFieldValues,
  linkNames,
  isInternalLink,
  baseURL,
}) {
  await createFooterVariant({
    pageTitle,
    page,
    commonFieldValues,
    isInternalLink,
    baseURL,
  });

  for (const linkName of linkNames) {
    await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
    await assertPageContent(page, linkName, commonFieldValues, isInternalLink);
  }
}

async function createFooterVariant({
  pageTitle,
  page,
  commonFieldValues,
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

  //Body
  await page.getByLabel("Body").click();
  await page.getByLabel("Body").fill(commonFieldValues.footerBody);

  //Contact Details
  await page.getByRole("button", { name: "Hidden Valley Road, NY" }).click();
  for (const contact of commonFieldValues.contactInfo) {
    await expect(page.getByLabel("Edit Contact Information")).toBeVisible();
    await page.locator(`input[value*="${contact.name}"]`).click();
    await page
      .locator(`input[value*="${contact.name}"]`)
      .fill(contact.updatedName);
  }
  await page.getByLabel("Close dialog").click();

  //Copyright
  await page
    .getByTestId("field-variants.copyright")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.copyright")
    .getByTestId("string-input")
    .fill(commonFieldValues.copyrightText);

  //Social Links
  const socialLinks = ["facebook", "twitter", "instagram"];
  for (let i = 0; i < socialLinks.length; i++) {
    const socialMedia = socialLinks[i];

    await expect(page.getByRole("button", { name: socialMedia })).toBeVisible();
    await page.getByRole("button", { name: socialMedia }).click();
    await expect(page.getByLabel("Edit Details")).toBeVisible();
    await page.getByLabel("Select the social media").selectOption(i.toString());
    await page.getByLabel("Social Media Link").click();
    await page
      .getByLabel("Social Media Link")
      .fill(commonFieldValues.externalLinkUrl);
    await page.getByLabel("Close dialog").click();
  }

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  //LogoImg
  isInternalLink
    ? (logoImg = "Go to /thank-you")
    : (logoImg = `Go to ${commonFieldValues.externalLinkUrl}`);

  // Default should just be available routes - no buttons in variant E
  await assertPageContent(page, logoImg, commonFieldValues, isInternalLink);
}

async function assertPageContent(
  page,
  linkName,
  commonFieldValues,
  isInternalLink
) {
  // If the section no items is not found, expect the Empty Page element to be hidden
  await expect(page.getByText(commonFieldValues.footerBody)).toBeVisible();

  await expect(page.getByText(commonFieldValues.copyrightText)).toBeVisible();

  for (const contact of commonFieldValues.contactInfo) {
    await expect(page.getByText(contact.updatedName)).toBeVisible();
  }

  expect(page.getByLabel("facebook", { exact: true }).hover()).toBeTruthy();
  expect(page.getByLabel("twitter").hover()).toBeTruthy();
  expect(page.getByLabel("instagram").hover()).toBeTruthy();

  if (["facebook", "twitter", "instagram"].includes(linkName)) {
    const logoLink = await page.locator(`a[aria-label="${linkName}"]`);
    await logoLink.hover();
    await logoLink.click();

    if (linkName === logoImg) {
      //Logo Img
      if (isInternalLink) {
        await page.getByRole("link", { name: linkName }).click({ force: true });
        await page.waitForLoadState("networkidle");
        await expect(page.getByText("Success!")).toBeVisible({
          timeout: 150_000,
        });
        await assertInternalUrl(page, commonFieldValues.internalLinkUrl);
      } else {
        const page10 = await page.waitForEvent("popup");
        await assertExternalUrl(page10, commonFieldValues.externalLinkUrl);
      }
    } else {
      const page10 = await page.waitForEvent("popup");
      await assertExternalUrl(page10, commonFieldValues.externalLinkUrl);
    }
  } else {
    if (!isInternalLink) {
      const page10Promise = page.waitForEvent("popup");
      await page.getByRole("link", { name: linkName }).click({ force: true });
      const page10 = await page10Promise;
      await assertExternalUrl(page10, commonFieldValues.externalLinkUrl);
    } else {
      await page.getByRole("link", { name: linkName }).click({ force: true });
      await page.waitForLoadState("networkidle");
      await expect(page.getByText("Success!")).toBeVisible({
        timeout: 150_000,
      });
      await assertInternalUrl(page, commonFieldValues.internalLinkUrl);
    }
  }
}
