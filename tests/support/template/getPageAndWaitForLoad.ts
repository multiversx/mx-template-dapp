import { BrowserContext, Page } from '@playwright/test';
import { waitUntilStable } from './waitUntilStable';

const DEFAULT_WAIT_TIMEOUT = 15_000;

export async function getPageAndWaitForLoad(
  context: BrowserContext,
  pageUrlFragment: string,
  options?: { viewport?: { width: number; height: number }; timeout?: number }
): Promise<Page> {
  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      const page =
        context.pages().find((p) => p.url().includes(pageUrlFragment)) ||
        (await context.waitForEvent('page', {
          predicate: (p) => p.url().includes(pageUrlFragment),
          timeout: options?.timeout || DEFAULT_WAIT_TIMEOUT
        }));

      if (!page) throw new Error('Notification page not found');

      if (options?.viewport) {
        await page.setViewportSize(options.viewport);
      }

      // Wait for the page to be stable
      await waitUntilStable(page);

      return page;
    } catch (error) {
      retries++;
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.warn(
        `[getPageAndWaitForLoad] Retry ${retries}/3 after error: ${message}`
      );

      if (retries >= maxRetries) throw error;
      await new Promise((r) => setTimeout(r, 1000 * retries));
    }
  }

  throw new Error('getPageAndWaitForLoad: Unexpected end of retries');
}
