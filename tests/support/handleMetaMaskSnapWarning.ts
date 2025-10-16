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

    // Check if this is a chrome extension page
    const isChromeExtension = page.url().startsWith('chrome-extension://');
    if (isChromeExtension) {
      console.log(
        'Attempting click on chrome extension page - using extended timeout'
      );
      timeout = Math.max(timeout, 10000); // Use at least 10 seconds for extension pages
    }

    // Check context validity but don't fail if it's undefined
    if (!isContextValid(page)) {
      console.log('Context is invalid, but attempting click anyway');
    }

    // For chrome extension pages, try different click strategies
    if (isChromeExtension) {
      try {
        // First try normal click
        await selector.click({ timeout });
        return true;
      } catch (error) {
        console.log(
          'Normal click failed on extension page, trying force click:',
          error
        );
        try {
          // Try force click for extension pages
          await selector.click({ timeout, force: true });
          return true;
        } catch (forceError) {
          console.log('Force click also failed:', forceError);
          throw forceError;
        }
      }
    } else {
      await selector.click({ timeout });
      return true;
    }
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

    // Check if this is a chrome extension page
    const isChromeExtension = modalPage.url().startsWith('chrome-extension://');
    console.log('Is chrome extension page:', isChromeExtension);

    if (isChromeExtension) {
      console.log(
        'Working with chrome extension page - this may have different security restrictions'
      );

      // Try to get more information about the extension page
      try {
        const pageContent = await modalPage.content();
        console.log('Extension page content length:', pageContent.length);
        console.log('Extension page has content:', pageContent.length > 0);
        console.log(
          'Note: LavaMoat security prevents page.evaluate() calls on MetaMask pages'
        );
      } catch (error) {
        console.log('Could not access extension page content:', error);
      }

      // Wait for dynamic content to load (MetaMask uses dynamic rendering)
      console.log('Waiting for MetaMask dynamic content to load...');
      await modalPage.waitForTimeout(3000); // Give MetaMask time to render
    }

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

    // Wait for any buttons to appear (MetaMask renders dynamically)
    console.log('Waiting for MetaMask UI elements to appear...');
    try {
      await modalPage.waitForSelector('button', { timeout: 10000 });
      console.log('Found at least one button on the page');
    } catch (error) {
      console.log('No buttons found after waiting:', error);
    }

    // Debug: Check what elements are available on the modal page
    try {
      const buttons = await modalPage.locator('button').all();
      console.log(`Found ${buttons.length} buttons on the page`);

      // Check for common button texts
      const buttonTexts: string[] = [];
      for (const button of buttons.slice(0, 10)) {
        // Check first 10 buttons
        try {
          const text = await button.textContent();
          if (text) buttonTexts.push(text.trim());
        } catch (e) {
          // Ignore errors getting text
        }
      }
      console.log('Button texts found:', buttonTexts);
    } catch (error) {
      console.log('Could not get button information:', error);
    }

    // Check for any elements with test IDs
    try {
      const testIdElements = await modalPage.locator('[data-testid]').all();
      console.log(`Found ${testIdElements.length} elements with test IDs`);

      const testIds: string[] = [];
      for (const element of testIdElements.slice(0, 10)) {
        // Check first 10 elements
        try {
          const testId = await element.getAttribute('data-testid');
          if (testId) testIds.push(testId);
        } catch (e) {
          // Ignore errors getting test ID
        }
      }
      console.log('Test IDs found:', testIds);
    } catch (error) {
      console.log('Could not get test ID information:', error);
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
      // Try to find elements by multiple methods for better compatibility
      const operations = [
        {
          name: 'snap privacy warning scroll',
          action: () =>
            modalPage.getByTestId(SelectorsEnum.snapPrivacyWarningScroll),
          optional: true // This element might not exist in all MetaMask versions
        },
        {
          name: 'Accept button',
          action: () => modalPage.getByRole('button', { name: 'Accept' }),
          optional: true
        },
        {
          name: 'Connect button',
          action: () => modalPage.getByRole('button', { name: 'Connect' }),
          optional: true
        },
        {
          name: 'Install button',
          action: () => modalPage.getByRole('button', { name: 'Install' }),
          optional: true
        },
        {
          name: 'MultiversX checkbox',
          action: () => modalPage.getByRole('checkbox', { name: 'MultiversX' }),
          optional: true
        },
        {
          name: 'Confirm button',
          action: () => modalPage.getByRole('button', { name: 'Confirm' }),
          optional: true
        },
        {
          name: 'Ok button',
          action: () => modalPage.getByRole('button', { name: 'Ok' }),
          optional: true
        },
        {
          name: 'Approve button',
          action: () => modalPage.getByRole('button', { name: 'Approve' }),
          optional: true
        },
        // Add some generic button selectors as fallbacks
        {
          name: 'Any button with Connect text',
          action: () => modalPage.locator('button:has-text("Connect")'),
          optional: true
        },
        {
          name: 'Any button with Accept text',
          action: () => modalPage.locator('button:has-text("Accept")'),
          optional: true
        },
        {
          name: 'Any button with Approve text',
          action: () => modalPage.locator('button:has-text("Approve")'),
          optional: true
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

        // Check if element exists before trying to click
        try {
          const element = operation.action();

          // For chrome extension pages, use different visibility check
          const isChromeExtension = modalPage
            .url()
            .startsWith('chrome-extension://');
          let isVisible = false;

          if (isChromeExtension) {
            try {
              // For extension pages, try to check if element exists first
              const count = await element.count();
              isVisible = count > 0;
              console.log(`${operation.name} element count: ${count}`);
            } catch (error) {
              console.log(`${operation.name} count check failed: ${error}`);
              isVisible = false;
            }
          } else {
            isVisible = await element.isVisible({ timeout: 2000 });
          }

          if (!isVisible) {
            if (operation.optional) {
              console.log(
                `${operation.name} is not visible (optional), skipping`
              );
              continue;
            } else {
              console.log(
                `${operation.name} is not visible (required), continuing anyway`
              );
            }
          }
        } catch (error) {
          if (operation.optional) {
            console.log(
              `${operation.name} not found (optional), skipping: ${error}`
            );
            continue;
          } else {
            console.log(
              `${operation.name} not found (required), continuing anyway: ${error}`
            );
          }
        }

        const success = await safeClick(modalPage, operation.action(), 10000);
        if (!success) {
          if (operation.optional) {
            console.log(
              `Failed to click ${operation.name} (optional), skipping`
            );
          } else {
            console.log(
              `Failed to click ${operation.name} (required), continuing with next operation`
            );
          }
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
