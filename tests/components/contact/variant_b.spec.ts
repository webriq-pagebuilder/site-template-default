import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { contactInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantB({ newPageTitle, page, commonFieldValues }) {
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
}

export default VariantB;
