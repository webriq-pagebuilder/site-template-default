import { expect } from "@playwright/test";
import { callToActionInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  launchPreview,
  titleField,
} from "tests/utils";

async function VariantC({ pageTitle, page, commonFieldValues, baseURL }) {
  // studio
  await titleField.checkAndAddValue({
    page,
    initialValue: callToActionInitialValue,
    commonFieldValues,
  });

  const description = page.getByLabel("Body");
  await expect(description.inputValue()).resolves.toBe(
    callToActionInitialValue.plainText
  );
  await description.click();
  await description.press("Meta+a");
  await description.fill(commonFieldValues?.description);
  await expect(description.inputValue()).resolves.toBe(
    commonFieldValues?.description
  );

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

  // title
  await expect(
    page.getByRole("heading", { name: commonFieldValues?.title })
  ).toBeVisible();

  // description
  await expect(
    page
      .locator("section")
      .filter({ hasText: commonFieldValues?.description })
      .getByRole("paragraph")
      .first()
  ).toBeVisible();

  // 05-03-2024 defer tests for forms
  // await expect(
  //   page.getByPlaceholder(
  //     callToActionInitialValue.form.fields?.[0]?.placeholder
  //   )
  // ).toBeVisible();
  // await expect(
  //   page.getByLabel(callToActionInitialValue.form.buttonLabel)
  // ).toBeVisible();
  // await expect(page.getByText("No credit card needed")).toBeVisible({  // });
  // await expect(page.getByText("Easy to use")).toBeVisible({  // });
  // await expect(
  //   page.getByLabel(commonFieldValues?.primaryButtonLabel)
  // ).toBeVisible();

  // await checkFormSubmission({
  //   page,
  //   thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
  //   pageUrl: page,
  //   formFields: commonFieldValues?.formFields,
  //   submitBtnLabel: commonFieldValues?.formButtonLabel,
  // });
}

export default VariantC;
