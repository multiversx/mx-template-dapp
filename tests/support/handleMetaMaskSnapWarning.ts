import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import * as TestActions from './index';

export const handleMetaMaskSnapWarning = async (
  page: Page,
  metamaskPage: Page,
  timeout: number = 10000
): Promise<boolean> => {
  try {
    // Wait for the MetaMask notification page (where Snap privacy warning appears)
    const notificationPage = await TestActions.waitForPageByUrlSubstring({
      page: metamaskPage,
      urlSubstring: '/notification.html',
      timeout
    });

    // Check for privacy warning and handle it
    try {
      // Click the snap privacy warning scroll down button
      await notificationPage
        .getByTestId(SelectorsEnum.snapPrivacyWarningScroll)
        .click();

      await notificationPage
        .getByRole('button', {
          name: 'Accept'
        })
        .click();

      await notificationPage
        .getByRole('button', {
          name: 'Connect'
        })
        .click();

      await notificationPage
        .getByRole('button', {
          name: 'Install'
        })
        .click();

      await notificationPage
        .getByRole('checkbox', {
          name: 'MultiversX'
        })
        .click();

      await notificationPage
        .getByRole('button', {
          name: 'Confirm'
        })
        .click();

      await notificationPage
        .getByRole('button', {
          name: 'Ok'
        })
        .click();

      await notificationPage
        .getByRole('button', {
          name: 'Approve'
        })
        .click();

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
