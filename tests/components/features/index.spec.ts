import { test, type Page } from "@playwright/test";
import {
  autologin_studio,
  createNewPage,
  clickVariantImage,
  navigateToPage,
  deletePageVariant,
} from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import VariantA from "./variant_a.spec";
import VariantB from "./variant_b.spec";
import VariantC from "./variant_c.spec";
import VariantD from "./variant_d.spec";
import VariantE from "./variant_e.spec";
import VariantF from "./variant_f.spec";
import VariantG from "./variant_g.spec";
import VariantH from "./variant_h.spec";

let page: Page, newPageTitle: string;

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
  variant_d: VariantD,
  variant_e: VariantE,
  variant_f: VariantF,
  variant_g: VariantG,
  variant_h: VariantH,
};

const featuresVariantTests = [
  {
    title: "Features variant A",
    label: "New Features A",
    variant: "variant_a",
  },
  {
    title: "Features variant B",
    label: "New Features B",
    variant: "variant_b",
  },
  {
    title: "Features variant C",
    label: "New Features C",
    variant: "variant_c",
  },
  {
    title: "Features variant D",
    label: "New Features D",
    variant: "variant_d",
  },
  {
    title: "Features variant E",
    label: "New Features E",
    variant: "variant_e",
  },
  {
    title: "Features variant F",
    label: "New Features F",
    variant: "variant_f",
  },
  {
    title: "Features variant G",
    label: "New Features G",
    variant: "variant_g",
  },
  {
    title: "Features variant H",
    label: "New Features H",
    variant: "variant_h",
  },
];

const commonFieldValues = {
  subtitle: "Subtitle Features",
  title: "New Features title",
  description: "Updated description for new features.",
  tag: "new feature tag",
  primaryButtonLabel: "Features Primary",
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

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Features");

  const variantLabel = page
    .getByTestId("field-label")
    .getByTestId("string-input");
  await variantLabel.click();
  await variantLabel.fill("New Features Test");
});

featuresVariantTests?.forEach((variant, index) => {
  test.describe(`${variant.title} Workflow`, () => {
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
      await deletePageVariant(page, newPageTitle, variant?.label);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});
