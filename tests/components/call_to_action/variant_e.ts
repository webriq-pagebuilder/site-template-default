import { expect } from "@playwright/test";
import {
  checkFormSubmission,
  CTAWebriQForm,
  expectDocumentPublished,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { callToActionInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantE({ newPageTitle, page, commonFieldValues }) {
  // studio
  await CTAWebriQForm({
    page,
    hasOtherLinks: false,
    initialValues: callToActionInitialValue,
    formButtonLabel: commonFieldValues?.commonFieldValues?.formButtonLabel,
  });

  // check site preview
  await expectDocumentPublished(page, newPageTitle);
  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  // forms
  await checkFormSubmission({
    page,
    thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
    pageUrl: openUrlPage,
    formFields: commonFieldValues?.formFields,
    submitBtnLabel: commonFieldValues?.formButtonLabel,
  });
}

export default VariantE;
