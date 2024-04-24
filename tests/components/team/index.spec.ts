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

let page: Page, newPageTitle: string;

const variantModules = {
  variant_a: VariantA,
  variant_b: VariantB,
  variant_c: VariantC,
  variant_d: VariantD,
};

const teamVariantTest = [
  {
    name: "Variant A",
    title: "Team Variant A",
    label: "Team New Page A",
    variant: "variant_a",
  },
  {
    name: "Variant B",
    title: "Team Variant B",
    label: "Team New Page B",
    variant: "variant_b",
  },
  {
    name: "Variant C",
    title: "Team Variant C",
    label: "Team New Page C",
    variant: "variant_c",
  },
  {
    name: "Variant D",
    title: "Team Variant D",
    label: "Team New Page D",
    variant: "variant_d",
  },
];

const commonFieldValues = {
  subtitle: "Subtitle Input Test",
  title: "Title Input Test",
  peopleData: [
    {
      name: "Danny Bailey",
      nameChange: "Bailey Danny",
      currentJob: "CEO",
      jobChange: "Development of Product",
      body: "Test Body Input",
    },
    {
      name: "Ian Brown",
      nameChange: "Brown Ian",
      currentJob: "Head of Development",
      jobChange: "Development Head",
      body: "Test Body Input",
    },
    {
      name: "Daisy Carter",
      nameChange: "Carter Daisy",
      currentJob: "Product Development",
      jobChange: "Development of Products",
      body: "Test Body Input",
    },
    {
      name: "Dennis Robertson",
      nameChange: "Robertson Dennis",
      currentJob: "Frontend developer",
      jobChange: "Backend Developer",
      body: "Test Body Input",
    },
    {
      name: "Alice Bradley",
      nameChange: "Bradley Alice",
      currentJob: "Backend Developer",
      jobChange: "Fullstack Developer",
      body: "Test Body Input",
    },
    {
      name: "Sahra Ortiz",
      nameChange: "Ortiz Sahra",
      currentJob: "Product Designer",
      jobChange: "UI/UX Designer",
      body: "Test Body Input",
    },
  ],
};

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });

  await navigateToPage(page);
});

teamVariantTest.forEach((variants, index) => {
  const { name, title, label, variant } = variants;

  test.describe(`${name}`, () => {
    test.describe.configure({ timeout: 600_000, mode: "serial" });

    test(`Create ${label}`, async () => {
      const time = new Date().getTime();
      newPageTitle = `${title} ` + time;
      await createNewPage(page, newPageTitle, "Team");
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
