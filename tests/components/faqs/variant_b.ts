import { expect } from "@playwright/test";
import { faqsInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
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

  await expectDocumentPublished(page, pageTitle);
  await expect(page.getByText(`${baseURL}`)).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  //Title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

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
