import { Page } from '@playwright/test';

import { TEST_CONSTANTS } from './constants';
import {
  WaitForPageByUrlSubstringType,
  CreateNotFoundErrorType
} from './types';

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
  const startTime = Date.now();
  const searchInterval = 100; // Check every 100ms

  // Search for the page by URL substring
  while (Date.now() - startTime < timeout) {
    const allPages = await getPagesSafely(page);
    const foundPage = findPageByUrl(allPages, urlSubstring);

    if (foundPage) {
      return foundPage;
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
