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

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.errorMessage = page.locator('[data-test="error"]');
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
}