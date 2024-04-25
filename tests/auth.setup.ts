// @references:
// - https://dev.to/playwright/a-better-global-setup-in-playwright-reusing-login-with-project-dependencies-14
// - https://playwright.dev/docs/auth

import { test as setup, expect } from "@playwright/test";
import { autologin_studio } from "./utils";

const authFile = "playwright/.auth/user.json";

setup("autologin studio", async ({ page }) => {
  console.log("Autologging in...", page);

  await page.goto("/");

  await page.evaluate(autologin_studio, {
    token: process.env.STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  });

  await page.context().storageState({ path: authFile });
});
