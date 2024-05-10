import { expect } from "@playwright/test";
import { createSlug, expectDocumentPublished, titleField } from "tests/utils";
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
  await page.getByLabel("Body").click();
  await page.getByLabel("Body").fill(commonFieldValues.body);

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Body
  await expect(page.getByText(commonFieldValues.body)).toBeVisible();

  //Image
  for (let i = 0; i < 6; i++) {
    await expect(
      page.getByRole("img", { name: `logoCloud-image${i}` })
    ).toBeVisible();
  }
}
