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
      const timeoutMs = options?.timeout || DEFAULT_WAIT_TIMEOUT;

      // Try to find an already open page or wait (by polling) for a page to
      // navigate to the expected URL. Relying on the 'page' event can
      // miss cases where the page already exists (about:blank) and then
      // navigates later, or when navigation happens in the same tab.
      const page =
        context.pages().find((p) => p.url().includes(pageUrlFragment)) ||
        (await waitForPageByUrlFragment(context, pageUrlFragment, timeoutMs));

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
      const openedPageUrls = context
        .pages()
        .map((p) => p.url())
        .filter(Boolean);
      console.warn(
        `[getPageAndWaitForLoad] Retry ${retries}/3 after error: ${message}. Open pages (${
          openedPageUrls.length
        }): ${openedPageUrls.join(', ')}`
      );

      if (retries >= maxRetries) throw error;
      await new Promise((r) => setTimeout(r, 1000 * retries));
    }
  }

  throw new Error('getPageAndWaitForLoad: Unexpected end of retries');
}

async function waitForPageByUrlFragment(
  context: BrowserContext,
  fragment: string,
  timeoutMs: number
): Promise<Page | null> {
  const pollIntervalMs = 250;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const match = context.pages().find((p) => p.url().includes(fragment));
    if (match) return match;

    // Briefly wait for any new page to appear; ignore timeouts and keep polling.
    try {
      await context.waitForEvent('page', { timeout: pollIntervalMs });
    } catch {
      // no-op; continue polling
    }
  }

  return null;
}
