import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";

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

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  for (const person of commonFieldValues.peopleData) {
    await openUrlPage.getByLabel(person.nameChange).click();
    await expect(
      openUrlPage.locator("p").filter({ hasText: person.nameChange })
    ).toBeVisible();
    await expect(openUrlPage.getByText(person.jobChange)).toBeVisible();
    await expect(openUrlPage.getByText(person.body)).toBeVisible();
  }
}
