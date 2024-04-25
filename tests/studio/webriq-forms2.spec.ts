import { test, type Page, expect } from "@playwright/test";
import { autologin_studio } from "tests/utils";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll("Autologin Studio", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto("http://localhost:3000");
  // Pass the environment variable value as an argument to page.evaluate()
  const token = process.env.STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  console.log("🚀 ~ test.beforeAll ~ token:", { token, projectId });

  await page.evaluate(autologin_studio, { token, projectId });
});

test.afterAll(async () => {
  await page.close();
});

test("verify WebriQ Forms 2 has been configured with proper credentials", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/studio");

  await page.getByRole("link", { name: "Forms" }).click();
  await page.getByRole("button", { name: "Configure" }).click();

  expect(
    page
      .locator("div")
      .filter({ hasText: /^API Email$/ })
      .getByRole("textbox")
  ).not.toHaveValue("", { timeout: 10_000 });
  expect(
    page
      .locator("div")
      .filter({ hasText: /^API Key$/ })
      .getByRole("textbox")
  ).not.toHaveValue("", { timeout: 10_000 });
});

test("it can create a new form", async () => {
  // go to pages
  // create new page
  // add a new section with form component
  // click Generate ID
  // click Manage - form should appear
});

test("created form works", async () => {
  // go to pages
  // go to newly created page
  // launch preview
  // navigate to form
  // fill out
  // submit
  // page redirects to thank you page
});

test("new form submission is recorded", async () => {
  // go to Forms component
  // click View Submissions button
});

test("form submissions can be deleted all", async () => {
  // go to Forms component
  // click View Submissions button
});

test("form can be updated", async () => {
  // go to Forms component
  // click View Submissions button
});

test("emails are received to added 'to' in the email settings", async () => {});
