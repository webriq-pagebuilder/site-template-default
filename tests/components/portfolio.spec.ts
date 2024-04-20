import { test, expect, type Page } from "@playwright/test";
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
  subtitleFieldInput,
  titleFieldInput,
  variantLabelInput,
  verifyExternalUrl,
  verifyInternalUrl,
} from "../utils/index";

let page: Page;
let newPageTitle;
const externalLinkUrl = "https://facebook.com/";
const internalLinkUrl = `${NEXT_PUBLIC_SITE_URL}/thank-you/`;
const btnInput = "View Project Test";

const categories = [
  {
    name: "Category 1",
    updatedName: "Test Category 1",
  },
  {
    name: "Category 2",
    updatedName: "Test Category 2",
  },
  {
    name: "Category 3",
    updatedName: "Test Category 3",
  },
  {
    name: "Category 4",
    updatedName: "Test Category 4",
  },
];

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

export async function createPortfolioVarant(
  pageTitle,
  variantLabel,
  variantIndex,
  isInternalLink
) {
  const time = new Date().getTime();
  newPageTitle = pageTitle + time;
  const subtitleInput = "Subtitle Test Input";
  const titleInput = "Title Test Input";

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Portfolio");
  await clickVariantImage(page, variantIndex);
  await variantLabelInput(page, variantLabel);
  await subtitleFieldInput(page, subtitleInput);
  await titleFieldInput(page, titleInput);

  if (variantIndex === 0 || variantIndex === 3) {
    for (const category of categories) {
      await page.getByRole("button", { name: category.name }).click();
      await expect(page.getByLabel("Edit", { exact: true })).toBeVisible();
      await page.locator(`input[value="${category.name}"]`).click();
      await page
        .locator(`input[value="${category.name}"]`)
        .fill(category.updatedName);

      if (variantIndex === 0 || variantIndex === 3) {
        await page.getByRole("button", { name: "Primary Button" }).click();
        if (!isInternalLink) {
          await page.locator('input[value="View Project"]').click();
          await page.locator('input[value="View Project"]').fill(btnInput);
          await page.getByText("External, outside this website").click();
          await page.getByLabel("URL").click();
          await page.getByLabel("URL").fill(externalLinkUrl);
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
    }
  }

  if (variantIndex === 1 || variantIndex === 2) {
    await page.getByRole("button", { name: "Primary Button" }).click();
    await page
      .getByTestId("field-variants.primaryButton.label")
      .getByTestId("string-input")
      .click();
    await page
      .getByTestId("field-variants.primaryButton.label")
      .getByTestId("string-input")
      .fill(btnInput);
    if (!isInternalLink) {
      await page.getByText("External, outside this website").click();
      await page.getByLabel("URL").click();
      await page.getByLabel("URL").fill(externalLinkUrl);
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
  }

  await expectDocumentPublished(page, newPageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  if (variantIndex === 1) {
    await assertPageContent(
      openUrlPage,
      btnInput,
      isInternalLink,
      variantIndex
    );
  }

  if (variantIndex === 2) {
    await assertPageContent(
      openUrlPage,
      btnInput,
      isInternalLink,
      variantIndex
    );
  }
}

async function clickElementByVariantIndex(page, variantIndex, btnInput) {
  if (variantIndex === 0) {
    await page.locator(".text-center > .inline-block").click();
  } else {
    await page.getByRole("link", { name: btnInput }).click();
  }
}

async function assertPageContent(
  openUrlPage,
  category,
  isInternalLink,
  variantIndex
) {
  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 150000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({ timeout: 150000 });

  // Loop for the expected checkboxes
  if (variantIndex === 0) {
    for (let i = 2; i <= 8; i++) {
      await expect(
        openUrlPage.locator(`div:nth-child(${i}) > .relative > .absolute`)
      ).toBeVisible();
    }
  }

  if (variantIndex === 0 || variantIndex === 3) {
    await openUrlPage.getByLabel(category.updatedName).click();
    await expect(
      openUrlPage.locator(".w-full > .relative > .absolute").first()
    ).toBeVisible();
    for (const category of categories) {
      await expect(openUrlPage.getByLabel(category.updatedName)).toBeVisible();
    }
  }

  if (variantIndex === 1) {
    await expect(
      openUrlPage.locator(".relative > .flex").first()
    ).toBeVisible();

    for (let i = 2; i <= 6; i++) {
      await expect(
        openUrlPage.locator(`div:nth-child(${i}) > .relative > .flex`)
      ).toBeVisible();
    }
  }

  if (variantIndex === 2) {
    await expect(openUrlPage.locator(".p-6").first()).toBeVisible();

    for (let i = 2; i <= 6; i++) {
      await expect(
        openUrlPage
          .locator(
            `div:nth-child(${i}) > .h-full > .p-6 > .text-base:has-text("2021-01-24")`
          )
          .first()
      ).toBeVisible();
      await expect(
        openUrlPage.locator(`div:nth-child(${i}) > .h-full > .p-6`)
      ).toBeVisible();
    }
  }

  if (variantIndex === 4) {
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

  if (isInternalLink) {
    if (variantIndex === 0) {
      await openUrlPage.locator(".text-center > .inline-block").click();
    } else {
      await openUrlPage.getByRole("link", { name: btnInput }).click();
    }
    await openUrlPage.waitForLoadState("networkidle");
    await expect(openUrlPage.getByText("Success!")).toBeVisible({
      timeout: 150000,
    });
    await verifyInternalUrl(openUrlPage, internalLinkUrl);
  } else if (!isInternalLink) {
    const page10Promise = openUrlPage.waitForEvent("popup");
    if (variantIndex === 0) {
      await openUrlPage.locator(".text-center > .inline-block").click();
    } else {
      await openUrlPage.getByRole("link", { name: btnInput }).click();
    }
    const page10 = await page10Promise;
    await verifyExternalUrl(page10, externalLinkUrl);
  }
}

const createPorfolioTest = async (
  pageTitle,
  variantName,
  variantIndex,
  isInternalLink
) => {
  await createPortfolioVarant(
    pageTitle,
    variantName,
    variantIndex,
    isInternalLink
  );
  // Loops all category routes
  if (variantIndex === 0 || variantIndex === 3) {
    for (const category of categories) {
      const slug = newPageTitle
        ?.toLowerCase()
        ?.replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      await page.goto(`${NEXT_PUBLIC_SITE_URL}/${slug}`);
      await assertPageContent(page, category, isInternalLink, variantIndex);
    }
  }
};

const portfolioVariant = [
  {
    variantName: "Variant A",
    pageTitle: "Portfolio Variant A ",
    variantLabel: "Portfolio New Page A",
    variantIndex: 0,
    isInternalLink: true,
  },
  {
    variantName: "Variant B",
    pageTitle: "Portfolio Variant B ",
    variantLabel: "Portfolio New Page B",
    variantIndex: 1,
    isInternalLink: true,
  },
  {
    variantName: "Variant C",
    pageTitle: "Portfolio Variant C ",
    variantLabel: "Portfolio New Page C",
    variantIndex: 2,
    isInternalLink: false,
  },
  {
    variantName: "Variant D",
    pageTitle: "Portfolio Variant D ",
    variantLabel: "Portfolio New Page D",
    variantIndex: 3,
    isInternalLink: false,
  },
];

portfolioVariant.forEach((variant) => {
  test.describe(`${variant.variantName} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.pageTitle}`, async () => {
      await createPorfolioTest(
        variant.pageTitle,
        variant.variantLabel,
        variant.variantIndex,
        variant.isInternalLink
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
