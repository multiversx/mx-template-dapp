import { Page } from '@playwright/test';
import { TEST_CONSTANTS } from './constants';
import {
  CreateNotFoundErrorType,
  WaitForPageByUrlSubstringType
} from './types';

const getPagesSafely = async (page: Page): Promise<Page[]> => {
  try {
    const context = page.context();
    if (!context) {
      throw new Error('Page context is null or undefined');
    }

    const browser = context.browser();
    if (!browser) {
      console.log('Browser is undefined, but attempting to get pages anyway');
      // Try to get pages even if browser is undefined
    } else if (!browser.isConnected()) {
      throw new Error('Browser context is closed or disconnected');
    }

    return await context.pages();
  } catch (error) {
    throw new Error(
      'Browser context is closed or invalid. Cannot access pages. ' +
        `Original error: ${error}`
    );
  }
};

const findPageByUrl = (pages: Page[], urlSubstring: string): Page | undefined =>
  pages.find((browserPage) => browserPage.url().includes(urlSubstring));

const getPageUrlSafely = (page: Page): string => {
  try {
    return page.url();
  } catch {
    return 'Unable to get page URL';
  }
};

const createNotFoundError = ({
  urlSubstring,
  timeout,
  currentPageUrl,
  availablePagesUrls
}: CreateNotFoundErrorType): Error =>
  new Error(
    `No page found with URL containing "${urlSubstring}" after ${timeout}ms. ` +
      `Current page URL: ${currentPageUrl}, Available pages: ${availablePagesUrls}`
  );

export const waitForPageByUrlSubstring = async ({
  page,
  urlSubstring,
  timeout = TEST_CONSTANTS.PAGE_WAIT_TIMEOUT
}: WaitForPageByUrlSubstringType) => {
  console.log(`waitForPageByUrlSubstring called for: ${urlSubstring}`);
  const startTime = Date.now();
  const searchInterval = 100; // Check every 100ms

  // Search for the page by URL substring
  while (Date.now() - startTime < timeout) {
    try {
      // Check if the original page context is still valid
      const context = page.context();
      if (!context) {
        throw new Error('Page context is null or undefined');
      }

      const browser = context.browser();
      if (browser && !browser.isConnected()) {
        throw new Error('Original page context is closed or disconnected');
      }

      const allPages = await getPagesSafely(page);
      console.log(
        `Found ${allPages.length} pages, looking for: ${urlSubstring}`
      );
      const pageUrls = allPages.map((p) => p.url());
      console.log('Available page URLs:', pageUrls);

      const foundPage = findPageByUrl(allPages, urlSubstring);

      if (foundPage) {
        console.log(`Found matching page: ${foundPage.url()}`);
        return foundPage;
      }
    } catch (error) {
      // If context is closed, throw immediately instead of continuing the loop
      if (
        error.message.includes('closed') ||
        error.message.includes('disconnected')
      ) {
        throw error;
      }
      // For other errors, log and continue
      console.log(`Error during page search: ${error}`);
    }

    // Wait before next search
    await new Promise((resolve) => setTimeout(resolve, searchInterval));
  }

  // Timeout reached - create detailed error message of all available pages
  const allPages = await getPagesSafely(page);
  const currentPageUrl = getPageUrlSafely(page);
  const availablePagesUrls = allPages
    .map((p) => getPageUrlSafely(p))
    .join(', ');

  throw createNotFoundError({
    urlSubstring,
    timeout,
    currentPageUrl,
    availablePagesUrls
  });
};
