import { headerInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  titleField,
  descriptionField,
  createSlug,
  primaryButtonField,
  secondaryButtonField,
} from "tests/utils";

export default async function VariantD({
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

  //Content Description
  await descriptionField.checkAndAddValue({
    page,
    initialValue: headerInitialValue,
    placeholder: headerInitialValue.description,
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
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  await assertPageContent(page, commonFieldValues, isInternalLink);
}

async function assertPageContent(page, commonFieldValues, isInternalLink) {
  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Description
  await descriptionField.sitePreview({
    pageUrl: page,
    commonFieldValues,
  });

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
