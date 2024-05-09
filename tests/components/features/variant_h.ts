import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
} from "tests/utils";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

const featuresLength = featuresInitialValue.arrayOfImageTitleAndText.length;

async function VariantH({ newPageTitle, page, commonFieldValues, baseURL }) {
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
  await expectDocumentPublished(page, newPageTitle);
  await expect(page.getByText(`${baseURL}`)).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
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
  for (let i = 1; i < featuresLength; i++) {
    await expect(
      openUrlPage.getByRole("img", { name: `features-image-${i}` })
    ).toBeVisible({ timeout: 20_000 });

    // title
    await expect(
      openUrlPage.locator(
        `p:has-text("${featuresInitialValue.arrayOfImageTitleAndText?.[i]?.title}")`
      )
    ).toBeVisible({ timeout: 20_000 });

    // plain text
    await expect(
      openUrlPage.locator(
        `p:has-text("${featuresInitialValue.arrayOfImageTitleAndText?.[i]?.plainText}")`
      )
    ).toBeVisible({ timeout: 20_000 });
  }
}

export default VariantH;
