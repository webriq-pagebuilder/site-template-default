import { test, expect, type Page } from "@playwright/test";
import { autologin_studio } from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import { appPromoInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

let page: Page;
let commonTitle: string, commonSubtitle: string, commonDesc: string;

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
  await page.getByLabel("URL").fill("https://webriq.com");
  await expect(
    page
      .getByTestId("field-variants.logo.linkTarget")
      .locator("div")
      .filter({ hasText: "Link Target" })
      .nth(3)
  ).toBeVisible();
  await page.getByLabel("Internal, inside this website").check({ force: true });
  await expect(page.getByTestId("autocomplete")).toBeVisible();
  await page.getByTestId("autocomplete").fill("New Page");
  await page
    .locator("button:has-text('New Page')")
    .first()
    .click({ force: true });
  await expect(
    page
      .getByTestId("field-variants.logo.linkTarget")
      .locator("div")
      .filter({ hasText: "Link Target" })
      .nth(3)
  ).toBeVisible();
}

async function updateTitle() {
  const title = page.locator(`input#variants\.title`);
  title.fill("");
  title.fill("New App Promo");
  commonTitle = await title.inputValue();
}

async function updateSubtitle() {
  const subtitle = page.locator(`input#variants\.subtitle`);
  subtitle.fill("");
  subtitle.fill("Subtitle");
  commonSubtitle = await subtitle.inputValue();
}

async function updateDescription() {
  const description = page.locator(`textarea#variants\.description`);
  description.fill("");
  description.fill("Updated description for new App promo.");
  commonDesc = await description.inputValue();
}

async function updateStatItems() {
  const element = page.getByTestId("field-variants.statItems");
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
  test.describe.configure({ timeout: 600000, mode: "serial" });

  test("Variant A", async () => {
    await page.getByRole("link", { name: "Components" }).click({ force: true });
    await page
      .getByRole("button", { name: "New App Promo" })
      .click({ force: true });
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(`New App Promo - ${getTime}`);
    await page
      .getByTestId("field-variant")
      .getByRole("img")
      .first()
      .click({ force: true });
    await updateLogoLink();
    await updateSubtitle();
    await updateTitle();
  });

  test("Variant B", async () => {
    await page.getByRole("button", { name: "Next" }).click({ force: true });
    await expect(page.getByText("Variant B")).toBeVisible();

    console.log({
      subtitle: commonSubtitle,
      title: commonTitle,
    });

    // the same subtitle and title fields as variant A so we just check here if they have matching values
    await expect(
      page.getByTestId("field-variants.subtitle").getByTestId("string-input")
    ).toHaveValue(commonSubtitle);
    await expect(
      page.getByTestId("field-variants.title").getByTestId("string-input")
    ).toHaveValue(commonTitle);
    await updateDescription();
    await updateStatItems();
  });

  test("Variant C", async () => {
    await page.getByRole("button", { name: "Next" }).click({ force: true });
    await expect(page.getByText("Variant C")).toBeVisible();

    console.log({
      subtitle: commonSubtitle,
      title: commonTitle,
      description: commonDesc,
    });

    // the same subtitle and title fields as variant A so we just check here if they have matching values
    await expect(
      page.getByTestId("field-variants.subtitle").getByTestId("string-input")
    ).toHaveValue(commonSubtitle);
    await expect(
      page.getByTestId("field-variants.title").getByTestId("string-input")
    ).toHaveValue(commonTitle);
    // the same description field as variant B so we just check here if they have matching values
    await expect(
      page.getByPlaceholder("Lorem ipsum dolor sit amet,")
    ).toHaveValue(commonDesc);
    await updateTags("Variant C");
  });
});

test.afterAll(async () => {
  await page.close();
});
