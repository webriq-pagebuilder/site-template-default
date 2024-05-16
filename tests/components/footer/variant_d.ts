import { expect } from "@playwright/test";
import { footerInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  createSlug,
  addNavigationRoutes,
  copyrightField,
  bodyField,
  launchPreview,
} from "tests/utils";

export default async function VariantD({
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

  //Body
  await bodyField.checkAndAddValue({
    page,
    initialValue: footerInitialValue,
    commonFieldValues,
  });

  await copyrightField.checkAndAddValue({
    page,
    initialValue: footerInitialValue,
    commonFieldValues,
  });

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

  //Quick Links
  for (const navigation of commonFieldValues.navigationBase.slice(3, 6)) {
    await page.getByRole("button", { name: "Quick Links" }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
    const buttonName = `${navigation} Internal Link Not Set`;
    await addNavigationRoutes({
      page,
      buttonName,
      commonFieldValues,
      isInternalLink,
    });
  }

  //Helpful Links
  for (const navigation of commonFieldValues.navigationBase.slice(6, 8)) {
    await page.getByRole("button", { name: "Helpful Links" }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
    const buttonName = `${navigation} Internal Link Not Set`;
    await addNavigationRoutes({
      page,
      buttonName,
      commonFieldValues,
      isInternalLink,
    });
  }

  //Explore Links
  for (const navigation of commonFieldValues.exploreLinks) {
    await page.getByRole("button", { name: "Explore" }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
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
  // Launch preview
  await launchPreview({ page, baseURL, pageTitle });

  // Default should just be available routes - no buttons in variant E
  await assertPageContent(page, linkNames, commonFieldValues, isInternalLink);
}

async function assertPageContent(
  page,
  linkNames,
  commonFieldValues,
  isInternalLink
) {
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

  // Body
  await bodyField.sitePreview({ pageUrl: page, commonFieldValues });

  // Copyright
  await copyrightField.sitePreview({ pageUrl: page, commonFieldValues });

  await expect(page.getByText("Quick Links")).toBeVisible();
  await expect(page.getByText("Helpful Links")).toBeVisible();
  await expect(page.getByText("Explore")).toBeVisible();

  for (const linkName of linkNames) {
    if (["facebook", "twitter", "instagram"].includes(linkName)) {
      await expect(
        page.locator(
          `a[aria-label="${linkName}"][target="_blank"][href="${commonFieldValues?.externalLinkUrl}"]`
        )
      ).toBeVisible();
    } else {
      await expect(
        page.locator(
          `a[aria-label="${linkName}"][target="${target}"][href="${href}"]`
        )
      ).toBeVisible();
    }
  }
}
