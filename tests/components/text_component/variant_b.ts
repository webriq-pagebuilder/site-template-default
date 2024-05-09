import { expect } from "@playwright/test";
import { textComponentInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { expectDocumentPublished, titleField } from "tests/utils";

export default async function VariantB({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: textComponentInitialValue,
    commonFieldValues,
  });

  //First Content
  await expect(
    page.getByTestId("activate-overlay").locator("div").first()
  ).toBeVisible();
  await page.getByText("Click to activate").first().click({ force: true });
  await page.getByTestId("text-style--normal").nth(1).click({ force: true });
  await page
    .getByTestId("field-variants.firstColumn")
    .getByRole("textbox")
    .fill("");
  await page
    .getByTestId("field-variants.firstColumn")
    .getByRole("textbox")
    .fill(commonFieldValues.firstContent);

  //Second Content
  await expect(
    page.getByTestId("activate-overlay").locator("div").first()
  ).toBeVisible();
  await page.getByText("Click to activate").first().click({ force: true });
  await page.getByTestId("text-style--normal").nth(1).click({ force: true });
  await page
    .getByTestId("field-variants.secondColumn")
    .getByRole("textbox")
    .fill("");
  await page
    .getByTestId("field-variants.secondColumn")
    .getByRole("textbox")
    .fill(commonFieldValues.secondContent);

  await expectDocumentPublished(page, pageTitle);
  await expect(page.getByText(`${baseURL}`)).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  //Title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  await expect(
    openUrlPage.getByText(commonFieldValues.firstContent)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues.secondContent)
  ).toBeVisible();
}
