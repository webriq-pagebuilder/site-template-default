import { test, expect, type Page } from "@playwright/test";
import {
  autologin_studio,
  createNewPage,
  navigateToPage,
  updateLogoLink,
  generateFormId,
  expectDocumentPublished,
} from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import { callToActionInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

let page: Page;
const getTime = new Date().getTime();
const ctaVariantTests = [
  {
    pageTitle: "Call to action variant A",
    label: "New Call to action A",
    index: 0,
    variant: "variant_a",
  },
  {
    pageTitle: "Call to action variant B",
    label: "New Call to action B",
    index: 1,
    variant: "variant_b",
  },
  {
    pageTitle: "Call to action variant C",
    label: "New Call to action C",
    index: 2,
    variant: "variant_c",
  },
  {
    pageTitle: "Call to action variant D",
    label: "New Call to action D",
    index: 3,
    variant: "variant_d",
  },
  {
    pageTitle: "Call to action variant E",
    label: "New Call to action E",
    index: 4,
    variant: "variant_e",
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

ctaVariantTests?.forEach((variant) => {
  test.describe(`${variant.pageTitle} Workflow`, () => {
    test.describe.configure({ timeout: 900000 });

    test(`Create ${variant.label}`, async () => {
      await createCTAVariant({
        pageTitle: variant.pageTitle,
        label: variant.label,
        index: variant.index,
        variant: variant.variant,
      });
    });
  });
});

test.afterAll(async () => {
  await page.close();
});

async function createCTAVariant({
  pageTitle,
  label,
  index,
  variant,
  isInternalLink = true,
}: {
  pageTitle: string;
  label: string;
  index: number;
  variant: string;
  isInternalLink?: boolean | null;
}) {
  const time = new Date().getTime();
  const newCTA = pageTitle + time;
  const newCTATitle = "Call to action title";
  const newCTADescription = "Updated description for new call to action.";

  const primaryButtonLabel = "CTA Primary";
  const externalLinkUrl = "https://webriq.com";
  const blankLinkTarget = {
    element: page.getByText("Blank - open on a new tab ("),
    target: "Blank - open on a new tab (",
  };
  const selfLinkTarget = {
    element: page.getByText("Self (default) - open in the"),
    target: "Self (default) - open in the",
  };

  await navigateToPage(page);
  await createNewPage(page, newCTA, "Call to action");

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

  if (variant !== "variant_e") {
    // title = except variant e
    const title = page
      .getByTestId("field-variants.title")
      .getByTestId("string-input");
    await expect(title.inputValue()).resolves.toBe(
      callToActionInitialValue.title
    );
    await title.click();
    await title.press("Meta+a");
    await title.fill(newCTATitle);
    await expect(title.inputValue()).resolves.toBe(newCTATitle);

    // description - except variant e
    const description = page.getByPlaceholder("Lorem ipsum dolor sit amet,");
    await expect(description.inputValue()).resolves.toBe(
      callToActionInitialValue.plainText
    );
    await description.click();
    await description.press("Meta+a");
    await description.fill(newCTADescription);
    await expect(description.inputValue()).resolves.toBe(newCTADescription);

    //Primary Button
    await page.getByRole("button", { name: "Primary Button" }).click();
    await page
      .getByTestId("field-variants.primaryButton.label")
      .getByTestId("string-input")
      .fill(primaryButtonLabel);

    //Determine the proceeds if it is internal or external link
    if (!isInternalLink) {
      await page
        .getByTestId("field-variants.primaryButton.linkType")
        .getByText("External, outside this website")
        .click();
      // await page.getByLabel('URL').click();
      await page
        .getByTestId("field-variants.primaryButton.linkExternal")
        .getByLabel("URL")
        .click();
      await page
        .getByTestId("field-variants.primaryButton.linkExternal")
        .getByLabel("URL")
        .fill(externalLinkUrl);
      await blankLinkTarget.element.click();
      externalLinkUrl.replace("https://www.", "https://");
    } else {
      await page
        .getByTestId("field-variants.primaryButton.linkType")
        .getByText("Internal, inside this website")
        .click();
      // await page.getByTestId('reference-input').getByLabel('Open').click();
      await page.getByTestId("autocomplete").click();
      await page.getByTestId("autocomplete").fill("thank you");
      await page
        .getByRole("button", { name: "Thank you Published No" })
        .click({ force: true });
      await selfLinkTarget.element.click();
    }
    //Close primary button toggle
    await page.getByRole("button", { name: "Primary Button" }).click();

    // logo link - variant a, b, d only
    if (variant !== "variant_c") {
      await updateLogoLink({ page });
    }
  } else {
    // forms - variant_e only
    await generateFormId({ page });

    // check CTA form initial fields
    await expect(
      page.getByRole("button", { name: "First Name" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Last Name" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Email" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Password" })).toBeVisible();
    // TODO: Add test to add/edit fields
    // CTA form button label
    await expect(
      page
        .getByTestId("field-variants.form.buttonLabel")
        .getByTestId("string-input")
    ).toHaveValue("Sign Up");
    // CTA form thank you page link
    await page
      .getByRole("button", { name: "Thank You page" })
      .click({ force: true });
    await page
      .getByTestId("field-variants.form.thankYouPage.linkType")
      .getByLabel("Internal, inside this website")
      .check();
    await page
      .getByTestId("field-variants.form.thankYouPage")
      .getByTestId("autocomplete")
      .click();
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
    // CTA Sign in links
    await expect(
      page
        .getByTestId("field-variants.signInLink.linkType")
        .getByLabel("Internal, inside this website")
    ).toBeChecked();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Page Reference$/ })
        .nth(1)
    ).toBeVisible();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("New Page");
    await page
      .locator("button:has-text('New Page')")
      .first()
      .click({ force: true });
    await expect(page.locator("link:has-text('New Page')")).toBeVisible();
    await expect(
      page
        .getByTestId("field-variants.signInLink.linkTarget")
        .getByLabel("Self (default) - open in the")
    ).toBeChecked();
    await page.getByTestId("autocomplete").click();
    await page.getByTestId("autocomplete").fill("New Page");
    await page.locator("button:has-text('New Page')").first().click();
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
    await page
      .getByTestId("field-variants.signInLink.linkType")
      .getByLabel("External, outside this website")
      .check();
    await expect(
      page
        .getByTestId("field-variants.signInLink.linkExternal")
        .getByLabel("URL")
    ).toBeVisible();
    await page.getByLabel("URL").fill("https://webriq.com");
    await expect(
      page
        .getByTestId("field-variants.logo.linkTarget")
        .locator("div")
        .filter({ hasText: "Link Target" })
        .nth(3)
    ).toBeVisible();
    // CTA form links
    await expect(
      page.getByRole("button", { name: "Police privacy Internal Link" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Terms of Use Internal Link" })
    ).toBeVisible();
  }

  await expectDocumentPublished(page);
  await expect(page.getByRole("link", { name: newCTA })).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  const sectionCount = await openUrlPage
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
  }
}
