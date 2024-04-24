import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  subtitleFieldInput,
  titleFieldInput,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";

export default async function VariantD({
  variantTitle,
  page,
  commonFieldValues,
}) {
  //Subtitle
  await subtitleFieldInput(page, commonFieldValues.subtitle);

  //Title
  await titleFieldInput(page, commonFieldValues.title);

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

  await expectDocumentPublished(page, variantTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.getByText(commonFieldValues.subtitle)).toBeVisible();
  await expect(
    openUrlPage.getByRole("heading", { name: commonFieldValues.title })
  ).toBeVisible();

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
