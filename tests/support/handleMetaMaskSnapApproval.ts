import { Page } from '@playwright/test';
import { TEST_CONSTANTS } from './constants';
import { SelectorsEnum } from './testdata';
import * as TestActions from './index';

// Helper function to refresh page and then click an element
const refreshPageAndClick = async (
  page: Page,
  metamaskPage: Page,
  clickAction: () => Promise<void>,
  actionName: string,
  timeout: number = 10000
): Promise<Page> => {
  try {
    console.log(`Refreshing page before action: ${actionName}`);

    const updatedPage = await TestActions.waitForPageByUrlSubstring({
      page: metamaskPage,
      urlSubstring: '/notification.html',
      timeout
    });

    console.log(`Page refreshed, executing action: ${actionName}`);
    await clickAction();
    console.log(`Successfully clicked: ${actionName}`);

    return updatedPage;
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
        async () => {
          // Wait for element to be visible and clickable before clicking
          if (action.type === 'testId') {
            const element = currentPage.getByTestId(action.name);
            await element.waitFor({ state: 'visible', timeout });
            await element.click();
            return;
          }

          if (action.type === 'checkbox') {
            const element = currentPage.getByRole('checkbox', {
              name: action.name
            });
            await element.waitFor({ state: 'visible', timeout });
            await element.click();
            return;
          }

          const element = currentPage.getByRole('button', {
            name: action.name
          });
          await element.waitFor({ state: 'visible', timeout });
          await element.click();
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
