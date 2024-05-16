import { expect } from "@playwright/test";
import {
  createSlug,
  expectDocumentPublished,
  launchPreview,
} from "tests/utils";

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
  await launchPreview({ page, baseURL, pageTitle });

  for (let i = 0; i < commonFieldValues.length; i++) {
    const testimonial = commonFieldValues[i];

    await expect(page.getByText(rating)).toBeVisible();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^3\.0$/ })
        .locator("div")
        .first()
    ).toBeVisible();

    await expect(
      page.getByText(testimonial.fullName, { exact: true })
    ).toBeVisible();
    await expect(page.getByText(testimonial.jobTitle)).toBeVisible();

    await expect(page.getByText(testimonial.testimony)).toBeVisible();

    const nextBtn = page.getByRole("button", {
      name: "Show next testimonial",
    });
    if (i < commonFieldValues.length - 1) {
      if (nextBtn) {
        await nextBtn.click();
      }
    }
  }

  //Prev button
  await page.getByRole("button", { name: "Show previous testimonial" }).click();

  await expect(
    page.getByText(commonFieldValues[3].fullName, { exact: true })
  ).toBeHidden();
  await expect(
    page.getByText(commonFieldValues[2].fullName, { exact: true })
  ).toBeVisible();
  await expect(page.getByText(commonFieldValues[2].jobTitle)).toBeVisible();
  await expect(page.getByText(commonFieldValues[2].testimony)).toBeVisible();
  await page.getByRole("button", { name: "Show previous testimonial" }).click();

  await expect(
    page.getByText(commonFieldValues[2].fullName, { exact: true })
  ).toBeHidden();
  await expect(
    page.getByText(commonFieldValues[1].fullName, { exact: true })
  ).toBeVisible();
  await expect(page.getByText(commonFieldValues[1].jobTitle)).toBeVisible();
  await expect(page.getByText(commonFieldValues[1].testimony)).toBeVisible();
  await page.getByRole("button", { name: "Show previous testimonial" }).click();

  await expect(
    page.getByText(commonFieldValues[1].fullName, { exact: true })
  ).toBeHidden();
  await expect(
    page.getByText(commonFieldValues[0].fullName, { exact: true })
  ).toBeVisible();
  await expect(page.getByText(commonFieldValues[0].jobTitle)).toBeVisible();
  await expect(page.getByText(commonFieldValues[0].testimony)).toBeVisible();
  await page.getByRole("button", { name: "Show previous testimonial" }).click();
}
