import { test, expect, type Page } from "@playwright/test";
import {
  autologin_studio,
  navigateToPage,
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

interface createContactVariantProps {
  pageTitle: string;
  label: string;
  index: number;
  variant: string;
}

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
      await deletePageVariant(page, newPageTitle);
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
}: createContactVariantProps) {
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

  await navigateToPage(page);
  await createNewPage(page, newPageTitle, "Contact");

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
  // await expect(page.getByRole("button", { name: "facebook" })).toBeVisible();
  // await expect(page.getByRole("button", { name: "twitter" })).toBeVisible();
  // await expect(page.getByRole("button", { name: "instagram" })).toBeVisible();
  await page.getByRole("button", { name: "facebook" }).click({ force: true });
  await expect(page.getByText("Edit Details")).toBeVisible();
  await expect(page.getByLabel("Select the social media")).toBeVisible();
  await expect(page.getByLabel("Select the social media")).toHaveValue("0");
  await expect(page.getByLabel("Social Media Link")).toBeVisible();
  await expect(page.getByLabel("Social Media Link")).toHaveValue(
    "https://www.facebook.com/"
  );
  await page.getByLabel("Select the social media").selectOption("1");
  await page
    .getByLabel("Social Media Link")
    .fill("https://twitter.com/WebriQGoesMad");
  await page.getByLabel("Close dialog").click({ force: true });
  const element = page.getByTestId("field-variants.socialLinks");
  element.getByRole("button").first().click({ force: true });
  await page.getByRole("menuitem", { name: "Remove" }).click();
  await expect(page.getByRole("button", { name: "twitter" })).toBeVisible();
  await expect(page.getByRole("button", { name: "instagram" })).toBeVisible();

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
    // TODO: Add test to add/edit fields

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

  // can update contact details
  if (variant === "variant_b") {
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
  }

  await expectDocumentPublished(page);
  await expect(page.getByRole("link", { name: newPageTitle })).toBeVisible();

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
