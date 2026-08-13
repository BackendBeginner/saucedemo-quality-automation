import { test } from './fixtures';

test.describe('SauceDemo Inventory', () => {
  test('TC-INVENTORY-001: inventory page displays six products', async ({
    inventoryPage,
  }) => {
    await inventoryPage.expectLoaded();
    await inventoryPage.expectProductVisible('Sauce Labs Backpack');
    await inventoryPage.expectProductVisible('Sauce Labs Bike Light');
  });

  test('TC-INVENTORY-002: user can sort products from A to Z', async ({
    inventoryPage,
  }) => {
    await inventoryPage.expectLoaded();
    await inventoryPage.sortBy('az');
    await inventoryPage.expectFirstProduct('Sauce Labs Backpack');
  });

  test('TC-INVENTORY-003: user can add a product to the cart', async ({
    inventoryPage,
  }) => {
    await inventoryPage.expectLoaded();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.expectProductAdded('Sauce Labs Backpack');
    await inventoryPage.expectCartItemCount(1);
  });

  test('TC-INVENTORY-004: user can add two products to the cart', async ({
    inventoryPage,
  }) => {
    await inventoryPage.expectLoaded();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.expectCartItemCount(2);
  });

  test('TC-INVENTORY-005: user can open the shopping cart', async ({
    inventoryPage,
    page,
  }) => {
    await inventoryPage.expectLoaded();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();

    await page.waitForURL(/cart.html/);
    await page
      .getByText('Sauce Labs Backpack', { exact: true })
      .waitFor();
  });
});