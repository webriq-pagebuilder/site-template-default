import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  verifyExternalUrl,
  verifyInternalUrl,
} from "tests/utils";

export default async function VariantB({ pageTitle, page, commonFieldValues }) {
  await createFeaturedProductsVariant(pageTitle, page);

  const slug = pageTitle
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  for (const product of commonFieldValues.products) {
    await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`);
    await assertPageContent(page, product, commonFieldValues);
  }
}

async function createFeaturedProductsVariant(pageTitle, page) {
  await expectDocumentPublished(page, pageTitle);
}

async function assertPageContent(openUrlPage, product, commonFieldValues) {
  await expect(openUrlPage.locator("section")).toBeVisible({
    timeout: 150_000,
  });
  await expect(
    openUrlPage.getByRole("heading", { name: "All Products" })
  ).toBeVisible();
  await expect(
    openUrlPage.getByRole("link", { name: product.name })
  ).toBeVisible();
  await expect(openUrlPage.getByText(product.price)).toBeVisible();
  await openUrlPage.getByRole("link", { name: product.name }).click();
  await openUrlPage.waitForLoadState("networkidle");
  await verifyInternalUrl(openUrlPage, product.link);
  await expect(
    openUrlPage.getByRole("heading", { name: product.name })
  ).toBeVisible();

  const formattedPrice = product.price.replace(".00", ""); // Remove '.00'
  await expect(
    openUrlPage.locator(`p:has-text("${formattedPrice}")`)
  ).toBeVisible();

  for (const links of commonFieldValues.socialLinks) {
    const page6Promise = openUrlPage.waitForEvent("popup");
    await openUrlPage
      .locator(`a[href*="${links.socialLinkUrl.split("//")[1]}"]`)
      .first()
      .click({ force: true });
    const page6 = await page6Promise;
    await verifyExternalUrl(page6, links.socialLinkUrl);
    await openUrlPage.goto(`${product.link}`);
    await verifyInternalUrl(openUrlPage, product.link);
  }
}
