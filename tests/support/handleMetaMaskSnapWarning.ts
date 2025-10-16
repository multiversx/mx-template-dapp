import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import * as TestActions from './index';

export const handleMetaMaskSnapWarning = async (
  page: Page,
  timeout: number = 10000
): Promise<boolean> => {
  try {
    // Wait for the MetaMask notification page (where Snap privacy warning appears)
    const notificationPage = await TestActions.waitForPageByUrlSubstring({
      page,
      urlSubstring: '/notification.html',
      timeout
    });

    // console log available pages
    const pages1 = await notificationPage.context().pages();
    const pageUrls1 = pages1.map((p) => p.url());
    console.log('Available pages 1:', pageUrls1);

    // Check for privacy warning and handle it
    try {
      // Click the snap privacy warning scroll down button
      await notificationPage
        .getByTestId(SelectorsEnum.snapPrivacyWarningScroll)
        .click({ timeout: 10000 });

      // console log available pages
      const pages2 = await notificationPage.context().pages();
      const pageUrls2 = pages2.map((p) => p.url());
      console.log('Available pages 2:', pageUrls2);

      await notificationPage
        .getByRole('button', {
          name: 'Accept'
        })
        .click({ timeout: 10000 });

      // console log available pages
      const pages3 = await notificationPage.context().pages();
      const pageUrls3 = pages3.map((p) => p.url());
      console.log('Available pages 3:', pageUrls3);

      // Click the Accept button
      await notificationPage
        .getByRole('button', {
          name: 'Connect'
        })
        .click({ timeout: 10000 });

      // console log available pages
      const pages4 = await notificationPage.context().pages();
      const pageUrls4 = pages4.map((p) => p.url());
      console.log('Available pages 4:', pageUrls4);

      await notificationPage
        .getByRole('button', {
          name: 'Install'
        })
        .click({ timeout: 10000 });

      // console log available pages
      const pages5 = await notificationPage.context().pages();
      const pageUrls5 = pages5.map((p) => p.url());
      console.log('Available pages 5:', pageUrls5);

      // click MultiversX checkbox
      await notificationPage
        .getByRole('checkbox', {
          name: 'MultiversX'
        })
        .click({ timeout: 10000 });

      // console log available pages
      const pages6 = await notificationPage.context().pages();
      const pageUrls6 = pages6.map((p) => p.url());
      console.log('Available pages 6:', pageUrls6);

      // click confirm button
      await notificationPage
        .getByRole('button', {
          name: 'Confirm'
        })
        .click({ timeout: 10000 });

      // console log available pages
      const pages7 = await notificationPage.context().pages();
      const pageUrls7 = pages7.map((p) => p.url());
      console.log('Available pages 7:', pageUrls7);

      // click Ok button
      await notificationPage
        .getByRole('button', {
          name: 'Ok'
        })
        .click({ timeout: 10000 });

      // console log available pages
      const pages8 = await notificationPage.context().pages();
      const pageUrls8 = pages8.map((p) => p.url());
      console.log('Available pages 8:', pageUrls8);

      // A new notification page should appear for approve connection
      const confirmationPage = await TestActions.waitForPageByUrlSubstring({
        page,
        urlSubstring: '/notification.html#confirmation',
        timeout
      });

      // click Approve button
      await confirmationPage
        .getByRole('button', {
          name: 'Approve'
        })
        .click({ timeout: 10000 });

      // console log available pages
      const pages9 = await confirmationPage.context().pages();
      const pageUrls9 = pages9.map((p) => p.url());
      console.log('Available pages 9:', pageUrls9);

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
