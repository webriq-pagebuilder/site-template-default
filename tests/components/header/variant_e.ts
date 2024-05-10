import { expect } from "@playwright/test";
import { headerInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  generateFormId,
  titleField,
  descriptionField,
  createSlug,
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

  const routesExternalLink = await page.locator(
    'label[data-ui="Flex"] span:has-text("External, outside this website")'
  );
  const routesInternalLink = await page.locator(
    'div[data-ui="Flex"] span:has-text("Internal, inside this website")'
  );

  const blankLinkTarget = page.locator(
    'label[data-ui="Flex"] span:has-text("Blank - open on a new tab (")'
  );
  const selfLinkTarget = page.locator(
    'label[data-ui="Flex"] span:has-text("Self (default) - open in the")'
  );

  const formLinks = [
    { name: "Policy Privacy", updateName: "Privacy Policy" },
    { name: "Terms of Use", updateName: "Use of Terms" },
  ];

  //Form Links
  for (const form of formLinks) {
    await page
      .getByRole("button", { name: `${form.name} Internal Link` })
      .click();
    await expect(page.getByLabel("Edit Link")).toBeVisible();
    await page.locator(`input[value*="${form.name}"]`).click();
    await page.locator(`input[value*="${form.name}"]`).fill(form.updateName);

    if (!isInternalLink) {
      await routesExternalLink.click({ force: true });
      await page
        .locator('div:nth-child(2) > div input[inputmode="url"]')
        .click({ force: true });
      await page
        .locator('div:nth-child(2) > div input[inputmode="url"]')
        .fill(commonFieldValues.externalLinkUrl);
      await blankLinkTarget.click();
    } else {
      await routesInternalLink.click();
      await page.getByTestId("autocomplete").click();
      await page.getByTestId("autocomplete").fill("thank you");
      await page
        .getByRole("button", { name: "Thank you Published No" })
        .click();
      //Commenting this atm due to bug on studio not having scroll. By default it is in self
      // await selfLinkTarget.click();
    }
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);

  const buttonLabels = [
    commonFieldValues.primaryButton,
    commonFieldValues.secondaryButton,
    formLinks[0].updateName,
    formLinks[1].updateName,
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

  await expect(page.getByText(commonFieldValues.subtitle)).toBeVisible();
  await expect(page.getByText(commonFieldValues.formName)).toBeVisible();
  await expect(page.getByText(commonFieldValues.submitButton)).toBeVisible();

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
