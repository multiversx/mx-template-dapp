import { BrowserContext, Page } from '@playwright/test';
import { getNotificationPageAndWaitForLoad } from './getNotificationPageAndWaitForLoad';
import { SelectorsEnum } from './testdata';
import { waitUntilStable } from './waitUntilStable';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const RETRY_BASE_DELAY = 500; // ms
const DEFAULT_ACTION_TIMEOUT = 2500; // ms
const LONG_ACTION_TIMEOUT = 5000; // ms

async function attemptClickElement(
  page: Page,
  action: { type: 'testId' | 'checkbox' | 'button'; name: string }
) {
  const selectorMap = {
    testId: page.getByTestId(action.name),
    checkbox: page.getByRole('checkbox', { name: action.name }),
    button: page.getByRole('button', { name: action.name })
  };
  const element = selectorMap[action.type];
  if (!element) throw new Error(`Unknown element type: ${action.type}`);

  // smarter timeout based on step
  const timeout =
    action.name === 'Install' || action.name === 'Approve'
      ? LONG_ACTION_TIMEOUT
      : DEFAULT_ACTION_TIMEOUT;

  // anticipatory wait for MetaMask route transitions
  if (action.name === 'Install') {
    await page.waitForURL(/snap-install/, { timeout: 7000 }).catch(() => {});
  } else if (action.name === 'Approve') {
    await page
      .waitForURL(/confirmation|snap-install-result/, {
        timeout: 7000
      })
      .catch(() => {});
  }

  console.log(
    `[Debugging] [attemptClickElement] Attempting ${action.type}:${action.name}`
  );
  console.log(
    `[Debugging] ${action.name} Is page still open?`,
    !page.isClosed(),
    page.url()
  );

  try {
    await element.waitFor({ state: 'visible', timeout });
    await element.click();
    console.log(`[Debugging] [attemptClickElement] Clicked "${action.name}"`);
  } catch (error: any) {
    console.log(
      `[Debugging] [attemptClickElement] Error clicking "${action.name}": ${error.message}`
    );
    if (page.isClosed())
      console.log(
        `[Debugging] [attemptClickElement] Page closed mid-click for "${action.name}"`
      );
    throw error;
  }
}

export const handleMetaMaskSnapApproval = async (
  context: BrowserContext,
  notificationPage: Page,
  extensionId: string,
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
    `[Debugging][handleMetaMaskSnapApproval] initial URL: ${notificationPage.url()}`
  );

  let attempt = 0;
  let startIndex = 0;

  while (attempt < maxRetries) {
    try {
      console.log(
        `[Debugging][handleMetaMaskSnapApproval] Attempt ${
          attempt + 1
        }/${maxRetries} (startIndex=${startIndex})`
      );
      await waitUntilStable(notificationPage);

      for (let i = startIndex; i < actions.length; i++) {
        const action = actions[i];
        console.log(
          `[Debugging][handleMetaMaskSnapApproval] Performing ${action.type}:${action.name}`
        );

        console.log(
          '[Debugging][handleMetaMaskSnapApproval] All open pages before action:',
          context.pages().map((p) => p.url())
        );

        await attemptClickElement(notificationPage, action);

        console.log(
          '[Debugging][handleMetaMaskSnapApproval] All open pages after action:',
          context.pages().map((p) => p.url())
        );
      }

      console.log(
        '[Debugging][handleMetaMaskSnapApproval] ✅ All actions succeeded'
      );
      return;
    } catch (error: any) {
      attempt++;
      console.warn(
        `[handleMetaMaskSnapApproval] Attempt ${attempt}/${maxRetries} failed: ${error.message}`
      );

      // reacquire notification page if closed or stale
      console.log(
        '[Debugging][handleMetaMaskSnapApproval] Trying to reacquire notification page...'
      );
      notificationPage = await getNotificationPageAndWaitForLoad(
        context,
        extensionId
      ).catch(() => notificationPage);
      console.log(
        '[Debugging][handleMetaMaskSnapApproval] Successfully reacquired notification page.'
      );

      const delay = RETRY_BASE_DELAY * 2 ** (attempt - 1);
      console.log(
        `[Debugging][handleMetaMaskSnapApproval] Retrying in ${delay}ms...`
      );
      await sleep(delay);

      // resume from last unfinished action
      if (error.message?.includes('clicking')) {
        const match = actions.findIndex((a) => error.message.includes(a.name));
        if (match !== -1) startIndex = match;
      }
    }
  }

  throw new Error(
    `[handleMetaMaskSnapApproval] ❌ Failed after ${maxRetries} retries`
  );
};
