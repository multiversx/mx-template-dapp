import { Page } from '@playwright/test';

export const navigateToConnectWallet = async (page: Page) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Connect' }).first().click();
};
