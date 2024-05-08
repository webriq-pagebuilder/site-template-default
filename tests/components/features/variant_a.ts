import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

const featuresLength = featuresInitialValue.arrayOfImageTitleAndText.length;

async function VariantA({ pageTitle, page, commonFieldValues }) {
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
    ).toBeVisible({ timeout: 20_000 });
  }

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  // subtitle
  await expect(openUrlPage.locator('[id="__next"]')).toContainText(
    commonFieldValues?.subtitle
  );

  // title
  await expect(openUrlPage.locator('[id="__next"]')).toContainText(
    commonFieldValues?.title
  );

  // array of image title and text
  for (let i = 0; i < featuresLength; i++) {
    let imageTitle;

    i <= 0
      ? (imageTitle = openUrlPage
          .getByRole("img", { name: "features-image-" })
          .first())
      : (imageTitle = openUrlPage
          .getByRole("img", { name: "features-image-" })
          .nth(i));

    await expect(imageTitle).toBeVisible({ timeout: 20_000 });
    openUrlPage.locator(
      `p:has-text("${featuresInitialValue.arrayOfImageTitleAndText?.[i]?.plainText}")`
    );
  }
}

export default VariantA;