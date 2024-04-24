import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { appPromoInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantB({ newPageTitle, page, commonFieldValues }) {
  const time = new Date().getTime();

  const statItemsField = {
    label: "New Stat Item",
    value: time.toString(),
  };

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

  await page.getByRole("button", { name: "Add item" }).click({ force: true });
  await page
    .getByTestId("field-variants.statItems.label")
    .getByTestId("string-input")
    .fill(statItemsField.label);
  await page
    .getByTestId("field-variants.statItems.value")
    .getByTestId("string-input")
    .fill(statItemsField.value);
  await page.getByLabel("Close dialog").click();
  await expect(page.locator('[id="variants\\.statItems"]')).toContainText(
    `Label: ${statItemsField.label}`
  );
  await expect(page.locator('[id="variants\\.statItems"]')).toContainText(
    `Value: ${statItemsField.value}`
  );

  // Save changes
  await page.getByTestId("action-Save").click({ timeout: 20000 });
  await page.getByRole("link", { name: "Close pane group" }).click();
  await expectDocumentPublished(page, newPageTitle);

  // check site preview
  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  // subtitle
  await expect(
    openUrlPage.getByText(commonFieldValues?.subtitle)
  ).toBeVisible();

  // title
  await expect(openUrlPage.getByText(commonFieldValues?.title)).toBeVisible();

  // description
  await expect(
    openUrlPage.getByText(commonFieldValues?.description)
  ).toBeVisible();

  // stat items
  await expect(openUrlPage.getByText(statItemsField.label)).toBeVisible();
  await expect(openUrlPage.locator('[id="__next"]')).toContainText(
    statItemsField.value
  );
}

export default VariantB;
