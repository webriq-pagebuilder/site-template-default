import { expect } from "@playwright/test";
import { NEXT_PUBLIC_SITE_URL } from "studio/config";
import {
  expectDocumentPublished,
  subtitleFieldInput,
  titleFieldInput,
} from "../../utils/index";

export default async function VariantA({ pageTitle, page, commonFieldValues }) {
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

  await expectDocumentPublished(page, pageTitle);

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

  await openUrlPage.getByPlaceholder("Search posts...").click();
  await openUrlPage
    .getByPlaceholder("Search posts...")
    .fill(commonFieldValues.referencedBlog);
  await expect(
    openUrlPage.getByLabel(commonFieldValues.referencedBlog)
  ).toBeVisible();
}
