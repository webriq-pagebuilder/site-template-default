import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  subtitleFieldInput,
  titleFieldInput,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";

export default async function VariantA({
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

    //Job Title
    await page.locator(`input[value="${person.currentJob}"]`).click();
    await page
      .locator(`input[value="${person.currentJob}"]`)
      .fill(person.jobChange);

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
    await expect(
      openUrlPage.getByRole("heading", { name: person.nameChange })
    ).toBeVisible();
    await expect(
      openUrlPage.getByText(person.jobChange, {
        exact: true,
      })
    ).toBeVisible();
  }
}
