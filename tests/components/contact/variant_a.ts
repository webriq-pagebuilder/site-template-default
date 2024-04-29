import { expect } from "@playwright/test";
import {
  generateFormId,
  expectDocumentPublished,
  checkFormSubmission,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { contactInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantA({ newPageTitle, page, commonFieldValues }) {
  // studio
  const title = page
    .getByTestId("field-variants.title")
    .getByTestId("string-input");
  await expect(title.inputValue()).resolves.toBe(contactInitialValue.title);
  await title.click();
  await title.press("Meta+a");
  await title.fill(commonFieldValues?.title);
  await expect(title.inputValue()).resolves.toBe(commonFieldValues?.title);

  const description = page.getByPlaceholder("Lorem ipsum dolor sit amet,");
  await expect(description.inputValue()).resolves.toBe(
    contactInitialValue.contactDescription
  );
  await description.click();
  await description.press("Meta+a");
  await description.fill(commonFieldValues?.description);
  await expect(description.inputValue()).resolves.toBe(
    commonFieldValues?.description
  );

  await expect(
    page
      .getByTestId("field-variants.socialLinks")
      .locator("div")
      .filter({ hasText: "Social Links" })
      .nth(3)
  ).toBeVisible();
  await page.getByRole("button", { name: "facebook" }).click();
  await page.getByLabel("Social Media Link").click();
  await page.getByLabel("Social Media Link").press("Meta+a");
  await page
    .getByLabel("Social Media Link")
    .fill(commonFieldValues?.socialLinks?.facebook);
  await page.getByLabel("Close dialog").click();
  await page.getByRole("button", { name: "twitter" }).click();
  await page.getByLabel("Social Media Link").click();
  await page.getByLabel("Social Media Link").press("Meta+a");
  await page
    .getByLabel("Social Media Link")
    .fill(commonFieldValues?.socialLinks?.twitter);
  await page.getByLabel("Close dialog").click();
  await page.getByRole("button", { name: "instagram" }).click();
  await page.getByLabel("Social Media Link").click();
  await page.getByLabel("Social Media Link").press("Meta+a");
  await page
    .getByLabel("Social Media Link")
    .fill(commonFieldValues?.socialLinks?.instagram);

  const officeInfo = page
    .getByTestId("field-variants.officeInformation")
    .getByTestId("string-input");
  officeInfo.fill("");
  officeInfo.fill(commonFieldValues?.contactDetails.office);
  await expect(officeInfo.inputValue()).resolves.toBe(
    commonFieldValues?.contactDetails.office
  );

  const email = page
    .getByTestId("field-variants.contactEmail")
    .getByTestId("string-input");
  email.fill("");
  email.fill(commonFieldValues?.contactDetails.email);
  await expect(email.inputValue()).resolves.toBe(
    commonFieldValues?.contactDetails.email
  );

  const number = page
    .getByTestId("field-variants.contactNumber")
    .getByTestId("string-input");
  number.fill("");
  number.fill(commonFieldValues?.contactDetails.number);
  await expect(number.inputValue()).resolves.toBe(
    commonFieldValues?.contactDetails.number
  );

  // forms
  await generateFormId({ page });
  await expect(page.getByRole("button", { name: "Subject" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Name", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "name@example.com" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Message..." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Add file" })).toBeVisible();
  await expect(
    page
      .getByTestId("field-variants.form.buttonLabel")
      .getByTestId("string-input")
  ).toHaveValue(contactInitialValue.form.buttonLabel);
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .fill("");
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .fill(commonFieldValues?.formButtonLabel);
  await page.getByRole("button", { name: "Thank You page" }).click();
  await page
    .getByTestId("field-variants.form.thankYouPage.linkType")
    .getByLabel("External, outside this website")
    .check();
  await page
    .getByTestId("field-variants.form.thankYouPage.linkExternal")
    .getByLabel("URL")
    .click();
  await page
    .getByTestId("field-variants.form.thankYouPage.linkExternal")
    .getByLabel("URL")
    .fill(commonFieldValues?.thankYouPageUrl);
  await page
    .getByTestId("field-variants.form.thankYouPage.linkTarget")
    .getByLabel("Self (default) - open in the")
    .check();
  await expect(
    page.getByTestId("activate-overlay").locator("div").first()
  ).toBeVisible();
  await page.getByText("Click to activate").click({ force: true });
  await expect(page.getByText("I agree to terms and")).toContainText(
    contactInitialValue.block?.[0]?.children?.[0]?.text
  );
  await page.getByTestId("text-style--normal").nth(1).click({ force: true });
  await page.getByTestId("scroll-container").getByRole("textbox").fill("");
  await page
    .getByTestId("scroll-container")
    .getByRole("textbox")
    .fill("I agree to all the terms and conditions");

  // check site preview
  await expectDocumentPublished(page, newPageTitle);
  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  // title
  await expect(
    openUrlPage.getByRole("heading", {
      name: commonFieldValues?.title,
      exact: true,
    })
  ).toBeVisible();

  // description
  await expect(
    openUrlPage.getByText(commonFieldValues?.description)
  ).toBeVisible();

  // social links
  await expect(
    openUrlPage.locator(`a[href=${commonFieldValues?.socialLinks?.facebook}]`)
  ).toBeVisible();
  await expect(
    openUrlPage.locator(`a[href=${commonFieldValues?.socialLinks?.twitter}]`)
  ).toBeVisible();
  await expect(
    openUrlPage.locator(`a[href=${commonFieldValues?.socialLinks?.instagram}]`)
  ).toBeVisible();

  // contact info
  await expect(
    openUrlPage.getByText(commonFieldValues?.contactDetails?.office)
  ).toBeVisible();
  await expect(
    openUrlPage.getByRole("link", {
      name: commonFieldValues?.contactDetails?.email,
    })
  ).toBeVisible();
  await expect(
    openUrlPage.getByRole("link", {
      name: commonFieldValues?.contactDetails?.number,
    })
  ).toBeVisible();

  // forms
  await expect(openUrlPage.getByPlaceholder("Subject")).toBeVisible();
  await expect(
    openUrlPage.getByPlaceholder("Name", { exact: true })
  ).toBeVisible();
  await expect(openUrlPage.getByPlaceholder("name@example.com")).toBeVisible();
  await expect(openUrlPage.getByPlaceholder("Message...")).toBeVisible();
  await expect(openUrlPage.getByLabel("Add file")).toBeVisible();
  await expect(openUrlPage.getByLabel("Agree to terms")).not.toBeChecked();
  await expect(openUrlPage.getByText("I agree to terms and")).toBeVisible();
  await expect(
    openUrlPage.getByLabel(commonFieldValues?.formButtonLabel)
  ).toBeVisible();

  await checkFormSubmission({
    page,
    thankYouPageUrl: commonFieldValues?.thankYouPageUrl,
    pageUrl: openUrlPage,
    formFields: commonFieldValues?.formFields,
    submitBtnLabel: commonFieldValues?.formButtonLabel,
  });
}

export default VariantA;
