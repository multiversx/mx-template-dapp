import { Page } from '@playwright/test';

const DEFAULT_TIMEOUT = 10000;

export const waitUntilStable = async (page: Page) => {
  try {
    await page.waitForLoadState('domcontentloaded', {
      timeout: DEFAULT_TIMEOUT
    });
    await page.waitForLoadState('networkidle', { timeout: DEFAULT_TIMEOUT });
  } catch (error) {
    console.error(
      '[waitUntilStable] Error waiting for page to be stable:',
      error
    );
    throw error.message;
  }
};
