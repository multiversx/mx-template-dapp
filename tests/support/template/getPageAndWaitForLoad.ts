import type { BrowserContext, Page } from '@playwright/test';
import { errors } from '@playwright/test';
import type {
  GetPageAndWaitForLoad,
  GetPageAndWaitForLoadOptions
} from './types';
import { waitUntilStable } from './waitUntilStable';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const DEFAULT_PAGE_TIMEOUT = 5000;

// Waits for a page matching a specific URL (or partial URL) to open within a given context
export const getPageAndWaitForLoad: GetPageAndWaitForLoad = async (
  context: BrowserContext,
  urlSubstring: string | RegExp,
  options: GetPageAndWaitForLoadOptions = {}
) => {
  const {
    maxRetries = 3,
    timeout = DEFAULT_PAGE_TIMEOUT,
    viewport,
    waitForReady
  } = options;

  const isTargetPage = (page: Page) =>
    typeof urlSubstring === 'string'
      ? page.url().includes(urlSubstring)
      : urlSubstring.test(page.url());

  let retries = 0;
  let targetPage: Page | undefined;

  while (retries <= maxRetries) {
    try {
      // Find an existing page matching criteria
      targetPage = context.pages().find(isTargetPage);

      // If not found, wait for it to appear
      if (!targetPage) {
        targetPage = await context.waitForEvent('page', {
          predicate: isTargetPage,
          timeout
        });
      }

      // Ensure page is stable
      await waitUntilStable(targetPage);

      // Optionally set viewport (useful for extension popups)
      if (viewport) {
        await targetPage.setViewportSize(viewport);
      }

      // Optional custom "ready" callback
      if (waitForReady) {
        return await waitForReady(targetPage);
      }

      return targetPage;
    } catch (error) {
      retries++;

      if (retries <= maxRetries) {
        console.warn(
          `[getPageAndWaitForLoad] Retry ${retries}/${maxRetries} after error: ${
            (error as Error).message
          }`
        );
        await sleep(1000 * retries);
        continue;
      }

      const openPages = context
        .pages()
        .map((p) => {
          try {
            return p.url();
          } catch {
            return '[closed]';
          }
        })
        .join(', ');

      if (error instanceof errors.TimeoutError) {
        throw new Error(
          `[getPageAndWaitForLoad] Page did not appear within ${timeout}ms after ${maxRetries} retries (url: ${urlSubstring}) | open pages: ${openPages}`
        );
      }

      throw new Error(
        `[getPageAndWaitForLoad] Failed to get target page (url: ${urlSubstring}): ${
          (error as Error).message
        } | open pages: ${openPages}`
      );
    }
  }

  throw new Error('[getPageAndWaitForLoad] Unexpected unreachable state.');
};
