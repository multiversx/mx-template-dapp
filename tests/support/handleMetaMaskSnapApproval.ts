import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import { waitUntilStable } from './waitUntilStable';

const CLICK_ACTION_TIMEOUT = 5000;
const CLICK_DELAY = 300;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Clicks an element based on type (testId, checkbox, button)
const clickElement = async (
  page: Page,
  type: string,
  name: string,
  timeout: number
): Promise<void> => {
  const selectorMap = {
    testId: page.getByTestId(name),
    checkbox: page.getByRole('checkbox', { name }),
    button: page.getByRole('button', { name })
  };

  const element = selectorMap[type];
  if (!element) throw new Error(`Unknown element type: ${type}`);

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
    await waitUntilStable(notificationPage);

    for (const { type, name } of actions) {
      await clickElement(notificationPage, type, name, CLICK_ACTION_TIMEOUT);
    }
    return true;
  } catch (error) {
    console.error(`[handleMetaMaskSnapApproval] Failed: ${error.message}`);
    return false;
  }
};
