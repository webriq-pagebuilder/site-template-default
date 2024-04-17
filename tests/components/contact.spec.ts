import { test, expect, type Page } from "@playwright/test";
import { autologin_studio } from "tests/utils";
import {
  NEXT_PUBLIC_SANITY_STUDIO_URL,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import { contactInitialValue } from "@webriq-pagebuilder/sanity-plugin-schema-default";

let page: Page;
let commonValues = {
  commonTitle: "",
  commonDesc: "",
  commonContactDetails: {
    office: "",
    contactEmail: "",
    contactNumber: "",
  },
};

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

async function updateTitle() {
  const title = page
    .getByTestId("field-variants.title")
    .getByTestId("string-input");
  await expect(
    page.getByTestId("field-variants.title").getByTestId("string-input")
  ).toHaveValue(contactInitialValue.title);
  title.fill("");
  title.fill("Contact Test");
  commonValues.commonTitle = await title.inputValue();
}

async function updateDescription() {
  const description = page
    .getByTestId("field-variants.contactDescription")
    .getByTestId("string-input");
  await expect(description).toHaveValue(contactInitialValue.contactDescription);
  description.fill("");
  description.fill("New contact test description");
  commonValues.commonDesc = await description.inputValue();
}

async function updateSocialLinks() {
  await expect(
    page
      .getByTestId("field-variants.socialLinks")
      .locator("div")
      .filter({ hasText: "Social Links" })
      .nth(3)
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "facebook" })).toBeVisible();
  await expect(page.getByRole("button", { name: "twitter" })).toBeVisible();
  await expect(page.getByRole("button", { name: "instagram" })).toBeVisible();
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
}

async function updateContactDetails() {
  const officeInfo = page
    .getByTestId("field-variants.officeInformation")
    .getByTestId("string-input");
  officeInfo.fill("");
  officeInfo.fill("123 Sample Address");
  commonValues.commonContactDetails.office = await officeInfo.inputValue();

  const email = page
    .getByTestId("field-variants.contactEmail")
    .getByTestId("string-input");
  email.fill("");
  email.fill("sample@webriq.com");
  commonValues.commonContactDetails.contactEmail = await email.inputValue();

  const number = page
    .getByTestId("field-variants.contactNumber")
    .getByTestId("string-input");
  number.fill("");
  number.fill("+12 34567");
  commonValues.commonContactDetails.contactNumber = await number.inputValue();
}

async function updateWebriQForms() {
  // contact generate form ID
  await page
    .getByRole("button", { name: "Generate ID" })
    .click({ force: true });
  expect(page.getByLabel("Form ID")).not.toBeUndefined();
  await expect(page.getByRole("button", { name: "Generate ID" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Manage" })).toBeVisible();

  // check contact form initial fields
  await expect(page.getByRole("button", { name: "Subject" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Name", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "name@example.com" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Message..." })).toBeVisible();
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
    .fill("SUBMIT");

  // contact form thank you page link
  await page
    .getByRole("button", { name: "Thank You page" })
    .click({ force: true });
  await page.getByLabel("Internal, inside this website").check({ force: true });
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

test.describe("Create new Contact", () => {
  test.describe.configure({ timeout: 600000, mode: "serial" });

  test("Variant A", async () => {
    await page.getByRole("link", { name: "Components" }).click({ force: true });
    await page
      .getByRole("button", { name: "New Contact" })
      .click({ force: true });
    await page.getByTestId("string-input").click();
    await page.getByTestId("string-input").fill(`New Contact - ${getTime}`);
    await page
      .getByTestId("field-variant")
      .getByRole("img")
      .first()
      .click({ force: true });
    await updateTitle();
    await updateDescription();
    await updateContactDetails();
    await updateSocialLinks();
    await updateWebriQForms();
  });

  test("Variant B", async () => {
    await page.getByRole("button", { name: "Next" }).click({ force: true });
    await expect(page.getByText("Variant B")).toBeVisible();

    // check if we have matching common field values with variant A - title, description, social links and contact details
    await expect(
      page.getByTestId("field-variants.title").getByTestId("string-input")
    ).toHaveValue(commonValues.commonTitle);
    await expect(
      page
        .getByTestId("field-variants.contactDescription")
        .getByTestId("string-input")
    ).toHaveValue(commonValues.commonDesc);
    await expect(
      page
        .getByTestId("field-variants.officeInformation")
        .getByTestId("string-input")
    ).toHaveValue(commonValues.commonContactDetails.office);
    await expect(
      page
        .getByTestId("field-variants.contactEmail")
        .getByTestId("string-input")
    ).toHaveValue(commonValues.commonContactDetails.contactEmail);
    await expect(
      page
        .getByTestId("field-variants.contactNumber")
        .getByTestId("string-input")
    ).toHaveValue(commonValues.commonContactDetails.contactNumber);
    await expect(
      page
        .getByTestId("field-variants.socialLinks")
        .locator("div")
        .filter({ hasText: "Social Links" })
        .nth(3)
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "twitter" })).toBeVisible();
    await expect(page.getByRole("button", { name: "instagram" })).toBeVisible();
  });
});

test.afterAll(async () => {
  await page.close();
});
