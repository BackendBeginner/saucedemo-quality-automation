import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export async function loginAsStandardUser(page: Page) {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.expectLoginSuccess();
}