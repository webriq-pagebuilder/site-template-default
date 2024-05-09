import { expect } from "@playwright/test";
import { updateLogoLink, expectDocumentPublished } from "tests/utils";
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
  await expect(page.getByText(`${baseURL}`)).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  // logo
  await expect(
    openUrlPage.locator(
      'a[aria-label="Go to https://webriq.com"][target="_blank"][rel="noopener noreferrer"]'
    )
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    openUrlPage.getByAltText(commonFieldValues?.logoAltText)
  ).toBeVisible({ timeout: 20_000 });

  // title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  // description
  await descriptionField.sitePreview({
    pageUrl: openUrlPage,
    commonFieldValues,
  });

  // 05-03-2024 defer tests for forms
  // await form.sitePreview({ page, pageUrl: openUrlPage });
}

export default VariantA;
