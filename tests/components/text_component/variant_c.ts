import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { expectDocumentPublished, titleFieldInput } from "tests/utils";

export default async function VariantC({ pageTitle, page, commonFieldValues }) {
  await titleFieldInput(page, commonFieldValues.title);

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

  //Third Content
  await expect(
    page.getByTestId("activate-overlay").locator("div").first()
  ).toBeVisible();
  await page.getByText("Click to activate").first().click({ force: true });
  await page.getByTestId("text-style--normal").nth(1).click({ force: true });
  await page
    .getByTestId("field-variants.thirdColumn")
    .getByRole("textbox")
    .fill("");
  await page
    .getByTestId("field-variants.thirdColumn")
    .getByRole("textbox")
    .fill(commonFieldValues.thirdContent);

  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.locator("section")).toBeVisible({
    timeout: 150_000,
  });
  await expect(
    openUrlPage.getByRole("heading", { name: commonFieldValues.title })
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues.firstContent)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues.secondContent)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues.thirdContent)
  ).toBeVisible();
}
