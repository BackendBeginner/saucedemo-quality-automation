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

  test('TC-CHECKOUT-002: checkout requires first name', async ({
  page,
  inventoryPage,
}) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();

  await cartPage.expectLoaded();
  await cartPage.checkout();

  await checkoutPage.expectInformationPageLoaded();
  await checkoutPage.lastNameInput.fill('Cheng');
  await checkoutPage.postalCodeInput.fill('10001');
  await checkoutPage.continueToOverview();

  await checkoutPage.expectInformationError(
    'Error: First Name is required',
  );
});

test('TC-CHECKOUT-003: checkout requires last name', async ({
  page,
  inventoryPage,
}) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();

  await cartPage.expectLoaded();
  await cartPage.checkout();

  await checkoutPage.expectInformationPageLoaded();
  await checkoutPage.firstNameInput.fill('Kai');
  await checkoutPage.postalCodeInput.fill('10001');
  await checkoutPage.continueToOverview();

  await checkoutPage.expectInformationError(
    'Error: Last Name is required',
  );
});

test('TC-CHECKOUT-004: checkout requires postal code', async ({
  page,
  inventoryPage,
}) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();

  await cartPage.expectLoaded();
  await cartPage.checkout();

  await checkoutPage.expectInformationPageLoaded();
  await checkoutPage.firstNameInput.fill('Kai');
  await checkoutPage.lastNameInput.fill('Cheng');
  await checkoutPage.continueToOverview();

  await checkoutPage.expectInformationError(
    'Error: Postal Code is required',
  );
});

test('TC-CHECKOUT-005: order summary displays correct product and amounts', async ({
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
  await cartPage.checkout();

  await checkoutPage.expectInformationPageLoaded();
  await checkoutPage.fillCustomerInformation(
    'Kai',
    'Cheng',
    '10001',
  );
  await checkoutPage.continueToOverview();

  await checkoutPage.expectOverviewPageLoaded();
  await checkoutPage.expectOverviewDetails(
    'Sauce Labs Backpack',
    '1',
    '$29.99',
    '$2.40',
    '$32.39',
  );
});

test('TC-CHECKOUT-006: user can cancel checkout information', async ({
  page,
  inventoryPage,
}) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();

  await cartPage.expectLoaded();
  await cartPage.checkout();

  await checkoutPage.expectInformationPageLoaded();
  await checkoutPage.cancelCheckout();

  await page.waitForURL(/cart.html/);
  await cartPage.expectLoaded();
  await cartPage.expectItemVisible('Sauce Labs Backpack');
});

test('TC-CHECKOUT-007: user can cancel checkout from overview', async ({
  page,
  inventoryPage,
}) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();

  await cartPage.expectLoaded();
  await cartPage.checkout();

  await checkoutPage.expectInformationPageLoaded();
  await checkoutPage.fillCustomerInformation(
    'Kai',
    'Cheng',
    '10001',
  );
  await checkoutPage.continueToOverview();
  await checkoutPage.expectOverviewPageLoaded();

  await checkoutPage.cancelCheckout();

  await page.waitForURL(/inventory.html/);
  await page.getByText('Products').waitFor();
});

test('TC-CHECKOUT-008: order completion page supports Back Home', async ({
  page,
  inventoryPage,
}) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.expectLoaded();
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();

  await cartPage.expectLoaded();
  await cartPage.checkout();

  await checkoutPage.expectInformationPageLoaded();
  await checkoutPage.fillCustomerInformation(
    'Kai',
    'Cheng',
    '10001',
  );
  await checkoutPage.continueToOverview();
  await checkoutPage.expectOverviewPageLoaded();
  await checkoutPage.finishOrder();

  await checkoutPage.expectOrderCompletePage();
  await checkoutPage.backHome();

  await page.waitForURL(/inventory.html/);
  await page.getByText('Products').waitFor();
});

test('TC-CHECKOUT-009: user can complete checkout with multiple products', async ({
  page,
  inventoryPage,
}) => {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.expectLoaded();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');
  await inventoryPage.expectCartItemCount(2);
  await inventoryPage.openCart();

  await cartPage.expectLoaded();
  await cartPage.expectItemCount(2);
  await cartPage.expectItemVisible('Sauce Labs Backpack');
  await cartPage.expectItemVisible('Sauce Labs Bike Light');
  await cartPage.checkout();

  await checkoutPage.expectInformationPageLoaded();
  await checkoutPage.fillCustomerInformation(
    'Kai',
    'Cheng',
    '10001',
  );
  await checkoutPage.continueToOverview();

  await checkoutPage.expectOverviewProducts([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
  ]);

  await checkoutPage.expectOverviewAmounts(
    '$39.98',
    '$3.20',
    '$43.18',
  );

  await checkoutPage.finishOrder();
  await checkoutPage.expectOrderCompletePage();
});
});