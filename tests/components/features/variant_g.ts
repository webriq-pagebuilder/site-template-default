import { expect } from "@playwright/test";
import {
  descriptionField,
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
} from "tests/utils";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantG({ pageTitle, page, commonFieldValues, baseURL }) {
  // studio
  await subtitleField.checkAndAddValue({
    page,
    initialValue: featuresInitialValue,
    commonFieldValues,
  });
  await titleField.checkAndAddValue({
    page,
    initialValue: featuresInitialValue,
    commonFieldValues,
  });
  await descriptionField.checkAndAddValue({
    page,
    initialValue: featuresInitialValue,
    placeholder: featuresInitialValue.description,
    commonFieldValues,
  });

  await expect(page.getByText("Featured Items")).toBeVisible();
  await expect(page.getByText("Vestibulum viverra ante non")).toBeVisible();
  await expect(page.getByText("Morbi mollis metus pretium")).toBeVisible();
  await expect(page.getByText("Etiam lectus nunc, commodo et")).toBeVisible();

  await page.locator('[id="variants\\.tags"]').click();
  await page.locator('[id="variants\\.tags"]').fill(commonFieldValues?.tag);
  await page.locator('[id="variants\\.tags"]').press("Enter");

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  // subtitle
  await expect(page.locator('[id="__next"]')).toContainText(
    commonFieldValues?.subtitle
  );

  // title
  await expect(page.locator('[id="__next"]')).toContainText(
    commonFieldValues?.title
  );

  // description
  await expect(page.locator('[id="__next"]')).toContainText(
    commonFieldValues?.description
  );

  // tags
  await expect(page.getByText(featuresInitialValue.tags?.[0])).toBeVisible({
    timeout: 20_000,
  });
  await expect(page.getByText(featuresInitialValue.tags?.[1])).toBeVisible({
    timeout: 20_000,
  });
  await expect(page.getByText(featuresInitialValue.tags?.[2])).toBeVisible({
    timeout: 20_000,
  });
  await expect(page.getByText(commonFieldValues?.tag)).toBeVisible({
    timeout: 20_000,
  });
}

export default VariantG;
