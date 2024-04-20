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
  subtitleFieldInput,
  titleFieldInput,
  variantLabelInput,
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

async function createTeamVariant(pageTitle, variantLabel, variantIndex) {
  newPageTitle = `${pageTitle} ` + new Date().getTime();
  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Team");
  await clickVariantImage(page, variantIndex);
  await variantLabelInput(page, variantLabel);

  const subtitle = "Subtitle Test";
  const title = "Title test";

  if (variantIndex !== 1) {
    //Subtitle
    await subtitleFieldInput(page, subtitle);

    //Title
    await titleFieldInput(page, title);
  }

  //Teams
  const peopleData = [
    {
      name: "Danny Bailey",
      nameChange: "Bailey Danny",
      currentJob: "CEO",
      jobChange: "Development of Product",
      body: "Lorem ipsum test `body",
    },
    {
      name: "Ian Brown",
      nameChange: "Brown Ian",
      currentJob: "Head of Development",
      jobChange: "Development Head",
      body: "Lorem ipsum test body",
    },
    {
      name: "Daisy Carter",
      nameChange: "Carter Daisy",
      currentJob: "Product Development",
      jobChange: "Development of Products",
      body: "Lorem ipsum test body",
    },
    {
      name: "Dennis Robertson",
      nameChange: "Robertson Dennis",
      currentJob: "Frontend developer",
      jobChange: "Fullstack Developer",
      body: "Lorem ipsum test body",
    },
    {
      name: "Alice Bradley",
      nameChange: "Bradley Alice",
      currentJob: "Backend Developer",
      jobChange: "Fullstack Developer",
      body: "Lorem ipsum test body",
    },
    {
      name: "Sahra Ortiz",
      nameChange: "Ortiz Sahra",
      currentJob: "Product Designer",
      jobChange: "UI/UX Designer",
      body: "Lorem ipsum test body",
    },
  ];

  for (const person of peopleData) {
    await page.getByRole("button", { name: person.name }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();

    //Full Name
    await page.locator(`input[value="${person.name}"]`).click();
    await page.locator(`input[value="${person.name}"]`).fill(person.nameChange);

    //Job Title
    if (variantIndex !== 3) {
      await page.locator(`input[value="${person.currentJob}"]`).click();
      await page
        .locator(`input[value="${person.currentJob}"]`)
        .fill(person.jobChange);
    }

    //Body
    if (variantIndex === 1) {
      await page.getByLabel("Body").click();
      await page.getByLabel("Body").fill(person.body);
    }
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, newPageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  if (variantIndex !== 1) {
    await expect(openUrlPage.getByText(subtitle)).toBeVisible();
    await expect(
      openUrlPage.getByRole("heading", { name: title })
    ).toBeVisible();

    if (variantIndex === 0) {
      for (const person of peopleData) {
        await expect(
          openUrlPage.getByRole("heading", { name: person.nameChange })
        ).toBeVisible();
      }
    }

    if (variantIndex === 2 || variantIndex === 3) {
      for (const person of peopleData) {
        await expect(openUrlPage.getByText(person.nameChange)).toBeVisible();
      }
    }

    if (variantIndex !== 3) {
      await expect(
        openUrlPage.getByText(peopleData[0].jobChange, { exact: true })
      ).toBeVisible();
      await expect(
        openUrlPage.getByText(peopleData[1].jobChange)
      ).toBeVisible();
      await expect(
        openUrlPage.getByText(peopleData[2].jobChange)
      ).toBeVisible();
      await expect(
        openUrlPage.getByText(peopleData[3].jobChange).first()
      ).toBeVisible();
      await expect(
        openUrlPage.getByText(peopleData[4].jobChange).nth(1)
      ).toBeVisible();
      await expect(
        openUrlPage.getByText(peopleData[5].jobChange)
      ).toBeVisible();
    }

    if (variantIndex === 3) {
      await openUrlPage.locator("p:nth-child(2)").first();

      for (let i = 2; i <= peopleData.length + 1; i++) {
        if (i < peopleData.length - 1) {
          const selector = `div:nth-child(${i}) > .border > .p-4 > .text-base`;
          await expect(openUrlPage.locator(selector)).toBeVisible();
        }
      }
    }
  }

  if (variantIndex === 1) {
    for (const person of peopleData) {
      await openUrlPage.getByLabel(person.nameChange).click();
      await expect(
        openUrlPage.locator("p").filter({ hasText: person.nameChange })
      ).toBeVisible();
      await expect(openUrlPage.getByText(person.jobChange)).toBeVisible();
      await expect(openUrlPage.getByText(person.body)).toBeVisible();
    }
  }
}

const teamVariants = [
  {
    variantName: "Variant A",
    pageTitle: "Team Variant A",
    variantLabel: "Team New Page A",
    variantIndex: 0,
  },
  {
    variantName: "Variant B",
    pageTitle: "Team Variant B",
    variantLabel: "Team New Page B",
    variantIndex: 1,
  },
  {
    variantName: "Variant C",
    pageTitle: "Team Variant C",
    variantLabel: "Team New Page C",
    variantIndex: 2,
  },
  {
    variantName: "Variant D",
    pageTitle: "Team Variant D",
    variantLabel: "Team New Page D",
    variantIndex: 3,
  },
];

teamVariants.forEach((variant) => {
  test.describe(`${variant.variantName} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.pageTitle}`, async () => {
      await createTeamVariant(
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
