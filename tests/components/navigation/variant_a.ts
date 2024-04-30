import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  assertExternalUrl,
  assertInternalUrl,
} from "tests/utils";

export default async function createNavigationVariant({
  pageTitle,
  page,
  commonFieldValues,
  linkNames,
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

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  // Default should just be available routes - no buttons in variant E
  let logoImg = isInternalLink
    ? "Go to /thank-you"
    : `Go to ${commonFieldValues.externalLinkUrl}`;

  await assertPageContent(
    openUrlPage,
    logoImg,
    commonFieldValues,
    isInternalLink
  );

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
  await expect(openUrlPage.locator("section")).toBeVisible({ timeout: 20_000 });

  // EXPECT THE SAME VALUE FOR NAVIGATION ROUTES LIST.
  for (const navigation of commonFieldValues.navigationBase) {
    await expect(
      openUrlPage
        .getByRole("list")
        .locator("li")
        .filter({ hasText: navigation })
    ).toBeVisible();
  }

  await openUrlPage
    .getByRole("link", { name: linkName })
    .click({ force: true });
  if (!isInternalLink) {
    const page10Promise = openUrlPage.waitForEvent("popup");
    const page10 = await page10Promise;
    await assertExternalUrl(page10, commonFieldValues.externalLinkUrl);
  } else {
    await openUrlPage.waitForLoadState("networkidle");
    await expect(openUrlPage.getByText("Success!")).toBeVisible({
      timeout: 150_000,
    });
    await assertInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
  }
}

async function addNavigationRoutes({
  page,
  buttonName,
  commonFieldValues,
  isInternalLink,
}) {
  await page.getByRole("button", { name: buttonName }).click();
  await expect(
    page.getByLabel("Edit Link").getByTestId("autocomplete")
  ).toBeVisible({ timeout: 75_000 });

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
    // await page.getByTestId('reference-input').getByLabel('Open').click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page.getByRole("button", { name: "Thank you Published No" }).click();
    await selfLinkTarget.click();
  }

  await page.getByLabel("Close dialog").click();
}
