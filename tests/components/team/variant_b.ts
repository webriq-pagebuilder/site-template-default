import { expect } from "@playwright/test";
import { createSlug, expectDocumentPublished } from "tests/utils";

export default async function VariantB({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
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

    //Body
    await page.getByLabel("Body").click();
    await page.getByLabel("Body").fill(person.body);
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  for (const person of commonFieldValues.peopleData) {
    await page.getByLabel(person.nameChange).click();
    await expect(
      page.locator("p").filter({ hasText: person.nameChange })
    ).toBeVisible();
    await expect(page.getByText(person.jobChange)).toBeVisible();
    await expect(page.getByText(person.body)).toBeVisible();
  }
}
