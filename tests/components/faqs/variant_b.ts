import { expect } from "@playwright/test";
import { faqsInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  launchPreview,
  subtitleField,
  titleField,
} from "tests/utils";

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

export default async function VariantB({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  //Subtitle
  await subtitleField.checkAndAddValue({
    page,
    initialValue: faqsInitialValue,
    commonFieldValues,
  });

  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: faqsInitialValue,
    commonFieldValues,
  });
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

  // check site preview
  await expectDocumentPublished(page, pageTitle);
  // Launch preview
  await launchPreview({ page, baseURL, pageTitle });

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  for (const faqs of faqsWithCategories) {
    await expect(page.getByLabel(faqs.name)).toBeVisible();
    await page.getByLabel(faqs.name).click();

    if (Array.isArray(faqs.question)) {
      await expect(page.getByLabel("Question").first()).toBeVisible();
      await page.getByLabel("Question").first().click();
      await expect(page.getByText("Answer")).toBeVisible();
      await page.getByLabel("Question").first().click();

      await expect(page.getByLabel("Question").nth(1)).toBeVisible();
      await page.getByLabel("Question").nth(1).click();
      await expect(page.getByText("Answer")).toBeVisible();
      await page.getByLabel("Question").nth(1).click();
    } else {
      await expect(page.getByLabel("Question")).toBeVisible();
      await page.getByLabel("Question").click();
      await expect(page.getByText("Answer")).toBeVisible();
      await page.getByLabel("Question").click();
    }
  }
}
