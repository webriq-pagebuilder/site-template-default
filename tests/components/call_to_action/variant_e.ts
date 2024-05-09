import { expect } from "@playwright/test";
import {
  checkFormSubmission,
  CTAWebriQForm,
  expectDocumentPublished,
} from "tests/utils";
import { callToActionInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantE({ pageTitle, page, commonFieldValues, baseURL }) {
  // studio
  // 05-03-2024 defer tests for forms
  // await CTAWebriQForm({
  //   page,
  //   hasOtherLinks: false,
  //   initialValues: callToActionInitialValue,
  //   formButtonLabel: commonFieldValues?.commonFieldValues?.formButtonLabel,
  // });

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  // forms
  // await checkFormSubmission({
  //   page,
  //   thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
  //   pageUrl: openUrlPage,
  //   formFields: commonFieldValues?.formFields,
  //   submitBtnLabel: commonFieldValues?.formButtonLabel,
  // });
}

export default VariantE;
