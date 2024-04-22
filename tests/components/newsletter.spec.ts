import { test, expect, type Page } from "@playwright/test";
import {
  autologin_studio,
  navigateToPage,
  clickVariantImage,
  createNewPage,
  generateFormId,
  expectDocumentPublished,
  deletePageVariant,
  updateLogoLink,
} from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import { newsletterInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { createVariantProps } from "types/tests/components";

let page: Page, newPageTitle: string;

const newsletterVariantTests = [
  {
    pageTitle: "Newsletter variant A",
    label: "Newsletter A",
    index: 0,
    variant: "variant_a",
  },
  {
    pageTitle: "Newsletter variant B",
    label: "Newsletter B",
    index: 0,
    variant: "variant_b",
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

newsletterVariantTests?.forEach((variant) => {
  test.describe(`${variant.pageTitle} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.label}`, async () => {
      await createNewsletterVariants({
        pageTitle: variant.pageTitle,
        label: variant.label,
        index: variant.index,
        variant: variant.variant,
      });
    });

    test(`Delete ${variant.pageTitle}`, async () => {
      await deletePageVariant(page, newPageTitle, variant.label);
    });
  });
});

test.afterAll(async () => {
  await page.close();
});

async function createNewsletterVariants({
  pageTitle,
  label,
  index,
  variant,
}: createVariantProps) {
  const time = new Date().getTime();
  newPageTitle = pageTitle + time;
  const newsletterTitle = "Newsletter title";
  const newsletterDescription = "Updated description for newsletter.";
  const formButtonLabel = "Submit newsletter";
  const logoAltText = "Newsletter logo";
  const thankYouPageUrl = "https://webriq.com/thank-you";

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Contact");

  const variantLabel = page
    .getByTestId("field-label")
    .getByTestId("string-input");
  await variantLabel.click();
  await variantLabel.fill(label);

  await clickVariantImage(page, index);

  // logo link
  await updateLogoLink(page, logoAltText);

  // title - all variants
  const title = page
    .getByTestId("field-variants.title")
    .getByTestId("string-input");
  await expect(title.inputValue()).resolves.toBe(newsletterInitialValue.title);
  await title.click();
  await title.press("Meta+a");
  await title.fill(newsletterTitle);
  await expect(title.inputValue()).resolves.toBe(newsletterTitle);

  // description - all variants
  const description = page.getByPlaceholder("Lorem ipsum dolor sit amet,");
  await expect(description.inputValue()).resolves.toBe(
    newsletterInitialValue.description
  );
  await description.click();
  await description.press("Meta+a");
  await description.fill(newsletterDescription);
  await expect(description.inputValue()).resolves.toBe(newsletterDescription);

  // webriq forms
  await expect(
    page.getByTestId("field-variants.form.subtitle").getByTestId("string-input")
  ).toBeEmpty();
  await expect(
    page.getByTestId("field-variants.form.name").getByTestId("string-input")
  ).toBeEmpty();

  await generateFormId({ page });

  // form button
  await expect(
    page.getByRole("button", { name: newsletterInitialValue.form?.[0]?.name })
  ).toBeVisible();
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .click();
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .press("Meta+a");
  await page
    .getByTestId("field-variants.form.buttonLabel")
    .getByTestId("string-input")
    .fill(formButtonLabel);

  // thank you page
  await page.getByRole("button", { name: "Thank You page" }).click();
  await expect(
    page
      .getByTestId("field-variants.form.thankYouPage.linkType")
      .getByLabel("Internal, inside this website")
  ).not.toBeChecked();
  await expect(
    page
      .getByTestId("field-variants.form.thankYouPage.linkType")
      .getByLabel("External, outside this website")
  ).not.toBeChecked();
  await page
    .getByLabel("External, outside this website")
    .check({ force: true });
  await expect(page.getByLabel("URL")).toBeVisible();
  await page.getByLabel("URL").click();
  await page.getByLabel("URL").fill(thankYouPageUrl);
  await expect(
    page
      .getByTestId("field-variants.logo.linkTarget")
      .locator("div")
      .filter({ hasText: "Link Target" })
      .nth(3)
  ).toBeVisible();
  await page.getByLabel("Self (default) - open in the").check();

  await page.getByTestId("action-Save").click({ timeout: 20000 });
  await page.getByRole("link", { name: "Close pane group" }).click();
  await expectDocumentPublished(page, newPageTitle);
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  page.locator("section").filter({ hasText: newsletterTitle }).nth(1);

  // check logo, title, description, and form fields
  await expect(
    openUrlPage.getByRole("heading", { name: newsletterTitle }).nth(1)
  ).toBeVisible();
  await expect(openUrlPage.getByText(newsletterDescription)).toBeVisible();
  await expect(
    openUrlPage.getByPlaceholder(newsletterInitialValue.form.fields?.[0]?.name)
  ).toBeVisible();
  await expect(openUrlPage.getByLabel(formButtonLabel)).toBeVisible();
  await expect(openUrlPage.getByLabel("Go to home page").nth(3)).toBeVisible();
  await CheckFormSubmission({
    pageUrl: openUrlPage,
    formFields: newsletterInitialValue?.form?.fields?.[0],
    buttonLabel: formButtonLabel,
    thankYouPageUrl,
  });
}

async function CheckFormSubmission({
  pageUrl,
  formFields,
  buttonLabel,
  thankYouPageUrl,
}) {
  await pageUrl.getByPlaceholder(formFields.placeholder).click();
  await pageUrl.getByPlaceholder(formFields.placeholder).fill(formFields.value);
  await pageUrl.getByLabel(buttonLabel).click();
  await expect(pageUrl.getByText("Sending form data...")).toBeVisible();
  await expect(pageUrl.getByText("✔ Successfully sent form data")).toBeVisible(
    { timeout: 60000 }
  );
  await page.goto(thankYouPageUrl);
}
