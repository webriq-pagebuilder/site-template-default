import { expect } from "@playwright/test";
import { expectDocumentPublished } from "tests/utils";

export default async function VariantD({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  const rating = "3";
  for (const person of commonFieldValues) {
    await page.getByRole("button", { name: person.name }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();

    //Rating
    await page.getByLabel("Rating").click();
    await page.getByLabel("Rating").selectOption(rating); //3 stars

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

  for (let i = 0; i < commonFieldValues.length; i++) {
    const testimonial = commonFieldValues[i];

    await expect(openUrlPage.getByText(rating)).toBeVisible();
    await expect(
      openUrlPage
        .locator("div")
        .filter({ hasText: /^3\.0$/ })
        .locator("div")
        .first()
    ).toBeVisible();

    await expect(
      openUrlPage.getByText(testimonial.fullName, { exact: true })
    ).toBeVisible();
    await expect(openUrlPage.getByText(testimonial.jobTitle)).toBeVisible();

    await expect(openUrlPage.getByText(testimonial.testimony)).toBeVisible();

    const nextBtn = openUrlPage.getByRole("button", {
      name: "Show next testimonial",
    });
    if (i < commonFieldValues.length - 1) {
      if (nextBtn) {
        await nextBtn.click();
      }
    }
  }

  //Prev button
  await openUrlPage
    .getByRole("button", { name: "Show previous testimonial" })
    .click();

  await expect(
    openUrlPage.getByText(commonFieldValues[3].fullName, { exact: true })
  ).toBeHidden();
  await expect(
    openUrlPage.getByText(commonFieldValues[2].fullName, { exact: true })
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[2].jobTitle)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[2].testimony)
  ).toBeVisible();
  await openUrlPage
    .getByRole("button", { name: "Show previous testimonial" })
    .click();

  await expect(
    openUrlPage.getByText(commonFieldValues[2].fullName, { exact: true })
  ).toBeHidden();
  await expect(
    openUrlPage.getByText(commonFieldValues[1].fullName, { exact: true })
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[1].jobTitle)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[1].testimony)
  ).toBeVisible();
  await openUrlPage
    .getByRole("button", { name: "Show previous testimonial" })
    .click();

  await expect(
    openUrlPage.getByText(commonFieldValues[1].fullName, { exact: true })
  ).toBeHidden();
  await expect(
    openUrlPage.getByText(commonFieldValues[0].fullName, { exact: true })
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[0].jobTitle)
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues[0].testimony)
  ).toBeVisible();
  await openUrlPage
    .getByRole("button", { name: "Show previous testimonial" })
    .click();
}
