import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { appPromoInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantC({ variantTitle, page, commonFieldValues }) {
  // subtitle test
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

  // title test
  const title = page
    .getByTestId("field-variants.title")
    .getByTestId("string-input");
  await expect(title.inputValue()).resolves.toBe(appPromoInitialValue.title);
  await title.click();
  await title.press("Meta+a");
  await title.fill(commonFieldValues?.title);
  await expect(title.inputValue()).resolves.toBe(commonFieldValues?.title);

  // description test
  const description = page.getByPlaceholder("Lorem ipsum dolor sit amet,");
  await expect(description.inputValue()).resolves.toBe(
    appPromoInitialValue.description
  );
  await description.click();
  await description.press("Meta+a");
  await description.fill(commonFieldValues?.description);
  await expect(description.inputValue()).resolves.toBe(
    commonFieldValues?.description
  );

  // stat items test
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

  // Save changes
  await page.getByTestId("action-Save").click({ timeout: 20000 });
  await page.getByRole("link", { name: "Close pane group" }).click();
  await expectDocumentPublished(page, variantTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  // test field values are correct from site preview
  await expect(
    openUrlPage.getByText(commonFieldValues?.subtitle)
  ).toBeVisible();

  await expect(openUrlPage.getByText(commonFieldValues?.title)).toBeVisible();

  await expect(
    openUrlPage.getByText(commonFieldValues?.description)
  ).toBeVisible();

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

  await expect(
    openUrlPage.getByRole("img", { name: "appPromo-variantC-image-1" }).first()
  ).toBeVisible();
  await expect(
    openUrlPage.getByRole("img", { name: "appPromo-variantC-image-2" }).first()
  ).toBeVisible();
  await expect(
    openUrlPage.getByRole("img", { name: "appPromo-variantC-image-3" }).first()
  ).toBeVisible();
  await expect(
    openUrlPage.getByRole("img", { name: "appPromo-variantD-image-3" }).first()
  ).toBeVisible();
}

export default VariantC;
