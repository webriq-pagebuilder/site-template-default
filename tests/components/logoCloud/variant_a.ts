import { expect } from "@playwright/test";
import { logoCloudInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  launchPreview,
  titleField,
} from "tests/utils";

export default async function VariantA({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: logoCloudInitialValue,
    commonFieldValues,
  });

  await expectDocumentPublished(page, pageTitle);

  await launchPreview({ page, baseURL, pageTitle });

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Image
  for (let i = 0; i < 6; i++) {
    await expect(
      page.getByRole("img", { name: `logoCloud-image${i}` })
    ).toBeVisible();
  }
}
