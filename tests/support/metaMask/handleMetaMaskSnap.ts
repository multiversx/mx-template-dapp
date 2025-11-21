import { BrowserContext, Page } from '@playwright/test';
import { getPageAndWaitForLoad } from '../template/getPageAndWaitForLoad';
import { waitUntilStable } from '../template/waitUntilStable';

const RETRY_DELAY_BASE_MS = 500;
const CLICK_TIMEOUT_MS = 6000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const snapSelectors = {
  confirmationSubmitButton: '[data-testid="confirmation-submit-button"]',
  actions: [
    { type: 'testId', name: 'snap-privacy-warning-scroll' },
    { type: 'button', name: 'Accept' },
    { type: 'button', name: 'Connect' },
    { type: 'button', name: 'Confirm' },
    { type: 'checkbox', name: 'MultiversX' },
    { type: 'testId', name: 'snap-install-warning-modal-confirm' },
    { type: 'button', name: 'Ok' },
    { type: 'button', name: 'Approve' }
  ] as const
};

export async function handleMetaMaskSnap(
  context: BrowserContext,
  extensionId: string,
  initialPage: Page,
  maxRetries = 5
): Promise<void> {
  let page = initialPage;
  let attempt = 0;
  let currentActionIndex = 0;

  while (attempt <= maxRetries) {
    try {
      await waitUntilStable(page);

      if (await clickIfConfirmationVisible(page)) return;

      for (let i = currentActionIndex; i < snapSelectors.actions.length; i++) {
        const action = snapSelectors.actions[i];
        currentActionIndex = i;
        await attemptClick(page, action);
      }

      return; // All steps completed successfully
    } catch (error: any) {
      attempt++;

      console.warn(
        `[MetaMaskSnap] Attempt ${attempt}/${maxRetries} failed: ${
          error?.message || error
        }`
      );
      console.warn(
        '[MetaMaskSnap] Open pages at failure:',
        context.pages().map((p) => p.url())
      );

      if (attempt > maxRetries) {
        throw new Error('[MetaMaskSnap] Max retries reached.');
      }

      page = await reacquireNotificationPage(context, extensionId);
      await exponentialBackoff(attempt);
    }
  }

  throw new Error('[MetaMaskSnap] Unexpected end of flow.');
}

async function attemptClick(
  page: Page,
  action: { type: 'testId' | 'checkbox' | 'button'; name: string }
) {
  const element = getLocator(page, action);

  try {
    await element.waitFor({ state: 'visible', timeout: CLICK_TIMEOUT_MS });
    await element.click();
  } catch (error: any) {
    console.error(
      `[MetaMaskSnap] Failed to click "${action.name}": ${
        error?.message || error
      }`
    );
    console.error(
      `[MetaMaskSnap] Page state -> closed: ${page.isClosed()}, url: ${page.url()}`
    );
    throw error;
  }
}

function getLocator(
  page: Page,
  action: { type: 'testId' | 'checkbox' | 'button'; name: string }
) {
  switch (action.type) {
    case 'testId':
      return page.getByTestId(action.name);
    case 'checkbox':
      return page.getByRole('checkbox', { name: action.name });
    case 'button':
      return page.getByRole('button', { name: action.name });
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

async function clickIfConfirmationVisible(page: Page): Promise<boolean> {
  const confirmationButton = page.locator(
    snapSelectors.confirmationSubmitButton
  );
  const isVisible = await confirmationButton.isVisible().catch(() => false);

  if (isVisible) {
    await confirmationButton.click();
    return true;
  }

  return false;
}

async function reacquireNotificationPage(
  context: BrowserContext,
  extensionId: string
): Promise<Page> {
  try {
    const page = await getPageAndWaitForLoad(
      context,
      `chrome-extension://${extensionId}/notification.html`,
      { viewport: { width: 360, height: 592 } }
    );
    await waitUntilStable(page);
    console.warn('[MetaMaskSnap] Reacquired notification page.');
    return page;
  } catch (error) {
    throw new Error(
      `[MetaMaskSnap] Failed to reacquire notification page: ${
        (error as Error).message
      }`
    );
  }
}

async function exponentialBackoff(attempt: number) {
  const delay = RETRY_DELAY_BASE_MS * 2 ** (attempt - 1);
  console.warn(`[MetaMaskSnap] Retrying in ${delay}ms...`);
  await sleep(delay);
}
