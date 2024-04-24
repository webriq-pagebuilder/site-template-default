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
import VariantD from "./variant_d.spec";
import VariantE from "./variant_e.spec";

let page: Page, newPageTitle: string;

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
  variant_d: VariantD,
  variant_e: VariantE,
};

const howItWorksVariantTest = [
  {
    name: "Variant A",
    title: "How It Works Variant A",
    label: "New How It Works A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "How It Works Variant B",
    label: "New How It Works B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "How It Works Variant C",
    label: "New How It Works C",
    variant: "variant_c",
  },
  {
    name: "Variant D",
    title: "How It Works Variant D",
    label: "New How It Works D",
    variant: "variant_d",
  },
  {
    name: "Variant E",
    title: "How It Works Variant E",
    label: "New How It Works E",
    variant: "variant_e",
  },
];

const commonFieldValues = {
  title: "Title Input Test",
  subtitle: "Subtitle Input Test",
  body: "Body Input Test",
  stepsData: [
    {
      title: "Lorem ipsum",
      body: "Fusce quam tellus",
      updatedTitle: "Updated Title 1",
      updatedBody: "Updated Body 1",
    },
    {
      title: "Lorem ipsum",
      body: "Fusce quam tellus",
      updatedTitle: "Updated Title 2",
      updatedBody: "Updated Body 2",
    },
    {
      title: "Lorem ipsum",
      body: "Fusce quam tellus",
      updatedTitle: "Updated Title 3",
      updatedBody: "Updated Body 3",
    },
  ],
};

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });

  // navigate to the studio
  await navigateToPage(page);
});

howItWorksVariantTest.forEach((variants, index) => {
  const { title, label, variant } = variants;
  test.describe(`${title}`, () => {
    test.describe.configure({ timeout: 600_000, mode: "serial" });

    test(`Create ${label}`, async () => {
      const time = new Date().getTime();
      newPageTitle = `${title} ` + time;

      await createNewPage(page, newPageTitle, "How It Works");
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
        console.error(`No test module found for variant: ${variant}`);
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
