import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import * as TestActions from './index';

const isContextValid = (page: Page): boolean => {
  try {
    return page.context().browser()?.isConnected() === true;
  } catch {
    return false;
  }
};

const safeClick = async (
  page: Page,
  selector: any,
  timeout: number = 5000
): Promise<boolean> => {
  try {
    if (!isContextValid(page)) {
      console.log('Context is invalid, skipping click operation');
      return false;
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

    // Check if the original page context is still valid
    if (!isContextValid(page)) {
      console.log(
        'Original page context is invalid, skipping MetaMask warning handling'
      );
      console.log(
        'Context browser connected:',
        page.context().browser()?.isConnected()
      );
      return false;
    }

    console.log('Context is valid, proceeding with warning handling');

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

    // Check for privacy warning and handle it
    try {
      // Check if the context is still valid
      if (!isContextValid(modalPage)) {
        console.log(
          'Modal page context is invalid, skipping MetaMask interaction'
        );
        return false;
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
        if (!isContextValid(modalPage)) {
          console.log(
            `Context became invalid during ${operation.name}, stopping operations`
          );
          return false;
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
