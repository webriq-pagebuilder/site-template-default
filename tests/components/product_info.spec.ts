import { test, expect, type Page } from "@playwright/test";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import {
  autologin_studio,
  clickVariantImage,
  createNewPage,
  deletePageVariant,
  expectDocumentPublished,
  navigateToPage,
  variantLabelInput,
  verifyExternalUrl,
  verifyInternalUrl,
} from "tests/utils";

let page: Page;
let newPageTitle;
const wishlistUrl = `${NEXT_PUBLIC_SITE_URL}/wishlist`;
const socialLinks = [
  { name: "facebook", socialLinkUrl: "https://facebook.com/" },
  { name: "other", socialLinkUrl: "https://instagram.com/" },
  { name: "twitter", socialLinkUrl: "https://twitter.com/" },
];

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

async function createProductInfo(pageTitle, variantLabel, variantIndex) {
  newPageTitle = `${pageTitle} ` + new Date().getTime();

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Product Info");
  await clickVariantImage(page, variantIndex);
  await variantLabelInput(page, variantLabel);

  await expectDocumentPublished(page, newPageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await assertPageContent(openUrlPage);
}

async function assertPageContent(openUrlPage) {
  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({
    timeout: 20000,
  });

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
  await verifyInternalUrl(openUrlPage, wishlistUrl);

  //Expect Wishlist
  await expect(
    openUrlPage.locator(`p:has-text("SAMPLE. Black Dress")`)
  ).toBeVisible();
  await expect(openUrlPage.locator(`span:has-text("$110.00")`)).toBeVisible();

  const slug = newPageTitle
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

  await openUrlPage.goto(wishlistUrl);
  await verifyInternalUrl(openUrlPage, wishlistUrl);

  //Expect wishlist empty
  await expect(
    openUrlPage.getByRole("img", { name: "no products on wishlist" })
  ).toBeVisible();
  await expect(openUrlPage.getByText("Wishlist is empty")).toBeVisible();

  //Loop links
  for (const links of socialLinks) {
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

const productInfo = [
  {
    variantName: "Variant A",
    pageTitle: "Product Info Variant A",
    variantLabel: "Product Info New Page Variant A",
    variantIndex: 0,
  },
  {
    variantName: "Variant B",
    pageTitle: "Product Info Variant B",
    variantLabel: "Product Info New Page Variant B",
    variantIndex: 1,
  },
];

productInfo.forEach((variant) => {
  test.describe(`${variant.variantName} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.pageTitle}`, async () => {
      await createProductInfo(
        variant.pageTitle,
        variant.variantLabel,
        variant.variantIndex
      );
    });

    test(`Delete ${variant.pageTitle}`, async () => {
      await deletePageVariant(page, newPageTitle, variant.variantLabel);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});
