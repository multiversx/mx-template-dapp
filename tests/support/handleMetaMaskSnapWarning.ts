import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import * as TestActions from './index';

export const handleMetaMaskSnapWarning = async (
  page: Page,
  timeout: number = 10000
): Promise<boolean> => {
  try {
    // Wait for the MetaMask notification page (where Snap privacy warning appears)
    const modalPage = await TestActions.waitForPageByUrlSubstring({
      page,
      urlSubstring: 'notification.html',
      timeout
    });

    // Wait for the modal page to be ready
    await modalPage.waitForLoadState('networkidle');

    // Check for privacy warning and handle it
    try {
      // Click the snap privacy warning scroll down button
      await modalPage
        .getByTestId(SelectorsEnum.snapPrivacyWarningScroll)
        .click();

      await modalPage
        .getByRole('button', {
          name: 'Accept'
        })
        .click();

      await modalPage
        .getByRole('button', {
          name: 'Connect'
        })
        .click();

      await modalPage
        .getByRole('button', {
          name: 'Install'
        })
        .click();

      // click MultiversX checkbox
      await modalPage
        .getByRole('checkbox', {
          name: 'MultiversX'
        })
        .click();

      // click confirm button
      await modalPage
        .getByRole('button', {
          name: 'Confirm'
        })
        .click();

      // click Ok button
      await modalPage
        .getByRole('button', {
          name: 'Ok'
        })
        .click();

      // click Approve button
      await modalPage
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
