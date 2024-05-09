import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  assertExternalUrl,
  assertInternalUrl,
} from "../../utils/index";

let logoImg: string;

export default async function VariantB({
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

  // Loops all routes
  const slug = pageTitle
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  for (const linkName of linkNames) {
    await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`);
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

  for (const navigation of commonFieldValues.navigationBase.slice(3)) {
    const navName = `${navigation} Internal Link Not Set`;
    await addNavigationRoutes(navName, page, commonFieldValues, isInternalLink);
  }

  await expectDocumentPublished(page, pageTitle);
  await expect(page.getByText(`${baseURL}`)).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
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
  //Navigation Routes
  for (const navigation of commonFieldValues.navigationBase.slice(3)) {
    await expect(
      openUrlPage
        .getByRole("list")
        .locator("li")
        .filter({ hasText: navigation })
    ).toBeVisible();
  }

  await expect(
    openUrlPage.getByText(commonFieldValues.copyrightText)
  ).toBeVisible();

  if (["facebook", "twitter", "instagram"].includes(linkName)) {
    const logoLink = await openUrlPage.locator(`a[aria-label="${linkName}"]`);
    await logoLink.click();

    if (linkName === logoImg) {
      //Logo Img
      if (isInternalLink) {
        await openUrlPage
          .getByRole("link", { name: linkName })
          .click({ force: true });
        await openUrlPage.waitForLoadState("networkidle");
        await expect(openUrlPage.getByText("Success!")).toBeVisible({
          timeout: 150_000,
        });
        await assertInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
      } else {
        const page10 = await openUrlPage.waitForEvent("popup");
        await assertExternalUrl(page10, commonFieldValues.externalLinkUrl);
      }
    } else {
      const page10 = await openUrlPage.waitForEvent("popup");
      await assertExternalUrl(page10, commonFieldValues.externalLinkUrl);
    }
  } else {
    if (!isInternalLink) {
      const page10Promise = openUrlPage.waitForEvent("popup");
      await openUrlPage
        .getByRole("link", { name: linkName })
        .click({ force: true });
      const page10 = await page10Promise;
      await assertExternalUrl(page10, commonFieldValues.externalLinkUrl);
    } else {
      await openUrlPage
        .getByRole("link", { name: linkName })
        .click({ force: true });
      await openUrlPage.waitForLoadState("networkidle");
      await expect(openUrlPage.getByText("Success!")).toBeVisible({
        timeout: 150_000,
      });
      await assertInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
    }
  }
}

async function addNavigationRoutes(
  navName,
  page,
  commonFieldValues,
  isInternalLink
) {
  await page.getByRole("button", { name: navName }).click();
  await expect(page.getByLabel("Edit Link")).toBeVisible({ timeout: 75_000 });
  // NAVIGATION INTERNAL/EXTERNAL SELECTOR
  const routesExternalLink = await page.locator(
    '.sc-jdUcAg > div:nth-child(2) > div label[data-ui="Flex"] span:has-text("External, outside this website"):nth-child(1)'
  );
  const routesInternalLink = await page.locator(
    '.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("Internal, inside this website")'
  );

  const blankLinkTarget = page.locator(
    '.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("Blank - open on a new tab (")'
  );
  const selfLinkTarget = page.locator(
    '.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("Self (default) - open in the")'
  );

  if (!isInternalLink) {
    await routesExternalLink.click({ force: true });
    await page
      .locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]')
      .click({ force: true });
    await page
      .locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]')
      .fill(commonFieldValues.externalLinkUrl);
    await blankLinkTarget.click();
  } else {
    await routesInternalLink.click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page.getByRole("button", { name: "Thank you Published No" }).click();
    await selfLinkTarget.click();
  }
  await page.getByLabel("Close dialog").click();
}
