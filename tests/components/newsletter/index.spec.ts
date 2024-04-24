import { test, type Page } from "@playwright/test";
import {
  autologin_studio,
  navigateToPage,
  clickVariantImage,
  createNewPage,
  deletePageVariant,
} from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import VariantA from "./variant_a.spec";
import VariantB from "./variant_b.spec";

let page: Page, newPageTitle: string;

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
};

const newsletterVariantTests = [
  {
    title: "Variant A",
    label: "New Newsletter A",
    variant: "variant_a",
  },
  {
    title: "Variant B",
    label: "New Newsletter B",
    variant: "variant_b",
  },
];

const time = new Date().getTime();
newPageTitle = "New Page " + time;

const commonFieldValues = {
  title: "Newsletter title",
  description: "Updated description for newsletter.",
  formButtonLabel: "Submit newsletter",
  logoAltText: "Newsletter logo",
  thankYouPageUrl: "https://webriq.com/thank-you",
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
  await createNewPage(page, newPageTitle, "Newsletter");

  const variantLabel = page
    .getByTestId("field-label")
    .getByTestId("string-input");
  await variantLabel.click();
  await variantLabel.fill("New Newsletter Test");
});

newsletterVariantTests.forEach((variant, index) => {
  test.describe(`${variant.title}`, () => {
    test.describe.configure({ timeout: 60000 });

    test(`Create ${variant.label}`, async () => {
      await clickVariantImage(page, index); // select variant

      const variantTest = variantModules[variant.variant];

      if (variantTest) {
        await variantTest({
          newPageTitle: variant.title,
          page,
          commonFieldValues,
        });
      }
    });

    test(`Delete ${variant.title}`, async () => {
      await deletePageVariant(page, newPageTitle, variant.label);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});
