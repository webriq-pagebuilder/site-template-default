import { expect } from "@playwright/test";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  descriptionField,
  expectDocumentPublished,
  launchPreview,
  subtitleField,
  titleField,
} from "tests/utils";

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
  // Launch preview
  await launchPreview({ page, baseURL, pageTitle });

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
  await expect(page.getByText(featuresInitialValue.tags?.[0])).toBeVisible();
  await expect(page.getByText(featuresInitialValue.tags?.[1])).toBeVisible();
  await expect(page.getByText(featuresInitialValue.tags?.[2])).toBeVisible();
  await expect(page.getByText(commonFieldValues?.tag)).toBeVisible();
}

export default VariantG;
