import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  assertExternalUrl,
  assertInternalUrl,
} from "tests/utils";

export default async function VariantB({
  pageTitle,
  page,
  commonFieldValues,
  linkNames,
  isInternalLink,
}) {
  if (isInternalLink) {
    await page
      .getByTestId("field-variants.logo.linkType")
      .getByText("Internal, inside this website")
      .click();
    await page.getByTestId("fieldset-link").getByTestId("autocomplete").click();
    await page
      .getByTestId("fieldset-link")
      .getByTestId("autocomplete")
      .fill("thank you");
    await page.getByRole("button", { name: "Thank you Published No" }).click();
    await page.getByText("Self (default) - open in the").click();
  } else {
    await page
      .getByTestId("field-variants.logo.linkType")
      .getByText("External, outside this website")
      .click();
    await page
      .getByTestId("field-variants.logo.linkExternal")
      .getByLabel("URL")
      .click();
    await page
      .getByTestId("field-variants.logo.linkExternal")
      .getByLabel("URL")
      .fill(commonFieldValues.externalLinkUrl);
    await page.getByText("Blank - open on a new tab (").click();
  }

  // 05-03-2024 defer tests for forms
  // Generate Form Id
  //   await generateFormId({ page });
  // await page
  //   .getByRole("button", { name: "Generate ID" })
  //   .click({ force: true });
  // expect(page.getByLabel("Form ID")).not.toBeUndefined();
  // await expect(page.getByRole("button", { name: "Generate ID" })).toBeVisible();
  // await expect(page.getByRole("link", { name: "Manage" })).toBeVisible();

  //Subtitle
  await page
    .getByTestId("field-variants.form.subtitle")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.form.subtitle")
    .getByTestId("string-input")
    .fill(commonFieldValues.subtitle);

  //Form Name
  await page
    .getByTestId("field-variants.form.name")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.form.name")
    .getByTestId("string-input")
    .fill(commonFieldValues.formName);

  //Fields

  for (const forms of commonFieldValues.formFields) {
    await page.getByRole("button", { name: forms.name }).click();
    await expect(page.getByLabel("Edit WebriQ Form Field")).toBeVisible();

    //Form Name
    await page.locator(`input[value^="${forms.name}"]`).first().click();
    await page
      .locator(`input[value^="${forms.name}"]`)
      .first()
      .fill(forms.updatedName);

    //Form Placeholder
    await page.locator(`input[value^="${forms.placeholder}"]`).click();
    await page
      .locator(`input[value^="${forms.placeholder}"]`)
      .fill(forms.updatedName);

    //Required field
    await page.getByLabel("Is this field Required?").click();
    await page.getByLabel("Close dialog").click();
  }

  //Submit Button Label
  const submitBtnInput = "Submit Button";
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .fill(submitBtnInput);

  //Thank you Page Internal/External
  await page.getByRole("button", { name: "Thank You page" }).click();
  if (!isInternalLink) {
    await page
      .getByTestId("field-variants.form.thankYouPage.linkType")
      .getByText("External, outside this website")
      .click();
    await page
      .getByTestId("field-variants.form.thankYouPage.linkExternal")
      .getByLabel("URL")
      .click();
    await page
      .getByTestId("field-variants.form.thankYouPage.linkExternal")
      .getByLabel("URL")
      .fill(commonFieldValues.externalLinkUrl);
  }

  //SignIn Button Link
  await page
    .getByTestId("field-variants.signinLink.label")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.signinLink.label")
    .getByTestId("string-input")
    .fill(commonFieldValues.signInButton);

  if (isInternalLink) {
    await page
      .getByTestId("field-variants.signinLink.linkType")
      .getByText("Internal, inside this website")
      .click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page.getByRole("button", { name: "Thank you Published No" }).click();
    await page
      .getByTestId("field-variants.signinLink.linkTarget")
      .getByText("Self (default) - open in the")
      .click();
  } else {
    await page
      .getByTestId("field-variants.signinLink.linkType")
      .getByText("External, outside this website")
      .click();
    await page
      .getByTestId("field-variants.signinLink.linkExternal")
      .getByLabel("URL")
      .click();
    await page
      .getByTestId("field-variants.signinLink.linkExternal")
      .getByLabel("URL")
      .fill(commonFieldValues.externalLinkUrl);
    await page
      .getByTestId("field-variants.signinLink.linkTarget")
      .getByText("Blank - open on a new tab (")
      .click();
  }

  const routesExternalLink = await page.locator(
    '.sc-jdUcAg > div:nth-child(2) > div label[data-ui="Flex"] span:has-text("External, outside this website"):nth-child(1)'
  );
  const routesInternalLink = await page.locator(
    '.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("Internal, inside this website")'
  );

  const blankLinkTarget = page.locator(
    '.sc-jdUcAg > div:nth-child(2) > div label[data-as="label"] span:has-text("Blank - open on a new tab (")'
  );

  //Form Links
  for (const links of commonFieldValues.formLinks) {
    await page.getByRole("button", { name: links.name }).click();
    await expect(page.getByLabel("Edit Link")).toBeVisible();

    await page.locator(`input[value^="${links.name}"]`).click();
    await page.locator(`input[value^="${links.name}"]`).fill(links.updatedName);

    if (isInternalLink) {
      await routesInternalLink.click();
      await page.getByTestId("autocomplete").click({ force: true });
      await page.getByTestId("autocomplete").fill("thank you");
      await page
        .getByRole("button", { name: "Thank you Published No" })
        .click();
    } else {
      await routesExternalLink.click();
      await page
        .locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]')
        .click();
      await page
        .locator('.sc-jdUcAg > div:nth-child(2) > div input[inputmode="url"]')
        .fill(commonFieldValues.externalLinkUrl);
      await blankLinkTarget.click();
    }
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, pageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  // 05-03-2024 defer tests for forms
  //Fill up form
  // for (const input of commonFieldValues.formFields) {
  //   await openUrlPage.getByLabel(submitBtnInput).click();
  //   await expect(openUrlPage.getByPlaceholder(input.updatedName)).toBeFocused();
  //   await openUrlPage.getByPlaceholder(input.updatedName).click();
  //   await openUrlPage.getByPlaceholder(input.updatedName).fill(input.input);
  //   await openUrlPage.getByLabel(submitBtnInput).click();
  //   await expect(
  //     openUrlPage.getByPlaceholder(input.updatedName)
  //   ).not.toBeFocused();
  // }

  let logoImg = isInternalLink
    ? "Go to /thank-you"
    : `Go to ${commonFieldValues.externalLinkUrl}`;

  await assertPageContent(
    openUrlPage,
    commonFieldValues,
    logoImg,
    isInternalLink
  );

  const slug = pageTitle
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  for (const linkName of linkNames) {
    await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`);

    await assertPageContent(page, commonFieldValues, linkName, isInternalLink);
  }
}

async function assertPageContent(
  openUrlPage,
  commonFieldValues,
  linkName,
  isInternalLink
) {
  await expect(openUrlPage.getByLabel(linkName)).toBeVisible();
  await expect(openUrlPage.getByText(commonFieldValues.subtitle)).toBeVisible();
  await expect(
    openUrlPage.getByRole("heading", { name: commonFieldValues.formName })
  ).toBeVisible();
  await expect(
    openUrlPage.getByLabel(commonFieldValues.signInButton)
  ).toBeVisible();

  for (const input of commonFieldValues.formFields) {
    await expect(openUrlPage.getByPlaceholder(input.updatedName)).toBeVisible();
    for (const links of commonFieldValues.formLinks) {
      await expect(openUrlPage.getByLabel(links.updatedName)).toBeVisible();
    }
  }

  await openUrlPage
    .getByRole("link", { name: linkName })
    .click({ force: true });
  if (isInternalLink) {
    await openUrlPage.waitForLoadState("networkidle");
    await expect(openUrlPage.getByText("Success!")).toBeVisible({
      timeout: 20_000,
    });
    await assertInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
  } else if (!isInternalLink) {
    const externalPagePromise = openUrlPage.waitForEvent("popup");
    const externalPage = await externalPagePromise;
    await assertExternalUrl(externalPage, commonFieldValues.externalLinkUrl);
  }
}
