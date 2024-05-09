import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { appPromoInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { titleField, subtitleField, descriptionField } from "tests/utils";

async function VariantC({ newPageTitle, page, commonFieldValues, baseURL }) {
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
  await expectDocumentPublished(page, newPageTitle);
  await expect(page.getByText(`${baseURL}`)).toBeVisible();
  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  // subtitle
  await subtitleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  // title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  // description
  await descriptionField.sitePreview({
    pageUrl: openUrlPage,
    commonFieldValues,
  });

  // tags
  await expect(
    openUrlPage.locator("li").filter({ hasText: "new app promo tag" })
  ).toBeVisible();
  await expect(openUrlPage.locator(".object-cover").first()).toBeVisible();
  await expect(
    openUrlPage.locator("div:nth-child(2) > img").first()
  ).toBeVisible();
  await expect(
    openUrlPage.locator("div:nth-child(3) > .object-cover").first()
  ).toBeVisible();
  await expect(openUrlPage.locator("img:nth-child(2)").first()).toBeVisible();

  // array of images - show 4
  await expect(
    openUrlPage.getByRole("img", { name: "appPromo-variantC-image0" })
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    openUrlPage.getByRole("img", { name: "appPromo-variantC-image1" }).first()
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    openUrlPage.getByRole("img", { name: "appPromo-variantC-image1" }).nth(1)
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    openUrlPage.getByRole("img", { name: "appPromo-variantC-image4" })
  ).toBeVisible({ timeout: 20_000 });
}

export default VariantC;
