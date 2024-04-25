import { chromium } from "@playwright/test";

export const authFile = "playwright/.auth/autologin_user.json";

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000");
  await page.goto("http://localhost:3000/studio");

  // Set localStorage needed to autologin
  await page.evaluate(autologin_studio, {
    token: process.env.STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  });

  // Save the authentication state to a file
  await page.context().storageState({ path: authFile });
  await browser.close();
}

function autologin_studio({ token, projectId }) {
  console.log("[INFO]: autologin_studio", {
    token,
    projectId,
  });

  window.localStorage.setItem(
    `__studio_auth_token_${projectId}`,
    JSON.stringify({
      token,
      time: new Date().getTime(),
    })
  );
}

export default globalSetup;
