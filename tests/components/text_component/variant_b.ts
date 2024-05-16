import { expect } from "@playwright/test";
import { textComponentInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  createSlug,
  expectDocumentPublished,
  launchPreview,
  titleField,
} from "tests/utils";

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

  await launchPreview({ page, baseURL, pageTitle });

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  await expect(page.getByText(commonFieldValues.firstContent)).toBeVisible();
  await expect(page.getByText(commonFieldValues.secondContent)).toBeVisible();
}
