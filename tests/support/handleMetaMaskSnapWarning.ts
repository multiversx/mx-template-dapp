import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import * as TestActions from './index';

// Helper function to click an element and get updated notification page
const clickAndRefreshPage = async (
  page: Page,
  metamaskPage: Page,
  clickAction: () => Promise<void>,
  actionName: string
): Promise<Page> => {
  try {
    console.log(`Executing action: ${actionName}`);
    await clickAction();
    console.log(`Successfully clicked: ${actionName}`);

    const updatedPage = await TestActions.waitForPageByUrlSubstring({
      page: metamaskPage,
      urlSubstring: '/notification.html',
      timeout: 5000
    });

    console.log(`Page refreshed after: ${actionName}`);
    return updatedPage;
  } catch (error) {
    console.log(`Failed to execute action ${actionName}:`, error);
    throw error;
  }
};

export const handleMetaMaskSnapWarning = async (
  page: Page,
  metamaskPage: Page,
  timeout: number = 30000
): Promise<boolean> => {
  try {
    // Wait for the MetaMask Snap approval page to appear
    const snapApprovalPage = await TestActions.waitForPageByUrlSubstring({
      page: metamaskPage,
      urlSubstring: '/notification.html',
      timeout
    });

    try {
      // Click the snap privacy warning scroll down button
      await snapApprovalPage
        .getByTestId(SelectorsEnum.snapPrivacyWarningScroll)
        .click();

      // Define the sequence of actions to perform on the snap approval page
      const actions = [
        { type: 'button', name: 'Accept' },
        { type: 'button', name: 'Connect' },
        { type: 'button', name: 'Install' },
        { type: 'checkbox', name: 'MultiversX' },
        { type: 'button', name: 'Confirm' },
        { type: 'button', name: 'Ok' },
        { type: 'button', name: 'Approve' }
      ];

      // Execute each action and refresh the snap approval page
      let currentPage = await TestActions.waitForPageByUrlSubstring({
        page: metamaskPage,
        urlSubstring: '/notification.html',
        timeout: 5000
      });

      for (const action of actions) {
        currentPage = await clickAndRefreshPage(
          currentPage,
          metamaskPage,
          async () => {
            // Wait for element to be visible and clickable before clicking
            const element =
              action.type === 'checkbox'
                ? currentPage.getByRole('checkbox', { name: action.name })
                : currentPage.getByRole('button', { name: action.name });

            await element.waitFor({ state: 'visible', timeout: 10000 });
            await element.click();
          },
          `${action.type}: ${action.name}`
        );
      }

      console.log('Successfully handled MetaMask Snap privacy warning');
      return true;
    } catch (error) {
      console.log('No privacy warning found or error clicking:', error);
      return false;
    }
  } catch (error) {
    console.log('No notification page found or timeout:', error);
    return false;
  }
};
