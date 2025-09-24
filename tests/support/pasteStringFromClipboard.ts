import { BrowserContext, Page } from '@playwright/test';

export const pasteStringFromClipboard = async (
  page: Page,
  context: BrowserContext
) => {
  await context.grantPermissions(['clipboard-write', 'clipboard-read']);
  const text = await page.evaluate(() => navigator.clipboard.readText());
  return text;
};
