import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  titleFieldInput,
  expectDocumentPublished,
  verifyExternalUrl,
  verifyInternalUrl,
  generateFormId,
} from "tests/utils";

export default async function VariantE({
  variantTitle,
  page,
  commonFieldValues,
  isInternalLink,
}) {
  //Content Title
  await titleFieldInput(page, commonFieldValues.title);

  //Content Description
  await page.getByPlaceholder("Lorem ipsum dolor sit amet,").click();
  await page
    .getByPlaceholder("Lorem ipsum dolor sit amet,")
    .fill(commonFieldValues.description);

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

  // TODO: GENERATE FORM ID HERE
  //   await generateFormId({ page });
  await page
    .getByRole("button", { name: "Generate ID" })
    .click({ force: true });
  expect(page.getByLabel("Form ID")).not.toBeUndefined();
  await expect(page.getByRole("button", { name: "Generate ID" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Manage" })).toBeVisible();

  //Form Subtitle
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

  // TODO: FORM FIELDS EDIT HERE

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
        .locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]')
        .click({ force: true });
      await page
        .locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]')
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

  await expectDocumentPublished(page, variantTitle);

  const buttonLabels = [
    commonFieldValues.primaryButton,
    commonFieldValues.secondaryButton,
    formLinks[0].updateName,
    formLinks[1].updateName,
  ];

  const slug = variantTitle
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  for (const button of buttonLabels) {
    await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`);
    await assertPageContent(page, button, commonFieldValues, isInternalLink);
  }
}

async function assertPageContent(
  openUrlPage,
  linkName,
  commonFieldValues,
  isInternalLink
) {
  // If the section no items is not found, expect the Empty Page element to be hidden
  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 150_000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({
    timeout: 150_000,
  });

  await expect(
    openUrlPage.getByRole("heading", { name: commonFieldValues.title })
  ).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues.description)
  ).toBeVisible();
  await expect(
    openUrlPage.getByLabel(commonFieldValues.primaryButton)
  ).toBeVisible();
  await expect(
    openUrlPage.getByLabel(commonFieldValues.secondaryButton)
  ).toBeVisible();

  await expect(openUrlPage.getByText(commonFieldValues.subtitle)).toBeVisible();
  await expect(openUrlPage.getByText(commonFieldValues.formName)).toBeVisible();
  await expect(
    openUrlPage.getByText(commonFieldValues.submitButton)
  ).toBeVisible();

  if (!isInternalLink) {
    const page10Promise = openUrlPage.waitForEvent("popup");
    await openUrlPage
      .getByRole("link", { name: linkName })
      .click({ force: true });
    const page10 = await page10Promise;
    await verifyExternalUrl(page10, commonFieldValues.externalLinkUrl);
  } else {
    await openUrlPage
      .getByRole("link", { name: linkName })
      .click({ force: true });
    await openUrlPage.waitForLoadState("networkidle");
    await expect(openUrlPage.getByText("Success!")).toBeVisible({
      timeout: 20_000,
    });
    await verifyInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
  }
}
