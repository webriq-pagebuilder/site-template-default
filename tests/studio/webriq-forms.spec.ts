import { test, expect } from "@playwright/test";

test("verify it is initially setup properly", async ({ page }) => {
  console.log("[INFO] Run WebriQ Forms tests");

  await page.goto(`./studio`);

  await page.getByRole("link", { name: "Forms" }).click();
  await page.getByRole("button", { name: "Configure" }).click();

  await expect(page.getByText("API Email")).toBeVisible();
  await expect(page.getByText("API Key")).toBeVisible();

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
