import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  subtitleFieldInput,
  titleFieldInput,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";

export default async function VariantA({ pageTitle, page, commonFieldValues }) {
  await subtitleFieldInput(page, commonFieldValues.subtitle);
  await titleFieldInput(page, commonFieldValues.title);

  //Body
  await page.getByLabel("Body").click();
  await page.getByLabel("Body").fill(commonFieldValues.body);

  for (const step of commonFieldValues.stepsData) {
    await page.getByRole("button", { name: step.title }).first().click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();

    // Update title
    await page.locator(`input[value^="${step.title}"]`).click();
    await page.locator(`input[value^="${step.title}"]`).fill(step.updatedTitle);

    // Update body
    await page.locator("textarea").filter({ hasText: step.body }).click();
    await page
      .locator("textarea")
      .filter({ hasText: step.body })
      .fill(step.updatedBody);
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20_000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({ timeout: 20_000 });

  await expect(
    openUrlPage.getByRole("heading", { name: commonFieldValues.title })
  ).toBeVisible();
  await expect(openUrlPage.getByText(commonFieldValues.subtitle)).toBeVisible();
  await expect(openUrlPage.getByText(commonFieldValues.body)).toBeVisible();
  await expect(openUrlPage.locator(".aspect-video")).toBeVisible();

  for (const steps of commonFieldValues.stepsData) {
    await expect(openUrlPage.getByText(steps.updatedTitle)).toBeVisible();
    await expect(openUrlPage.getByText(steps.updatedBody)).toBeVisible();
  }
}
