import { Page } from '@playwright/test';

const DEFAULT_TIMEOUT = 10000;

const createPasswordSelectors = {
  newPasswordInput: '[data-testid="create-password-new-input"]',
  confirmPasswordInput: '[data-testid="create-password-confirm-input"]',
  termsCheckbox: '[data-testid="create-password-terms"]',
  submitButton: '[data-testid="create-password-submit"]'
};

export async function createPassword(page: Page, password: string) {
  await enterPassword(page, password);
  await confirmPassword(page, password);
  await acceptTerms(page);
  await submitPasswordForm(page);
}

async function enterPassword(page: Page, password: string) {
  const passwordField = page.locator(createPasswordSelectors.newPasswordInput);
  await passwordField.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  await passwordField.fill(password);
}

async function confirmPassword(page: Page, password: string) {
  const confirmField = page.locator(
    createPasswordSelectors.confirmPasswordInput
  );
  await confirmField.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  await confirmField.fill(password);
}

async function acceptTerms(page: Page) {
  const checkbox = page.locator(createPasswordSelectors.termsCheckbox);
  await checkbox.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  await checkbox.click();
}

async function submitPasswordForm(page: Page) {
  const submitButton = page.locator(createPasswordSelectors.submitButton);
  await submitButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  await submitButton.click();
}
