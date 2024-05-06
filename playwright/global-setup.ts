import { chromium, FullConfig } from "@playwright/test";

export const authFile = "playwright/.auth/autologin_user.json";

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(baseURL!);

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
