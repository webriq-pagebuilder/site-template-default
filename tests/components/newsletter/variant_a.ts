import { expect } from "@playwright/test";
import {
  updateLogoLink,
  expectDocumentPublished,
  createSlug,
} from "tests/utils";
import { newsletterInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { titleField, descriptionField } from "tests/utils";
import { form } from "./index.spec";

async function VariantA({ pageTitle, page, commonFieldValues, baseURL }) {
  // studio
  await updateLogoLink(page, commonFieldValues?.logoAltText);

  // title
  await titleField.checkAndAddValue({
    page,
    initialValue: newsletterInitialValue,
    commonFieldValues,
  });

  // description
  await page.getByPlaceholder("Lorem ipsum dolor sit amet,").click();
  await page
    .getByPlaceholder("Lorem ipsum dolor sit amet,")
    .fill(commonFieldValues.description);

  // 05-03-2024 defer tests for forms
  // await form.addFormFields({ page });

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  // logo
  await expect(
    page.locator(
      'a[aria-label="Go to https://webriq.com"][target="_blank"][rel="noopener noreferrer"]'
    )
  ).toBeVisible();
  await expect(page.getByAltText(commonFieldValues?.logoAltText)).toBeVisible();

  // title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  // description
  await descriptionField.sitePreview({
    pageUrl: page,
    commonFieldValues,
  });

  // 05-03-2024 defer tests for forms
  // await form.sitePreview({ page, pageUrl: page });
}

export default VariantA;
