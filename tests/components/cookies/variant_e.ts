import { expect } from "@playwright/test";
import { cookiesInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { expectDocumentPublished, headingField } from "tests/utils";

export default async function VariantE({ pageTitle, page, commonFieldValues }) {
  //Heading
  await headingField.checkAndAddValue({
    page,
    initialValue: cookiesInitialValue,
    commonFieldValues,
  });

  //Cookie Policy
  await expect(
    page.getByTestId("activate-overlay").locator("div").first()
  ).toBeVisible();
  await page.getByText("Click to activate").first().click({ force: true });
  await page.getByTestId("text-style--normal").nth(1).click({ force: true });
  await page.getByText("We use cookies to personalise").click({ force: true });
  await page.getByText("We use cookies to personalise").press("Meta+a");
  await page
    .getByText("We use cookies to personalise")
    .fill(commonFieldValues.cookiePolicy);

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

  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  //Heading
  await headingField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Cookie Policy
  await expect(
    openUrlPage.getByText(commonFieldValues.cookiePolicy)
  ).toBeVisible();

  //Accept Button
  await expect(
    openUrlPage.getByLabel(commonFieldValues.acceptButton)
  ).toBeVisible();

  //Decline Button
  await expect(
    openUrlPage.getByLabel(commonFieldValues.declineButton)
  ).toBeVisible();

  //Accept Cookie
  await openUrlPage.getByLabel(commonFieldValues.acceptButton).click();

  //Application Cookies Storage
  const cookies = await openUrlPage.context().cookies();
  const cookieConsent = cookies.find(
    (cookie) => cookie.name === "dxpstudio-cookieconsent"
  );
  expect(cookieConsent).not.toBeNull(); // Ensure the cookie exists
  expect(cookieConsent.value).toBe("allow");
}
