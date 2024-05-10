import { expect } from "@playwright/test";
import { createSlug, expectDocumentPublished } from "tests/utils";

export default async function VariantA({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  for (const person of commonFieldValues) {
    await page.locator(`span:has-text("${person.name}")`).first().click();
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
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  for (let i = 0; i < commonFieldValues.length; i++) {
    const testimonial = commonFieldValues[i];
    const paginationBtn = `Show Testimonial ${i + 1}`;

    await expect(
      page.getByText(testimonial.fullName, { exact: true })
    ).toBeVisible();
    await expect(page.getByText(testimonial.jobTitle)).toBeVisible();

    await expect(
      page.getByRole("heading", { name: testimonial.testimony })
    ).toBeVisible();

    // Proceed with click only if not the last item
    const paginationButton = page.locator(`[aria-label="${paginationBtn}"]`);
    if (i < commonFieldValues.length - 1) {
      if (paginationButton) {
        await paginationButton.click();
      }
    }
  }
}
