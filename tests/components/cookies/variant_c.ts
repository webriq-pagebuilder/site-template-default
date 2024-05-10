import { expect } from "@playwright/test";
import { cookiesInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { expectDocumentPublished, headingField, createSlug } from "tests/utils";

export default async function VariantC({
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

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  //Heading
  await headingField.sitePreview({ pageUrl: page, commonFieldValues });

  //Cookie Policy
  await expect(page.getByText(commonFieldValues.cookiePolicy)).toBeVisible();

  //Accept Button
  await expect(page.getByLabel(commonFieldValues.acceptButton)).toBeVisible();

  //Decline Button
  await expect(page.getByLabel(commonFieldValues.declineButton)).toBeVisible();

  //Accept Cookie
  await page.getByLabel(commonFieldValues.acceptButton).click();

  //Application Cookies Storage
  const cookies = await page.context().cookies();
  const cookieConsent = cookies.find(
    (cookie) => cookie.name === "dxpstudio-cookieconsent"
  );
  expect(cookieConsent).not.toBeNull(); // Ensure the cookie exists
  expect(cookieConsent.value).toBe("allow");
}
