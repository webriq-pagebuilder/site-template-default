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

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

export async function createBlogVariant(
  pageTitle,
  variantLabel,
  variantIndex,
  isInternalLink
) {
  const time = new Date().getTime();
  newPageTitle = pageTitle + time;
  const inputContentSubtitle = `Subtitle ` + time;
  const inputContentTitle = `Blog Title ` + time;
  const referencedBlog = "Mariel test blogs";
  const buttonInputValue = "View More";

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Blog");
  await clickVariantImage(page, variantIndex);
  await variantLabelInput(page, variantLabel);
  await subtitleFieldInput(page, inputContentSubtitle);
  await titleFieldInput(page, inputContentTitle);

  //Blog Posts
  await page.getByRole("button", { name: "Add item" }).click();
  await page.getByTestId("reference-input").getByLabel("Open").click();
  await page.getByRole("button", { name: referencedBlog }).click();
  await expect(page.getByRole("link", { name: referencedBlog })).toBeVisible({
    timeout: 75000,
  });

  if (variantIndex < 3) {
    //Button
    await page.getByRole("button", { name: "Primary Button" }).click();
    const buttonInput = page
      .getByTestId("field-variants.primaryButton.label")
      .getByTestId("string-input");
    await buttonInput.click();
    await buttonInput.press("Meta+a");
    await buttonInput.fill(buttonInputValue);
    await expect(buttonInput.inputValue()).resolves.toBe(buttonInputValue);

    const externalLink = page.getByText("External, outside this website");
    const internalLink = page.getByText("Internal, inside this website");
    const blankLinkTarget = {
      element: page.getByText("Blank - open on a new tab ("),
      target: "Blank - open on a new tab (",
    };
    const selfLinkTarget = {
      element: page.getByText("Self (default) - open in the"),
      target: "Self (default) - open in the",
    };
    const externalUrl = "https://facebook.com/";
    const internalLinkUrl = `${NEXT_PUBLIC_SITE_URL}/thank-you/`;

    //Determine the proceeds if it is internal or external link
    if (!isInternalLink) {
      await externalLink.click();
      await page.getByLabel("URL").click();
      await page.getByLabel("URL").fill(externalUrl);
      await blankLinkTarget.element.click();
      externalUrl.replace("https://www.", "https://");
    } else {
      await internalLink.click();
      // await page.getByTestId('reference-input').getByLabel('Open').click();
      await page.getByTestId("autocomplete").click();
      await page.getByTestId("autocomplete").fill("thank you");
      await page
        .getByRole("button", { name: "Thank you Published No" })
        .click({ force: true });
      await selfLinkTarget.element.click();
    }
  }

  //Save Button
  await expectDocumentPublished(page, newPageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  // Wait for the element to become visible or hidden with a longer timeout
  const sectionCount = await page
    .locator("div")
    .filter({ hasText: /^No items$/ })
    .count();
  if (sectionCount > 0) {
    // If the section no items is found, expect the Empty Page element to be visible
    await expect(openUrlPage.getByText("Empty Page"))
      .toBeVisible({ timeout: 20000 })
      .then(() => console.log("There is no Available Content!"));
  } else {
    // If the section no items is not found, expect the Empty Page element to be hidden
    await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
      timeout: 20000,
    });
    await expect(openUrlPage.locator("section")).toBeVisible({
      timeout: 20000,
    });
    await expect(
      openUrlPage.getByRole("heading", { name: inputContentTitle })
    ).toBeVisible();
    await expect(openUrlPage.getByText(inputContentSubtitle)).toBeVisible();

    if (variantIndex === 3) {
      await openUrlPage.getByPlaceholder("Search posts...").click();
      await openUrlPage
        .getByPlaceholder("Search posts...")
        .fill(referencedBlog);
      await expect(openUrlPage.getByLabel(referencedBlog)).toBeVisible();
    }

    if (variantIndex < 3) {
      if (!isInternalLink) {
        const page6Promise = openUrlPage.waitForEvent("popup");
        await openUrlPage
          .getByRole("link", { name: buttonInputValue })
          .click({ force: true });
        const page6 = await page6Promise;
        await verifyExternalUrl(page6, externalLinkUrl);
      } else {
        await openUrlPage
          .getByRole("link", { name: buttonInputValue })
          .click({ force: true });
        await openUrlPage.waitForLoadState("networkidle");
        await expect(openUrlPage.getByText("Success!")).toBeVisible({
          timeout: 20000,
        });
        await verifyInternalUrl(openUrlPage, internalLinkUrl);
      }
    }
  }
}

const blogVariant = [
  {
    variantName: "Variant A",
    pageTitle: "Blog Variant A",
    variantLabel: "Blog New Page A",
    variantIndex: 0,
    isInternalLink: true,
  },
  {
    variantName: "Variant B",
    pageTitle: "Blog Page B",
    variantLabel: "Blog New Page B",
    variantIndex: 1,
    isInternalLink: true,
  },
  {
    variantName: "Variant C",
    pageTitle: "Blog Page C",
    variantLabel: "Blog New Page C",
    variantIndex: 2,
    isInternalLink: false,
  },
  {
    variantName: "Variant D",
    pageTitle: "Blog Page D",
    variantLabel: "Blog New Page D",
    variantIndex: 3,
    isInternalLink: false,
  },
];

blogVariant.forEach((variant) => {
  test.describe(`${variant.variantName} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.pageTitle}`, async () => {
      await createBlogVariant(
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
