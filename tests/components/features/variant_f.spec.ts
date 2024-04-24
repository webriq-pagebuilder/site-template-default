import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantF({ newPageTitle, page, commonFieldValues }) {
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

  // primary button
  await expect(openUrlPage.locator('[id="__next"]')).toContainText(
    commonFieldValues?.primaryButtonLabel
  );
}

export default VariantF;
