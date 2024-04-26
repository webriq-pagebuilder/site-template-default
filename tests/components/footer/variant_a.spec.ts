import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  verifyExternalUrl,
  verifyInternalUrl,
} from "../../utils/index";

let logoImg: string;

export default async function VariantA({
  variantTitle,
  page,
  commonFieldValues,
  linkNames,
  isInternalLink,
}) {
  await createFooterVariant({
    variantTitle,
    page,
    commonFieldValues,
    isInternalLink,
  });

  // Loops all routes
  const slug = variantTitle
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  for (const linkName of linkNames) {
    await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`);
    await assertPageContent(page, linkName, commonFieldValues, isInternalLink);
  }
}

async function createFooterVariant({
  variantTitle,
  page,
  commonFieldValues,
  isInternalLink,
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

    await page.getByRole("button", { name: socialMedia }).click();
    await expect(page.getByLabel("Edit Details")).toBeVisible();
    await page.getByLabel("Select the social media").selectOption(i.toString());
    await page.getByLabel("Social Media Link").click();
    await page
      .getByLabel("Social Media Link")
      .fill(commonFieldValues.externalLinkUrl);
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, variantTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  //LogoImg
  isInternalLink
    ? (logoImg = "Go to /thank-you")
    : (logoImg = `Go to ${commonFieldValues.externalLinkUrl}`);

  // Default should just be available routes - no buttons in variant E
  await assertPageContent(
    openUrlPage,
    logoImg,
    commonFieldValues,
    isInternalLink
  );
}

async function assertPageContent(
  openUrlPage,
  linkName,
  commonFieldValues,
  isInternalLink
) {
  // If the section no items is not found, expect the Empty Page element to be hidden
  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20_000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({
    timeout: 20_000,
  });

  await expect(
    openUrlPage.getByText(commonFieldValues.footerBody)
  ).toBeVisible();

  await expect(
    openUrlPage.getByText(commonFieldValues.copyrightText)
  ).toBeVisible();

  for (const contact of commonFieldValues.contactInfo) {
    await expect(openUrlPage.getByText(contact.updatedName)).toBeVisible();
  }

  await expect(
    openUrlPage.getByLabel("facebook", { exact: true }).hover()
  ).toBeTruthy();
  await expect(openUrlPage.getByLabel("twitter").hover()).toBeTruthy();
  await expect(openUrlPage.getByLabel("instagram").hover()).toBeTruthy();

  if (["facebook", "twitter", "instagram"].includes(linkName)) {
    const logoLink = await openUrlPage.locator(`a[aria-label="${linkName}"]`);
    await logoLink.hover();
    await logoLink.click();

    if (linkName === logoImg) {
      //Logo Img
      if (isInternalLink) {
        await openUrlPage
          .getByRole("link", { name: linkName })
          .click({ force: true });
        await openUrlPage.waitForLoadState("networkidle");
        await expect(openUrlPage.getByText("Success!")).toBeVisible({
          timeout: 20000,
        });
        await verifyInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
      } else {
        const page10 = await openUrlPage.waitForEvent("popup");
        await verifyExternalUrl(page10, commonFieldValues.externalLinkUrl);
      }
    } else {
      const page10 = await openUrlPage.waitForEvent("popup");
      await verifyExternalUrl(page10, commonFieldValues.externalLinkUrl);
    }
  } else {
    if (!isInternalLink) {
      const page10Promise = openUrlPage.waitForEvent("popup");
      await openUrlPage
        .getByRole("link", { name: linkName })
        .click({ force: true });
      const page10 = await page10Promise;
      await verifyExternalUrl(page10, commonFieldValues.externalLinkUrl);
    } else {
      await openUrlPage
        .getByRole("link", { name: linkName })
        .click({ force: true });
      await openUrlPage.waitForLoadState("networkidle");
      await expect(openUrlPage.getByText("Success!")).toBeVisible({
        timeout: 20000,
      });
      await verifyInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
    }
  }
}
