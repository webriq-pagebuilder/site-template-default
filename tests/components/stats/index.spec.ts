import { test, type Page } from "@playwright/test";
import {
  autologin_studio,
  navigateToPage,
  clickVariantImage,
  createNewPage,
  deletePageVariant,
  variantLabelInput,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import VariantA from "./variant_a.spec";
import VariantB from "./variant_b.spec";
import VariantC from "./variant_c.spec";

let page: Page, newPageTitle: string;

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
};

const statisticsVariantTest = [
  {
    name: "Variant A",
    title: "Statistics Variant A",
    label: "Statistics New Page A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Statistics Variant B",
    label: "Statistics New Page B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "Statistics Variant C",
    label: "Statistics New Page C",
    variant: "variant_c",
  },
];

const commonFieldValues = [
  {
    label: "Total Revenue",
    value: "$33,261",
    updatedLabel: "Revenue Total",
    updatedValue: "$100",
  },
  {
    label: "Subscribers",
    value: "481,095",
    updatedLabel: "Subscribers Test",
    updatedValue: "10000",
  },
  {
    label: "Conversations",
    value: "643,553",
    updatedLabel: "Conversations Test",
    updatedValue: "50,100",
  },
  {
    label: "Modal Sale Rate",
    value: "25%",
    updatedLabel: "Sale Rate Test",
    updatedValue: "50%",
  },
];

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });

  await navigateToPage(page);
});

statisticsVariantTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 600_000, mode: "serial" });

    test(`Create ${label}`, async () => {
      const time = new Date().getTime();
      newPageTitle = `${title} ` + time;
      await createNewPage(page, newPageTitle, "Statistics");
      await variantLabelInput(page, label);
      await clickVariantImage(page, index); // select variant

      const variantTest = variantModules[variant];

      if (variantTest) {
        await variantTest({
          variantTitle: newPageTitle,
          page,
          commonFieldValues,
        });
      } else {
        console.error(`No test module found for variant: ${index}`);
      }
    });

    test(`Delete ${title}`, async () => {
      await deletePageVariant(page, newPageTitle, label);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});
