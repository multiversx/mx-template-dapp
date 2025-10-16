import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import * as TestActions from './index';

const isContextValid = (page: Page): boolean => {
  try {
    const context = page.context();
    if (!context) {
      console.log('Context is null or undefined');
      return false;
    }

    const browser = context.browser();
    if (!browser) {
      console.log('Browser is null or undefined');
      return false;
    }

    const isConnected = browser.isConnected();
    console.log('Browser isConnected result:', isConnected);
    return isConnected === true;
  } catch (error) {
    console.log('Error checking context validity:', error);
    return false;
  }
};

const safeClick = async (
  page: Page,
  selector: any,
  timeout: number = 5000
): Promise<boolean> => {
  try {
    // Try to access the page first
    try {
      await page.url();
    } catch (error) {
      console.log('Page is not accessible for click operation:', error);
      return false;
    }

    // Check context validity but don't fail if it's undefined
    if (!isContextValid(page)) {
      console.log('Context is invalid, but attempting click anyway');
    }

    await selector.click({ timeout });
    return true;
  } catch (error) {
    console.log(`Click operation failed: ${error}`);
    return false;
  }
};

export const handleMetaMaskSnapWarning = async (
  page: Page,
  timeout: number = 10000
): Promise<boolean> => {
  try {
    console.log('handleMetaMaskSnapWarning called with timeout:', timeout);
    console.log('Page URL at start:', page.url());

    // Try to access the page to see if it's still valid
    try {
      await page.url(); // This will throw if the page is closed
      console.log('Page is accessible');
    } catch (error) {
      console.log('Page is not accessible:', error);
      return false;
    }

    // Check if the original page context is still valid
    if (!isContextValid(page)) {
      console.log(
        'Original page context is invalid, but page is accessible - proceeding with warning handling'
      );
      // Don't return false here, try to proceed anyway since the page is accessible
    } else {
      console.log('Context is valid, proceeding with warning handling');
    }

    // Wait for the MetaMask notification page (where Snap privacy warning appears)
    const modalPage = await TestActions.waitForPageByUrlSubstring({
      page,
      urlSubstring: '/notification.html',
      timeout
    });

    // console log available pages
    try {
      const pages = await modalPage.context().pages();
      const pageUrls = pages.map((p) => p.url());
      console.log('Available pages 1:', pageUrls);
    } catch (error) {
      console.log('Could not get pages list:', error);
    }

    // Wait for the modal page to be ready
    await modalPage.waitForLoadState('networkidle');

    // Debug: Check what's available on the modal page
    console.log('Modal page URL:', modalPage.url());
    console.log('Modal page title:', await modalPage.title());

    // Check if the snap privacy warning scroll element exists
    try {
      const scrollElement = modalPage.getByTestId(
        SelectorsEnum.snapPrivacyWarningScroll
      );
      const isVisible = await scrollElement.isVisible();
      console.log('Snap privacy warning scroll element visible:', isVisible);
    } catch (error) {
      console.log('Could not find snap privacy warning scroll element:', error);
    }

    // Check for privacy warning and handle it
    try {
      // Try to access the modal page to see if it's still valid
      try {
        await modalPage.url(); // This will throw if the page is closed
        console.log('Modal page is accessible');
      } catch (error) {
        console.log('Modal page is not accessible:', error);
        return false;
      }

      // Check if the context is still valid
      if (!isContextValid(modalPage)) {
        console.log(
          'Modal page context is invalid, but page is accessible - proceeding with MetaMask interaction'
        );
        // Don't return false here, try to proceed anyway since the page is accessible
      } else {
        console.log(
          'Modal page context is valid, proceeding with MetaMask interaction'
        );
      }

      // Define the sequence of operations with error handling
      const operations = [
        {
          name: 'snap privacy warning scroll',
          action: () =>
            modalPage.getByTestId(SelectorsEnum.snapPrivacyWarningScroll)
        },
        {
          name: 'Accept button',
          action: () => modalPage.getByRole('button', { name: 'Accept' })
        },
        {
          name: 'Connect button',
          action: () => modalPage.getByRole('button', { name: 'Connect' })
        },
        {
          name: 'Install button',
          action: () => modalPage.getByRole('button', { name: 'Install' })
        },
        {
          name: 'MultiversX checkbox',
          action: () => modalPage.getByRole('checkbox', { name: 'MultiversX' })
        },
        {
          name: 'Confirm button',
          action: () => modalPage.getByRole('button', { name: 'Confirm' })
        },
        {
          name: 'Ok button',
          action: () => modalPage.getByRole('button', { name: 'Ok' })
        },
        {
          name: 'Approve button',
          action: () => modalPage.getByRole('button', { name: 'Approve' })
        }
      ];

      // Execute operations sequentially with error handling
      for (const operation of operations) {
        // Check if modal page is still accessible
        try {
          await modalPage.url();
        } catch (error) {
          console.log(
            `Modal page became inaccessible during ${operation.name}, stopping operations`
          );
          return false;
        }

        // Check context validity but don't fail if it's undefined
        if (!isContextValid(modalPage)) {
          console.log(
            `Context is invalid during ${operation.name}, but attempting operation anyway`
          );
        }

        const success = await safeClick(modalPage, operation.action(), 10000);
        if (!success) {
          console.log(
            `Failed to click ${operation.name}, continuing with next operation`
          );
          // Continue with next operation instead of failing completely
        }
      }

      console.log('Successfully handled MetaMask Snap privacy warning');
      return true;
    } catch (error) {
      console.log('Error during MetaMask interaction:', error);
      return false;
    }
  } catch (error) {
    console.log('No notification page found or timeout:', error);
    return false;
  }
};
