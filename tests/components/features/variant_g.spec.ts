import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantG({ newPageTitle, page, commonFieldValues }) {
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

  await expect(page.getByText("Featured Items")).toBeVisible();
  await expect(page.getByText("Vestibulum viverra ante non")).toBeVisible();
  await expect(page.getByText("Morbi mollis metus pretium")).toBeVisible();
  await expect(page.getByText("Etiam lectus nunc, commodo et")).toBeVisible();

  await page.locator('[id="variants\\.tags"]').click();
  await page.locator('[id="variants\\.tags"]').fill(commonFieldValues?.tag);
  await page.locator('[id="variants\\.tags"]').press("Enter");

  // check site preview
  await expectDocumentPublished(page, newPageTitle);
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

  // tags
  await expect(
    openUrlPage.getByText(featuresInitialValue.tags?.[0]).nth(4)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(featuresInitialValue.tags?.[1]).nth(4)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(featuresInitialValue.tags?.[2]).nth(4)
  ).toBeVisible();
  await expect(openUrlPage.getByText(commonFieldValues?.tag)).toBeVisible();
}

export default VariantG;
