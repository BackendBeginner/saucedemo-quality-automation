import { test, expect } from '@playwright/test';

const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'standard_user',
    password: 'wrong_password',
  },
};

async function openLoginPage(page: Parameters<typeof test>[0]['page']) {
  await page.goto('/');
}

async function login(
  page: Parameters<typeof test>[0]['page'],
  username: string,
  password: string,
) {
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

test.describe('SauceDemo Login', () => {
  test('TC-LOGIN-001: standard user can login successfully', async ({
    page,
  }) => {
    await openLoginPage(page);
    await login(page, USERS.standard.username, USERS.standard.password);

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('TC-LOGIN-002: locked out user cannot login', async ({ page }) => {
    await openLoginPage(page);
    await login(page, USERS.lockedOut.username, USERS.lockedOut.password);

    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      'Sorry, this user has been locked out.',
    );
    await expect(page).not.toHaveURL(/inventory.html/);
  });

  test('TC-LOGIN-003: user cannot login with an invalid password', async ({
    page,
  }) => {
    await openLoginPage(page);
    await login(page, USERS.invalid.username, USERS.invalid.password);

    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(
      'Username and password do not match any user in this service',
    );
    await expect(page).not.toHaveURL(/inventory.html/);
  });

  test('TC-LOGIN-004: user cannot login with an empty username', async ({
    page,
  }) => {
    await openLoginPage(page);

    await page.getByPlaceholder('Password').fill(USERS.standard.password);
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username is required');
    await expect(page).not.toHaveURL(/inventory.html/);
  });

  test('TC-LOGIN-005: user cannot login with an empty password', async ({
    page,
  }) => {
    await openLoginPage(page);

    await page.getByPlaceholder('Username').fill(USERS.standard.username);
    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Password is required');
    await expect(page).not.toHaveURL(/inventory.html/);
  });

  test('TC-LOGIN-006: standard user can access the inventory page', async ({
    page,
  }) => {
    await openLoginPage(page);
    await login(page, USERS.standard.username, USERS.standard.password);

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);

    const firstProduct = page.locator('.inventory_item').first();

    await expect(firstProduct.locator('.inventory_item_name')).toBeVisible();
    await expect(firstProduct.locator('.inventory_item_price')).toBeVisible();
    await expect(
      firstProduct.getByRole('button', { name: /Add to cart/i }),
    ).toBeVisible();
  });

  test('TC-LOGIN-007: performance glitch user can login successfully', async ({
    page,
  }) => {
    test.setTimeout(15_000);

    await openLoginPage(page);
    await login(
      page,
      USERS.performanceGlitch.username,
      USERS.performanceGlitch.password,
    );

    await expect(page).toHaveURL(/inventory.html/, {
      timeout: 15_000,
    });
    await expect(page.getByText('Products')).toBeVisible({
      timeout: 15_000,
    });
  });
});