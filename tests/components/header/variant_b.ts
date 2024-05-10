import { expect } from "@playwright/test";
import { headerInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  titleField,
  descriptionField,
  createSlug,
} from "tests/utils";

export default async function VariantB({
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

  //Primary Button
  await page.getByRole("button", { name: "Primary Button" }).click();
  await page
    .getByTestId("field-variants.primaryButton.label")
    .getByTestId("string-input")
    .fill(commonFieldValues.primaryButton);

  //Determine the proceeds if it is internal or external link
  if (!isInternalLink) {
    await page
      .getByTestId("field-variants.primaryButton.linkType")
      .getByText("External, outside this website")
      .click();
    // await page.getByLabel('URL').click();
    await page
      .getByTestId("field-variants.primaryButton.linkExternal")
      .getByLabel("URL")
      .click();
    await page
      .getByTestId("field-variants.primaryButton.linkExternal")
      .getByLabel("URL")
      .fill(commonFieldValues.externalLinkUrl);
    await page.getByText("Blank - open on a new tab (").click();
  } else {
    await page
      .getByTestId("field-variants.primaryButton.linkType")
      .getByText("Internal, inside this website")
      .click();
    // await page.getByTestId('reference-input').getByLabel('Open').click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page
      .getByRole("button", { name: "Thank you Published No" })
      .click({ force: true });
    await page.getByText("Self (default) - open in the").click();
  }
  //Close primary button toggle
  await page.getByRole("button", { name: "Primary Button" }).click();

  //Secondary Button
  await page.getByRole("button", { name: "Secondary Button" }).click();
  await page
    .getByTestId("field-variants.secondaryButton.label")
    .getByTestId("string-input")
    .fill(commonFieldValues.secondaryButton);

  //Determine the proceeds if it is internal or external link
  if (!isInternalLink) {
    await page
      .getByTestId("field-variants.secondaryButton.linkType")
      .getByText("External, outside this website")
      .click();
    await page
      .getByTestId("field-variants.secondaryButton.linkExternal")
      .getByLabel("URL")
      .click();
    await page
      .getByTestId("field-variants.secondaryButton.linkExternal")
      .getByLabel("URL")
      .fill(commonFieldValues.externalLinkUrl);
    await page.getByText("Blank - open on a new tab (").click();
  } else {
    await page
      .getByTestId("field-variants.secondaryButton.linkType")
      .getByText("Internal, inside this website")
      .click();
    // await page.getByTestId('reference-input').getByLabel('Open').click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page
      .getByRole("button", { name: "Thank you Published No" })
      .click({ force: true });
    await page.getByText("Self (default) - open in the").click();
  }
  //Close Secondary button toggle
  await page.getByRole("button", { name: "Secondary Button" }).click();

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);

  const buttonLabels = [
    commonFieldValues.primaryButton,
    commonFieldValues.secondaryButton,
  ];

  for (const button of buttonLabels) {
    await page.waitForLoadState("domcontentloaded");
    await assertPageContent(page, button, commonFieldValues, isInternalLink);
  }
}

async function assertPageContent(
  page,
  linkName,
  commonFieldValues,
  isInternalLink
) {
  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Description
  await descriptionField.sitePreview({
    pageUrl: page,
    commonFieldValues,
  });

  //Primary Button
  await expect(page.getByLabel(commonFieldValues.primaryButton)).toBeVisible();

  //Secondary Button
  await expect(
    page.getByLabel(commonFieldValues.secondaryButton)
  ).toBeVisible();

  await expect(page.getByRole("link", { name: linkName })).toBeVisible();
  if (!isInternalLink) {
    await expect(page.getByRole("link", { name: linkName })).toHaveAttribute(
      "target",
      "_blank"
    );
  } else {
    await expect(
      await page.getByRole("link", { name: linkName })
    ).toHaveAttribute("target", "_self");
  }
}
