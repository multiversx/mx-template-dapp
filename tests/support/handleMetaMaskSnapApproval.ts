import { Page } from '@playwright/test';
import { TEST_CONSTANTS } from './constants';
import { SelectorsEnum } from './testdata';
import { waitUntilStable } from './waitUntilStable';
import * as TestActions from './index';

const SNAP_APPROVAL_MAX_RETRIES = 5;
const CLICK_ACTION_TIMEOUT = 5000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Clicks an element on the page based on its type (testId, checkbox, button)
const clickElement = async (
  page: Page,
  type: 'testId' | 'checkbox' | 'button',
  name: string,
  timeout: number
): Promise<void> => {
  const selectorMap = {
    testId: page.getByTestId(name),
    checkbox: page.getByRole('checkbox', { name }),
    button: page.getByRole('button', { name })
  };

  const element = selectorMap[type];
  if (!element) throw new Error(`Unknown element type: ${type}`);

  await element.waitFor({ state: 'visible', timeout });
  await element.click();
};

// Waits for a MetaMask notification page (notification.html) and performs a click action.
// Includes retry logic for resilience in flaky environments (CI, headless mode).
const withNotificationPage = async (
  contextPage: Page,
  metamaskPage: Page,
  action: (page: Page) => Promise<void>,
  description: string,
  timeout = 15000,
  maxRetries = SNAP_APPROVAL_MAX_RETRIES
): Promise<Page> => {
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      const notifPage = await TestActions.waitForPageByUrlSubstring({
        page: metamaskPage,
        urlSubstring: '/notification.html',
        timeout
      });

      await waitUntilStable(notifPage);
      await notifPage.setViewportSize({ width: 360, height: 592 });
      await waitUntilStable(notifPage);

      // Verify page is still valid
      await notifPage.url();

      await action(notifPage);
      return notifPage;
    } catch (error) {
      const lastAttempt = attempt === maxRetries + 1;
      const message = `[withNotificationPage] Action "${description}" failed (attempt ${attempt}/${maxRetries})`;

      if (lastAttempt) {
        console.error(`${message} - giving up`);
        throw error;
      }

      console.warn(`${message} - retrying...`);
      await sleep(1500 * attempt);
    }
  }

  throw new Error(
    `[withNotificationPage] Unexpected exit for "${description}"`
  );
};

// Handles the MetaMask Snap approval flow (scroll, accept, install, confirm, approve, etc.)
export const handleMetaMaskSnapApproval = async (
  initialPage: Page,
  metamaskPage: Page,
  timeout = TEST_CONSTANTS.PAGE_WAIT_TIMEOUT,
  maxRetries = SNAP_APPROVAL_MAX_RETRIES
): Promise<boolean> => {
  const actions = [
    { type: 'testId', name: SelectorsEnum.snapPrivacyWarningScroll },
    { type: 'button', name: 'Accept' },
    { type: 'button', name: 'Connect' },
    { type: 'button', name: 'Install' },
    { type: 'checkbox', name: 'MultiversX' },
    { type: 'button', name: 'Confirm' },
    { type: 'button', name: 'Ok' },
    { type: 'button', name: 'Approve' }
  ] as const;

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      let currentPage = initialPage;

      for (const { type, name } of actions) {
        currentPage = await withNotificationPage(
          currentPage,
          metamaskPage,
          async (notifPage) =>
            clickElement(notifPage, type, name, CLICK_ACTION_TIMEOUT),
          `${type}: ${name}`,
          timeout,
          maxRetries
        );
      }

      return true;
    } catch (error) {
      const lastAttempt = attempt === maxRetries + 1;
      const message = `[handleMetaMaskSnapApproval] Failed (attempt ${attempt}/${maxRetries})`;

      if (lastAttempt) {
        console.error(`${message} - giving up`);
        return false;
      }

      console.warn(`${message} - retrying...`);
      await sleep(2000 * attempt);
    }
  }

  return false;
};
