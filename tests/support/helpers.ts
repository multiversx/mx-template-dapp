import { BrowserContext, Page, expect } from '@playwright/test';

/**
 * Pastes a string from the clipboard.
 *
 * It will grant permissions to the browser context to read and write to the clipboard.
 *
 * @param page - The Playwright Page object.
 * @returns The string pasted from the clipboard.
 * @example
 * ```typescript
 * const text = await pasteStringFromClipboard();
 * ```
 */
export async function pasteStringFromClipboard(
  page: Page,
  context: BrowserContext
) {
  await context.grantPermissions(['clipboard-write', 'clipboard-read']);
  const text = await page.evaluate(() => navigator.clipboard.readText());
  return text;
}

/**
 * Checks if the clipboard contains a given string with retry logic and timeout.
 *
 * @param page - The Playwright Page object.
 * @param context - The Playwright BrowserContext object.
 * @param text - The string to check for in the clipboard.
 * @param timeout - Optional timeout in milliseconds (default: 5000ms).
 * @example
 * ```typescript
 * const text = 'My String';
 * await checkClipboardContains(text, 1000); // 1 second timeout
 * ```
 */
export async function checkClipboardContains(
  page: Page,
  context: BrowserContext,
  text: string,
  timeout: number = 5000
) {
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
