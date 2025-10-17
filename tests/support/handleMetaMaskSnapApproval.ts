import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import { waitUntilStable } from './waitUntilStable';

const SNAP_APPROVAL_MAX_RETRIES = 3;
const CLICK_ACTION_TIMEOUT = 5000;
const CLICK_DELAY = 300;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//Catch transient "detached element" / "page closed" issues
const isTransientError = (error: any) =>
  error.message?.includes('Target page, context or browser has been closed') ||
  error.message?.includes('detached') ||
  error.message?.includes('Timeout');

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
  notificationPage: Page,
  maxRetries = SNAP_APPROVAL_MAX_RETRIES
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

  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      await waitUntilStable(notificationPage);

      for (const { type, name } of actions) {
        await clickElement(notificationPage, type, name, CLICK_ACTION_TIMEOUT);
      }

      console.log('All actions completed successfully.');
      return true;
    } catch (error) {
      const lastAttempt = attempt === maxRetries + 1;
      const message = `Failed (attempt ${attempt}/${maxRetries})`;

      if (lastAttempt || !isTransientError(error)) {
        console.error(`${message} - giving up. Reason:`, error.message);
        return false;
      }

      console.warn(`${message} - retrying...`);
      await sleep(2000 * attempt);
    }
  }

  return false;
};
