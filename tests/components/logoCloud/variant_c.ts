import { expect } from "@playwright/test";
import { expectDocumentPublished, titleField, createSlug } from "tests/utils";
import { logoCloudInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default async function VariantC({
  pageTitle,
  page,
  commonFieldValues,
  isInternalLink,
  baseURL,
}) {
  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: logoCloudInitialValue,
    commonFieldValues,
  });

  await page.getByRole("button", { name: "Primary Button" }).click();
  await page
    .getByTestId("field-variants.primaryButton.label")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.primaryButton.label")
    .getByTestId("string-input")
    .fill(commonFieldValues.primaryBtn);

  if (isInternalLink) {
    await page.getByText("Internal, inside this website").click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page.getByRole("button", { name: "Thank you Published No" }).click();
    await page.getByText("Self (default) - open in the").click();
  } else {
    await page.getByText("External, outside this website").click();
    await page.getByLabel("URL").click();
    await page.getByLabel("URL").fill(commonFieldValues.externalLinkUrl);
    await page.getByText("Blank - open on a new tab (").click();
  }

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  await expect(
    page.locator(".mx-auto > .relative > div").first().hover()
  ).toBeTruthy();
  await expect(
    page.locator(".relative > div:nth-child(2)").hover()
  ).toBeTruthy();
  await expect(page.locator("div:nth-child(3)").first().hover()).toBeTruthy();
  await expect(page.locator("div:nth-child(4)").first().hover()).toBeTruthy();
  await expect(page.locator("div:nth-child(5)").first().hover()).toBeTruthy();
  await expect(page.locator("div:nth-child(6)").first().hover()).toBeTruthy();

  await page.getByLabel(commonFieldValues.primaryBtn).click();
  if (!isInternalLink) {
    await expect(
      page.locator(`a[aria-label="${commonFieldValues.primaryBtn}"]`)
    ).toHaveAttribute("target", "_blank");
  } else {
    await expect(
      page.locator(`a[aria-label="${commonFieldValues.primaryBtn}"]`)
    ).toHaveAttribute("target", "_self");
  }
}
