import { expect } from "@playwright/test";
import { updateLogoLink, expectDocumentPublished } from "tests/utils";
import { appPromoInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { titleField, subtitleField } from "tests/utils";

async function VariantA({ newPageTitle, page, commonFieldValues, baseURL }) {
  // studio
  await updateLogoLink(page, commonFieldValues?.logoAltText);

  await subtitleField.checkAndAddValue({
    page,
    initialValue: appPromoInitialValue,
    commonFieldValues,
  });

  await titleField.checkAndAddValue({
    page,
    initialValue: appPromoInitialValue,
    commonFieldValues,
  });

  // check site preview
  await expectDocumentPublished(page, newPageTitle);
  await expect(page.getByText(`${baseURL}`)).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  // subtitle
  await subtitleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  // title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  // logo link
  await expect(
    openUrlPage.getByLabel("Go to https://webriq.com")
  ).toBeVisible();
  await expect(
    openUrlPage
      .locator("a[target='_blank']")
      .and(openUrlPage.locator("a[rel='noopener noreferrer']"))
  ).toBeVisible();
  await expect(
    openUrlPage.getByAltText(commonFieldValues?.logoAltText)
  ).toBeVisible();

  // array of images - show 3
  await expect(
    openUrlPage.getByRole("img", { name: "appPromo-variantA-image-1" }).first()
  ).toBeVisible();
  await expect(
    openUrlPage.getByRole("img", { name: "appPromo-variantA-image-2" }).first()
  ).toBeVisible();
  await expect(
    openUrlPage.getByRole("img", { name: "appPromo-variantA-image-3" }).first()
  ).toBeVisible();
}

export default VariantA;
