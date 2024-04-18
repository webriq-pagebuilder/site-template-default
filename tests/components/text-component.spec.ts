import { test, expect, type Page } from "@playwright/test";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import {
  autologin_studio,
  createNewPage,
  deletePageVariant,
  expectDocumentPublished,
  navigateToPage,
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

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Text Component");

  //Variant
  if (variantIndex <= 0) {
    await page
      .getByTestId("field-variant")
      .getByRole("img")
      .first()
      .click({ force: true });
  } else {
    await page
      .getByTestId("field-variant")
      .getByRole("img")
      .nth(variantIndex)
      .click({ force: true });
  }

  //Section Name
  await page.getByTestId("field-label").getByTestId("string-input").click();
  await page
    .getByTestId("field-label")
    .getByTestId("string-input")
    .fill(variantLabel);

  //Title
  const titleInput = "Greate Quality Title";
  await page
    .getByTestId("field-variants.title")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.title")
    .getByTestId("string-input")
    .fill(titleInput);

  //Content
  const firstContentInput =
    "Phasellus consequat vehicula metus non sagittis. Sed quis ipsum non velit tempus consequat sit amet eget augue.";
  await page.getByTestId("activate-overlay").locator("div").first().click();
  await page.getByText("Etiam facilisis mauris leo,").click();
  await page.getByText("Etiam facilisis mauris leo,").press("Meta+a");
  await page.getByText("Etiam facilisis mauris leo,").fill(firstContentInput);

  await expectDocumentPublished(page);
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;
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
      await deletePageVariant(page, newPageTitle);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});
