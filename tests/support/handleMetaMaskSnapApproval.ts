import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import { waitForMetaMaskLoad } from './waitForMetaMaskLoad';

const RETRY_DELAY_BASE = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const attemptClickElement = async (
  notificationPage: Page,
  action: { type: 'testId' | 'checkbox' | 'button'; name: string }
) => {
  const selectorMap = {
    testId: notificationPage.getByTestId(action.name),
    checkbox: notificationPage.getByRole('checkbox', { name: action.name }),
    button: notificationPage.getByRole('button', { name: action.name })
  };

  const element = selectorMap[action.type];
  if (!element) throw new Error(`Unknown element type: ${action.type}`);

  try {
    await element.waitFor({ state: 'visible', timeout: 10000 });
    await element.click();
  } catch (error) {
    if (notificationPage.isClosed()) {
      return;
    }

    throw new Error(
      `[attemptClickElement] Failed to click ${action.type}:${action.name} — ${error.message}`
    );
  }
};

// Handles the MetaMask Snap approval flow
export const handleMetaMaskSnapApproval = async (
  notificationPage: Page,
  maxRetries = 5
): Promise<void> => {
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

  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      for (const action of actions) {
        await attemptClickElement(notificationPage, action);
      }
    } catch (error) {
      attempt++;
      if (attempt <= maxRetries) {
        console.warn(
          `[handleMetaMaskSnapApproval] Attempt ${attempt}/${maxRetries} failed: ${error.message}`
        );

        // Exponential backoff delay
        const delay = RETRY_DELAY_BASE * 2 ** (attempt - 1);
        console.log(`[handleMetaMaskSnapApproval] Retrying in ${delay}ms...`);
        await sleep(delay);

        // Try to reload the page and wait for MetaMask UI to be ready before retrying
        if (!notificationPage.isClosed()) {
          try {
            await notificationPage.reload();
            await waitForMetaMaskLoad(notificationPage);
          } catch (reloadError) {
            console.warn(
              `[handleMetaMaskSnapApproval] Failed to reload page before retry: ${reloadError}`
            );
            // Continue with retry anyway
          }
        }
        continue;
      }
      console.error(
        `[handleMetaMaskSnapApproval] Failed after ${maxRetries} retries: ${error.message}`
      );
    }
  }
};
