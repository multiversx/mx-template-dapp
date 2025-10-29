import { errors, Page } from '@playwright/test';
import { waitUntilStable } from '../template/waitUntilStable';

const DEFAULT_TIMEOUT = 10000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const LoadingSelectors = {
  spinner: '.spinner',
  loadingOverlay: '.loading-overlay',
  loadingIndicators: [
    '.loading-logo',
    '.loading-spinner',
    '.loading-overlay',
    '.loading-overlay__spinner',
    '.loading-span',
    '.loading-indicator',
    '#loading__logo',
    '#loading__spinner',
    '.mm-button-base__icon-loading',
    '.loading-swaps-quotes',
    '.loading-heartbeat'
  ]
};

export const waitForMetaMaskLoad = async (page: Page) => {
  try {
    // First ensure page is loaded
    await waitUntilStable(page);

    // Then wait for all loading indicators to disappear
    await Promise.all(
      LoadingSelectors.loadingIndicators.map(async (selector) => {
        await waitForSelector(selector, page, DEFAULT_TIMEOUT);
      })
    );
  } catch (error) {
    // Log error but don't fail - the page might be usable anyway
    console.warn('Warning during MetaMask load:', error.message);
  }

  // Add a small delay to ensure UI is fully ready
  await sleep(300);

  return page;
};

export const waitForSelector = async (
  selector: string,
  page: Page,
  timeout: number
) => {
  await waitUntilStable(page);

  try {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  } catch (error) {
    if (error instanceof errors.TimeoutError) {
      console.log(`Loading indicator '${selector}' not found - continuing.`);
    } else {
      console.log(
        `Error while waiting for loading indicator '${selector}' to disappear`
      );
      throw error.message;
    }
  }
};
