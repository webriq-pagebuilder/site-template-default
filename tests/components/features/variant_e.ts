import { expect } from "@playwright/test";
import { createSlug, expectDocumentPublished } from "tests/utils";
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
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  await page.waitForLoadState("domcontentloaded");

  await expect(
    page.getByText(featuresInitialValue.featuredItems?.[0].subtitle)
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: featuresInitialValue.featuredItems?.[0].title,
    })
  ).toBeVisible();

  await expect(
    page.getByText(featuresInitialValue.featuredItems?.[0].description)
  ).toBeVisible();

  await expect(page.getByLabel("Show Previous Feature")).toBeVisible();
  await expect(page.getByLabel("Show Next Feature")).toBeVisible();
}

export default VariantE;
