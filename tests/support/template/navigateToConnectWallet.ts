import { Page } from '@playwright/test';

export const navigateToConnectWallet = async (page: Page) => {
  const maxRetries = 5;
  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.goto('/', { waitUntil: 'load', timeout: 60 * 1000 }); // Increase timeout
      break;
    } catch (error) {
      console.warn(
        `[navigateToConnectWallet] Attempt ${i + 1} failed: ${error.message}`
      );
      if (i === maxRetries - 1) throw error;
      await page.waitForTimeout(5000); // Increase wait time
    }
  }
  await page.getByRole('button', { name: 'Connect' }).first().click();
};
