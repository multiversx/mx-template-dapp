import { Page } from '@playwright/test';
import { TEST_CONSTANTS } from './constants';
import { SelectorsEnum } from './testdata';
import { waitUntilStable } from './waitUntilStable';
import * as TestActions from './index';

const SNAP_APPROVAL_MAX_RETRIES = 2;
const CLICK_ACTION_TIMEOUT = 5000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to click element by type
const clickElementByType = async (
  page: Page,
  type: string,
  name: string,
  timeout: number
) => {
  if (type === 'testId') {
    const element = page.getByTestId(name);
    await element.waitFor({ state: 'visible', timeout });
    await element.click();
    return;
  }

  if (type === 'checkbox') {
    const element = page.getByRole('checkbox', { name });
    await element.waitFor({ state: 'visible', timeout });
    await element.click();
    return;
  }

  if (type === 'button') {
    const element = page.getByRole('button', { name });
    await element.waitFor({ state: 'visible', timeout });
    await element.click();
    return;
  }
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
      // Get the fresh notification page first
      const freshPage = await TestActions.waitForPageByUrlSubstring({
        page: metamaskPage,
        urlSubstring: '/notification.html',
        timeout
      });

      // Ensure page is fully loaded
      await waitUntilStable(freshPage as Page);

      // Set viewport size to ensure proper display of MetaMask notification
      // This is important to avoid issues where "Approve" button is out of view
      await freshPage.setViewportSize({
        width: 360,
        height: 592
      });

      // Wait for the page to be fully loaded before proceeding
      await waitUntilStable(freshPage);

      // Verify the page is still accessible
      try {
        await freshPage.url();
      } catch (error) {
        throw new Error('Page context is closed');
      }

      await clickAction(freshPage);

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
            await clickElementByType(
              freshPage,
              action.type,
              action.name,
              CLICK_ACTION_TIMEOUT
            );
          },
          `${action.type}: ${action.name}`,
          timeout
        );
      }

      return true;
    } catch (error) {
      retries++;

      if (retries <= maxRetries) {
        console.warn(
          `[handleMetaMaskSnapApproval] Snap approval failed, retrying (attempt ${retries}/${maxRetries})... Error: ${error}`
        );

        // Wait before retrying with exponential backoff
        await sleep(2000 * retries);
        continue;
      }

      // If all retries failed, log and return false
      console.error(
        `[handleMetaMaskSnapApproval] Snap approval failed after ${maxRetries} retries:`,
        error
      );
      return false;
    }
  }

  // This should never be reached due to the return in the catch block
  return false;
};
