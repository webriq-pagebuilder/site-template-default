import { test, expect, type Page } from "@playwright/test";
import {
  autologin_studio,
  createNewPage,
  navigateToPage,
  updateLogoLink,
} from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import { appPromoInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

let page: Page;

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
});

test.describe("Create new App Promo", () => {
  test.describe.configure({ timeout: 600000, mode: "serial" });

  test("Variant A", async () => {
    await createAppPromoVariants(
      "App promo variant A -",
      "New App promo A",
      0,
      "variant_a"
    );
  });

  test("Variant B", async () => {
    await createAppPromoVariants(
      "App promo variant B -",
      "New App promo B",
      0,
      "variant_b"
    );
  });

  test("Variant C", async () => {
    await createAppPromoVariants(
      "App promo variant C -",
      "New App promo C",
      0,
      "variant_c"
    );
  });
});

test.afterAll(async () => {
  await page.close();
});

async function createAppPromoVariants(
  pageTitle: string,
  label: string,
  index: number,
  variant: string
) {
  const time = new Date().getTime();
  const newAppPromo = pageTitle + time;
  const newAppPromoSubtitle = "App promo subtitle";
  const newAppPromoTitle = "App promo title";
  const newAppPromoDesc = "Updated description for new App promo.";

  const statItemsField = {
    label: "New Stat Item",
    value: time.toString(),
  };

  await navigateToPage(page);
  await createNewPage(page, newAppPromo, "App Promo");

  const variantLabel = page
    .getByTestId("field-label")
    .getByTestId("string-input");
  await variantLabel.click();
  await variantLabel.fill(label);

  // select variant
  if (index <= 0) {
    await page
      .getByTestId("field-variant")
      .getByRole("img")
      .first()
      .click({ force: true });
  } else {
    await page
      .getByTestId("field-variant")
      .getByRole("img")
      .nth(index)
      .click({ force: true });
  }

  // subtitle - all variants
  const subtitle = page
    .getByTestId("field-variants.subtitle")
    .getByTestId("string-input");
  await expect(subtitle.inputValue()).resolves.toBe(
    appPromoInitialValue.subtitle
  );
  await subtitle.click();
  await subtitle.press("Meta+a");
  await subtitle.fill(newAppPromoSubtitle);
  await expect(subtitle.inputValue()).resolves.toBe(newAppPromoSubtitle);

  // title = all variants
  const title = page
    .getByTestId("field-variants.title")
    .getByTestId("string-input");
  await expect(title.inputValue()).resolves.toBe(appPromoInitialValue.title);
  await title.click();
  await title.press("Meta+a");
  await title.fill(newAppPromoTitle);
  await expect(title.inputValue()).resolves.toBe(newAppPromoTitle);

  if (variant === "variant_a") {
    // logo link
    await updateLogoLink({ page });
  } else {
    // description - variant b and c only
    const description = page.getByPlaceholder("Lorem ipsum dolor sit amet,");
    await expect(description.inputValue()).resolves.toBe(
      appPromoInitialValue.description
    );
    await description.click();
    await description.press("Meta+a");
    await description.fill(newAppPromoDesc);
    await expect(description.inputValue()).resolves.toBe(newAppPromoDesc);

    if (variant === "variant_b") {
      // stat items
      await page
        .getByRole("button", { name: "Add item" })
        .click({ force: true });
      await page
        .getByTestId("field-variants.statItems.label")
        .getByTestId("string-input")
        .fill(statItemsField.label);
      await page
        .getByTestId("field-variants.statItems.value")
        .getByTestId("string-input")
        .fill(statItemsField.value);
    }

    if (variant === "variant_c") {
      // tags
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
      await expect(page.getByText(`App promo ${variant} tag 1`)).toBeVisible();
    }
  }
}
