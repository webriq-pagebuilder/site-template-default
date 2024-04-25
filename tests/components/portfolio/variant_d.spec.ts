import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  subtitleFieldInput,
  titleFieldInput,
  verifyExternalUrl,
  verifyInternalUrl,
} from "tests/utils";

export default async function VariantD({
  variantTitle,
  page,
  commonFieldValues,
  isInternalLink,
}) {
  await subtitleFieldInput(page, commonFieldValues.subtitle);
  await titleFieldInput(page, commonFieldValues.title);

  for (const category of commonFieldValues.categories) {
    await page.getByRole("button", { name: category.name }).click();
    await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
    await page.locator(`input[value="${category.name}"]`).click();
    await page
      .locator(`input[value="${category.name}"]`)
      .fill(category.updatedName);

    await page.getByRole("button", { name: "Primary Button" }).click();
    if (!isInternalLink) {
      await page.locator('input[value="View Project"]').click();
      await page
        .locator('input[value="View Project"]')
        .fill(commonFieldValues.button);
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
        .click();
      await page.getByText("Self (default) - open in the").click();
    }
    await page.getByLabel("Close dialog").click();
  }

  await expectDocumentPublished(page, variantTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await assertPageContent({ openUrlPage, commonFieldValues, isInternalLink });
}

async function assertPageContent({
  openUrlPage,
  commonFieldValues,
  isInternalLink,
}) {
  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20_000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({ timeout: 20_000 });

  // Loop for the expected checkboxes
  for (const category of commonFieldValues.categories) {
    await expect(openUrlPage.getByLabel(category.updatedName)).toBeVisible();
    await openUrlPage.getByLabel(category.updatedName).click();
    await expect(
      openUrlPage.locator("div:nth-child(2) > .relative > .absolute").first()
    ).toBeVisible();
    await expect(
      openUrlPage.locator("div:nth-child(3) > .relative > .absolute")
    ).toBeVisible();
    await expect(
      openUrlPage
        .locator("div:nth-child(2) > div > .relative > .absolute")
        .first()
    ).toBeVisible();
    await expect(
      openUrlPage
        .locator(".w-full > .flex > div > .relative > .absolute")
        .first()
    ).toBeVisible();
    await expect(
      openUrlPage.locator(
        "div:nth-child(2) > div:nth-child(2) > .relative > .absolute"
      )
    ).toBeVisible();
  }

  await openUrlPage.locator(".text-center > .inline-block").click();
  if (isInternalLink) {
    await openUrlPage.waitForLoadState("networkidle");
    await expect(openUrlPage.getByText("Success!")).toBeVisible({
      timeout: 150_000,
    });
    await verifyInternalUrl(openUrlPage, commonFieldValues.internalLinkUrl);
  } else if (!isInternalLink) {
    const page10Promise = openUrlPage.waitForEvent("popup");
    const page10 = await page10Promise;
    await verifyExternalUrl(page10, commonFieldValues.externalLinkUrl);
  }
}
