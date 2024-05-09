import { expect } from "@playwright/test";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
} from "tests/utils";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import { teamInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default async function VariantA({
  pageTitle,
  page,
  commonFieldValues,
  baseURL,
}) {
  //Subtitle
  await subtitleField.checkAndAddValue({
    page,
    initialValue: teamInitialValue,
    commonFieldValues,
  });

  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: teamInitialValue,
    commonFieldValues,
  });

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

  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(baseURL).click({ force: true });
  const openUrlPage = await pagePromise;

  //Title
  await titleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: openUrlPage, commonFieldValues });

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
