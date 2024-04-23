import { test, type Page } from "@playwright/test";
import {
  autologin_studio,
  clickVariantImage,
  createNewPage,
  navigateToPage,
  deletePageVariant,
} from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";

let page: Page, newPageTitle: string;

const Variants = {
  variant_a: () => import("./variant_a.spec"),
  variant_b: () => import("./variant_b.spec"),
  variant_c: () => import("./variant_c.spec"),
};

const appPromoVariantTests = [
  {
    title: "Variant A",
    label: "New App promo A",
    variant: "variant_a",
  },
  {
    title: "Variant B",
    label: "New App promo B",
    variant: "variant_b",
  },
  {
    title: "Variant C",
    label: "New App promo C",
    variant: "variant_c",
  },
];

const time = new Date().getTime();
newPageTitle = "New Page" + time;

const commonFieldValues = {
  subtitle: "App promo subtitle", // all variants
  title: "App promo title", // all variants
  description: "Updated description for new App promo.", // variant b and c
};

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "App Promo");

  const variantLabel = page
    .getByTestId("field-label")
    .getByTestId("string-input");
  await variantLabel.click();
  await variantLabel.fill("New App Promo Test");
});

appPromoVariantTests?.forEach((variant, index) => {
  test.describe(`${variant.title}`, async () => {
    test.describe.configure({ timeout: 60000 });

    test(`Create ${variant.label}`, async () => {
      await clickVariantImage(page, index); // select variant
      await Variants[variant?.variant]({
        variantTitle: variant?.title,
        page,
        commonFieldValues,
      });
    });

    test(`Delete ${variant.label}`, async () => {
      await deletePageVariant(page, newPageTitle, variant.label);
    });
  });
});
