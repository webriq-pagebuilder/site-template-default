import { expect } from "@playwright/test";
import { newsletterInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  descriptionField,
  expectDocumentPublished,
  launchPreview,
  titleField,
  updateLogoLink,
} from "tests/utils";

async function VariantB({ pageTitle, page, commonFieldValues, baseURL }) {
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

  await launchPreview({ page, baseURL, pageTitle });

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

export default VariantB;
