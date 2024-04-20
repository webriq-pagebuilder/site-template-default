import { test, expect, type Page } from "@playwright/test";
import { textComponentInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import {
  autologin_studio,
  clickVariantImage,
  createNewPage,
  deletePageVariant,
  expectDocumentPublished,
  navigateToPage,
  titleFieldInput,
  variantLabelInput,
} from "tests/utils";

let page: Page;
let newPageTitle;

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

async function createTextComponentVariant(
  pageTitle,
  variantLabel,
  variantIndex
) {
  newPageTitle = `${pageTitle} ` + new Date().getTime();
  const titleInput = "Greate Quality Title";

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Text Component");
  await clickVariantImage(page, variantIndex);
  await variantLabelInput(page, variantLabel);
  await titleFieldInput(page, titleInput);

  //First Content
  const firstContentInput = "First Content Test";
  await expect(
    page.getByTestId("activate-overlay").locator("div").first()
  ).toBeVisible();
  await page.getByText("Click to activate").first().click({ force: true });
  await page.getByTestId("text-style--normal").nth(1).click({ force: true });
  await page
    .getByTestId("field-variants.firstColumn")
    .getByRole("textbox")
    .fill("");
  await page
    .getByTestId("field-variants.firstColumn")
    .getByRole("textbox")
    .fill(firstContentInput);

  //Second Content
  const secondContentInput = "Second Content Test";
  if (variantIndex !== 0) {
    await expect(
      page.getByTestId("activate-overlay").locator("div").first()
    ).toBeVisible();
    await page.getByText("Click to activate").first().click({ force: true });
    await page.getByTestId("text-style--normal").nth(1).click({ force: true });
    await page
      .getByTestId("field-variants.secondColumn")
      .getByRole("textbox")
      .fill("");
    await page
      .getByTestId("field-variants.secondColumn")
      .getByRole("textbox")
      .fill(secondContentInput);
  }

  const thirdContentInput = "Third Content Test";
  if (variantIndex === 2) {
    await expect(
      page.getByTestId("activate-overlay").locator("div").first()
    ).toBeVisible();
    await page.getByText("Click to activate").first().click({ force: true });
    await page.getByTestId("text-style--normal").nth(1).click({ force: true });
    await page
      .getByTestId("field-variants.thirdColumn")
      .getByRole("textbox")
      .fill("");
    await page
      .getByTestId("field-variants.thirdColumn")
      .getByRole("textbox")
      .fill(thirdContentInput);
  }

  await expectDocumentPublished(page, newPageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.locator("section")).toBeVisible({ timeout: 150000 });
  await expect(
    openUrlPage.getByRole("heading", { name: titleInput })
  ).toBeVisible();
  await expect(openUrlPage.getByText(firstContentInput)).toBeVisible();

  if (variantIndex !== 0) {
    await expect(openUrlPage.getByText(secondContentInput)).toBeVisible();
  }
  if (variantIndex === 2) {
    await expect(openUrlPage.getByText(thirdContentInput)).toBeVisible();
  }
}

const textVariant = [
  {
    variantName: "Variant A",
    pageTitle: "Text Variant A",
    variantLabel: "Text New Page A",
    variantIndex: 0,
  },
  {
    variantName: "Variant B",
    pageTitle: "Text Variant B",
    variantLabel: "Text New Page B",
    variantIndex: 1,
  },
  {
    variantName: "Variant C",
    pageTitle: "Text Variant C",
    variantLabel: "Text New Page C",
    variantIndex: 2,
  },
];

textVariant.forEach((variant) => {
  test.describe(`${variant.variantName} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.pageTitle}`, async () => {
      await createTextComponentVariant(
        variant.pageTitle,
        variant.variantLabel,
        variant.variantIndex
      );
    });

    test(`Delete ${variant.pageTitle}`, async () => {
      await deletePageVariant(page, newPageTitle, variant.variantLabel);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});
