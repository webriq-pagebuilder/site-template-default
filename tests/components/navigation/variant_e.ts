import { expect } from "@playwright/test";
import {
  addNavigationRoutes,
  expectDocumentPublished,
  launchPreview,
} from "tests/utils";

export default async function VariantE({
  pageTitle,
  page,
  commonFieldValues,
  linkNames,
  isInternalLink,
  baseURL,
}) {
  await page
    .getByTestId("scroll-container")
    .getByRole("textbox")
    .click({ force: true });
  await page
    .getByTestId("scroll-container")
    .getByRole("textbox")
    .fill("Hi, you're new here! Get 20% off card! testttttttttt");

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
    await page.page.getByText("Self (default) - open in the").click();
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

  await expectDocumentPublished(page, pageTitle);

  await launchPreview({ page, baseURL, pageTitle });

  await assertPageContent(page, linkNames, commonFieldValues, isInternalLink);
}

async function assertPageContent(
  page,
  linkNames,
  commonFieldValues,
  isInternalLink
) {
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

  await expect(
    page.locator(
      `p:has-text("Hi, you're new here! Get 20% off card! testttttttttt")`
    )
  ).toBeVisible();

  // Search button
  await expect(page.getByLabel("Search button")).toBeVisible();

  // Shopping cart
  await expect(page.getByRole("link", { name: "Cart" })).toBeVisible();

  // User icon
  await expect(
    page.locator('a[href="/cart?store-page=account"]')
  ).toBeVisible();

  for (const linkName of linkNames) {
    await expect(
      page
        .locator(
          `a[aria-label="${linkName}"][target="${target}"][href="${href}"]`
        )
        .first()
    ).toBeVisible();
  }
}
