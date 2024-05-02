import { expect } from "@playwright/test";
import {
  descriptionField,
  expectDocumentPublished,
  subtitleField,
  titleField,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantB({ pageTitle, page, commonFieldValues }) {
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

  await expect(
    page.getByRole("button", {
      name: featuresInitialValue.arrayOfImageTitleAndText?.[0]?.title,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: featuresInitialValue.arrayOfImageTitleAndText?.[1]?.title,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: featuresInitialValue.arrayOfImageTitleAndText?.[2]?.title,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: featuresInitialValue.arrayOfImageTitleAndText?.[3]?.title,
    })
  ).toBeVisible();

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

  // description
  await expect(openUrlPage.locator('[id="__next"]')).toContainText(
    commonFieldValues?.description
  );

  // array of image title and text
  await expect(
    openUrlPage.getByRole("img", { name: "features-image-" }).first()
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(
      featuresInitialValue.arrayOfImageTitleAndText?.[0]?.title
    )
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(
      featuresInitialValue.arrayOfImageTitleAndText?.[0]?.plainText
    )
  ).toBeVisible();
  await expect(
    openUrlPage.getByRole("img", { name: "features-image-" }).nth(1)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(
      featuresInitialValue.arrayOfImageTitleAndText?.[1]?.title
    )
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(
      featuresInitialValue.arrayOfImageTitleAndText?.[1]?.plainText
    )
  ).toBeVisible();
  await expect(
    openUrlPage.getByRole("img", { name: "features-image-" }).nth(2)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(
      featuresInitialValue.arrayOfImageTitleAndText?.[2]?.title
    )
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(
      featuresInitialValue.arrayOfImageTitleAndText?.[2]?.plainText
    )
  ).toBeVisible();
  await expect(
    openUrlPage.getByRole("img", { name: "features-image-" }).nth(3)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(
      featuresInitialValue.arrayOfImageTitleAndText?.[3]?.title
    )
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(
      featuresInitialValue.arrayOfImageTitleAndText?.[3]?.plainText
    )
  ).toBeVisible();
}

export default VariantB;
