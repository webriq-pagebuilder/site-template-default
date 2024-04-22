import { test, expect, type Page } from "@playwright/test";
import {
  autologin_studio,
  navigateToPage,
  clickVariantImage,
  createNewPage,
  generateFormId,
  expectDocumentPublished,
  deletePageVariant,
} from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import { contactInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { createVariantProps } from "types/tests/components";

let page: Page, newPageTitle: string;

const contactVariantTests = [
  {
    pageTitle: "Contact variant A",
    label: "New Contact A",
    index: 0,
    variant: "variant_a",
  },
  {
    pageTitle: "Contact variant B",
    label: "New Contact B",
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

contactVariantTests?.forEach((variant) => {
  test.describe(`${variant.pageTitle} Workflow`, () => {
    test.describe.configure({ timeout: 900000, mode: "serial" });

    test(`Create ${variant.label}`, async () => {
      await createContactVariants({
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

async function createContactVariants({
  pageTitle,
  label,
  index,
  variant,
}: createVariantProps) {
  const time = new Date().getTime();
  newPageTitle = pageTitle + time;
  const newContactTitle = "Contact title";
  const newContactDesc = "Updated description for new contact.";

  const formButtonLabel = "Submit Contact";
  const contactDetailInputs = {
    office: "123 Sample Address",
    number: "+12 34567",
    email: "sample@webriq.com",
  };
  const socialLink = {
    facebook: "https://www.facebook.com/webriq",
    twitter: "https://twitter.com/WebriQGoesMad",
    instagram: "https://www.instagram.com/webriqgoesmad/",
  };

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Contact");

  const variantLabel = page
    .getByTestId("field-label")
    .getByTestId("string-input");
  await variantLabel.click();
  await variantLabel.fill(label);

  await clickVariantImage(page, index);

  // title - all variants
  const title = page
    .getByTestId("field-variants.title")
    .getByTestId("string-input");
  await expect(title.inputValue()).resolves.toBe(contactInitialValue.title);
  await title.click();
  await title.press("Meta+a");
  await title.fill(newContactTitle);
  await expect(title.inputValue()).resolves.toBe(newContactTitle);

  // description - all variants
  const description = page.getByPlaceholder("Lorem ipsum dolor sit amet,");
  await expect(description.inputValue()).resolves.toBe(
    contactInitialValue.contactDescription
  );
  await description.click();
  await description.press("Meta+a");
  await description.fill(newContactDesc);
  await expect(description.inputValue()).resolves.toBe(newContactDesc);

  // social links - all variants
  await expect(
    page
      .getByTestId("field-variants.socialLinks")
      .locator("div")
      .filter({ hasText: "Social Links" })
      .nth(3)
  ).toBeVisible();
  await page.getByRole("button", { name: "facebook" }).click();
  await page.getByLabel("Social Media Link").click();
  await page.getByLabel("Social Media Link").press("Meta+a");
  await page.getByLabel("Social Media Link").fill(socialLink?.facebook);
  await page.getByLabel("Close dialog").click();
  await page.getByRole("button", { name: "twitter" }).click();
  await page.getByLabel("Social Media Link").click();
  await page.getByLabel("Social Media Link").press("Meta+a");
  await page.getByLabel("Social Media Link").fill(socialLink?.twitter);
  await page.getByLabel("Close dialog").click();
  await page.getByRole("button", { name: "instagram" }).click();
  await page.getByLabel("Social Media Link").click();
  await page.getByLabel("Social Media Link").press("Meta+a");
  await page.getByLabel("Social Media Link").fill(socialLink?.instagram);

  // contact details
  const officeInfo = page
    .getByTestId("field-variants.officeInformation")
    .getByTestId("string-input");
  officeInfo.fill("");
  officeInfo.fill(contactDetailInputs.office);
  await expect(officeInfo.inputValue()).resolves.toBe(
    contactDetailInputs.office
  );

  const email = page
    .getByTestId("field-variants.contactEmail")
    .getByTestId("string-input");
  email.fill("");
  email.fill(contactDetailInputs.email);
  await expect(email.inputValue()).resolves.toBe(contactDetailInputs.email);

  const number = page
    .getByTestId("field-variants.contactNumber")
    .getByTestId("string-input");
  number.fill("");
  number.fill(contactDetailInputs.number);
  await expect(number.inputValue()).resolves.toBe(contactDetailInputs.number);

  // webriq forms
  if (variant === "variant_a") {
    await generateFormId({ page });

    // check contact form initial fields
    await expect(page.getByRole("button", { name: "Subject" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Name", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "name@example.com" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Message..." })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Add file" })).toBeVisible();

    // contact form button label
    await expect(
      page
        .getByTestId("field-variants.form.buttonLabel")
        .getByTestId("string-input")
    ).toHaveValue(contactInitialValue.form.buttonLabel);
    await page
      .getByTestId("field-variants.form.buttonLabel")
      .getByTestId("string-input")
      .fill("");
    await page
      .getByTestId("field-variants.form.buttonLabel")
      .getByTestId("string-input")
      .fill(formButtonLabel);

    // contact form thank you page link
    await page
      .getByRole("button", { name: "Thank You page" })
      .click({ force: true });
    await page
      .getByLabel("Internal, inside this website")
      .check({ force: true });
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Page Reference$/ })
        .nth(1)
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

    // contact form block of text
    await expect(
      page.getByTestId("activate-overlay").locator("div").first()
    ).toBeVisible();
    await page.getByText("Click to activate").click({ force: true });
    await expect(page.getByText("I agree to terms and")).toContainText(
      contactInitialValue.block?.[0]?.children?.[0]?.text
    );
    await page.getByTestId("text-style--normal").nth(1).click({ force: true });
    await page.getByTestId("scroll-container").getByRole("textbox").fill("");
    await page
      .getByTestId("scroll-container")
      .getByRole("textbox")
      .fill("I agree to all the terms and conditions");
  }

  await page.getByTestId("action-Save").click({ timeout: 20000 });
  await page.getByRole("link", { name: "Close pane group" }).click();
  await expectDocumentPublished(page, newPageTitle);
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

  const pagePromise = page.waitForEvent("popup");
  await page.getByText(`${NEXT_PUBLIC_SITE_URL}`).click({ force: true });
  const openUrlPage = await pagePromise;

  // check title, description, social links and contact details
  await expect(
    openUrlPage.getByRole("heading", { name: newContactTitle, exact: true })
  ).toBeVisible();
  await expect(openUrlPage.getByText(newContactDesc)).toBeVisible();
  await expect(
    openUrlPage.locator(`a[href=${socialLink?.facebook}]`)
  ).toBeVisible();
  await expect(
    openUrlPage.locator(`a[href=${socialLink?.twitter}]`)
  ).toBeVisible();
  await expect(
    openUrlPage.locator(`a[href=${socialLink?.instagram}]`)
  ).toBeVisible();
  await expect(openUrlPage.getByText(contactDetailInputs.office)).toBeVisible();
  await expect(
    openUrlPage.getByRole("link", { name: contactDetailInputs.email })
  ).toBeVisible();
  await expect(
    openUrlPage.getByRole("link", { name: contactDetailInputs.number })
  ).toBeVisible();

  if (variant === "variant_a") {
    // check for the forms added
    await expect(openUrlPage.getByPlaceholder("Subject")).toBeVisible();
    await expect(
      openUrlPage.getByPlaceholder("Name", { exact: true })
    ).toBeVisible();
    await expect(
      openUrlPage.getByPlaceholder("name@example.com")
    ).toBeVisible();
    await expect(openUrlPage.getByPlaceholder("Message...")).toBeVisible();
    await expect(openUrlPage.getByLabel("Add file")).toBeVisible();
    await expect(openUrlPage.getByLabel("Agree to terms")).not.toBeChecked();
    await expect(openUrlPage.getByText("I agree to terms and")).toBeVisible();
    await expect(openUrlPage.getByLabel(formButtonLabel)).toBeVisible();
  }
}
