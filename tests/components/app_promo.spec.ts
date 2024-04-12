import { test, expect, type Page } from "@playwright/test";
import { autologin_studio } from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";

let page: Page;

const getTime = new Date().getTime();

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
});

async function updateLogoLink() {
  await page
    .getByTestId("field-variants.logo.alt")
    .getByTestId("string-input")
    .fill("App promo logo");
  await page
    .getByLabel("External, outside this website")
    .check({ force: true });
  await expect(page.getByLabel("URL")).toBeVisible();
  await page.getByLabel("Internal, inside this website").check({ force: true });
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Page Reference$/ })
      .nth(1)
  ).toBeVisible();
}

async function updateTitle(variant: string) {
  await page
    .getByTestId("field-variants.title")
    .getByTestId("string-input")
    .fill("");
  await page
    .getByTestId("field-variants.title")
    .getByTestId("string-input")
    .fill(`New App Promo ${variant}`);
}

async function updateSubtitle(variant: string) {
  await page
    .getByTestId("field-variants.subtitle")
    .getByTestId("string-input")
    .fill("");
  await page
    .getByTestId("field-variants.subtitle")
    .getByTestId("string-input")
    .fill(`Subtitle for ${variant}`);
}

async function updateDescription(variant: string) {
  await page.getByPlaceholder("Lorem ipsum dolor sit amet,").fill("");
  await page
    .getByPlaceholder("Lorem ipsum dolor sit amet,")
    .fill(`Updated description for new App promo ${variant}.`);
}

async function updateStatItems() {
  const element = await page.getByTestId("field-variants.statItems");
  element
    .getByRole("menuitem", { name: "Remove" })
    .first()
    .click({ force: true });

  element.getByRole("button", { name: "Add item" }).click({ force: true });
  await page
    .getByTestId("field-variants.statItems.label")
    .getByTestId("string-input")
    .fill("New Stat Item");
  await page
    .getByTestId("field-variants.statItems.value")
    .getByTestId("string-input")
    .fill("04-12-2024");
}

async function updateTags(variant: string) {
  await page
    .getByTestId("field-variants.tags")
    .getByRole("button")
    .first()
    .click({ force: true });
  await page
    .getByTestId("field-variants.tags")
    .getByTestId("change-bar__field-wrapper")
    .locator("div")
    .nth(3)
    .click({ force: true });
  await page
    .locator('[id="variants\\.tags"]')
    .fill(`App promo ${variant} tag 1`);
  await page.locator('[id="variants\\.tags"]').press("Enter");
  await expect(page.getByText("app promo variant c tag 1")).toBeVisible();
}

test.describe("Create new App Promo", () => {
  test.describe.configure({ timeout: 600000 });

  test.beforeEach("Click create button", async () => {
    await page.getByRole("link", { name: "Components" }).click({ force: true });
    await page
      .getByRole("button", { name: "New App Promo" })
      .click({ force: true });
  });

  test("Variant A", async () => {
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(`New Variant A - ${getTime}`);
    await page
      .getByTestId("field-variant")
      .getByRole("img")
      .first()
      .click({ force: true });

    updateLogoLink();
    updateSubtitle("Variant A");
    updateTitle("Variant A");
  });

  test("Variant B", async () => {
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(`New Variant B - ${getTime}`);
    await page
      .getByTestId("field-variant")
      .getByRole("img")
      .nth(1)
      .click({ force: true });
    updateSubtitle("Variant B");
    updateTitle("Variant B");
    updateDescription("Variant B");
    updateStatItems();
  });

  test("Variant C", async () => {
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(`New Variant C - ${getTime}`);
    await page
      .getByTestId("field-variant")
      .getByRole("img")
      .nth(2)
      .click({ force: true });
    updateSubtitle("Variant C");
    updateTitle("Variant C");
    updateDescription("Variant C");
    updateTags("Variant C");
  });
});

test.afterAll(async () => {
  await page.close();
});
