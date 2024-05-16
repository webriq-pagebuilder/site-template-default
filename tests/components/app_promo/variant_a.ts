import { expect } from "@playwright/test";
import {
  titleField,
  subtitleField,
  updateLogoLink,
  expectDocumentPublished,
  createSlug,
  launchPreview,
} from "tests/utils";
import { appPromoInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantA({ pageTitle, page, commonFieldValues, baseURL }) {
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

  await expectDocumentPublished(page, pageTitle);

  // Launch preview
  await launchPreview({ page, baseURL, pageTitle });

  // subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  // title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  // logo link
  await expect(page.getByLabel("Go to https://webriq.com")).toBeVisible();
  await expect(
    page
      .locator("a[target='_blank']")
      .and(page.locator("a[rel='noopener noreferrer']"))
  ).toBeVisible();
  await expect(page.getByAltText(commonFieldValues?.logoAltText)).toBeVisible();

  // array of images - show 3
  await expect(
    page.getByRole("img", { name: "appPromo-variantA-image-1" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: "appPromo-variantA-image-2" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: "appPromo-variantA-image-3" }).first()
  ).toBeVisible();
}

export default VariantA;
