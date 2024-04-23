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

let page: Page, newPageTitle: string;

const Variants = {
  variant_a: () => import("./variant_a.spec"),
  variant_b: () => import("./variant_b.spec"),
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
newPageTitle = "New Page" + time;

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

newsletterVariantTests?.forEach((variant, index) => {
  test.describe(`${variant.title}`, () => {
    test.describe.configure({ timeout: 60000, mode: "serial" });

    test(`Create ${variant.label}`, async () => {
      await clickVariantImage(page, index); // select variant
      await Variants[variant?.variant]({
        variantTitle: variant?.title,
        page,
        commonFieldValues,
      });
    });

    test(`Delete ${variant.title}`, async () => {
      await deletePageVariant(page, newPageTitle, variant.label);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});
