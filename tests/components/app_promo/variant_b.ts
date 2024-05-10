import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { appPromoInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  titleField,
  subtitleField,
  descriptionField,
  createSlug,
} from "tests/utils";
import { nanoid } from "nanoid";

async function VariantB({ pageTitle, page, commonFieldValues, baseURL }) {
  const uniqueKey = nanoid(4);

  const statItemsField = {
    label: "New Stat Item",
    value: uniqueKey,
  };

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
    .getByRole("button", { name: "Add item" })
    .first()
    .click({ force: true });
  await expect(page.getByLabel("Edit", { exact: true })).toBeVisible({
    timeout: 20_000,
  });

  // label
  await page.locator('input[data-as="input"][value=""]').nth(2).click();
  await page
    .locator('input[data-as="input"][value=""]')
    .nth(2)
    .fill(statItemsField.label);

  // value
  await page.locator('input[data-as="input"][value=""]').nth(2).click();
  await page
    .locator('input[data-as="input"][value=""]')
    .nth(2)
    .fill(statItemsField.value);
  await page.getByLabel("Close dialog").click();
  await expect(page.locator('[id="variants\\.statItems"]')).toContainText(
    `Label: ${statItemsField.label}`
  );
  await expect(page.locator('[id="variants\\.statItems"]')).toContainText(
    `Value: ${statItemsField.value}`
  );

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

  // stat items
  await expect(page.getByText(statItemsField.label)).toBeVisible();
  await expect(page.locator('[id="__next"]')).toContainText(
    statItemsField.value
  );
}

export default VariantB;
