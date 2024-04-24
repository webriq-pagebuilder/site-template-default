import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantE({ newPageTitle, page, commonFieldValues }) {
  // studio
  await expect(
    page.getByPlaceholder("Lorem ipsum dolor sit amet,")
  ).toBeVisible();
  await page.getByPlaceholder("Lorem ipsum dolor sit amet,").click();
  await page.getByPlaceholder("Lorem ipsum dolor sit amet,").press("Meta+a");
  await page
    .getByPlaceholder("Lorem ipsum dolor sit amet,")
    .fill(commonFieldValues?.description);
  await expect(
    page.getByRole("button", { name: "Build & Launch without" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Learn how We will help you to" })
  ).toBeVisible();

  // check site preview
  await expectDocumentPublished(page, newPageTitle);
  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.locator('[id="__next"]')).toContainText(
    commonFieldValues?.description
  );

  await expect(openUrlPage.locator('[id="__next"]')).toContainText(
    featuresInitialValue.featuredItems?.[0]?.subtitle
  );
  await expect(openUrlPage.locator('[id="__next"]')).toContainText(
    featuresInitialValue.featuredItems?.[0]?.title
  );
  await expect(openUrlPage.locator('[id="__next"]')).toContainText(
    featuresInitialValue.featuredItems?.[0]?.description
  );
  await expect(openUrlPage.getByLabel("Show Previous Feature")).toBeVisible();
  await expect(openUrlPage.getByLabel("Show Next Feature")).toBeVisible();
}

export default VariantE;
