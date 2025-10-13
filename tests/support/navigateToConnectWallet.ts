import { Page } from '@playwright/test';

export const navigateToConnectWallet = async (page: Page) => {
  await page.goto('/', { waitUntil: 'load', timeout: 30000 });
  expect(await page.getByRole('button', { name: 'Connect' }).first());
  await page.getByRole('button', { name: 'Connect' }).first().click();
};
