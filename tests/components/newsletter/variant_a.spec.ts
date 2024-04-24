import { expect } from "@playwright/test";
import {
  updateLogoLink,
  generateFormId,
  expectDocumentPublished,
  checkFormSubmission,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { newsletterInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantA({ newPageTitle, page, commonFieldValues }) {
  // studio
  await updateLogoLink(page, commonFieldValues?.logoAltText);

  const title = page
    .getByTestId("field-variants.title")
    .getByTestId("string-input");
  await expect(title.inputValue()).resolves.toBe(newsletterInitialValue.title);
  await title.click();
  await title.press("Meta+a");
  await title.fill(commonFieldValues?.title);
  await expect(title.inputValue()).resolves.toBe(commonFieldValues?.title);

  const description = page.getByPlaceholder("Lorem ipsum dolor sit amet,");
  await expect(description.inputValue()).resolves.toBe(
    newsletterInitialValue.description
  );
  await description.click();
  await description.press("Meta+a");
  await description.fill(commonFieldValues?.description);
  await expect(description.inputValue()).resolves.toBe(
    commonFieldValues?.description
  );

  // forms
  await expect(
    page.getByTestId("field-variants.form.subtitle").getByTestId("string-input")
  ).toBeEmpty();
  await expect(
    page.getByTestId("field-variants.form.name").getByTestId("string-input")
  ).toBeEmpty();
  await generateFormId({ page });
  await expect(
    page.getByRole("button", { name: newsletterInitialValue.form?.[0]?.name })
  ).toBeVisible();
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .press("Meta+a");
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .fill(commonFieldValues?.formButtonLabel);
  await page.getByRole("button", { name: "Thank You page" }).click();
  await expect(
    page
      .getByTestId("field-variants.form.thankYouPage.linkType")
      .getByLabel("Internal, inside this website")
  ).not.toBeChecked();
  await expect(
    page
      .getByTestId("field-variants.form.thankYouPage.linkType")
      .getByLabel("External, outside this website")
  ).not.toBeChecked();
  await page
    .getByLabel("External, outside this website")
    .check({ force: true });
  await expect(page.getByLabel("URL")).toBeVisible();
  await page.getByLabel("URL").click();
  await page.getByLabel("URL").fill(commonFieldValues?.thankYouPageUrl);
  await expect(
    page
      .getByTestId("field-variants.logo.linkTarget")
      .locator("div")
      .filter({ hasText: "Link Target" })
      .nth(3)
  ).toBeVisible();
  await page.getByLabel("Self (default) - open in the").check();

  await page.getByTestId("action-Save").click({ timeout: 20000 });
  await page.getByRole("link", { name: "Close pane group" }).click();
  await expectDocumentPublished(page, newPageTitle);
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  // check site preview
  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;
  page
    .locator("section")
    .filter({ hasText: commonFieldValues?.title })
    .nth(1);

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
    openUrlPage.getByAltText(commonFieldValues?.logoAltText)
  ).toBeVisible();

  // title
  await expect(
    openUrlPage.getByRole("heading", { name: commonFieldValues?.title }).nth(1)
  ).toBeVisible();

  // description
  await expect(
    openUrlPage.getByText(commonFieldValues?.description)
  ).toBeVisible();

  // form submission
  await expect(
    openUrlPage.getByPlaceholder(newsletterInitialValue.form.fields?.[0]?.name)
  ).toBeVisible();
  await expect(
    openUrlPage.getByLabel(commonFieldValues?.formButtonLabel)
  ).toBeVisible();
  await expect(openUrlPage.getByLabel("Go to home page").nth(3)).toBeVisible();
  await checkFormSubmission({
    pageUrl: openUrlPage,
    formFields: newsletterInitialValue?.form?.fields?.[0],
    submitBtnLabel: commonFieldValues?.formButtonLabel,
    thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
    page,
  });
}

export default VariantA;
