import { expect } from "@playwright/test";
import { updateLogoLink, expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { appPromoInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantA({ newPageTitle, page, commonFieldValues }) {
  const logoAltText = "App promo logo";

  await updateLogoLink(page, logoAltText);

  // studio
  const subtitle = page
    .getByTestId("field-variants.subtitle")
    .getByTestId("string-input");
  await expect(subtitle.inputValue()).resolves.toBe(
    appPromoInitialValue.subtitle
  );
  await subtitle.click();
  await subtitle.press("Meta+a");
  await subtitle.fill(commonFieldValues?.subtitle);
  await expect(subtitle.inputValue()).resolves.toBe(
    commonFieldValues?.subtitle
  );

  const title = page
    .getByTestId("field-variants.title")
    .getByTestId("string-input");
  await expect(title.inputValue()).resolves.toBe(appPromoInitialValue.title);
  await title.click();
  await title.press("Meta+a");
  await title.fill(commonFieldValues?.title);
  await expect(title.inputValue()).resolves.toBe(commonFieldValues?.title);

  // check site preview
  await expectDocumentPublished(page, newPageTitle);
  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  // subtitle
  await expect(
    openUrlPage.getByText(commonFieldValues?.subtitle)
  ).toBeVisible();

  // title
  await expect(openUrlPage.getByText(commonFieldValues?.title)).toBeVisible();

  // logo link
  await expect(
    openUrlPage.getByLabel("Go to https://webriq.com")
  ).toBeVisible();
  await expect(
    openUrlPage
      .locator("a[target='_blank']")
      .and(openUrlPage.locator("a[rel='noopener noreferrer']"))
  ).toBeVisible();
  await expect(openUrlPage.getByAltText(logoAltText)).toBeVisible();

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
