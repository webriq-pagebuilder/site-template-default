import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { expectDocumentPublished } from "tests/utils";

export default async function VariantA({ pageTitle, page, commonFieldValues }) {
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

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  for (let i = 0; i < commonFieldValues.length; i++) {
    const testimonial = commonFieldValues[i];
    const paginationBtn = `Show Testimonial ${i + 1}`;

    await expect(
      openUrlPage.getByText(testimonial.fullName, { exact: true })
    ).toBeVisible();
    await expect(openUrlPage.getByText(testimonial.jobTitle)).toBeVisible();

    await expect(
      openUrlPage.getByRole("heading", { name: testimonial.testimony })
    ).toBeVisible();

    // Proceed with click only if not the last item
    const paginationButton = openUrlPage.locator(
      `[aria-label="${paginationBtn}"]`
    );
    if (i < commonFieldValues.length - 1) {
      if (paginationButton) {
        await paginationButton.click();
      }
    }
  }
}
