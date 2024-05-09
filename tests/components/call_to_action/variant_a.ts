import { expect } from "@playwright/test";
import {
  updateLogoLink,
  expectDocumentPublished,
  titleField,
} from "tests/utils";
import { callToActionInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantA({ pageTitle, page, commonFieldValues, baseURL }) {
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

  await page.getByRole("button", { name: "Primary Button" }).click();

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  await expect(page.getByText(`${baseURL}`)).toBeVisible();

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
      .filter({ hasText: commonFieldValues?.description })
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

  // primary button
  await expect(
    openUrlPage.getByRole("link", {
      name: commonFieldValues?.primaryButtonLabel,
    })
  ).toBeVisible({ timeout: 20_000 });
}

export default VariantA;
