import { test, type Page, expect } from "@playwright/test";
import { autologin_studio } from "tests/utils";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll("Autologin Studio", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto("http://localhost:3000/studio");
  // Pass the environment variable value as an argument to page.evaluate()
  const token = process.env.STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

test.afterAll(async () => {
  await page.close();
});
