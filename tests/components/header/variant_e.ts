import { expect } from "@playwright/test";
import { headerInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  addNavigationRoutes,
  descriptionField,
  expectDocumentPublished,
  launchPreview,
  primaryButtonField,
  secondaryButtonField,
  titleField,
} from "tests/utils";

export default async function VariantE({
  pageTitle,
  page,
  commonFieldValues,
  isInternalLink,
  baseURL,
}) {
  //Content Title
  await titleField.checkAndAddValue({
    page,
    initialValue: headerInitialValue,
    commonFieldValues,
  });

  //Content Description
  await descriptionField.checkAndAddValue({
    page,
    initialValue: headerInitialValue,
    placeholder: headerInitialValue.description,
    commonFieldValues,
  });

  // Primary Button
  await primaryButtonField.checkAndAddValue({
    page,
    initialValue: headerInitialValue,
    commonFieldValues,
    isInternalLink,
  });

  // Secondary Button
  await secondaryButtonField.checkAndAddValue({
    page,
    initialValue: headerInitialValue,
    commonFieldValues,
    isInternalLink,
  });

  // 05-03-2024 defer tests for forms
  //   await generateFormId({ page });
  // await page
  //   .getByRole("button", { name: "Generate ID" })
  //   .click({ force: true });
  // expect(page.getByLabel("Form ID")).not.toBeUndefined();
  // await expect(page.getByRole("button", { name: "Generate ID" })).toBeVisible();
  // await expect(page.getByRole("link", { name: "Manage" })).toBeVisible();

  // Form Subtitle
  const formSubtitle = page
    .getByTestId("field-variants.form.subtitle")
    .getByTestId("string-input");
  await formSubtitle.click();
  await formSubtitle.fill(commonFieldValues.subtitle);

  //Form Create an Account
  const formName = page
    .getByTestId("field-variants.form.name")
    .getByTestId("string-input");
  await formName.click();
  await formName.fill(commonFieldValues.formName);

  const buttonLabel = page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input");
  await buttonLabel.click();
  await buttonLabel.fill(commonFieldValues.submitButton);

  //Form Links
  const formLinks = [{ name: "Policy Privacy" }, { name: "Terms of Use" }];
  for (const form of formLinks) {
    const buttonName = `${form.name} Internal Link Not Set`;
    await addNavigationRoutes({
      page,
      buttonName,
      commonFieldValues,
      isInternalLink,
    });
  }

  await expectDocumentPublished(page, pageTitle);
  // Launch preview
  await launchPreview({ page, baseURL, pageTitle });
  await assertPageContent(page, commonFieldValues, isInternalLink);
}

async function assertPageContent(page, commonFieldValues, isInternalLink) {
  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Description
  await descriptionField.sitePreview({
    pageUrl: page,
    commonFieldValues,
  });

  // Primary Button
  await primaryButtonField.sitePreview({
    pageUrl: page,
    commonFieldValues,
    isInternalLink,
  });

  // Secondary Button
  await secondaryButtonField.sitePreview({
    pageUrl: page,
    commonFieldValues,
    isInternalLink,
  });

  await expect(page.getByText(commonFieldValues.subtitle)).toBeVisible();
  await expect(page.getByText(commonFieldValues.formName)).toBeVisible();
  await expect(page.getByText(commonFieldValues.submitButton)).toBeVisible();

  //add formlinks, submit button a tag
}
