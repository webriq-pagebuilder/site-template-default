import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  createSlug,
} from "tests/utils";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

const featuresLength = featuresInitialValue.arrayOfImageTitleAndText.length;

async function VariantH({ pageTitle, page, commonFieldValues, baseURL }) {
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

  // check features items
  for (let i = 0; i < featuresLength - 1; i++) {
    await expect(
      page.getByRole("button", {
        name: featuresInitialValue.arrayOfImageTitleAndText?.[i]?.title,
      })
    ).toBeVisible();
  }

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

  // array of image title and text
  for (let i = 1; i < featuresLength; i++) {
    await expect(
      page.getByRole("img", { name: `features-image-${i}` })
    ).toBeVisible();

    // title
    await expect(
      page.locator(
        `p:has-text("${featuresInitialValue.arrayOfImageTitleAndText?.[i]?.title}")`
      )
    ).toBeVisible();

    // plain text
    await expect(
      page.locator(
        `p:has-text("${featuresInitialValue.arrayOfImageTitleAndText?.[i]?.plainText}")`
      )
    ).toBeVisible();
  }
}

export default VariantH;
