import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";

export default async function VariantC({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  for (const person of commonFieldValues) {
    await page.getByRole("button", { name: person.name }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();

    //Full Name
    await page.locator(`input[value="${person.name}"]`).click();
    await page.locator(`input[value="${person.name}"]`).fill(person.fullName);

    //Job Title
    await page.locator(`input[value="${person.currentJob}"]`).click();
    await page
      .locator(`input[value="${person.currentJob}"]`)
      .fill(person.jobTitle);

    //Testimony
    await page.locator('input.sc-uVWWZ.bTJeWN[value*="Lorem ipsum"]').click();
    await page
      .locator('input.sc-uVWWZ.bTJeWN[value*="Lorem ipsum"]')
      .fill(person.testimony);
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, pageTitle);
  await expect(page.getByText(`${baseURL}`)).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(
    openUrlPage.getByText(commonFieldValues[0].fullName, { exact: true })
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[0].jobTitle)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[0].testimony)
  ).toBeVisible();

  await expect(
    openUrlPage.getByText(commonFieldValues[1].fullName, { exact: true })
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[1].jobTitle)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[1].testimony)
  ).toBeVisible();

  await expect(
    openUrlPage.getByText(commonFieldValues[2].fullName, { exact: true })
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[2].jobTitle)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[2].testimony)
  ).toBeVisible();

  await expect(
    openUrlPage.getByText(commonFieldValues[3].fullName, { exact: true })
  ).toBeHidden();

  //Next pagination
  await openUrlPage.getByLabel("Show next testimonial").click();
  await expect(
    openUrlPage.getByText(commonFieldValues[3].fullName, { exact: true })
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[3].jobTitle)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[3].testimony)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[0].fullName, { exact: true })
  ).toBeHidden();

  //Prev pagination
  await openUrlPage.getByLabel("Show previous testimonial").click();
  await expect(
    openUrlPage.getByText(commonFieldValues[0].fullName, { exact: true })
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[0].jobTitle)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[0].testimony)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[3].fullName, { exact: true })
  ).toBeHidden();
}
