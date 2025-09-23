import { BrowserContext, Page, expect } from '@playwright/test';

import { pasteStringFromClipboard } from './pasteStringFromClipboard';

export async function checkClipboardContains({
  page,
  context,
  text,
  timeout = 5000 // 5 seconds
}: {
  page: Page;
  context: BrowserContext;
  text: string;
  timeout?: number;
}) {
  const startTime = Date.now();
  const maxAttempts = 10;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const clipboardText = await pasteStringFromClipboard(page, context);
      if (clipboardText.includes(text)) {
        return; // Success - text found
      }
    } catch (error) {
      // Retry
    }

    attempts++;

    // Check if we've exceeded the timeout
    if (Date.now() - startTime > timeout) {
      throw new Error(
        `Clipboard check timed out after ${timeout}ms. Expected text "${text}" was not found.`
      );
    }

    // Wait a bit before the next attempt
    await page.waitForTimeout(500);
  }

  // Game over - we've exhausted all attempts
  const finalClipboardText = await pasteStringFromClipboard(page, context);
  expect(finalClipboardText).toContain(text);
}
