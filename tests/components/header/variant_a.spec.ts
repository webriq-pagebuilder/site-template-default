import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  titleFieldInput,
  expectDocumentPublished,
  verifyExternalUrl,
  verifyInternalUrl,
} from "tests/utils";

export default async function VariantA({
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

  await expectDocumentPublished(page, variantTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  const buttonLabels = [
    commonFieldValues.primaryButton,
    commonFieldValues.secondaryButton,
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
  ).toBeVisible({ timeout: 150000 });
  await expect(
    openUrlPage.getByText(commonFieldValues.description)
  ).toBeVisible({
    timeout: 150000,
  });
  await expect(
    openUrlPage.getByLabel(commonFieldValues.primaryButton)
  ).toBeVisible({
    timeout: 150000,
  });
  await expect(
    openUrlPage.getByLabel(commonFieldValues.secondaryButton)
  ).toBeVisible({
    timeout: 150000,
  });

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
      timeout: 20000,
    });
    await verifyInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
  }
}
