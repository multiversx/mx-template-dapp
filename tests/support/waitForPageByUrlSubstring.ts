import { Page } from '@playwright/test';

import { TEST_CONSTANTS } from './constants';

const getPagesSafely = async (page: Page): Promise<Page[]> => {
  try {
    return await page.context().pages();
  } catch (error) {
    throw new Error(
      'Browser context is closed or invalid. Cannot access pages. ' +
        `Original error: ${error}`
    );
  }
};

const findPageByUrl = (
  pages: Page[],
  urlSubstring: string
): Page | undefined => {
  return pages.find((browserPage) => browserPage.url().includes(urlSubstring));
};

const waitForCurrentPageNavigation = async (
  page: Page,
  urlSubstring: string
): Promise<Page> => {
  await page.waitForURL((url) => url.hostname.includes(urlSubstring), {
    timeout: TEST_CONSTANTS.URL_NAVIGATION_TIMEOUT
  });
  return page;
};

const waitForNewPage = async (
  page: Page,
  urlSubstring: string,
  timeout: number
): Promise<Page> => {
  const newPage = await page.context().waitForEvent('page', {
    timeout: timeout - TEST_CONSTANTS.URL_NAVIGATION_TIMEOUT
  });
  await newPage.waitForURL((url) => url.hostname.includes(urlSubstring), {
    timeout: TEST_CONSTANTS.URL_NAVIGATION_TIMEOUT
  });
  return newPage;
};

const getPageUrlSafely = (page: Page): string => {
  try {
    return page.url();
  } catch {
    return 'Unable to get page URL';
  }
};

const getAvailablePagesUrls = (pages: Page[]): string => {
  return pages.map((p) => getPageUrlSafely(p)).join(', ');
};

const createNotFoundError = (
  urlSubstring: string,
  timeout: number,
  currentPageUrl: string,
  availablePagesUrls: string
): Error => {
  return new Error(
    `No page found with URL containing "${urlSubstring}" after ${timeout}ms. ` +
      `Current page URL: ${currentPageUrl}, Available pages: ${availablePagesUrls}`
  );
};

export const waitForPageByUrlSubstring = async ({
  page,
  urlSubstring,
  timeout = TEST_CONSTANTS.PAGE_WAIT_TIMEOUT
}: {
  page: Page;
  urlSubstring: string;
  timeout?: number;
}) => {
  // Check if page already exists
  const existingPages = await getPagesSafely(page);
  const existingPage = findPageByUrl(existingPages, urlSubstring);
  if (existingPage) {
    return existingPage;
  }

  // Try current page navigation first
  try {
    return await waitForCurrentPageNavigation(page, urlSubstring);
  } catch {
    // Fallback: Wait for new page to be created
    try {
      return await waitForNewPage(page, urlSubstring, timeout);
    } catch {
      // Final fallback: Check all pages again
      const allPages = await getPagesSafely(page);
      const foundPage = findPageByUrl(allPages, urlSubstring);

      if (foundPage) {
        return foundPage;
      }

      // Create detailed error message
      const currentPageUrl = getPageUrlSafely(page);
      const availablePagesUrls = getAvailablePagesUrls(allPages);

      throw createNotFoundError(
        urlSubstring,
        timeout,
        currentPageUrl,
        availablePagesUrls
      );
    }
  }
};
