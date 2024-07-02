import { expect } from "@playwright/test";
import { teamInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  bodyField,
  expectDocumentPublished,
  launchPreview,
  subtitleField,
  titleField,
} from "tests/utils";

export default async function VariantD({
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
    const body = commonFieldValues.peopleData[i];

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

    // Body
    await bodyField.checkAndAddValue({
      page,
      initialValue: person,
      commonFieldValues: body,
    });

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

  await launchPreview({ page, baseURL, pageTitle });

  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  for (const person of commonFieldValues.peopleData) {
    // Name
    await expect(page.getByText(person.newName)).toBeVisible();

    // Body
    await bodyField.sitePreview({ pageUrl: page, commonFieldValues: person });
  }
}
