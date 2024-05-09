import { expect } from "@playwright/test";
import {
  updateLogoLink,
  expectDocumentPublished,
  checkFormSubmission,
  CTAWebriQForm,
  titleField,
} from "tests/utils";
import { callToActionInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantB({ newPageTitle, page, commonFieldValues, baseURL }) {
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
  await expectDocumentPublished(page, newPageTitle);
  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  // title
  await expect(
    openUrlPage.getByRole("heading", { name: commonFieldValues?.title })
  ).toBeVisible({ timeout: 20_000 });

  // description
  await expect(
    openUrlPage
      .locator("section")
      .filter({ hasText: commonFieldValues?.title })
      .getByRole("paragraph")
      .first()
  ).toBeVisible({ timeout: 20_000 });

  // logo
  await expect(
    openUrlPage.locator(
      'a[aria-label="Go to https://webriq.com"][target="_blank"][rel="noopener noreferrer"]'
    )
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    openUrlPage.getByAltText(commonFieldValues?.ctaLogoAltText)
  ).toBeVisible({ timeout: 20_000 });

  // 05-03-2024 defer tests for forms
  // await expect(
  //   openUrlPage.getByPlaceholder(
  //     callToActionInitialValue.form.fields?.[0]?.placeholder
  //   )
  // ).toBeVisible({ timeout: 20_000 });
  // await expect(
  //   openUrlPage.getByPlaceholder(
  //     callToActionInitialValue.form.fields?.[1]?.placeholder
  //   )
  // ).toBeVisible({ timeout: 20_000 });
  // await expect(
  //   openUrlPage.getByLabel(callToActionInitialValue.form.buttonLabel)
  // ).toBeVisible({ timeout: 20_000 });

  // await checkFormSubmission({
  //   page,
  //   thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
  //   pageUrl: openUrlPage,
  //   formFields: commonFieldValues?.formFields,
  //   submitBtnLabel: commonFieldValues?.formButtonLabel,
  // });
}

export default VariantB;
