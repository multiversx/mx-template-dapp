import { Page } from '@playwright/test';

const DEFAULT_TIMEOUT = 10000;
const RESOURCES_LOAD_DELAY = 1000; // Extra delay for font resources to load

export const waitUntilStable = async (page: Page) => {
  try {
    await page.waitForLoadState('domcontentloaded', {
      timeout: DEFAULT_TIMEOUT
    });
    await page.waitForLoadState('load', { timeout: DEFAULT_TIMEOUT });

    await new Promise((resolve) => setTimeout(resolve, RESOURCES_LOAD_DELAY));
  } catch (error) {
    throw new Error(
      `Failed to wait for page stability: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};
