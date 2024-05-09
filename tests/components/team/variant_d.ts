import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
} from "tests/utils";
import { teamInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default async function VariantD({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  //Subtitle
  await subtitleField.checkAndAddValue({
    page,
    initialValue: teamInitialValue,
    commonFieldValues,
  });

  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: teamInitialValue,
    commonFieldValues,
  });

  for (const person of commonFieldValues.peopleData) {
    await page.getByRole("button", { name: person.name }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();

    //Full Name
    await page.locator(`input[value="${person.name}"]`).click();
    await page.locator(`input[value="${person.name}"]`).fill(person.nameChange);

    //Body
    await page.getByLabel("Body").click();
    await page.getByLabel("Body").fill(person.body);

    await page.getByLabel("Close dialog").click();
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

  for (const person of commonFieldValues.peopleData) {
    await expect(openUrlPage.getByText(person.nameChange)).toBeVisible();
  }

  await openUrlPage.locator("p:nth-child(2)").first();
  for (let i = 2; i <= commonFieldValues.peopleData.length + 1; i++) {
    if (i < commonFieldValues.peopleData.length - 1) {
      const selector = `div:nth-child(${i}) > .border > .p-4 > .text-base`;
      await expect(openUrlPage.locator(selector)).toBeVisible();
    }
  }
}
