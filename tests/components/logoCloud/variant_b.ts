import { expect } from "@playwright/test";
import {
  bodyField,
  createSlug,
  expectDocumentPublished,
  titleField,
} from "tests/utils";
import { logoCloudInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default async function VariantB({
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

  //Body
  await bodyField.checkAndAddValue({
    page,
    initialValue: logoCloudInitialValue,
    commonFieldValues,
  });

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Body
  await bodyField.sitePreview({ pageUrl: page, commonFieldValues });

  //Image
  for (let i = 0; i < 6; i++) {
    await expect(
      page.getByRole("img", { name: `logoCloud-image${i}` })
    ).toBeVisible();
  }
}
