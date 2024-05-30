import { expect } from "@playwright/test";
import { navigationInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  addNavigationRoutes,
  expectDocumentPublished,
  launchPreview,
  primaryButtonField,
  secondaryButtonField,
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

  for (const linkName of linkNames) {
    await expect(
      page
        .locator(
          `a[aria-label="${linkName}"][target="${target}"][href="${href}"]`
        )
        .first()
    ).toBeVisible();
  }

  // Primary Button
  await primaryButtonField.sitePreview({
    pageUrl: page,
    commonFieldValues,
    isInternalLink,
  });

  // Secondary Button
  await secondaryButtonField.sitePreview({
    pageUrl: page,
    commonFieldValues,
    isInternalLink,
  });
}
