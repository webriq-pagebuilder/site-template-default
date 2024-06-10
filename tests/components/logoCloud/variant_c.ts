import { expect } from "@playwright/test";
import { logoCloudInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  launchPreview,
  primaryButtonField,
  titleField,
} from "tests/utils";

export default async function VariantC({
  pageTitle,
  page,
  commonFieldValues,
  isInternalLink,
  baseURL,
}) {
  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: logoCloudInitialValue,
    commonFieldValues,
  });

  // Primary Button
  await primaryButtonField.checkAndAddValue({
    page,
    initialValue: logoCloudInitialValue,
    commonFieldValues,
    isInternalLink,
  });

  await expectDocumentPublished(page, pageTitle);

  await launchPreview({ page, baseURL, pageTitle });

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  // Primary Button
  await primaryButtonField.sitePreview({
    pageUrl: page,
    commonFieldValues,
    isInternalLink,
  });

  for (let i = 1; i < 7; i++) {
    await expect(
      page.getByRole("img", { name: `logoCloud-image-${i}` })
    ).toBeVisible();
  }
}
