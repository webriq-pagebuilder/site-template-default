import { expect } from "@playwright/test";
import {
  createSlug,
  expectDocumentPublished,
  subtitleField,
  titleField,
} from "tests/utils";
import { teamInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default async function VariantC({
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
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");
  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  for (const person of commonFieldValues.peopleData) {
    await expect(page.getByText(person.nameChange)).toBeVisible();
    await expect(
      page.getByText(person.jobChange, { exact: true })
    ).toBeVisible();
  }
}
