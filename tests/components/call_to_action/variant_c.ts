import { expect } from "@playwright/test";
import {
  CTAWebriQForm,
  checkFormSubmission,
  expectDocumentPublished,
  titleField,
  createSlug,
} from "tests/utils";
import { callToActionInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

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
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  // title
  await expect(
    page.getByRole("heading", { name: commonFieldValues?.title })
  ).toBeVisible({ timeout: 20_000 });

  // description
  await expect(
    page
      .locator("section")
      .filter({ hasText: commonFieldValues?.description })
      .getByRole("paragraph")
      .first()
  ).toBeVisible({ timeout: 20_000 });

  // 05-03-2024 defer tests for forms
  // await expect(
  //   page.getByPlaceholder(
  //     callToActionInitialValue.form.fields?.[0]?.placeholder
  //   )
  // ).toBeVisible({ timeout: 20_000 });
  // await expect(
  //   page.getByLabel(callToActionInitialValue.form.buttonLabel)
  // ).toBeVisible({ timeout: 20_000 });
  // await expect(page.getByText("No credit card needed")).toBeVisible({
  //   timeout: 20_000,
  // });
  // await expect(page.getByText("Easy to use")).toBeVisible({
  //   timeout: 20_000,
  // });
  // await expect(
  //   page.getByLabel(commonFieldValues?.primaryButtonLabel)
  // ).toBeVisible({ timeout: 20_000 });

  // await checkFormSubmission({
  //   page,
  //   thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
  //   pageUrl: page,
  //   formFields: commonFieldValues?.formFields,
  //   submitBtnLabel: commonFieldValues?.formButtonLabel,
  // });
}

export default VariantC;
