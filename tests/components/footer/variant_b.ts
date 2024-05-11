import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  createSlug,
  addNavigationRoutes,
} from "tests/utils";

export default async function createFooterVariant({
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
  for (let i = 0; i < linkNames.slice(0, 3).length; i++) {
    const socialMedia = linkNames.slice(0, 3)[i];
    console.log(socialMedia);

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
    const buttonName = `${navigation} Internal Link Not Set`;
    await addNavigationRoutes({
      page,
      buttonName,
      commonFieldValues,
      isInternalLink,
    });
  }

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  // Default should just be available routes - no buttons in variant E
  await assertPageContent(page, linkNames, commonFieldValues, isInternalLink);
}

async function assertPageContent(
  page,
  linkNames,
  commonFieldValues,
  isInternalLink
) {
  // Copyright
  await expect(page.getByText(commonFieldValues.copyrightText)).toBeVisible();

  //LogoImg
  let logoImg: string;
  let target: string;
  let href: string;

  if (isInternalLink) {
    (target = "_self"),
      (href = commonFieldValues.internalLinkUrl),
      (logoImg = "Go to /thank-you");
  } else {
    (target = "_blank"),
      (href = commonFieldValues.externalLinkUrl),
      (logoImg = `Go to ${commonFieldValues.externalLinkUrl}`);
  }

  // Include logo img in the link names array
  linkNames.push(logoImg);

  for (const linkName of linkNames) {
    await expect(
      page.locator(
        `a[aria-label="${linkName}"][target="${target}"][href="${href}"]`
      )
    ).toBeVisible();
  }
}
