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

    // Wait for the modal page to be ready
    await modalPage.waitForLoadState('networkidle');

    // Wait for the modal page to be ready
    await modalPage.waitForLoadState('domcontentloaded');

    // Wait for the modal page to be ready
    await modalPage.waitForLoadState('load');

    // Check for privacy warning and handle it
    try {
      // Take screenshot of the modal page
      await modalPage.screenshot();

      // Click the snap privacy warning scroll down button
      await modalPage
        .getByTestId(SelectorsEnum.snapPrivacyWarningScroll)
        .click({ timeout: 10000 });

      // Take screenshot of the modal page
      await modalPage.screenshot();

      await modalPage
        .getByRole('button', {
          name: 'Accept'
        })
        .click({ timeout: 10000 });

      // Take screenshot of the modal page
      await modalPage.screenshot();

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

      // click Approve button
      await modalPage
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
