import { Page } from '@playwright/test';

const DEFAULT_TIMEOUT = 10000;

const stepSelectors = {
  metaMetricsCheckbox: '#metametrics-opt-in',
  continueButton: '[data-testid="metametrics-i-agree"]',
  doneButton: '[data-testid="onboarding-complete-done"]'
};

export async function handleMetaMetrics(page: Page) {
  console.log('Handling MetaMetrics opt-in...');

  // Uncheck the MetaMetrics checkbox
  const metaMetricsCheckbox = page.locator(stepSelectors.metaMetricsCheckbox);
  await metaMetricsCheckbox.waitFor({
    state: 'visible',
    timeout: DEFAULT_TIMEOUT
  });

  // Click to uncheck if it's checked
  if (await metaMetricsCheckbox.isChecked()) {
    await metaMetricsCheckbox.click();
    console.log('Unchecked MetaMetrics checkbox');
  }

  // Click the continue button
  const continueButton = page.locator(stepSelectors.continueButton);
  await continueButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  await continueButton.click();
  console.log('Clicked continue button');

  // Click the done button
  const doneButton = page.locator(stepSelectors.doneButton);
  await doneButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  await doneButton.click();
  console.log('Clicked done button');
}
