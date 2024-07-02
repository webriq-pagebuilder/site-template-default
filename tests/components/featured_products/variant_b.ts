import { expect } from "@playwright/test";
import {
  assertExternalUrl,
  assertInternalUrl,
  expectDocumentPublished,
  launchPreview,
} from "tests/utils";

export default async function VariantB({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  await createFeaturedProductsVariant(pageTitle, page);

  for (const product of commonFieldValues.products) {
    await launchPreview({ page, baseURL, pageTitle });
    await assertPageContent(page, product, commonFieldValues);
  }
}

async function createFeaturedProductsVariant(pageTitle, page) {
  await expectDocumentPublished(page, pageTitle);
}

async function assertPageContent(openUrlPage, product, commonFieldValues) {
  await expect(
    openUrlPage.getByRole("heading", { name: "All Products" })
  ).toBeVisible();
  await openUrlPage.waitForSelector('img[alt*="product-image-0"]');
  await openUrlPage.waitForSelector(`a:has-text("${product.name}")`, {
    state: "visible",
  });
  await expect(
    openUrlPage.getByRole("link", { name: product.name })
  ).toBeVisible();
  await expect(openUrlPage.getByText(product.price)).toBeVisible();
  await openUrlPage.getByRole("link", { name: product.name }).click();
  await openUrlPage.waitForLoadState("domcontentloaded");
  await expect(
    openUrlPage.getByRole("heading", { name: product.name })
  ).toBeVisible();

  await assertInternalUrl(openUrlPage, product.link);
  const formattedPrice = product.price.replace(".00", ""); // Remove '.00'
  await expect(
    openUrlPage.locator(`p:has-text("${formattedPrice}")`)
  ).toBeVisible();

  for (const links of commonFieldValues.socialLinks) {
    const page6Promise = openUrlPage.waitForEvent("popup");
    await expect(
      openUrlPage
        .locator(`a[href*="${links.socialLinkUrl.split("//")[1]}"]`)
        .first()
    ).toBeVisible();

    await openUrlPage
      .locator(`a[href*="${links.socialLinkUrl.split("//")[1]}"]`)
      .first()
      .click({ force: true });
    const page6 = await page6Promise;
    await assertExternalUrl(page6, links.socialLinkUrl);
    await openUrlPage.goto(`${product.link}`);
    await assertInternalUrl(openUrlPage, product.link);
  }
}
