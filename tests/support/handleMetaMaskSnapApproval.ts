import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import { waitUntilStable } from './waitUntilStable';

const CLICK_ACTION_TIMEOUT = 10000;
const CLICK_DELAY = 300;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Clicks an element based on type (testId, checkbox, button)
const clickElement = async (
  notificationPage: Page,
  type: string,
  name: string,
  timeout: number
): Promise<void> => {
  const selectorMap = {
    testId: notificationPage.getByTestId(name),
    checkbox: notificationPage.getByRole('checkbox', { name }),
    button: notificationPage.getByRole('button', { name })
  };

  const element = selectorMap[type];
  if (!element) throw new Error(`Unknown element type: ${type}`);

  // Try to click the element
  try {
    await element.waitFor({ state: 'visible', timeout });
    await element.click();
    await sleep(CLICK_DELAY);
  } catch (err) {
    throw new Error(
      `[clickElement] Failed to click ${type}:${name} — ${err.message}`
    );
  }
};

// Handles the MetaMask Snap approval flow
export const handleMetaMaskSnapApproval = async (
  notificationPage: Page
): Promise<boolean> => {
  const actions = [
    { type: 'testId', name: SelectorsEnum.snapPrivacyWarningScroll },
    { type: 'button', name: 'Accept' },
    { type: 'button', name: 'Connect' },
    { type: 'button', name: 'Install' },
    { type: 'checkbox', name: 'MultiversX' },
    { type: 'button', name: 'Confirm' },
    { type: 'button', name: 'Ok' },
    { type: 'button', name: 'Approve' }
  ] as const;

  try {
    for (const { type, name } of actions) {
      // Ensure the notification page is fully loaded before clicking any elements
      await waitUntilStable(notificationPage);

      // Click the element based on type (testId, checkbox, button)
      await clickElement(notificationPage, type, name, CLICK_ACTION_TIMEOUT);
    }
    return true;
  } catch (error) {
    console.error(`[handleMetaMaskSnapApproval] Failed: ${error.message}`);
    return false;
  }
};
