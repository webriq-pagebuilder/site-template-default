import { expect } from "@playwright/test";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  launchPreview,
  subtitleField,
  titleField,
} from "tests/utils";

const featuresLength = featuresInitialValue.arrayOfImageTitleAndText.length;

async function VariantA({ pageTitle, page, commonFieldValues, baseURL }) {
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

  // array of image title and text
  for (let i = 0; i < featuresLength; i++) {
    let imageTitle;

    i <= 0
      ? (imageTitle = page
          .getByRole("img", { name: "features-image-" })
          .first())
      : (imageTitle = page
          .getByRole("img", { name: "features-image-" })
          .nth(i));

    await expect(imageTitle).toBeVisible();
    page.locator(
      `p:has-text("${featuresInitialValue.arrayOfImageTitleAndText?.[i]?.plainText}")`
    );
  }
}

export default VariantA;
