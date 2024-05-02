import { expect } from "@playwright/test";
import {
  CTAWebriQForm,
  checkFormSubmission,
  expectDocumentPublished,
  titleField,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { callToActionInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantC({ newPageTitle, page, commonFieldValues }) {
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

  // title
  await expect(
    openUrlPage.getByRole("heading", { name: commonFieldValues?.title })
  ).toBeVisible({ timeout: 20_000 });

  // description
  await expect(
    openUrlPage
      .locator("section")
      .filter({ hasText: commonFieldValues?.description })
      .getByRole("paragraph")
      .first()
  ).toBeVisible({ timeout: 20_000 });

  // forms
  await expect(
    openUrlPage.getByPlaceholder(
      callToActionInitialValue.form.fields?.[0]?.placeholder
    )
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    openUrlPage.getByLabel(callToActionInitialValue.form.buttonLabel)
  ).toBeVisible({ timeout: 20_000 });
  await expect(openUrlPage.getByText("No credit card needed")).toBeVisible({
    timeout: 20_000,
  });
  await expect(openUrlPage.getByText("Easy to use")).toBeVisible({
    timeout: 20_000,
  });
  await expect(
    openUrlPage.getByLabel(commonFieldValues?.primaryButtonLabel)
  ).toBeVisible({ timeout: 20_000 });

  await checkFormSubmission({
    page,
    thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
    pageUrl: openUrlPage,
    formFields: commonFieldValues?.formFields,
    submitBtnLabel: commonFieldValues?.formButtonLabel,
  });
}

export default VariantC;
