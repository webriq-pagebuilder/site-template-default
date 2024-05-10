import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  assertExternalUrl,
  assertInternalUrl,
  createSlug,
} from "tests/utils";

let logoImg: string;

export default async function VariantD({
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

  //Quick Links
  for (const navigation of commonFieldValues.navigationBase.slice(3, 6)) {
    await page.getByRole("button", { name: "Quick Links" }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
    const navName = `${navigation} Internal Link Not Set`;
    await addNavigationRoutes(navName, page, commonFieldValues, isInternalLink);
  }

  //Helpful Links
  for (const navigation of commonFieldValues.navigationBase.slice(6, 8)) {
    await page.getByRole("button", { name: "Helpful Links" }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
    const navName = `${navigation} Internal Link Not Set`;
    await addNavigationRoutes(navName, page, commonFieldValues, isInternalLink);
  }

  //Explore Links
  for (const navigation of commonFieldValues.exploreLinks) {
    await page.getByRole("button", { name: "Explore" }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
    const navName = `${navigation} Internal Link Not Set`;
    await addNavigationRoutes(navName, page, commonFieldValues, isInternalLink);
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
  await expect(page.getByText(commonFieldValues.footerBody)).toBeVisible();

  await expect(page.getByText(commonFieldValues.copyrightText)).toBeVisible();

  await expect(page.getByText("Quick Links")).toBeVisible();
  await expect(page.getByText("Helpful Links")).toBeVisible();
  await expect(page.getByText("Explore")).toBeVisible();

  await expect(
    page.getByLabel("facebook", { exact: true }).hover()
  ).toBeTruthy();
  await expect(page.getByLabel("twitter").hover()).toBeTruthy();
  await expect(page.getByLabel("instagram").hover()).toBeTruthy();

  if (["facebook", "twitter", "instagram"].includes(linkName)) {
    const logoLink = await page.locator(`a[aria-label="${linkName}"]`);
    await logoLink.hover();
    await logoLink.click();

    if (linkName === logoImg) {
      //Logo Img
      if (isInternalLink) {
        await page.getByRole("link", { name: linkName }).click({ force: true });
        await page.waitForLoadState("networkidle");
        await expect(page.getByText("Success!")).toBeVisible();
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
      await expect(page.getByText("Success!")).toBeVisible();
      await assertInternalUrl(page, commonFieldValues.internalLinkUrl);
    }
  }
}

async function addNavigationRoutes(
  buttonName,
  page,
  commonFieldValues,
  isInternalLink
) {
  await expect(page.getByRole("button", { name: buttonName })).toBeVisible();
  await page.getByRole("button", { name: buttonName }).click();
  await expect(page.getByLabel("Edit Link")).toBeVisible();
  await expect(page.locator('span:has-text("Edit Link")')).toBeVisible();

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
    await expect(routesExternalLink.nth(1)).not.toBeChecked();
    await routesExternalLink.nth(1).click({ force: true });
    await expect(
      await page.locator('div input[inputmode="url"]').nth(1)
    ).toBeVisible();
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

  await page.getByLabel("Close dialog").first().click();
}
