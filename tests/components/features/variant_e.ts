import { expect } from "@playwright/test";
import { descriptionField, expectDocumentPublished } from "tests/utils";
import { featuresInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

async function VariantE({ pageTitle, page, commonFieldValues, baseURL }) {
  // studio
  await expect(
    page.getByRole("button", { name: "Build & Launch without" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Learn how We will help you to" })
  ).toBeVisible();

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  await expect(page.getByText(`${baseURL}`)).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(
    openUrlPage.getByText(featuresInitialValue.featuredItems?.[0].subtitle)
  ).toBeVisible({ timeout: 150_000 });

  await expect(
    openUrlPage.getByRole("heading", {
      name: featuresInitialValue.featuredItems?.[0].title,
    })
  ).toBeVisible({ timeout: 150_000 });

  await expect(
    openUrlPage.getByText(featuresInitialValue.featuredItems?.[0].description)
  ).toBeVisible({ timeout: 150_000 });

  await expect(openUrlPage.getByLabel("Show Previous Feature")).toBeVisible();
  await expect(openUrlPage.getByLabel("Show Next Feature")).toBeVisible();
}

export default VariantE;
