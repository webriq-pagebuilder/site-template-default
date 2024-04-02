import { test, expect } from "@playwright/test";
import { autologin_studio } from "tests/helpers";
import {
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SANITY_STUDIO_URL,
} from "studio/config";

//TODO: STILL WORKING ON THIS, NETWORK ERORR IN ADD ACCOUNT BUT WORKS IN MANUAL - LOCAL
const paymentName = `Test ` + new Date().getTime()

test.beforeEach(async ({ page }) => {
  await page.goto(`${NEXT_PUBLIC_SITE_URL}`);

  const token = process.env.NEXT_PUBLIC_STUDIO_AUTOLOGIN_TOKEN_FOR_TESTING;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  await page.evaluate(autologin_studio, { token, projectId });
});

// Check if the Inputs with no value should not add an payment account - input should display required.
test('Configure Payment Input Required', async ({ page }) => {
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
  await page.getByRole('link', { name: 'Payments' }).click();
  await page.getByRole('button', { name: 'Add API' }).click();
  await page.getByRole('button', { name: 'Add Account' }).click();

  // Asserting the presence of "Required" text in multiple places
  const accountName = page.getByText("Required").first()
  const publishableKey = page.getByText("Required").nth(1)
  const secretKey = page.getByText("Required").nth(2)

  await expect(accountName || publishableKey || secretKey).toBeVisible();

  await page.getByPlaceholder('Publishable Key').click();
  await page.getByPlaceholder('Publishable Key').fill('pk_test_51OOL7vHCNHVeqcFPVqsh3ETCnhGdcko5e70WwJzXpZ8lO5pfA2YPmUydMYxKFmQv4Pokn8Yho0GhagGlfE6y5YDA00UEXTWeTT');
  await page.getByPlaceholder('Secret Key').click();
  await page.getByPlaceholder('Secret Key').fill('sk_test_51OOL7vHCNHVeqcFPsuUjZ4ZgzTjSzxJOJb8DxJte4sFWhWBbrpHjtOHZ3Alnk8LYKTIzNISihTjRiLtffD1sfexb00MY03lquz');
  await page.getByRole('button', { name: 'Add Account' }).click();
  await expect(accountName).toBeVisible();

  await page.getByPlaceholder('Account Name').click();
  await page.getByPlaceholder('Account Name').press('CapsLock');
  await page.getByPlaceholder('Account Name').fill(paymentName);
  await page.getByPlaceholder('Publishable Key').dblclick();
  await page.getByPlaceholder('Publishable Key').press('Meta+a');
  await page.getByPlaceholder('Publishable Key').fill('');
  await page.getByRole('button', { name: 'Add Account' }).click();
  await expect(publishableKey).toBeVisible();

  await page.getByPlaceholder('Publishable Key').click();
  await page.getByPlaceholder('Publishable Key').fill('pk_test_51OOL7vHCNHVeqcFPVqsh3ETCnhGdcko5e70WwJzXpZ8lO5pfA2YPmUydMYxKFmQv4Pokn8Yho0GhagGlfE6y5YDA00UEXTWeTT');
  await page.getByPlaceholder('Secret Key').click();
  await page.getByPlaceholder('Secret Key').press('Meta+a');
  await page.getByPlaceholder('Secret Key').fill('');
  await page.getByRole('button', { name: 'Add Account' }).click();
  await expect(secretKey).toBeVisible();  
});

//Needs an dynamic name and nth(number) / should fetch the newly added webriq payment
test('Configure Create Payment', async ({ page }) => {
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
  await page.getByRole('link', { name: 'Payments' }).click();
  await page.getByRole('button', { name: 'Add API' }).click();
  await page.getByPlaceholder('Account Name').click();
  await page.getByPlaceholder('Account Name').press('CapsLock');
  await page.getByPlaceholder('Account Name').fill(paymentName);
  await page.getByPlaceholder('Publishable Key').click();
  await page.getByPlaceholder('Publishable Key').fill('pk_test_51OOL7vHCNHVeqcFPVqsh3ETCnhGdcko5e70WwJzXpZ8lO5pfA2YPmUydMYxKFmQv4Pokn8Yho0GhagGlfE6y5YDA00UEXTWeTT');
  await page.getByPlaceholder('Secret Key').click();
  await page.getByPlaceholder('Secret Key').fill('sk_test_51OOL7vHCNHVeqcFPsuUjZ4ZgzTjSzxJOJb8DxJte4sFWhWBbrpHjtOHZ3Alnk8LYKTIzNISihTjRiLtffD1sfexb00MY03lquz');

  await page.getByRole('button', { name: 'Add Account' }).click({ force: true });
  await expect(page.locator('[id="__next"]').getByRole('alert').locator('div').nth(1).getByText('Stripe Secret Key Valid:')).toBeVisible()
  const addedAccount = page.locator('div').filter({ hasText: `/^${paymentName}$/` });

  // Assert that the added account is visible
  await expect(addedAccount).toBeVisible();
});

//Needs an dynamic name and nth(number) / should fetch the newly added webriq payment
test('Delete Payment', async ({ page }) => {
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);
  await page.getByRole('link', { name: 'Payments' }).click();
  await page.locator('div').filter({ hasText: /^asd$/ }).first().click();
  await page.locator('div:nth-child(6) > div:nth-child(2) > button:nth-child(2)').click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await expect(page.locator('[id="__next"]').getByRole('alert').locator('div').nth(1).getByText('Stripe Account Successfully Deleted')).toBeVisible()
  // TODO: Make it dynamic. Delete the newly added Payment.
  await expect(page.locator('div').filter({ hasText: /^asd$/ }).first()).toBeHidden();
});

//View Payments
test('View Payments', async ({ page }) => {
  await page.goto(`${NEXT_PUBLIC_SANITY_STUDIO_URL}`);

  await page.getByRole('link', { name: 'Payments' }).click();
  await page.locator('div:nth-child(3) > div:nth-child(2) > button').first().click();
  await page.waitForTimeout(15000)
  await expect(page.getByRole('cell', { name: 'Product Name' })).toBeVisible()
  await expect(page.getByLabel('Active Products').locator('div')).toBeVisible()
  await page.getByLabel('Close dialog').click();
});