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

async function createFaqsVariant(pageTitle, variantLabel, variantIndex) {
  newPageTitle = `${pageTitle} ` + new Date().getTime();

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Faqs");
  await clickVariantImage(page, variantIndex);

  await page
    .getByTestId("field-label")
    .getByTestId("string-input")
    .click({ force: true });
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

  const faqsData = [
    {
      value: "Lorem ipsum dolor sit amet",
      updateQuestion: "Question 1",
      updateAnswer: "Answer 1",
    },
    {
      value: "Nunc maximus",
      updateQuestion: "Question 2",
      updateAnswer: "Answer 2",
    },
    {
      value: "Nam feugiat ex",
      updateQuestion: "Question 3",
      updateAnswer: "Answer 3",
    },
    {
      value: "In hac habitasse",
      updateQuestion: "Question 4",
      updateAnswer: "Answer 4",
    },
    {
      value: "Nullam congue",
      updateQuestion: "Question 5",
      updateAnswer: "Answer 5",
    },
  ];

  const faqsWithCategories = [
    {
      name: "General",
      question: ["Lorem ipsum dolor sit amet", "Nunc maximus"],
      updatedQuestion: "Question 1",
      updatedAnswer: "Answer 1",
    },
    {
      name: "Payments",
      question: ["Nam feugiat ex", "In hac habitasse"],
      updatedQuestion: "Question 2",
      updatedAnswer: "Answer 2",
    },
    {
      name: "Returns",
      question: "Nam feugiat ex",
      updatedQuestion: "Question 3",
      updatedAnswer: "Answer 3",
    },
    {
      name: "Refunds",
      question: ["Lorem ipsum dolor sit amet", "Nunc maximus"],
      updatedQuestion: "Question 4",
      updatedAnswer: "Answer 4",
    },
  ];

  if (variantIndex !== 1) {
    for (const faqs of faqsData) {
      await page.getByRole("button", { name: faqs.value }).first().click();
      await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
      await page.locator(`input[value^="${faqs.value}"]`).click();
      await page
        .locator(`input[value^="${faqs.value}"]`)
        .fill(faqs.updateQuestion);
      await page.getByLabel("Add its answer").click();
      await page.getByLabel("Add its answer").fill(faqs.updateAnswer);
      await page.getByLabel("Close dialog").click();
    }
  }

  if (variantIndex === 1) {
    for (const faqs of faqsWithCategories) {
      await page.getByRole("button", { name: faqs.name }).click();
      await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();

      //Iterate over questions within current category
      if (Array.isArray(faqs.question)) {
        for (const question of faqs.question) {
          await page.getByRole("button", { name: question }).click();
          await page.locator(`input[value^="${question}"]`).click();
          await page
            .locator(`input[value^="${question}"]`)
            .fill(faqs.updatedQuestion);
          await page.getByLabel("Add its answer").click();
          await page.getByLabel("Add its answer").fill(faqs.updatedAnswer);
          await page.getByLabel("Close dialog").nth(1).click();
        }
        await page.getByLabel("Close dialog").click();
      } else {
        await page.getByRole("button", { name: faqs.question }).click();
        await page.locator(`input[value^="${faqs.question}"]`).click();
        await page
          .locator(`input[value^="${faqs.question}"]`)
          .fill(faqs.updatedQuestion);
        await page.getByLabel("Add its answer").click();
        await page.getByLabel("Add its answer").fill(faqs.updatedAnswer);
        await page.getByLabel("Close dialog").nth(1).click();
        await page.getByLabel("Close dialog").click();
      }
    }
  }

  await expectDocumentPublished(page, newPageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({ timeout: 20000 });
  await expect(openUrlPage.getByText(subtitleInput)).toBeVisible();
  await expect(
    openUrlPage.getByRole("heading", { name: titleInput })
  ).toBeVisible();

  //Test search question and see its answer
  if (variantIndex === 0) {
    for (const faqs of faqsData) {
      await openUrlPage
        .getByPlaceholder("Search, find any question you")
        .click();
      await openUrlPage
        .getByPlaceholder("Search, find any question you")
        .fill(faqs.updateQuestion);
      await expect(openUrlPage.getByLabel(faqs.updateQuestion)).toBeVisible();
      await openUrlPage.getByLabel(faqs.updateQuestion).click();
      await expect(openUrlPage.getByText("Answer")).toBeVisible();
      await openUrlPage.getByLabel(faqs.updateQuestion).click();
    }
  }

  if (variantIndex === 1) {
    for (const faqs of faqsWithCategories) {
      await expect(openUrlPage.getByLabel(faqs.name)).toBeVisible();
      await openUrlPage.getByLabel(faqs.name).click();

      if (Array.isArray(faqs.question)) {
        await expect(openUrlPage.getByLabel("Question").first()).toBeVisible();
        await openUrlPage.getByLabel("Question").first().click();
        await expect(openUrlPage.getByText("Answer")).toBeVisible();
        await openUrlPage.getByLabel("Question").first().click();

        await expect(openUrlPage.getByLabel("Question").nth(1)).toBeVisible();
        await openUrlPage.getByLabel("Question").nth(1).click();
        await expect(openUrlPage.getByText("Answer")).toBeVisible();
        await openUrlPage.getByLabel("Question").nth(1).click();
      } else {
        await expect(openUrlPage.getByLabel("Question")).toBeVisible();
        await openUrlPage.getByLabel("Question").click();
        await expect(openUrlPage.getByText("Answer")).toBeVisible();
        await openUrlPage.getByLabel("Question").click();
      }
    }
  }

  if (variantIndex === 2) {
    for (const faqs of faqsData) {
      await expect(openUrlPage.getByText(faqs.updateQuestion)).toBeVisible();
      await expect(openUrlPage.getByText(faqs.updateAnswer)).toBeVisible();
    }
  }
}

const faqsVariants = [
  {
    variantName: "Variant A",
    pageTitle: "Faqs Variant A",
    variantLabel: "Faqs New Page A",
    variantIndex: 0,
  },
  {
    variantName: "Variant B",
    pageTitle: "Faqs Page B",
    variantLabel: "Faqs New Page B",
    variantIndex: 1,
  },
  {
    variantName: "Variant C",
    pageTitle: "Faqs Page C",
    variantLabel: "Faqs New Page C",
    variantIndex: 2,
  },
];

faqsVariants.forEach((variant) => {
  test.describe(`${variant.variantName} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.pageTitle}`, async () => {
      await createFaqsVariant(
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
