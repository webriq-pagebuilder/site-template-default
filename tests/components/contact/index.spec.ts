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

const contactVariantTests = [
  {
    title: "Variant A",
    label: "New Contact A",
    variant: "variant_a",
  },
  {
    title: "Variant B",
    label: "New Contact B",
    variant: "variant_b",
  },
];

const commonFieldValues = {
  title: "Contact title",
  description: "Updated description for new contact.",
  socialLinks: {
    facebook: "https://www.facebook.com/webriq",
    twitter: "https://twitter.com/WebriQGoesMad",
    instagram: "https://www.instagram.com/webriqgoesmad/",
  },
  contactDetails: {
    office: "123 Sample Address",
    number: "+12 34567",
    email: "sample@webriq.com",
  },
  formButtonLabel: "Submit Contact",
  thankYouPageUrl: "https://webriq.com/thank-you",
};

const time = new Date().getTime();
newPageTitle = "New Page " + time;

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
});

contactVariantTests?.forEach((variant, index) => {
  test.describe(`${variant.title}`, () => {
    test.describe.configure({ timeout: 300000, mode: "serial" });

    test(`Create ${variant.label}`, async () => {
      await navigateToPage(page);
      await createNewPage(page, newPageTitle, "Contact");

      const variantLabel = page
        .getByTestId("field-label")
        .getByTestId("string-input");
      await variantLabel.click();
      await variantLabel.fill("New Contact Test");

      await clickVariantImage(page, index); // select variant

      const variantTest = variantModules[variant.variant];
      await variantTest({
        newPageTitle,
        page,
        commonFieldValues,
      });
    });

    test(`Delete ${variant.label}`, async () => {
      await deletePageVariant(page, newPageTitle, variant.label);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});
