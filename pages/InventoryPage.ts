import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly sortSelect: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.inventoryItems).toHaveCount(6);
  }

  product(productName: string): Locator {
    return this.inventoryItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }

  async expectProductVisible(productName: string) {
    await expect(this.product(productName)).toBeVisible();
  }

  async addProductToCart(productName: string) {
    const product = this.product(productName);

    await expect(product).toBeVisible();
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async expectProductAdded(productName: string) {
    const product = this.product(productName);

    await expect(
      product.getByRole('button', { name: 'Remove' }),
    ).toBeVisible();
  }

  async expectCartItemCount(count: number) {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
      return;
    }

    await expect(this.cartBadge).toHaveText(String(count));
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortSelect.selectOption(option);
  }

  async expectFirstProduct(productName: string) {
    await expect(
      this.inventoryItems.first().locator('.inventory_item_name'),
    ).toHaveText(productName);
  }

  async openCart() {
    await this.cartLink.click();
  }
}