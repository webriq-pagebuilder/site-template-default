import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  subtitleFieldInput,
  titleFieldInput,
  verifyExternalUrl,
  verifyInternalUrl,
} from "../../utils/index";

export default async function VariantC({
  variantTitle,
  page,
  commonFieldValues,
  isInternalLink,
}) {
  await subtitleFieldInput(page, commonFieldValues.subtitle);
  await titleFieldInput(page, commonFieldValues.title);

  //Blog Posts
  await page.getByRole("button", { name: "Add item" }).click();
  await page.getByTestId("reference-input").getByLabel("Open").click();
  await page
    .getByRole("button", { name: commonFieldValues.referencedBlog })
    .click();
  await expect(
    page.getByRole("link", { name: commonFieldValues.referencedBlog })
  ).toBeVisible({
    timeout: 75000,
  });

  //Button
  await page.getByRole("button", { name: "Primary Button" }).click();
  await page
    .getByTestId("field-variants.primaryButton.label")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.primaryButton.label")
    .getByTestId("string-input")
    .fill(commonFieldValues.button);

  if (!isInternalLink) {
    await page.getByText("External, outside this website").click();
    await page.getByLabel("URL").click();
    await page.getByLabel("URL").fill(commonFieldValues.externalLinkUrl);
    await page.getByText("Blank - open on a new tab (").click();
  } else {
    await page.getByText("Internal, inside this website").click();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("thank you");
    await page
      .getByRole("button", { name: "Thank you Published No" })
      .click({ force: true });
    await page.getByText("Self (default) - open in the").click();
  }

  await expectDocumentPublished(page, variantTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20_000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({
    timeout: 20_000,
  });

  await expect(
    openUrlPage.getByRole("heading", { name: commonFieldValues.title })
  ).toBeVisible();
  await expect(openUrlPage.getByText(commonFieldValues.subtitle)).toBeVisible();

  await openUrlPage
    .getByRole("link", { name: commonFieldValues.button })
    .click({ force: true });
  if (!isInternalLink) {
    const externalPagePromise = openUrlPage.waitForEvent("popup");
    const externalPage = await externalPagePromise;
    await verifyExternalUrl(externalPage, commonFieldValues.externalLinkUrl);
  } else {
    await openUrlPage.waitForLoadState("networkidle");
    await expect(openUrlPage.getByText("Success!")).toBeVisible({
      timeout: 20000,
    });
    await verifyInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
  }
}
