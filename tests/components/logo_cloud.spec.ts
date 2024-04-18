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

async function createLogoCloudVariant(
  pageTitle,
  variantLabel,
  variantIndex,
  isInternalLink
) {
  newPageTitle = `${pageTitle} ` + new Date().getTime();

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Logo Cloud");

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

  const titleInput = "Title Input Test";
  if (variantIndex !== 3) {
    await page
      .getByTestId("field-variants.title")
      .getByTestId("string-input")
      .click();
    await page
      .getByTestId("field-variants.title")
      .getByTestId("string-input")
      .fill(titleInput);
  }

  const bodyInput = "Body Input Test";
  if (variantIndex === 1) {
    await page.getByLabel("Body").click();
    await page.getByLabel("Body").fill(bodyInput);
  }

  const primaryBtnInput = "Primary Button Test";
  const externalLinkUrl = "https://facebook.com/";
  const internalLinkUrl = `${NEXT_PUBLIC_SITE_URL}/thank-you/`;

  if (variantIndex === 2) {
    await page.getByRole("button", { name: "Primary Button" }).click();
    await page
      .getByTestId("field-variants.primaryButton.label")
      .getByTestId("string-input")
      .click();
    await page
      .getByTestId("field-variants.primaryButton.label")
      .getByTestId("string-input")
      .fill(primaryBtnInput);

    if (isInternalLink) {
      await page.getByText("Internal, inside this website").click();
      await page.getByTestId("autocomplete").click();
      await page.getByTestId("autocomplete").fill("thank you");
      await page
        .getByRole("button", { name: "Thank you Published No" })
        .click();
      await page.getByText("Self (default) - open in the").click();
    } else {
      await page.getByText("External, outside this website").click();
      await page.getByLabel("URL").click();
      await page.getByLabel("URL").fill(externalLinkUrl);
      await page.getByText("Blank - open on a new tab (").click();
    }
  }

  await expectDocumentPublished(page);
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  await expect(openUrlPage.getByText("Empty Page")).toBeHidden({
    timeout: 20000,
  });
  await expect(openUrlPage.locator("section")).toBeVisible({ timeout: 20000 });

  if (variantIndex !== 3) {
    await expect(
      openUrlPage.getByRole("heading", { name: titleInput })
    ).toBeVisible();
  }

  if (variantIndex === 1) {
    await expect(openUrlPage.getByText(bodyInput)).toBeVisible();
  }

  if (variantIndex === 0) {
    await expect(
      openUrlPage.locator(".flex > div > .flex").first().hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(2) > .flex").hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(3) > .flex").hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(4) > .flex").hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(5) > .flex").hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(6) > .flex").hover()
    ).toBeTruthy();
  }

  if (variantIndex === 1) {
    await expect(
      openUrlPage.locator(".flex > div > div > .flex").first().hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(2) > div > .flex").hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(3) > div > .flex").hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(4) > div > .flex").hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(5) > div > .flex").hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(6) > div > .flex").hover()
    ).toBeTruthy();
  }

  if (variantIndex === 2) {
    await expect(
      openUrlPage.locator(".mx-auto > .relative > div").first().hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator(".relative > div:nth-child(2)").hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(3)").first().hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(4)").first().hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(5)").first().hover()
    ).toBeTruthy();
    await expect(
      openUrlPage.locator("div:nth-child(6)").first().hover()
    ).toBeTruthy();
  }

  let linkConfiguration;
  if (variantIndex === 2) {
    await openUrlPage.getByLabel(primaryBtnInput).click();

    if (!isInternalLink) {
      linkConfiguration = {
        url: externalLinkUrl,
        target: "Blank - open on a new tab (",
      };
    } else {
      linkConfiguration = {
        url: internalLinkUrl,
        target: "Self (default) - open in the",
      };
    }

    if (linkConfiguration.target === "Blank - open on a new tab (") {
      const page10Promise = openUrlPage.waitForEvent("popup");
      await openUrlPage
        .getByRole("link", { name: primaryBtnInput })
        .click({ force: true });
      const page10 = await page10Promise;
      const normalizedExpectedUrl = externalLinkUrl.replace(
        "https://www.",
        "https://"
      );
      const normalizedReceivedUrl = page10
        .url()
        .replace("https://www.", "https://");
      await expect(normalizedReceivedUrl).toBe(normalizedExpectedUrl);
    } else {
      await openUrlPage.waitForLoadState("networkidle");
      await expect(openUrlPage.getByText("Success!")).toBeVisible({
        timeout: 20000,
      });
      const expectedUrl = linkConfiguration?.url.endsWith("/")
        ? linkConfiguration?.url
        : `${linkConfiguration?.url}/`;
      const receivedUrl = openUrlPage.url().endsWith("/")
        ? openUrlPage.url()
        : `${openUrlPage.url()}/`;
      await expect(receivedUrl).toBe(expectedUrl);
    }
  }

  if (variantIndex === 3) {
    await expect(
      openUrlPage.locator(".object-scale-down").first().hover()
    ).toBeTruthy();
    await expect(
      openUrlPage
        .locator("div:nth-child(2) > .flex > .object-scale-down")
        .hover()
    ).toBeTruthy();
    await expect(
      openUrlPage
        .locator("div:nth-child(3) > .flex > .object-scale-down")
        .hover()
    ).toBeTruthy();
    await expect(
      openUrlPage
        .locator("div:nth-child(4) > .flex > .object-scale-down")
        .hover()
    ).toBeTruthy();
    await expect(
      openUrlPage
        .locator("div:nth-child(5) > .flex > .object-scale-down")
        .hover()
    ).toBeTruthy();
    await expect(
      openUrlPage
        .locator("div:nth-child(6) > .flex > .object-scale-down")
        .hover()
    ).toBeTruthy();
  }
}

const logoCloudVariant = [
  {
    variantName: "Variant A",
    pageTitle: "Logo Cloud Variant A",
    variantLabel: "Logo Cloud New Page A",
    variantIndex: 0,
    isInternalLink: true,
  },
  {
    variantName: "Variant B",
    pageTitle: "Logo Cloud Variant B",
    variantLabel: "Logo Cloud New Page B",
    variantIndex: 1,
    isInternalLink: true,
  },
  {
    variantName: "Variant C",
    pageTitle: "Logo Cloud Variant C",
    variantLabel: "Logo Cloud New Page C",
    variantIndex: 2,
    isInternalLink: false,
  },
  {
    variantName: "Variant D",
    pageTitle: "Logo Cloud Variant D",
    variantLabel: "Logo Cloud New Page D",
    variantIndex: 3,
    isInternalLink: false,
  },
];

logoCloudVariant.forEach((variant) => {
  test.describe(`${variant.variantName} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.pageTitle}`, async () => {
      await createLogoCloudVariant(
        variant.pageTitle,
        variant.variantLabel,
        variant.variantIndex,
        true
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
