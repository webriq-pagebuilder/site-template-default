import { expect } from "@playwright/test";
import {
  CTAWebriQForm,
  checkFormSubmission,
  expectDocumentPublished,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { callToActionInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantC({ newPageTitle, page, commonFieldValues }) {
  // studio
  const title = page
    .getByTestId("field-variants.title")
    .getByTestId("string-input");
  await expect(title.inputValue()).resolves.toBe(
    callToActionInitialValue.title
  );
  await title.click();
  await title.press("Meta+a");
  await title.fill(commonFieldValues?.title);
  await expect(title.inputValue()).resolves.toBe(commonFieldValues?.title);

  const description = page.getByPlaceholder("Lorem ipsum dolor sit amet,");
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
  ).toBeVisible();

  // description
  await expect(
    openUrlPage
      .locator("section")
      .filter({ hasText: commonFieldValues?.title })
      .getByRole("paragraph")
      .first()
  ).toBeVisible();

  // forms
  await expect(
    openUrlPage.getByPlaceholder(
      callToActionInitialValue.form.fields?.[0]?.placeholder
    )
  ).toBeVisible();
  await expect(
    openUrlPage.getByLabel(callToActionInitialValue.form.buttonLabel)
  ).toBeVisible();
  await expect(openUrlPage.getByText("No credit card needed")).toBeVisible();
  await expect(openUrlPage.getByText("Easy to use")).toBeVisible();
  await expect(
    openUrlPage.getByLabel(commonFieldValues?.primaryButtonLabel)
  ).toBeVisible();

  await checkFormSubmission({
    page,
    thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
    pageUrl: openUrlPage,
    formFields: commonFieldValues?.formFields,
    submitBtnLabel: commonFieldValues?.formButtonLabel,
  });
}

export default VariantC;
