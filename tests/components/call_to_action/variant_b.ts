import { expect } from "@playwright/test";
import {
  updateLogoLink,
  expectDocumentPublished,
  checkFormSubmission,
  CTAWebriQForm,
  titleField,
  createSlug,
} from "tests/utils";
import { callToActionInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantB({ pageTitle, page, commonFieldValues, baseURL }) {
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

  await updateLogoLink(page, commonFieldValues?.ctaLogoAltText);

  // 05-03-2024 defer tests for forms
  // await CTAWebriQForm({
  //   page,
  //   hasOtherLinks: false,
  //   initialValues: callToActionInitialValue,
  //   formButtonLabel: commonFieldValues?.commonFieldValues?.formButtonLabel,
  // });

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  // title
  await expect(
    page.getByRole("heading", { name: commonFieldValues?.title })
  ).toBeVisible();

  // description
  await expect(
    page
      .locator("section")
      .filter({ hasText: commonFieldValues?.title })
      .getByRole("paragraph")
      .first()
  ).toBeVisible();

  // logo
  await expect(
    page.locator(
      'a[aria-label="Go to https://webriq.com"][target="_blank"][rel="noopener noreferrer"]'
    )
  ).toBeVisible();
  await expect(
    page.getByAltText(commonFieldValues?.ctaLogoAltText)
  ).toBeVisible();

  // 05-03-2024 defer tests for forms
  // await expect(
  //   page.getByPlaceholder(
  //     callToActionInitialValue.form.fields?.[0]?.placeholder
  //   )
  // ).toBeVisible();
  // await expect(
  //   page.getByPlaceholder(
  //     callToActionInitialValue.form.fields?.[1]?.placeholder
  //   )
  // ).toBeVisible();
  // await expect(
  //   page.getByLabel(callToActionInitialValue.form.buttonLabel)
  // ).toBeVisible();

  // await checkFormSubmission({
  //   page,
  //   thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
  //   pageUrl: page,
  //   formFields: commonFieldValues?.formFields,
  //   submitBtnLabel: commonFieldValues?.formButtonLabel,
  // });
}

export default VariantB;
