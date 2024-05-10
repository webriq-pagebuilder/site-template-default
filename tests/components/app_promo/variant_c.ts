import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { appPromoInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  titleField,
  subtitleField,
  descriptionField,
  createSlug,
} from "tests/utils";

async function VariantC({ pageTitle, page, commonFieldValues, baseURL }) {
  // studio
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
  await descriptionField.checkAndAddValue({
    page,
    initialValue: appPromoInitialValue,
    placeholder: appPromoInitialValue?.description,
    commonFieldValues,
  });

  await page
    .getByTestId("field-variants.tags")
    .getByRole("button")
    .first()
    .click({ force: true });
  await page
    .getByTestId("field-variants.tags")
    .getByTestId("change-bar__field-wrapper")
    .locator("div")
    .nth(3)
    .click({ force: true });
  await page.locator('[id="variants\\.tags"]').click();
  await page.locator('[id="variants\\.tags"]').fill("new app promo tag");
  await page.locator('[id="variants\\.tags"]').press("Enter");
  await expect(page.getByText("new app promo tag")).toBeVisible();

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  // subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  // title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  // description
  await descriptionField.sitePreview({
    pageUrl: page,
    commonFieldValues,
  });

  // tags
  await expect(
    page.locator("li").filter({ hasText: "new app promo tag" })
  ).toBeVisible();
  await expect(page.locator(".object-cover").first()).toBeVisible();
  await expect(page.locator("div:nth-child(2) > img").first()).toBeVisible();
  await expect(
    page.locator("div:nth-child(3) > .object-cover").first()
  ).toBeVisible();
  await expect(page.locator("img:nth-child(2)").first()).toBeVisible();

  // array of images - show 4
  await expect(
    page.getByRole("img", { name: "appPromo-variantC-image0" })
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    page.getByRole("img", { name: "appPromo-variantC-image1" }).first()
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    page.getByRole("img", { name: "appPromo-variantC-image1" }).nth(1)
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    page.getByRole("img", { name: "appPromo-variantC-image4" })
  ).toBeVisible({ timeout: 20_000 });
}

export default VariantC;
