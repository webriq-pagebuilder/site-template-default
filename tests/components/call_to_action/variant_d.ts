import { expect } from "@playwright/test";
import {
  checkFormSubmission,
  updateLogoLink,
  CTAWebriQForm,
  expectDocumentPublished,
  titleField,
  createSlug,
} from "tests/utils";
import { callToActionInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantD({ pageTitle, page, commonFieldValues, baseURL }) {
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

  await page.getByRole("button", { name: "Primary Button" }).click();
  await page
    .getByTestId("field-variants.primaryButton.label")
    .getByTestId("string-input")
    .fill(commonFieldValues?.primaryButtonLabel);
  await expect(
    page
      .getByTestId("field-variants.primaryButton.linkType")
      .getByLabel("Internal, inside this website")
  ).toBeChecked();
  await page
    .getByTestId("field-variants.primaryButton.linkType")
    .getByText("External, outside this website")
    .click();
  await page
    .getByTestId("field-variants.primaryButton.linkExternal")
    .getByLabel("URL")
    .click();
  await page
    .getByTestId("field-variants.primaryButton.linkExternal")
    .getByLabel("URL")
    .fill(commonFieldValues?.externalLinkUrl);
  await page
    .getByTestId("field-variants.primaryButton.linkTarget")
    .getByText("Blank - open on a new tab (")
    .click();
  commonFieldValues?.externalLinkUrl.replace("https://www.", "https://");

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

  // logo
  await expect(
    page.locator(
      'a[aria-label="Go to https://webriq.com"][target="_blank"][rel="noopener noreferrer"]'
    )
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    page.getByAltText(commonFieldValues?.ctaLogoAltText)
  ).toBeVisible({ timeout: 20_000 });

  // 05-03-2024 defer tests for forms
  // await checkFormSubmission({
  //   page,
  //   thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
  //   pageUrl: page,
  //   formFields: commonFieldValues?.formFields,
  //   submitBtnLabel: commonFieldValues?.formButtonLabel,
  // });
}

export default VariantD;
