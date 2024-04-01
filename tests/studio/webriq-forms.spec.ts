import { test, expect } from "@playwright/test";
import { autologin_studio } from "tests/basic.spec";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  // Pass the environment variable value as an argument to page.evaluate()
  const token = process.env.STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  await page.evaluate(autologin_studio, { token, projectId });
});

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/studio");

  const paymentName = `Dorell Stripe - ` + new Date().getTime();

  await page.getByRole("link", { name: "Payments" }).click();
  await page.getByRole("button", { name: "Add API" }).click();
  await page.getByPlaceholder("Account Name").click();
  await page.getByPlaceholder("Account Name").fill(paymentName);
  await page.getByPlaceholder("Publishable Key").click();
  await page
    .getByPlaceholder("Publishable Key")
    .fill(
      "pk_test_51Owiq2KR27oJEJJNIfePoxJBtzQzegRYARzd9hUYLWYuEgtddmVTT7BXNHbloSHWVO0qH21zT23S9VUd2DgeD08U007pwkelcV"
    );
  await page.getByPlaceholder("Secret Key").click();
  await page.getByPlaceholder("Secret Key").fill("test secret");
  await page.getByRole("button", { name: "Add Account" }).click();
  expect(page.getByText(paymentName)).toBeVisible();
});
