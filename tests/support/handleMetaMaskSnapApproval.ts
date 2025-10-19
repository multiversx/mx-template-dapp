import { BrowserContext, Page } from '@playwright/test';
import { getNotificationPageAndWaitForLoad } from './getNotificationPageAndWaitForLoad';
import { SelectorsEnum } from './testdata';
import { waitUntilStable } from './waitUntilStable';

const RETRY_DELAY_BASE = 1000;
const CLICK_TIMEOUT = 5000;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const attemptClickElement = async (
  page: Page,
  action: { type: 'testId' | 'checkbox' | 'button'; name: string },
  debugTag = ''
) => {
  const selectorMap = {
    testId: page.getByTestId(action.name),
    checkbox: page.getByRole('checkbox', { name: action.name }),
    button: page.getByRole('button', { name: action.name })
  } as const;

  const element = selectorMap[action.type];
  if (!element) throw new Error(`Unknown element type: ${action.type}`);

  console.log(
    `${debugTag}[attemptClickElement] Attempting ${action.type}:${action.name}`
  );

  if (action.name === 'Approve' || action.name === 'MultiversX') {
    await page.waitForTimeout(2000);
    console.log('[Debugging] Still open?', !page.isClosed(), page.url());
  }

  try {
    await element.waitFor({ state: 'visible', timeout: CLICK_TIMEOUT });
    await element.click();
    console.log(`${debugTag}[attemptClickElement] Clicked "${action.name}"`);
  } catch (err: any) {
    console.log(
      `${debugTag}[attemptClickElement] Error clicking "${action.name}": ${
        err?.message || err
      }`
    );
    throw err;
  }
};

export const handleMetaMaskSnapApproval = async (
  context: BrowserContext,
  extensionId: string,
  initialPage: Page,
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

  console.log('[Debugging][handleMetaMaskSnapApproval] START');
  console.log(
    '[Debugging][handleMetaMaskSnapApproval] initial URL:',
    initialPage.url()
  );

  let pageRef: Page = initialPage;
  let attempt = 0;
  let startIndex = 0;

  while (attempt <= maxRetries) {
    try {
      console.log(
        `[Debugging][handleMetaMaskSnapApproval] Attempt ${
          attempt + 1
        }/${maxRetries} (startIndex=${startIndex})`
      );

      await waitUntilStable(pageRef);
      console.log(
        '[Debugging][handleMetaMaskSnapApproval] Page stable, executing actions...'
      );

      for (let i = startIndex; i < actions.length; i++) {
        const action = actions[i];
        startIndex = i; // remember which step we’re at

        console.log(
          `[Debugging][handleMetaMaskSnapApproval] Performing ${action.type}:${action.name}`
        );

        await attemptClickElement(pageRef, action, '[Debugging] ');
      }

      console.log(
        '[Debugging][handleMetaMaskSnapApproval] ✅ All actions succeeded'
      );
      return;
    } catch (err: any) {
      attempt++;
      console.warn(
        `[handleMetaMaskSnapApproval] Attempt ${attempt}/${maxRetries} failed: ${
          err?.message || err
        }`
      );

      // If we hit retry limit, throw
      if (attempt > maxRetries) {
        console.error('[handleMetaMaskSnapApproval] ❌ All retries exhausted');
        throw err;
      }

      // Try reacquiring a fresh notification page
      console.log(
        '[Debugging][handleMetaMaskSnapApproval] Trying to reacquire notification page...'
      );
      try {
        pageRef = await getNotificationPageAndWaitForLoad(context, extensionId);
        console.log(
          '[Debugging][handleMetaMaskSnapApproval] Successfully reacquired notification page.'
        );
        await waitUntilStable(pageRef);
      } catch (reaqErr) {
        console.error(
          `[handleMetaMaskSnapApproval] Failed to reacquire notification page: ${
            (reaqErr as Error).message
          }`
        );
        throw reaqErr;
      }

      // Wait before retrying same action
      const delay = RETRY_DELAY_BASE * 2 ** (attempt - 1);
      console.log(
        `[Debugging][handleMetaMaskSnapApproval] Retrying in ${delay}ms...`
      );
      await sleep(delay);
    }
  }

  console.error('[handleMetaMaskSnapApproval] ❌ Unexpected end of function');
  throw new Error('handleMetaMaskSnapApproval failed unexpectedly');
};
