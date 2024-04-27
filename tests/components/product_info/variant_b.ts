import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  verifyExternalUrl,
  verifyInternalUrl,
} from "tests/utils";

export default async function VariantB({ pageTitle, page, commonFieldValues }) {
  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await assertPageContent(openUrlPage, pageTitle, commonFieldValues);
}

async function assertPageContent(openUrlPage, pageTitle, commonFieldValues) {
  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20_000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({ timeout: 20_000 });

  await expect(
    openUrlPage.getByRole("heading", { name: "SAMPLE. Black Dress" })
  ).toBeVisible();
  await expect(openUrlPage.getByText(`$110.00`)).toBeVisible();
  await expect(
    openUrlPage.getByText("Sample product description")
  ).toBeVisible();

  //Select Sizes
  await openUrlPage.getByLabel("Size").selectOption("S");
  await openUrlPage.getByLabel("Size").selectOption("M");
  await openUrlPage.getByLabel("Size").selectOption("L");

  //Increase Quantity
  await openUrlPage.getByLabel("Increase Quantity").click();
  await expect(openUrlPage.locator('input[value="2"]')).toBeVisible();

  //Decrease Quantity
  await openUrlPage.getByLabel("Decrease Quantity").click();
  await expect(openUrlPage.locator('input[value="1"]')).toBeVisible();

  //Add To Wishlist
  await openUrlPage.getByLabel("Add to Wishlist").click();
  await expect(
    openUrlPage.getByRole("link", { name: "View Wishlist" })
  ).toBeVisible();

  //Click View Wishlist
  await openUrlPage
    .getByRole("link", { name: "View Wishlist" })
    .click({ force: true });

  await openUrlPage.waitForTimeout(15000);
  await verifyInternalUrl(openUrlPage, commonFieldValues.wishlistUrl);

  //Expect Wishlist
  await expect(
    openUrlPage.locator(`p:has-text("SAMPLE. Black Dress")`)
  ).toBeVisible();
  await expect(openUrlPage.locator(`span:has-text("$110.00")`)).toBeVisible();

  const slug = pageTitle
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  //Go back to slug page to remove wishlist
  await openUrlPage.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`);

  //Click remove from wishlist
  await openUrlPage
    .locator("button p:has-text('Remove from wishlist')")
    .click();
  await expect(
    openUrlPage.locator("button p:has-text('Remove from wishlist')")
  ).toBeHidden();

  await openUrlPage.goto(commonFieldValues.wishlistUrl);
  await verifyInternalUrl(openUrlPage, commonFieldValues.wishlistUrl);

  //Expect wishlist empty
  await expect(
    openUrlPage.getByRole("img", { name: "no products on wishlist" })
  ).toBeVisible();
  await expect(openUrlPage.getByText("Wishlist is empty")).toBeVisible();

  //Loop links
  for (const links of commonFieldValues.socialLinks) {
    //Go back to slug page to loop links
    await openUrlPage.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`);
    await expect(openUrlPage.getByLabel(links.name)).toBeVisible();
    const page10Promise = openUrlPage.waitForEvent("popup");
    await openUrlPage
      .getByRole("link", { name: links.name })
      .click({ force: true });
    const page10 = await page10Promise;
    await verifyExternalUrl(page10, links.socialLinkUrl);
  }
}
