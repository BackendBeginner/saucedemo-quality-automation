import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', {name: 'Continue Shopping',});
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart.html/);
    await expect(this.page.locator('.title')).toHaveText('Your Cart');
  }

  item(productName: string): Locator {
    return this.cartItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }

  async expectItemVisible(productName: string) {
    await expect(this.item(productName)).toBeVisible();
  }

  async expectItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
  await this.continueShoppingButton.click();
  }
}