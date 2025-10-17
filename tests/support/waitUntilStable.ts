import { Page } from '@playwright/test';

const DEFAULT_TIMEOUT = 10000;

export const waitUntilStable = async (page: Page) => {
  await page.waitForLoadState('domcontentloaded', { timeout: DEFAULT_TIMEOUT });
  await page.waitForLoadState('networkidle', { timeout: DEFAULT_TIMEOUT });
};
