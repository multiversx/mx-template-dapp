import { Page } from '@playwright/test';

const stepSelectors = {
  passwordInput: '[data-testid="create-password-new-input"]',
  confirmPasswordInput: '[data-testid="create-password-confirm-input"]',
  termsCheckbox: '[data-testid="create-password-terms"]',
  submitButton: '[data-testid="create-password-submit"]'
};

const DEFAULT_TIMEOUT = 10000;

export async function createPassword(page: Page, password: string) {
  // Enter the password
  const passwordInput = page.locator(stepSelectors.passwordInput);
  await passwordInput.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  await passwordInput.fill(password);

  // Confirm the password
  const confirmPasswordInput = page.locator(stepSelectors.confirmPasswordInput);
  await confirmPasswordInput.waitFor({
    state: 'visible',
    timeout: DEFAULT_TIMEOUT
  });
  await confirmPasswordInput.fill(password);

  // Check the terms checkbox
  const termsCheckbox = page.locator(stepSelectors.termsCheckbox);
  await termsCheckbox.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  await termsCheckbox.click();

  // Click the create password button
  const submitButton = page.locator(stepSelectors.submitButton);
  await submitButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  await submitButton.click();
}
