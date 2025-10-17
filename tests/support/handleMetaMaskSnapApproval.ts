import { Page } from '@playwright/test';
import { TEST_CONSTANTS } from './constants';
import { SelectorsEnum } from './testdata';
import * as TestActions from './index';

// Helper function to refresh page and then click an element
const refreshPageAndClick = async (
  page: Page,
  metamaskPage: Page,
  clickAction: (freshPage: Page) => Promise<void>,
  actionName: string,
  timeout: number = 15000
): Promise<Page> => {
  try {
    console.log(`Refreshing page before action: ${actionName}`);

    // Get the fresh notification page first
    const freshPage = await TestActions.waitForPageByUrlSubstring({
      page: metamaskPage,
      urlSubstring: '/notification.html',
      timeout
    });

    // Debug: Show available pages before click action
    const availablePages = await freshPage.context().pages();
    const pageUrls = availablePages.map((p) => p.url());
    console.log('Available pages before click action:', pageUrls);

    // Wait for the page to be fully loaded before proceeding
    console.log('Waiting for notification page to load completely...');
    await freshPage.waitForLoadState('domcontentloaded', { timeout });

    // Simple wait for UI to be ready
    console.log('Waiting for UI to be ready...');
    await new Promise((resolve) => setTimeout(resolve, 10000));

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
    console.log(`Failed to execute action ${actionName}:`, error);
    throw error;
  }
};

export const handleMetaMaskSnapApproval = async (
  snapApprovalPage: Page,
  metamaskPage: Page,
  timeout: number = TEST_CONSTANTS.PAGE_WAIT_TIMEOUT
): Promise<boolean> => {
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

    console.log('Successfully handled MetaMask Snap privacy warning');
    return true;
  } catch (error) {
    console.log('No privacy warning found or error clicking:', error);
    return false;
  }
};
