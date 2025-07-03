import { expect } from "@playwright/test";
import {
  addNavigationRoutes,
  expectDocumentPublished,
  launchPreview,
} from "tests/utils";

export async function assertPageContent(
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
