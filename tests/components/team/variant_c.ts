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

  for (let i = 0; i < teamInitialValue.teams.length; i++) {
    const person = teamInitialValue.teams[i];
    const newName = commonFieldValues.peopleData[i]?.newName;
    const newJob = commonFieldValues.peopleData[i]?.newJob;

    await expect(page.getByRole("button", { name: person.name })).toBeVisible();
    try {
      await page.getByRole("button", { name: person.name }).click();
      await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
    } catch (error) {
      console.warn("Edit dialog is not visible, clicking button again...");
      await page.getByRole("button", { name: person.name }).click();
      await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
    }

    // Name
    await page.locator(`input[value="${person.name}"]`).click();
    await page.locator(`input[value="${person.name}"]`).fill(newName);

    // Job Title
    await page.locator(`input[value="${person.jobTitle}"]`).click();
    await page.locator(`input[value="${person.jobTitle}"]`).fill(newJob);

    try {
      await page.getByLabel("Close dialog").click();
      await expect(page.getByLabel("Close dialog")).toBeHidden();
    } catch (error) {
      console.warn("Clicking close dialog again since it is not hidden.");
      await page.getByLabel("Close dialog").click();
      await expect(page.getByLabel("Close dialog")).toBeHidden();
    }
  }

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  for (const person of commonFieldValues.peopleData) {
    // Name
    await expect(page.getByText(person.newName)).toBeVisible();

    // Job Title
    await expect(page.getByText(person.newJob, { exact: true })).toBeVisible();
  }
}
