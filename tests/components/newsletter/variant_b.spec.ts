import { expect } from "@playwright/test";
import {
  updateLogoLink,
  generateFormId,
  expectDocumentPublished,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { newsletterInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantB({ variantTitle, page, commonFieldValues }) {
  // logo link
  await updateLogoLink(page, commonFieldValues?.logoAltText);

  // title
  const title = page
    .getByTestId("field-variants.title")
    .getByTestId("string-input");
  await expect(title.inputValue()).resolves.toBe(newsletterInitialValue.title);
  await title.click();
  await title.press("Meta+a");
  await title.fill(commonFieldValues?.title);
  await expect(title.inputValue()).resolves.toBe(commonFieldValues?.title);

  // description
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

  // webriq forms
  await expect(
    page.getByTestId("field-variants.form.subtitle").getByTestId("string-input")
  ).toBeEmpty();
  await expect(
    page.getByTestId("field-variants.form.name").getByTestId("string-input")
  ).toBeEmpty();

  await generateFormId({ page });

  // form button
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

  // thank you page
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
  await expectDocumentPublished(page, variantTitle);
  await expect(page.getByRole("link", { name: variantTitle })).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  page
    .locator("section")
    .filter({ hasText: commonFieldValues?.title })
    .nth(1);

  // check logo, title, description, and form fields
  await expect(
    openUrlPage.getByRole("heading", { name: commonFieldValues?.title }).nth(1)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues?.description)
  ).toBeVisible();
  await expect(
    openUrlPage.getByPlaceholder(newsletterInitialValue.form.fields?.[0]?.name)
  ).toBeVisible();
  await expect(
    openUrlPage.getByLabel(commonFieldValues?.formButtonLabel)
  ).toBeVisible();
  await expect(openUrlPage.getByLabel("Go to home page").nth(3)).toBeVisible();
  await CheckFormSubmission({
    pageUrl: openUrlPage,
    formFields: newsletterInitialValue?.form?.fields?.[0],
    buttonLabel: commonFieldValues?.formButtonLabel,
    thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
    page,
  });
}

async function CheckFormSubmission({
  pageUrl,
  formFields,
  buttonLabel,
  thankYouPageUrl,
  page,
}) {
  await pageUrl.getByPlaceholder(formFields.placeholder).click();
  await pageUrl.getByPlaceholder(formFields.placeholder).fill(formFields.value);
  await pageUrl.getByLabel(buttonLabel).click();
  await expect(pageUrl.getByText("Sending form data...")).toBeVisible();
  await expect(pageUrl.getByText("✔ Successfully sent form data")).toBeVisible(
    { timeout: 60000 }
  );
  await page.goto(thankYouPageUrl);
}

export default VariantB;
