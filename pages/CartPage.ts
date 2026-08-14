import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartBadge: Locator;


  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', {name: 'Continue Shopping',});
    this.cartBadge = page.locator('.shopping_cart_badge');
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

  async removeProduct(productName: string) {
  const item = this.item(productName);

  await expect(item).toBeVisible();
  await item.getByRole('button', { name: 'Remove' }).click();
}

async expectCartIsEmpty() {
  await expect(this.cartItems).toHaveCount(0);
  await expect(this.page.locator('.shopping_cart_badge')).toHaveCount(0);
}

async expectCartItemCount(count: number) {
  if (count === 0) {
    await expect(this.cartBadge).toHaveCount(0);
    return;
  }

  await expect(this.cartBadge).toHaveText(String(count));
}
}