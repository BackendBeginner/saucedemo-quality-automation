import { expect } from '@playwright/test';
import { test } from './fixtures';
import { CartPage } from '../pages/CartPage';

test.describe('SauceDemo Cart', () => {
  test('TC-CART-001: user can remove a product from inventory', async ({
    page,
    inventoryPage,
  }) => {
    await inventoryPage.expectLoaded();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.expectCartItemCount(1);

    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    await inventoryPage.expectProductCanBeAdded('Sauce Labs Backpack');
    await inventoryPage.expectCartItemCount(0);
  });

  test('TC-CART-002: user can remove a product from the cart', async ({
    page,
    inventoryPage,
  }) => {
    const cartPage = new CartPage(page);

    await inventoryPage.expectLoaded();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectItemCount(2);

    await cartPage.removeProduct('Sauce Labs Bike Light');

    await cartPage.expectItemCount(1);
    await cartPage.expectItemVisible('Sauce Labs Backpack');
    await expect(
      cartPage.item('Sauce Labs Bike Light'),
    ).toHaveCount(0);
    await cartPage.expectCartItemCount(1);
  });

  test('TC-CART-003: removing the only cart product empties the cart', async ({
    page,
    inventoryPage,
  }) => {
    const cartPage = new CartPage(page);

    await inventoryPage.expectLoaded();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectItemCount(1);
    await cartPage.removeProduct('Sauce Labs Backpack');

    await cartPage.expectCartIsEmpty();
  });
});