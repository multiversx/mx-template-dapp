import { Page } from '@playwright/test';

// In navigateToConnectWallet.ts
export const navigateToConnectWallet = async (page: Page) => {
  const maxRetries = 3;
  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.goto('/', { waitUntil: 'load', timeout: 30000 });
      break;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await page.waitForTimeout(2000);
    }
  }
  await page.getByRole('button', { name: 'Connect' }).first().click();
};
