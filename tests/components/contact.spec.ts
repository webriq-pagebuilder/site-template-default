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

async function updateDescription(variant: string) {
  await page.getByPlaceholder("Lorem ipsum dolor sit amet,").fill("");
  await page
    .getByPlaceholder("Lorem ipsum dolor sit amet,")
    .fill(`Updated description for new App promo ${variant}.`);
}

// TODO
async function updateSocialLinks() {}
async function updateWebriQForms() {}
async function updateContactDetails() {}

test.describe("Create new Contact", () => {
  test.describe.configure({ timeout: 600000 });

  test.beforeEach("Click create button", async () => {
    await page.getByRole("link", { name: "Components" }).click({ force: true });
    await page
      .getByRole("button", { name: "New Contact" })
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

    updateTitle("Variant A");
    updateDescription("Variant A");
  });

  test("Variant B", async () => {
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(`New Variant B - ${getTime}`);
    await page
      .getByTestId("field-variant")
      .getByRole("img")
      .nth(1)
      .click({ force: true });
    updateTitle("Variant B");
    updateDescription("Variant B");
  });
});

test.afterAll(async () => {
  await page.close();
});
