import { expect } from "@playwright/test";
import {
  checkFormSubmission,
  CTAWebriQForm,
  expectDocumentPublished,
  createSlug,
  launchPreview,
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
  // Launch preview
  await launchPreview({ page, baseURL, pageTitle });

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
