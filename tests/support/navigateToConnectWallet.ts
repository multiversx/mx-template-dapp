import { Page } from '@playwright/test';

export const navigateToConnectWallet = async (page: Page) => {
  // Retry navigation with exponential backoff
  let retries = 3;
  while (retries > 0) {
    try {
      await page.goto('/', { waitUntil: 'load', timeout: 30000 });
      break;
    } catch (error) {
      retries--;
      if (retries === 0) {
        throw error;
      }
      console.log(`Navigation failed, retrying... (${retries} attempts left)`);
      await page.waitForTimeout(2000);
    }
  }

  await page.getByRole('button', { name: 'Connect' }).first().click();
};
