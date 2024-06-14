import { headerInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  launchPreview,
  primaryButtonField,
  secondaryButtonField,
  titleField,
} from "tests/utils";

export default async function VariantC({
  pageTitle,
  page,
  commonFieldValues,
  isInternalLink,
  baseURL,
}) {
  //Content Title
  await titleField.checkAndAddValue({
    page,
    initialValue: headerInitialValue,
    commonFieldValues,
  });

  // Primary Button
  await primaryButtonField.checkAndAddValue({
    page,
    initialValue: headerInitialValue,
    commonFieldValues,
    isInternalLink,
  });

  // Secondary Button
  await secondaryButtonField.checkAndAddValue({
    page,
    initialValue: headerInitialValue,
    commonFieldValues,
    isInternalLink,
  });

  await expectDocumentPublished(page, pageTitle);
  // Launch preview
  await launchPreview({ page, baseURL, pageTitle });

  await assertPageContent(page, commonFieldValues, isInternalLink);
}

async function assertPageContent(page, commonFieldValues, isInternalLink) {
  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

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
