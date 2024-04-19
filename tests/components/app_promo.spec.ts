import { test, expect, type Page } from "@playwright/test";
import {
  autologin_studio,
  clickVariantImage,
  createNewPage,
  navigateToPage,
  updateLogoLink,
  expectDocumentPublished,
  deletePageVariant,
} from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import { appPromoInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { createVariantProps } from "types/tests/components";

let page: Page, newPageTitle: string;

const appPromoVariantTests = [
  {
    pageTitle: "App promo variant A",
    label: "New App promo A",
    index: 0,
    variant: "variant_a",
  },
  {
    pageTitle: "App promo variant B",
    label: "New App promo B",
    index: 1,
    variant: "variant_b",
  },
  {
    pageTitle: "App promo variant C",
    label: "New App promo C",
    index: 2,
    variant: "variant_c",
  },
];

test.beforeAll("Auto login studio", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });

  // navigate to the studio
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
});

appPromoVariantTests?.forEach((variant) => {
  test.describe(`${variant.pageTitle} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.label}`, async () => {
      await createAppPromoVariants({
        pageTitle: variant.pageTitle,
        label: variant.label,
        index: variant.index,
        variant: variant.variant,
      });
    });

    test(`Delete ${variant.pageTitle}`, async () => {
      await deletePageVariant(page, newPageTitle);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});

async function createAppPromoVariants({
  pageTitle,
  label,
  index,
  variant,
}: createVariantProps) {
  const time = new Date().getTime();
  newPageTitle = pageTitle + time;
  const newAppPromoSubtitle = "App promo subtitle";
  const newAppPromoTitle = "App promo title";
  const newAppPromoDesc = "Updated description for new App promo.";
  const logoAltText = "App promo logo";

  const statItemsField = {
    label: "New Stat Item",
    value: time.toString(),
  };

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "App Promo");

  const variantLabel = page
    .getByTestId("field-label")
    .getByTestId("string-input");
  await variantLabel.click();
  await variantLabel.fill(label);

  // select variant
  await clickVariantImage(page, index);

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
    await updateLogoLink(page, logoAltText);
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
      await page.getByLabel("Close dialog").click();
      await expect(page.locator('[id="variants\\.statItems"]')).toContainText(
        `Label: ${statItemsField.label}`
      );
      await expect(page.locator('[id="variants\\.statItems"]')).toContainText(
        `Value: ${statItemsField.value}`
      );
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
      await page.locator('[id="variants\\.tags"]').click();
      await page.locator('[id="variants\\.tags"]').fill("new app promo tag");
      await page.locator('[id="variants\\.tags"]').press("Enter");
      await expect(page.getByText("new app promo tag")).toBeVisible();
    }
  }

  await page.getByTestId("action-Save").click({ timeout: 20000 });
  await page.getByRole("link", { name: "Close pane group" }).click();
  await expectDocumentPublished(page, newPageTitle);

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  // test if subtitle and title is visible in preview
  await expect(openUrlPage.getByText(newAppPromoSubtitle)).toBeVisible();
  await expect(openUrlPage.getByText(newAppPromoTitle)).toBeVisible();

  if (variant === "variant_a") {
    // test if logo link is correct
    await expect(
      openUrlPage.getByLabel("Go to https://webriq.com")
    ).toBeVisible();
    await expect(
      openUrlPage
        .locator("a[target='_blank']")
        .and(openUrlPage.locator("a[rel='noopener noreferrer']"))
    ).toBeVisible();
    await expect(openUrlPage.getByAltText(logoAltText)).toBeVisible();
  } else {
    // check if description is visible in preview
    await expect(openUrlPage.getByText(newAppPromoDesc)).toBeVisible();

    if (variant === "variant_b") {
      // stat items
      await expect(openUrlPage.getByText(statItemsField.label)).toBeVisible();
      await expect(openUrlPage.locator('[id="__next"]')).toContainText(
        statItemsField.value
      );
    }

    if (variant === "variant_c") {
      // tags
      await expect(
        openUrlPage.locator("li").filter({ hasText: "new app promo tag" })
      ).toBeVisible();
    }
  }
}
