import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantB({ newPageTitle, page, commonFieldValues }) {
  // studio
  const subtitle = page
    .getByTestId("field-variants.subtitle")
    .getByTestId("string-input");
  await expect(subtitle.inputValue()).resolves.toBe(
    featuresInitialValue.subtitle
  );
  await subtitle.click();
  await subtitle.press("Meta+a");
  await subtitle.fill(commonFieldValues?.title);
  await expect(subtitle.inputValue()).resolves.toBe(
    commonFieldValues?.subtitle
  );

  const title = page
    .getByTestId("field-variants.title")
    .getByTestId("string-input");
  await expect(title.inputValue()).resolves.toBe(featuresInitialValue.title);
  await title.click();
  await title.press("Meta+a");
  await title.fill(commonFieldValues?.title);
  await expect(title.inputValue()).resolves.toBe(commonFieldValues?.title);

  await expect(
    page.getByPlaceholder("Lorem ipsum dolor sit amet,")
  ).toBeVisible();
  await page.getByPlaceholder("Lorem ipsum dolor sit amet,").click();
  await page.getByPlaceholder("Lorem ipsum dolor sit amet,").press("Meta+a");
  await page
    .getByPlaceholder("Lorem ipsum dolor sit amet,")
    .fill(commonFieldValues?.description);

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

  await expectDocumentPublished(page, newPageTitle);
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  // check site preview
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
