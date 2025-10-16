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
      urlSubstring: '/notification.html',
      timeout
    });

    // console log available pages
    const pages = await modalPage.context().pages();
    const pageUrls = pages.map((p) => p.url());
    console.log('Available pages 1:', pageUrls);

    // Check for privacy warning and handle it
    try {
      // Click the snap privacy warning scroll down button
      await modalPage
        .getByTestId(SelectorsEnum.snapPrivacyWarningScroll)
        .click({ timeout: 10000 });

      await modalPage
        .getByRole('button', {
          name: 'Accept'
        })
        .click({ timeout: 10000 });

      // Click the Accept button
      await modalPage
        .getByRole('button', {
          name: 'Connect'
        })
        .click({ timeout: 10000 });

      // Take screenshot of the modal page
      await modalPage.screenshot();

      await modalPage
        .getByRole('button', {
          name: 'Install'
        })
        .click({ timeout: 10000 });

      // click MultiversX checkbox
      await modalPage
        .getByRole('checkbox', {
          name: 'MultiversX'
        })
        .click({ timeout: 10000 });

      // click confirm button
      await modalPage
        .getByRole('button', {
          name: 'Confirm'
        })
        .click({ timeout: 10000 });

      // click Ok button
      await modalPage
        .getByRole('button', {
          name: 'Ok'
        })
        .click({ timeout: 10000 });

      // A new notification page should appear for approve connection
      const modalPage2 = await TestActions.waitForPageByUrlSubstring({
        page,
        urlSubstring: '/notification.html#confirmation',
        timeout
      });

      // console log available pages
      const pages2 = await modalPage2.context().pages();
      const pageUrls2 = pages2.map((p) => p.url());
      console.log('Available pages 2:', pageUrls2);

      // click Approve button
      await modalPage2
        .getByRole('button', {
          name: 'Approve'
        })
        .click({ timeout: 10000 });

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
