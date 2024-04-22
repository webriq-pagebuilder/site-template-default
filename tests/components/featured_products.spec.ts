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
  verifyInternalUrl,
} from "tests/utils";

let page: Page;
let newPageTitle;

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

const products = [
  {
    name: "SAMPLE. Yellow Dress",
    price: "$15.00",
    link: `${NEXT_PUBLIC_SITE_URL}/products/sample-yellow-dress`,
  },
  {
    name: "SAMPLE. Black Dress",
    price: "$110.00",
    link: `${NEXT_PUBLIC_SITE_URL}/products/sample-black-dress`,
  },
  {
    name: "SAMPLE. Sunglasses",
    price: "$19.95",
    link: `${NEXT_PUBLIC_SITE_URL}/products/sample-sunglasses`,
  },
  {
    name: "SAMPLE. Boardshorts",
    price: "$55.00",
    link: `${NEXT_PUBLIC_SITE_URL}/products/sample-boardshorts`,
  },
  {
    name: "Staging Sample Products",
    price: "$140.75",
    link: `${NEXT_PUBLIC_SITE_URL}/products/staging-sample-product`,
  },
];

async function createFeaturedProductsVariant(
  pageTitle,
  variantLabel,
  variantIndex
) {
  newPageTitle = `${pageTitle} ` + new Date().getTime();

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Featured Products");
  await clickVariantImage(page, variantIndex);
  await variantLabelInput(page, variantLabel);

  await expectDocumentPublished(page, newPageTitle);
}

async function assertPageContent(openUrlPage, product) {
  await expect(openUrlPage.locator("section")).toBeVisible({
    timeout: 150000,
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
}

const createFeaturedProductsTest = async (
  pageTitle,
  variantLabel,
  variantIndex
) => {
  await createFeaturedProductsVariant(pageTitle, variantLabel, variantIndex);
  // Loops all routes
  const slug = newPageTitle
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  for (const product of products) {
    await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`);
    await assertPageContent(page, product);
  }
};

const textVariant = [
  {
    variantName: "Variant A",
    pageTitle: "Featured Products Variant A",
    variantLabel: "Featured Products New Page A",
    variantIndex: 0,
  },
  {
    variantName: "Variant B",
    pageTitle: "Featured Products Variant B",
    variantLabel: "Featured Products New Page B",
    variantIndex: 1,
  },
];

textVariant.forEach((variant) => {
  test.describe(`${variant.variantName} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.pageTitle}`, async () => {
      await createFeaturedProductsTest(
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
