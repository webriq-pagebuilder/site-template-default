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

async function createHowItWorksVariant(pageTitle, variantLabel, variantIndex) {
  newPageTitle = `${pageTitle} ` + new Date().getTime();

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "How It Works");
  await clickVariantImage(page, variantIndex);

  //Variant Title
  await page.getByTestId("field-label").getByTestId("string-input").click();
  await page
    .getByTestId("field-label")
    .getByTestId("string-input")
    .fill(variantLabel);

  //Subtitle
  const subtitleInput = "Subtitle Input Test";
  await page
    .getByTestId("field-variants.subtitle")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.subtitle")
    .getByTestId("string-input")
    .fill(subtitleInput);

  //Title
  const titleInput = "Title Input Test";
  await page
    .getByTestId("field-variants.title")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.title")
    .getByTestId("string-input")
    .fill(titleInput);

  //Body
  const bodyInput = "Body Input Test";
  if (variantIndex < 2) {
    await page.getByLabel("Body").click();
    await page.getByLabel("Body").fill(bodyInput);
  }

  const stepsData = [
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
  ];

  for (let i = 0; i < stepsData.length; i++) {
    const step = stepsData[i];

    if (i === 2) {
      await page.getByRole("button", { name: step.title }).click();
    } else {
      await page.getByRole("button", { name: step.title }).nth(i).click();
    }
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();

    // Update title
    await page.locator(`input[value^="${step.title}"]`).click();
    await page.locator(`input[value^="${step.title}"]`).fill(step.updatedTitle);

    // Update body
    await page.locator("textarea").filter({ hasText: step.body }).click();
    await page
      .locator("textarea")
      .filter({ hasText: step.body })
      .fill(step.updatedBody);
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, newPageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({ timeout: 20000 });

  await expect(
    openUrlPage.getByRole("heading", { name: titleInput })
  ).toBeVisible();
  await expect(openUrlPage.getByText(subtitleInput)).toBeVisible();

  if (variantIndex < 2) {
    await expect(openUrlPage.getByText(bodyInput)).toBeVisible();
  }

  if (variantIndex === 0) {
    await expect(openUrlPage.locator(".aspect-video")).toBeVisible();
  }

  for (const steps of stepsData) {
    await expect(openUrlPage.getByText(steps.updatedTitle)).toBeVisible();
    await expect(openUrlPage.getByText(steps.updatedBody)).toBeVisible();
  }
}

const howItWorksVariant = [
  {
    variantName: "Variant A",
    pageTitle: "How It Works Variant A",
    variantLabel: "How It Works New Page A",
    variantIndex: 0,
  },
  {
    variantName: "Variant B",
    pageTitle: "How It Works Variant B",
    variantLabel: "How It Works New Page B",
    variantIndex: 1,
  },
  {
    variantName: "Variant C",
    pageTitle: "How It Works Variant C",
    variantLabel: "How It Works New Page C",
    variantIndex: 2,
  },
  {
    variantName: "Variant D",
    pageTitle: "How It Works Variant D",
    variantLabel: "How It Works New Page D",
    variantIndex: 3,
  },
];

howItWorksVariant.forEach((variant) => {
  test.describe(`${variant.variantName} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.pageTitle}`, async () => {
      await createHowItWorksVariant(
        variant.pageTitle,
        variant.variantLabel,
        variant.variantIndex
      );
    });

    test(`Delete ${variant.pageTitle}`, async () => {
      await deletePageVariant(page, newPageTitle);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});
