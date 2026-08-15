import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

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

test.describe('SauceDemo Login', () => {
  test('TC-LOGIN-001: standard user can login successfully', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(
      USERS.standard.username,
      USERS.standard.password,
    );
    await loginPage.expectLoginSuccess();
  });

  test('TC-LOGIN-002: locked out user cannot login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(
      USERS.lockedOut.username,
      USERS.lockedOut.password,
    );
    await loginPage.expectLoginError(
      'Sorry, this user has been locked out.',
    );
  });

  test('TC-LOGIN-003: user cannot login with an invalid password', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(
      USERS.invalid.username,
      USERS.invalid.password,
    );
    await loginPage.expectLoginError(
      'Username and password do not match any user in this service',
    );
  });

  test('TC-LOGIN-004: user cannot login with an empty username', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.passwordInput.fill(USERS.standard.password);
    await loginPage.loginButton.click();

    await loginPage.expectLoginError('Username is required');
  });

  test('TC-LOGIN-005: user cannot login with an empty password', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.usernameInput.fill(USERS.standard.username);
    await loginPage.loginButton.click();

    await loginPage.expectLoginError('Password is required');
  });

  test('TC-LOGIN-006: standard user can access inventory page', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(
      USERS.standard.username,
      USERS.standard.password,
    );
    await loginPage.expectLoginSuccess();

    await test.step('Verify inventory page content', async () => {
      await page.locator('.inventory_list').waitFor();
      await page.locator('.inventory_item').first().waitFor();
    });
  });

  test('TC-LOGIN-007: performance glitch user can login successfully', async ({
  page,
}) => {
  test.setTimeout(60_000);

  const loginPage = new LoginPage(page);
  const start = Date.now();

  await loginPage.open();

  await loginPage.login(
    USERS.performanceGlitch.username,
    USERS.performanceGlitch.password,
  );

  await loginPage.expectLoginSuccess();

  const totalDuration = Date.now() - start;

  console.log(
    `performance_glitch_user total flow duration: ${totalDuration}ms`,
  );

  test.expect(totalDuration).toBeLessThan(15_000);
});
});