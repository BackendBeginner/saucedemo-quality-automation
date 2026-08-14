import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly backHomeButton: Locator;
  readonly itemQuantity: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly completeHeader: Locator;
  readonly ponyExpressImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home'});
    this.errorMessage = page.locator('[data-test="error"]');
    this.itemQuantity = page.locator('.cart_quantity');
    this.itemTotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.completeHeader = page.locator('.complete-header');
    this.ponyExpressImage = page.locator('.pony_express');
  }

  async expectInformationPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
    await expect(this.page.locator('.title')).toHaveText(
      'Checkout: Your Information',
    );
  }

  async fillCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async expectInformationError(message: string) {
  await expect(this.errorMessage).toBeVisible();
  await expect(this.errorMessage).toContainText(message);
  await expect(this.page).toHaveURL(/checkout-step-one.html/);
}

  async expectOverviewPageLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
    await expect(this.page.locator('.title')).toHaveText(
      'Checkout: Overview',
    );
  }

  async expectProductVisible(productName: string) {
    await expect(
      this.page.locator('.cart_item').filter({
        has: this.page.getByText(productName, { exact: true }),
      }),
    ).toBeVisible();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async expectOrderCompleted() {
    await expect(this.page).toHaveURL(/checkout-complete.html/);
    await expect(this.page.locator('.complete-header')).toHaveText(
      'Thank you for your order!',
    );
  }

  async expectOverviewDetails(
  productName: string,
  quantity: string,
  subtotal: string,
  tax: string,
  total: string,
) {
  await expect(this.page).toHaveURL(/checkout-step-two.html/);

  await expect(
    this.page.locator('.cart_item').filter({
      has: this.page.getByText(productName, { exact: true }),
    }),
  ).toBeVisible();

  await expect(this.itemQuantity).toHaveText(quantity);
  await expect(this.itemTotal).toHaveText(`Item total: ${subtotal}`);
  await expect(this.tax).toHaveText(`Tax: ${tax}`);
  await expect(this.total).toHaveText(`Total: ${total}`);
}

async cancelCheckout() {
  await this.cancelButton.click();
}

async expectOrderCompletePage() {
  await expect(this.page).toHaveURL(/checkout-complete.html/);
  await expect(this.completeHeader).toHaveText(
    'Thank you for your order!',
  );
  await expect(this.ponyExpressImage).toBeVisible();
}

async backHome() {
  await this.backHomeButton.click();
}
}