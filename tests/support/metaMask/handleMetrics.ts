import { Page } from '@playwright/test';

const DEFAULT_TIMEOUT = 10000;

const metaMetricsSelectors = {
  checkbox: '#metametrics-opt-in',
  continueButton: '[data-testid="metametrics-i-agree"]',
  doneButton: '[data-testid="onboarding-complete-done"]'
};

export async function handleMetaMetrics(page: Page) {
  await ensureMetaMetricsOptOut(page);
  await clickContinue(page);
  await clickDone(page);
}

async function ensureMetaMetricsOptOut(page: Page) {
  const checkbox = page.locator(metaMetricsSelectors.checkbox);
  await checkbox.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });

  if (await checkbox.isChecked()) {
    await checkbox.click();
  }
}

async function clickContinue(page: Page) {
  const button = page.locator(metaMetricsSelectors.continueButton);
  await button.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  await button.click();
}

async function clickDone(page: Page) {
  const button = page.locator(metaMetricsSelectors.doneButton);
  await button.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  await button.click();
}
