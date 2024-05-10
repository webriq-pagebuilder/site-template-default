import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  assertInternalUrl,
  createSlug,
} from "tests/utils";

export default async function VariantA({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  await expect(
    page.getByRole("heading", { name: "SAMPLE. Black Dress" })
  ).toBeVisible();
  await expect(page.getByText(`$110.00`)).toBeVisible();
  await expect(page.getByText("Sample product description")).toBeVisible();

  //Select Sizes
  await page.getByLabel("Size").selectOption("S");
  await page.getByLabel("Size").selectOption("M");
  await page.getByLabel("Size").selectOption("L");

  //Increase Quantity
  await page.getByLabel("Increase Quantity").click();
  await expect(page.locator('input[value="2"]')).toBeVisible();

  //Decrease Quantity
  await page.getByLabel("Decrease Quantity").click();
  await expect(page.locator('input[value="1"]')).toBeVisible();

  //Add To Wishlist
  await page.getByLabel("Add to Wishlist").click();
  await expect(page.getByRole("link", { name: "View Wishlist" })).toBeVisible();

  //Click View Wishlist
  await page
    .getByRole("link", { name: "View Wishlist" })
    .click({ force: true });
  // await page.goto(`${baseURL}/wishlist`)
  page.waitForLoadState("domcontentloaded");

  //Expect Wishlist
  await expect(page.locator(`p:has-text("SAMPLE. Black Dress")`)).toBeVisible();
  await expect(page.locator(`p:has-text("$110.00")`)).toBeVisible();

  await assertInternalUrl(page, commonFieldValues.wishlistUrl);
  //Go back to slug page to remove wishlist
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);

  //Click remove from wishlist
  await page.locator("button p:has-text('Remove from wishlist')").click();
  await expect(
    page.locator("button p:has-text('Remove from wishlist')")
  ).toBeHidden();

  //Go to Wishlist URL
  await page.goto(commonFieldValues.wishlistUrl);

  //Expect wishlist empty
  await expect(
    page.getByRole("img", { name: "no products on wishlist" })
  ).toBeVisible();
  await expect(page.getByText("Wishlist is empty")).toBeVisible();

  await assertInternalUrl(page, commonFieldValues.wishlistUrl);
  //Loop links
  for (const links of commonFieldValues.socialLinks) {
    //Go back to slug page to loop links
    await expect(page.getByLabel(links.name)).toBeVisible();
    await expect(page.getByLabel(links.name)).toHaveAttribute(
      "target",
      "_blank"
    );
  }
}
