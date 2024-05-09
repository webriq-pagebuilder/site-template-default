import { expect } from "@playwright/test";
import {
  descriptionField,
  expectDocumentPublished,
  subtitleField,
  titleField,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

const featuresLength = featuresInitialValue.arrayOfImageTitleAndText.length;

async function VariantB({ pageTitle, page, commonFieldValues, baseURL }) {
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

  // check features items
  for (let i = 0; i < featuresLength - 1; i++) {
    await expect(
      page.getByRole("button", {
        name: featuresInitialValue.arrayOfImageTitleAndText?.[i]?.title,
      })
    ).toBeVisible({ timeout: 20_000 });
  }

  await expect(page.getByText("Featured Items")).toBeVisible();
  await expect(page.getByText("Vestibulum viverra ante non")).toBeVisible();
  await expect(page.getByText("Morbi mollis metus pretium")).toBeVisible();
  await expect(page.getByText("Etiam lectus nunc, commodo et")).toBeVisible();

  await page.locator('[id="variants\\.tags"]').click();
  await page.locator('[id="variants\\.tags"]').fill(commonFieldValues?.tag);
  await page.locator('[id="variants\\.tags"]').press("Enter");

  // check site preview
  await expectDocumentPublished(page, pageTitle);
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

  // description
  await expect(openUrlPage.locator('[id="__next"]')).toContainText(
    commonFieldValues?.description
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

export default VariantB;
