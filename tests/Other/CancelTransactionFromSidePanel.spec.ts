import { test } from '@playwright/test';
import * as TestActions from '../support';
import { readValueFromFile } from '../support';
import { SelectorsEnum, TestDataEnums } from '../support/testdata';

const privateKeyConfig = {
  address: TestDataEnums.keystoreWalletAddress6,
  privateKey: readValueFromFile(TestDataEnums.keystoreFilePath6, 'utf8').trim()
};

test.describe('cancel transaction from side panel', () => {
  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectInMemoryProvider({
      page,
      loginMethod: privateKeyConfig
    });
    await TestActions.checkConnectionToWallet(page, privateKeyConfig.address);
  });

  test('should cancel transaction via cancel button', async ({ page }) => {
    // Open Batch Transactions and initiate signing
    await page.getByText('Batch Transactions').first().click();
    await page
      .locator(SelectorsEnum.batchTransactionsContainer)
      .waitFor({ state: 'visible' });
    await page.getByTestId(SelectorsEnum.signAndBatchButton).click();

    // Wait for side panel to be visible
    await page.locator(SelectorsEnum.sidePanel).waitFor({ state: 'visible' });

    // Cancel the transaction from the side panel
    await page.getByTestId(SelectorsEnum.signCancelButton).click();

    // Wait for toast to be displayed
    await TestActions.waitForToastToBeDisplayed(page);

    // Check that the transaction toast shows that the transaction was cancelled
    await TestActions.waitForTransactionToastToContain({
      page: page,
      toastTitle: 'Signing canceled'
    });
  });

  test('should cancel transaction via modal close button', async ({ page }) => {
    // Open Batch Transactions and initiate signing
    await page.getByText('Batch Transactions').first().click();
    await page
      .locator(SelectorsEnum.batchTransactionsContainer)
      .waitFor({ state: 'visible' });
    await page.getByTestId(SelectorsEnum.signAndBatchButton).click();

    // Wait for side panel to be visible and fully loaded
    await page.locator(SelectorsEnum.sidePanel).waitFor({ state: 'visible' });

    // Wait a bit more for any dynamic content to load
    await page.waitForTimeout(1000);

    // Debug: Check what elements are actually present
    console.log(
      'Side panel visible:',
      await page.locator(SelectorsEnum.sidePanel).isVisible()
    );

    // Get the side panel element and inspect its content
    const sidePanel = page.locator(SelectorsEnum.sidePanel);
    const sidePanelHTML = await sidePanel.innerHTML();
    console.log('Side panel HTML content:', sidePanelHTML);

    // Check for any buttons or clickable elements in the side panel
    const allButtons = await sidePanel.locator('button').count();
    const allClickable = await sidePanel
      .locator('button, a, [role="button"], [onclick]')
      .count();
    console.log(
      `Found ${allButtons} buttons and ${allClickable} clickable elements in side panel`
    );

    // List all elements with their attributes
    const allElements = await sidePanel.locator('*').all();
    console.log('All elements in side panel:');
    for (let i = 0; i < Math.min(allElements.length, 20); i++) {
      const element = allElements[i];
      const tagName = await element.evaluate((el) => el.tagName);
      const className = await element.evaluate((el) => el.className);
      const id = await element.evaluate((el) => el.id);
      const dataTestId = await element.evaluate((el) =>
        el.getAttribute('data-testid')
      );
      console.log(
        `  ${i}: ${tagName} class="${className}" id="${id}" data-testid="${dataTestId}"`
      );
    }

    // Try to find any element that might be a close button
    const possibleCloseElements = [
      'button',
      'a',
      '[role="button"]',
      'svg',
      'i',
      '[class*="close"]',
      '[class*="Close"]',
      '[class*="CLOSE"]',
      '[aria-label*="close"]',
      '[aria-label*="Close"]',
      '[title*="close"]',
      '[title*="Close"]',
      '[alt*="close"]',
      '[alt*="Close"]'
    ];

    let closeIconFound = false;
    for (const selector of possibleCloseElements) {
      const element = sidePanel.locator(selector);
      const count = await element.count();
      console.log(`Side panel selector "${selector}": found ${count} elements`);

      if (count > 0) {
        // Check if any of these elements are visible and clickable
        for (let i = 0; i < count; i++) {
          const el = element.nth(i);
          const isVisible = await el.isVisible();
          const isEnabled = await el.isEnabled();
          console.log(
            `  Element ${i}: visible=${isVisible}, enabled=${isEnabled}`
          );

          if (isVisible && isEnabled) {
            console.log(
              `Trying to click element ${i} with selector: ${selector}`
            );
            try {
              await el.click();
              closeIconFound = true;
              break;
            } catch (error) {
              console.log(`Failed to click element ${i}: ${error.message}`);
            }
          }
        }
        if (closeIconFound) break;
      }
    }

    if (!closeIconFound) {
      // Take a screenshot for debugging
      await page.screenshot({ path: 'debug-side-panel.png' });
      console.log('Screenshot saved as debug-side-panel.png');
      throw new Error('Close icon not found with any selector');
    }

    // Wait for toast to be displayed
    await TestActions.waitForToastToBeDisplayed(page);

    // Check that the transaction toast shows that the transaction was cancelled
    await TestActions.waitForTransactionToastToContain({
      page: page,
      toastTitle: 'Signing canceled'
    });
  });
});
