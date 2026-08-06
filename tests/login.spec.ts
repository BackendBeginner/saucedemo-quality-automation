import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login', () => {
  test('standard user can login successfully', async ({ page }) => {
    await test.step('Open SauceDemo login page', async () => {
      await page.goto('/');
    });

    await test.step('Enter valid credentials', async () => {
      await page
        .getByPlaceholder('Username')
        .fill('standard_user');

      await page
        .getByPlaceholder('Password')
        .fill('secret_sauce');
    });

    await test.step('Submit login form', async () => {
      await page
        .getByRole('button', { name: 'Login' })
        .click();
    });

    await test.step('Verify login result', async () => {
      await expect(page).toHaveURL(/inventory.html/);
      await expect(page.getByText('Products')).toBeVisible();
      await expect(page.locator('.inventory_item')).toHaveCount(6);
    });
  });
});