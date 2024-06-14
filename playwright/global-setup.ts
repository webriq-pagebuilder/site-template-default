import { chromium, FullConfig } from "@playwright/test";

export const authFile = "playwright/.auth/autologin_user.json";

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  console.log("🚀 [INFO] baseURL:", baseURL);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await browser.newPage();

  try {
    await page.goto(baseURL!);

    const autologinCredentials = {
      token: process.env.STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    };
    console.log("🚀 [INFO] credentials:", autologinCredentials);

    // Set localStorage needed to autologin
    await page.evaluate(autologin_studio, autologinCredentials);

    // Save the authentication state to a file
    await page.context().storageState({ path: authFile });
    await browser.close();
  } catch (error) {
    await context.tracing.stop({
      path: "./test-results/failed-setup-trace.zip",
    });
    await browser.close();
    throw error;
  }
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