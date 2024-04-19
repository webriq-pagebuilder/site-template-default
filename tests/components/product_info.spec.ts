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
} from "tests/utils";

let page: Page;
let newPageTitle;
const nameInput = "Test Name Input";
const subtitleInput = "Subtitle Input";
const priceInput = 1000;
const facebookUrl = "https://facebook.com/";
const socialLinks = [
  { name: "facebook", socialLinkUrl: "https://facebook.com/" },
  { name: "instagram", socialLinkUrl: "https://instagram.com/" },
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

  //Title
  await page.getByTestId("field-label").getByTestId("string-input").click();
  await page
    .getByTestId("field-label")
    .getByTestId("string-input")
    .fill(variantLabel);

  //   await page
  //     .getByRole("link", { name: "SAMPLE. Black Dress SAMPLE." })
  //     .click({ force: true });

  //   //Name
  //   await page.getByTestId("field-name").getByLabel("Name").click();
  //   await page.getByTestId("field-name").getByLabel("Name").fill(nameInput);
  //   await page.getByRole("button", { name: "Generate" }).click();

  //   //Price
  //   await page.getByLabel("Price").click();
  //   await page.getByLabel("Price").fill(priceInput);

  //   //Product Info Tab
  //   await page.getByRole("tab", { name: "Product Info" }).click();

  //   //Subtitle
  //   await page
  //     .getByTestId("field-productInfo.subtitle")
  //     .getByTestId("string-input")
  //     .click();
  //   await page
  //     .getByTestId("field-productInfo.subtitle")
  //     .getByTestId("string-input")
  //     .fill(subtitleInput);

  //   //Edit Social Links URL
  //   for (const social of socialLinks) {
  //     await page.getByRole("button", { name: social.name }).click();
  //     await expect(page.getByLabel("Edit Details")).toBeVisible();
  //     await page.getByLabel("Social Media Link").click();
  //     await page.getByLabel("Social Media Link").fill(social.socialLinkUrl);
  //   }

  //   //Add Social Links
  //   await page
  //     .getByTestId("field-productInfo.socialLinks")
  //     .getByRole("button", { name: "Add item" })
  //     .click();
  //   await expect(page.getByLabel("Edit Details")).toBeVisible();
  //   await page.getByLabel("Select the social media").selectOption("3");
  //   await page.getByLabel("Social Media Link").click();
  //   await page.getByLabel("Social Media Link").fill(facebookUrl);

  //   //Button Label
  //   const btnInput = "Button Test";
  //   await page
  //     .getByTestId("field-productInfo.btnLabel")
  //     .getByTestId("string-input")
  //     .click();
  //   await page
  //     .getByTestId("field-productInfo.btnLabel")
  //     .getByTestId("string-input")
  //     .fill(btnInput);

  //   await page.getByRole("button", { name: "Publish", exact: true }).click();
  //   await expect(
  //     page.getByRole("button", { name: "Publishing..." })
  //   ).toBeHidden();
  //   await expect(page.getByText("Successfully updated product")).toBeVisible();
  //   await expect(page.getByText("Successfully updated product")).toBeHidden();
  //   await page.getByRole("link", { name: "Close pane group" }).click();

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
  await openUrlPage.getByRole("link", { name: "View Wishlist" }).click();
  await openUrlPage.locator(`p:has-text("SAMPLE. Black Dress")`);
  await openUrlPage.locator(`span:has-text("$110.00")`);

  const slug = newPageTitle
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  //   await openUrlPage.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`);

  //   await openUrlPage.locator("button p:has-text('Remove from wishlist')");
  //   await openUrlPage.goto(`${NEXT_PUBLIC_SITE_URL}/wishlist`);
  //   await openUrlPage.waitForLoadState("networkidle");
  //   await expect(openUrlPage.getByText("Wishlist is empty")).toBeVisible();
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
      await deletePageVariant(page, newPageTitle);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});
