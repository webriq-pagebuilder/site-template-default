import { expect } from "@playwright/test";
import { cookiesInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  descriptionField,
  expectDocumentPublished,
  headingField,
  launchPreview,
} from "tests/utils";

const positionOptions = [
  "Top Left",
  "Top Right",
  "Bottom Right",
  "Bottom Left",
];

export default async function VariantA({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  //Heading
  await headingField.checkAndAddValue({
    page,
    initialValue: cookiesInitialValue,
    commonFieldValues,
  });

  //Description
  await descriptionField.checkAndAddValue({
    page,
    initialValue: cookiesInitialValue,
    placeholder: "Lorem ipsum",
    commonFieldValues,
  });

  //Enable Analytics
  await expect(page.getByText("Enable Analytics")).toBeVisible();
  await expect(page.getByLabel("Enable Analytics")).toBeVisible();
  await expect(page.getByLabel("Enable Analytics")).toBeEnabled();

  //Site Name
  await expect(
    page
      .getByTestId("field-variants.config.cookiePolicy.siteName")
      .getByTestId("string-input")
  ).toBeVisible();
  await page
    .getByTestId("field-variants.config.cookiePolicy.siteName")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.config.cookiePolicy.siteName")
    .getByTestId("string-input")
    .fill(commonFieldValues.siteName);

  //Cookie Policy Page
  await page
    .locator("label")
    .filter({ hasText: "External, outside this website" })
    .click();
  await expect(page.getByLabel("URL")).toBeVisible();
  await page.getByLabel("URL").click();
  await page.getByLabel("URL").fill("https://webriq.com");
  await expect(page.getByText("Link Target")).toBeVisible();

  await page
    .locator("label")
    .filter({ hasText: "Internal, inside this website" })
    .click();
  await expect(page.getByText("Page Reference")).toBeVisible();
  await expect(page.getByLabel("URL")).toBeHidden();
  await expect(page.getByText("Link Target")).toBeHidden();
  await page.getByTestId("autocomplete").click();
  await page.getByTestId("autocomplete").fill("thank you");
  await expect(
    page.getByRole("button", { name: "Thank You Page Published No" })
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Thank You Page Published No" })
    .click();
  await expect(page.getByText("Link Target")).toBeVisible();

  //Consent Modal
  await expect(page.getByText("Consent Modal", { exact: true })).toBeVisible();
  for (const position of positionOptions) {
    await expect(
      page.locator("label").filter({ hasText: position })
    ).toBeVisible();
    await page.locator("label").filter({ hasText: position }).click();
  }

  //Accept Button
  await page
    .getByTestId("field-variants.acceptButtonLabel")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.acceptButtonLabel")
    .getByTestId("string-input")
    .fill(commonFieldValues.acceptButton);

  //Decline Button
  await page
    .getByTestId("field-variants.declineButtonLabel")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.declineButtonLabel")
    .getByTestId("string-input")
    .fill(commonFieldValues.declineButton);

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  // Launch preview
  await launchPreview({ page, baseURL, pageTitle });

  //Heading
  await headingField.sitePreview({ pageUrl: page, commonFieldValues });

  //Description
  await descriptionField.sitePreview({ pageUrl: page, commonFieldValues });

  //Accept Button
  await expect(page.getByLabel(commonFieldValues.acceptButton)).toBeVisible();

  //Decline Button
  await expect(page.getByLabel(commonFieldValues.declineButton)).toBeVisible();

  //Manage
  await expect(page.getByLabel("Manage individual preferences")).toBeVisible();

  //Accept Cookie
  await page.getByLabel(commonFieldValues.acceptButton).click();
  await page.reload();

  //Application Cookies Storage
  const cookies = await page.context().cookies();
  const cookieConsent = cookies.find((cookie) => cookie.name === "cc_cookie");
  expect(cookieConsent).not.toBeNull(); // Ensure the cookie exists
  expect(cookieConsent.value).toBe("allow");
}
