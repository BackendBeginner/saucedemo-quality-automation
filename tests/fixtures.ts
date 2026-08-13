import { test as base } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

type TestFixtures = {
  inventoryPage: InventoryPage;
};

export const test = base.extend<TestFixtures>({
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.expectLoginSuccess();

    await use(new InventoryPage(page));
  },
});

export { expect } from '@playwright/test';