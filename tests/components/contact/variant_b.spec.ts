import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { contactInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantB({ variantTitle, page, commonFieldValues }) {
  // title
  const title = page
    .getByTestId("field-variants.title")
    .getByTestId("string-input");
  await expect(title.inputValue()).resolves.toBe(contactInitialValue.title);
  await title.click();
  await title.press("Meta+a");
  await title.fill(commonFieldValues?.title);
  await expect(title.inputValue()).resolves.toBe(commonFieldValues?.title);

  // description
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

  // social links
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

  // contact details
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

  await page.getByTestId("action-Save").click({ timeout: 20000 });
  await page.getByRole("link", { name: "Close pane group" }).click();
  await expectDocumentPublished(page, variantTitle);
  await expect(page.getByRole("link", { name: variantTitle })).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  // check title, description, social links, contact details and form submission
  await expect(
    openUrlPage.getByRole("heading", {
      name: commonFieldValues?.title,
      exact: true,
    })
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues?.description)
  ).toBeVisible();
  await expect(
    openUrlPage.locator(`a[href=${commonFieldValues?.socialLinks?.facebook}]`)
  ).toBeVisible();
  await expect(
    openUrlPage.locator(`a[href=${commonFieldValues?.socialLinks?.twitter}]`)
  ).toBeVisible();
  await expect(
    openUrlPage.locator(`a[href=${commonFieldValues?.socialLinks?.instagram}]`)
  ).toBeVisible();
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
}

export default VariantB;
