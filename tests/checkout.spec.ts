import { test } from './fixtures';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('SauceDemo Checkout', () => {
  test('TC-CHECKOUT-001: user can complete checkout with one product', async ({
    page,
    inventoryPage,
  }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.expectLoaded();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectItemCount(1);
    await cartPage.expectItemVisible('Sauce Labs Backpack');
    await cartPage.checkout();

    await checkoutPage.expectInformationPageLoaded();
    await checkoutPage.fillCustomerInformation(
      'Kai',
      'Cheng',
      '10001',
    );
    await checkoutPage.continueToOverview();

    await checkoutPage.expectOverviewPageLoaded();
    await checkoutPage.expectProductVisible('Sauce Labs Backpack');
    await checkoutPage.finishOrder();

    await checkoutPage.expectOrderCompleted();
  });
});