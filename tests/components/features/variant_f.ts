import { expect } from "@playwright/test";
import {
  descriptionField,
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
} from "tests/utils";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantF({ pageTitle, page, commonFieldValues, baseURL }) {
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

  await page.getByRole("button", { name: "Primary Button" }).click();
  await expect(
    page
      .getByTestId("field-variants.primaryButton.label")
      .getByTestId("string-input")
  ).toHaveValue(featuresInitialValue.primaryButton.label);
  await expect(page.getByLabel("Internal, inside this website")).toBeChecked();
  await expect(page.getByTestId("autocomplete")).toBeEmpty();
  await page.getByLabel("External, outside this website").check();
  await page.getByLabel("URL").click();
  await page.getByLabel("URL").fill("https://webriq.com");
  await expect(page.getByLabel("Self (default) - open in the")).toBeChecked();

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

  // primary button
  await expect(page.locator('[id="__next"]')).toContainText(
    featuresInitialValue?.primaryButton.label
  );
}

export default VariantF;
