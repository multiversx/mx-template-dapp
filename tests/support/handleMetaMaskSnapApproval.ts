import { BrowserContext, Page } from '@playwright/test';
import { getNotificationPageAndWaitForLoad } from './getNotificationPageAndWaitForLoad';
import { SelectorsEnum } from './testdata';
import { waitUntilStable } from './waitUntilStable';

const RETRY_DELAY_BASE = 500;
const CLICK_TIMEOUT = 2500;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function attemptClickElement(
  page: Page,
  action: { type: 'testId' | 'checkbox' | 'button'; name: string }
) {
  const selectorMap = {
    testId: page.getByTestId(action.name),
    checkbox: page.getByRole('checkbox', { name: action.name }),
    button: page.getByRole('button', { name: action.name })
  } as const;

  const element = selectorMap[action.type];
  if (!element) throw new Error(`Unknown element type: ${action.type}`);

  try {
    await element.waitFor({ state: 'visible', timeout: CLICK_TIMEOUT });
    await element.click();
  } catch (err: any) {
    const msg = err?.message || String(err);
    console.error(
      `[attemptClickElement] Failed to click "${action.name}": ${msg}`
    );
    console.error(
      `[attemptClickElement] Page state: closed=${page.isClosed()} url=${page.url()}`
    );
    throw err;
  }
}

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

  let pageRef: Page = initialPage;
  let attempt = 0;
  let startIndex = 0;

  while (attempt <= maxRetries) {
    try {
      await waitUntilStable(pageRef);

      for (let i = startIndex; i < actions.length; i++) {
        const action = actions[i];
        startIndex = i;
        await attemptClickElement(pageRef, action);
      }

      return; // Successfully completed all actions
    } catch (err: any) {
      attempt++;
      const msg = err?.message || String(err);
      console.warn(
        `[MetaMaskSnapApproval] Attempt ${attempt}/${maxRetries} failed: ${msg}`
      );

      // Dump open pages to help debugging
      const openPages = context.pages().map((p) => p.url());
      console.warn('[MetaMaskSnapApproval] Open pages at failure:', openPages);

      if (attempt > maxRetries) {
        console.error('[MetaMaskSnapApproval] Max retries reached.');
        throw err;
      }

      // Try to reacquire a new popup
      try {
        pageRef = await getNotificationPageAndWaitForLoad(context, extensionId);
        await waitUntilStable(pageRef);
        console.warn('[MetaMaskSnapApproval] Reacquired notification page.');
      } catch (reaqErr) {
        console.error(
          `[MetaMaskSnapApproval] Failed to reacquire notification page: ${
            (reaqErr as Error).message
          }`
        );
        throw reaqErr;
      }

      // exponential backoff
      const delay = RETRY_DELAY_BASE * 2 ** (attempt - 1);
      console.warn(`[MetaMaskSnapApproval] Retrying in ${delay}ms...`);
      await sleep(delay);
    }
  }

  throw new Error('[MetaMaskSnapApproval] Unexpected end of flow.');
};
