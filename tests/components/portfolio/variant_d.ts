import { expect } from "@playwright/test";
import { portfolioInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  expectDocumentPublished,
  subtitleField,
  titleField,
  assertExternalUrl,
  assertInternalUrl,
  createSlug,
} from "tests/utils";

export default async function VariantD({
  pageTitle,
  page,
  commonFieldValues,
  isInternalLink,
  baseURL,
}) {
  //Subtitle
  await subtitleField.checkAndAddValue({
    page,
    initialValue: portfolioInitialValue,
    commonFieldValues,
  });

  //Title
  await titleField.checkAndAddValue({
    page,
    initialValue: portfolioInitialValue,
    commonFieldValues,
  });

  //Categories
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

  await expectDocumentPublished(page, pageTitle);
  await page.goto(`${baseURL}/${createSlug(pageTitle)}`);
  page.waitForLoadState("domcontentloaded");

  await assertPageContent({ page, commonFieldValues, isInternalLink });
}

async function assertPageContent({ page, commonFieldValues, isInternalLink }) {
  //Title
  await titleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Subtitle
  await subtitleField.sitePreview({ pageUrl: page, commonFieldValues });

  //Categories
  for (const category of commonFieldValues.categories) {
    await expect(page.getByLabel(category.updatedName)).toBeVisible();
    await page.getByLabel(category.updatedName).click();

    await checkImageDetails(page.locator(".absolute").first());
    await checkImageDetails(
      page.locator("div:nth-child(2) > .relative > .absolute").first()
    );
    await checkImageDetails(
      page.locator("div:nth-child(3) > .relative > .absolute")
    );
    await checkImageDetails(
      page.locator("div:nth-child(2) > div > .relative > .absolute").first()
    );
    await checkImageDetails(
      page.locator(".w-full > .flex > div > .relative > .absolute").first()
    );
    await checkImageDetails(
      page.locator(
        "div:nth-child(2) > div:nth-child(2) > .relative > .absolute"
      )
    );
  }

  await expect(
    page.locator(`a[aria-label="${commonFieldValues.button}"]`)
  ).toBeVisible();

  if (!isInternalLink) {
    await expect(
      page.locator(`a[aria-label="${commonFieldValues.button}"]`).first()
    ).toHaveAttribute("target", "_blank");
  } else if (isInternalLink) {
    await expect(
      page.locator(`a[aria-label="${commonFieldValues.button}"]`).first()
    ).toHaveAttribute("target", "_self");
  }
}

async function checkImageDetails(imageLocator) {
  const imageTitle = "Lorem ipsum dolor sit amet consectutar";
  const imageSubtitle = "Dolor sit amet consectutar";
  const imageDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodal...";

  await expect(imageLocator).toBeVisible();
  await expect(
    imageLocator.locator(`p:has-text("${imageSubtitle}")`)
  ).toBeVisible();
  await expect(
    imageLocator.locator(`h1:has-text("${imageTitle}")`)
  ).toBeVisible();
  await expect(
    imageLocator.locator(`p:has-text("${imageDescription}")`)
  ).toBeVisible();
  await expect(
    imageLocator.locator('a[aria-label="View Project"]')
  ).toBeVisible();
}
