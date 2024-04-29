import { expect } from "@playwright/test";
import { updateLogoLink, expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { newsletterInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { titleField, descriptionField } from "tests/utils";
import { form } from "./index.spec";

async function VariantB({ newPageTitle, page, commonFieldValues }) {
  // studio
  await updateLogoLink(page, commonFieldValues?.logoAltText);

  await titleField.checkAndAddValue({
    page,
    initialValue: newsletterInitialValue,
    commonFieldValues,
  });
  await descriptionField.checkAndAddValue({
    page,
    initialValue: newsletterInitialValue,
    commonFieldValues,
  });

  // forms
  await form.addFormFields({ page });

  // check site preview
  await expectDocumentPublished(page, newPageTitle);
  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  // logo
  await expect(
    openUrlPage.getByLabel("Go to https://webriq.com")
  ).toBeVisible();
  await expect(
    openUrlPage
      .locator("a[target='_blank']")
      .and(openUrlPage.locator("a[rel='noopener noreferrer']"))
  ).toBeVisible();
  await expect(
    openUrlPage.getByAltText(commonFieldValues?.logoAltText)
  ).toBeVisible();

  // title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  // description
  await descriptionField.sitePreview({
    pageUrl: openUrlPage,
    commonFieldValues,
  });

  // form submission
  await form.sitePreview({ page, pageUrl: openUrlPage });
}

export default VariantB;
