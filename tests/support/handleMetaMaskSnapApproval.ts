import { Page } from '@playwright/test';
import { TEST_CONSTANTS } from './constants';
import { SelectorsEnum } from './testdata';
import * as TestActions from './index';

const DEFAULT_TIMEOUT = 10000;
const SNAP_APPROVAL_MAX_RETRIES = 2;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const waitUntilStable = async (page: Page) => {
  await page.waitForLoadState('domcontentloaded', { timeout: DEFAULT_TIMEOUT });
  await page.waitForLoadState('networkidle', { timeout: DEFAULT_TIMEOUT });
};

// Helper function to refresh page and then click an element with retry logic
const refreshPageAndClick = async (
  page: Page,
  metamaskPage: Page,
  clickAction: (freshPage: Page) => Promise<void>,
  actionName: string,
  timeout: number = 15000,
  maxRetries: number = SNAP_APPROVAL_MAX_RETRIES
): Promise<Page> => {
  let retries = 0;

  while (retries <= maxRetries) {
    try {
      console.log(
        `Refreshing page before action: ${actionName} (attempt ${retries + 1}/${
          maxRetries + 1
        })`
      );

      // Get the fresh notification page first
      const freshPage = await TestActions.waitForPageByUrlSubstring({
        page: metamaskPage,
        urlSubstring: '/notification.html',
        timeout
      });

      // Set viewport size to ensure proper display of MetaMask notification
      await freshPage.setViewportSize({
        width: 360,
        height: 592
      });

      // Wait for the page to be fully loaded before proceeding
      await waitUntilStable(freshPage);

      // Verify the page is still accessible
      try {
        await freshPage.url();
        console.log('Page is accessible, proceeding...');
      } catch (error) {
        console.log('Page is not accessible, skipping action');
        throw new Error('Page context is closed');
      }

      console.log(`Page refreshed and loaded, executing action: ${actionName}`);
      await clickAction(freshPage);
      console.log(`Successfully clicked: ${actionName}`);

      return freshPage;
    } catch (error) {
      retries++;

      if (retries <= maxRetries) {
        console.warn(
          `[refreshPageAndClick] Failed to execute action ${actionName}, retrying (attempt ${retries}/${maxRetries})... Error: ${error}`
        );

        // Wait before retrying with exponential backoff
        await sleep(1000 * retries);
        continue;
      }

      // If all retries failed, throw the error
      console.error(
        `[refreshPageAndClick] Failed to execute action ${actionName} after ${maxRetries} retries:`,
        error
      );
      throw error;
    }
  }

  // This should never be reached due to the throw in the catch block
  throw new Error(
    `[refreshPageAndClick] Unexpected end of function reached for action: ${actionName}`
  );
};

export const handleMetaMaskSnapApproval = async (
  snapApprovalPage: Page,
  metamaskPage: Page,
  timeout: number = TEST_CONSTANTS.PAGE_WAIT_TIMEOUT,
  maxRetries: number = SNAP_APPROVAL_MAX_RETRIES
): Promise<boolean> => {
  let retries = 0;

  while (retries <= maxRetries) {
    try {
      console.log(
        `[handleMetaMaskSnapApproval] Starting snap approval process (attempt ${
          retries + 1
        }/${maxRetries + 1})`
      );

      // Define the sequence of actions to perform on the snap approval page
      const actions = [
        { type: 'testId', name: SelectorsEnum.snapPrivacyWarningScroll },
        { type: 'button', name: 'Accept' },
        { type: 'button', name: 'Connect' },
        { type: 'button', name: 'Install' },
        { type: 'checkbox', name: 'MultiversX' },
        { type: 'button', name: 'Confirm' },
        { type: 'button', name: 'Ok' },
        { type: 'button', name: 'Approve' }
      ];

      // Execute each action and refresh the snap approval page
      let currentPage = snapApprovalPage;

      for (const action of actions) {
        currentPage = await refreshPageAndClick(
          currentPage,
          metamaskPage,
          async (freshPage) => {
            // Debug: Show available pages before click action
            const availablePages = await freshPage.context().pages();
            const pageUrls = availablePages.map((p) => p.url());
            console.log(
              `Available pages before ${action.type}: ${action.name}:`,
              pageUrls
            );

            // Click the element based on the action type
            if (action.type === 'testId') {
              const element = freshPage.getByTestId(action.name);
              await element.waitFor({ state: 'visible', timeout });
              await element.click();
              return;
            }

            if (action.type === 'checkbox') {
              const element = freshPage.getByRole('checkbox', {
                name: action.name
              });
              await element.waitFor({ state: 'visible', timeout });
              await element.click();
              return;
            }

            if (action.type === 'button') {
              const element = freshPage.getByRole('button', {
                name: action.name
              });
              await element.waitFor({ state: 'visible', timeout });
              await element.click();
              return;
            }
          },
          `${action.type}: ${action.name}`,
          timeout
        );
      }

      console.log('Successfully handled MetaMask Snap approval');
      return true;
    } catch (error) {
      retries++;

      if (retries <= maxRetries) {
        console.warn(
          `Snap approval failed, retrying (attempt ${retries}/${maxRetries})... Error: ${error}`
        );

        // Wait before retrying with exponential backoff
        await sleep(2000 * retries);
        continue;
      }

      // If all retries failed, log and return false
      console.error(`Snap approval failed after ${maxRetries} retries:`, error);
      return false;
    }
  }

  // This should never be reached due to the return in the catch block
  return false;
};
