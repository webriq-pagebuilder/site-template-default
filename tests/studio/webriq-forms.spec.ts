import { test, expect } from "@playwright/test";

test("verify it is initially setup properly", async ({ page }) => {
  await page.goto(`./studio`);

  await page.getByRole("link", { name: "Forms" }).click();
  await page.getByRole("button", { name: "Configure" }).click();

  await expect(page.getByText("API Email")).toBeVisible();
  await expect(page.getByText("API Email")).toBeVisible();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^API Email$/ })
      .getByRole("textbox")
  ).not.toHaveValue("");
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^API Key$/ })
      .getByRole("textbox")
  ).not.toHaveValue("");
});

// @todo: fix properly intercepting response from request
test("it lists the number of forms based on API response of WebriQ Forms", async ({
  page,
}) => {
  await page.route(
    "https://pagebuilderforms.webriq.com/forms",
    async (route) => {
      const response = await route.continue();
      console.log("🚀 ~ response:", response);
      // const responseBody = await response.json();
      // console.log("🚀 ~ response:", responseBody); // Log or assert the response
    }
  );
  await page.goto(`./studio`);

  await page.getByRole("link", { name: "Forms" }).click();

  await expect(page.getByText("WebriQ Forms")).toBeVisible();
});
