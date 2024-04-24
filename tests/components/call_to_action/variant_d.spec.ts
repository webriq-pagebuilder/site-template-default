import { expect } from "@playwright/test";
import {
  checkFormSubmission,
  updateLogoLink,
  CTAWebriQForm,
  expectDocumentPublished,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { callToActionInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantD({ newPageTitle, page, commonFieldValues }) {
  const blankLinkTarget = {
    element: page.getByText("Blank - open on a new tab ("),
    target: "Blank - open on a new tab (",
  };

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
  await blankLinkTarget.element.click();
  commonFieldValues?.externalLinkUrl.replace("https://www.", "https://");

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

  // logo
  await expect(
    openUrlPage.getByLabel("Go to https://webriq.com")
  ).toBeVisible();
  await expect(
    openUrlPage
      .locator("a[target='_blank']")
      .and(openUrlPage.locator("a[rel='noopener noreferrer']"))
  ).toBeVisible();
  await expect(
    openUrlPage.getByAltText(commonFieldValues?.ctaLogoAltText)
  ).toBeVisible();

  // forms
  await checkFormSubmission({
    page,
    thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
    pageUrl: openUrlPage,
    formFields: commonFieldValues?.formFields,
    submitBtnLabel: commonFieldValues?.formButtonLabel,
  });
}

export default VariantD;
