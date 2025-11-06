import { BrowserContext, Page } from '@playwright/test';
import { getPageAndWaitForLoad } from '../template/getPageAndWaitForLoad';
import { waitUntilStable } from '../template/waitUntilStable';

const RETRY_DELAY_BASE_MS = 500;
const CLICK_TIMEOUT_MS = 2500;

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

  attachDebugListeners(page, '[MetaMaskSnap][initial]');
  await logPageDebugInfo(
    page,
    '[MetaMaskSnap][start] Initial notification page'
  );

  while (attempt <= maxRetries) {
    try {
      await waitUntilStable(page);
      await logPageDebugInfo(
        page,
        `[MetaMaskSnap][attempt ${attempt}] after stability wait`
      );

      if (await clickIfConfirmationVisible(page)) return;

      for (let i = currentActionIndex; i < snapSelectors.actions.length; i++) {
        const action = snapSelectors.actions[i];
        currentActionIndex = i;
        await attemptClick(page, action);
        console.log(`[MetaMaskSnap] Clicked "${action.name}" successfully.`);
        await logShortUiSnapshot(
          page,
          `[MetaMaskSnap] Post-click UI snapshot for "${action.name}"`
        );
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
      attachDebugListeners(
        page,
        `[MetaMaskSnap][reacquire attempt ${attempt}]`
      );
      await logPageDebugInfo(
        page,
        `[MetaMaskSnap][reacquire attempt ${attempt}] Reacquired notification page`
      );
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
    const count = await element.count().catch(() => 0);
    const isVisibleBefore = await element.isVisible().catch(() => false);
    console.log(
      `[MetaMaskSnap] Waiting for "${action.name}" (type=${action.type}) -> count=${count}, visibleBefore=${isVisibleBefore}`
    );
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
    await logShortUiSnapshot(
      page,
      `[MetaMaskSnap] UI around failed click "${action.name}"`
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
    console.log('[MetaMaskSnap] Confirmation submit button visible, clicking.');
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
    await logPageDebugInfo(page, '[MetaMaskSnap] After reacquire + stability');
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

function attachDebugListeners(page: Page, label: string) {
  const prefix = (type: string) => `${label}${type}`;
  const consoleListener = (msg: any) =>
    console.log(`${prefix('[console]')} ${msg.type()}: ${msg.text()}`);
  const pageErrorListener = (err: any) =>
    console.warn(`${prefix('[pageerror]')} ${err?.message || err}`);
  const requestFailedListener = (req: any) =>
    console.warn(
      `${prefix('[requestfailed]')} ${req.url()} -> ${req.failure()?.errorText}`
    );

  // Avoid adding duplicates by clearing previous listeners if any (best effort)
  page.removeAllListeners('console');
  page.removeAllListeners('pageerror');
  page.removeAllListeners('requestfailed');

  page.on('console', consoleListener);
  page.on('pageerror', pageErrorListener);
  page.on('requestfailed', requestFailedListener);
}

async function logPageDebugInfo(page: Page, label: string) {
  try {
    const info = await page.evaluate(() => {
      const readyState = document.readyState;
      const title = document.title;
      const buttons = Array.from(document.querySelectorAll('button'))
        .map((b) => (b as HTMLElement).innerText?.trim())
        .filter(Boolean)
        .slice(0, 20);
      const testIds = Array.from(document.querySelectorAll('[data-testid]'))
        .map((el) => (el as HTMLElement).getAttribute('data-testid'))
        .slice(0, 20);
      const overlays = Array.from(
        document.querySelectorAll(
          '.loading, .spinner, .loading-overlay, .mm-button-base__icon-loading'
        )
      ).length;
      return { readyState, title, buttons, testIds, overlays };
    });
    const frames = page
      .frames()
      .map((f) => ({ url: f.url().slice(0, 200), name: f.name() }));
    console.log(
      `${label}: url=${page.url()} closed=${page.isClosed()} info=${JSON.stringify(
        info
      )} frames=${JSON.stringify(frames)}`
    );
  } catch (e: any) {
    console.warn(`${label}: failed to log debug info -> ${e?.message || e}`);
  }
}

async function logShortUiSnapshot(page: Page, label: string) {
  try {
    const visibleButtons = await page
      .locator('button:visible')
      .allInnerTexts()
      .catch(() => [] as string[]);
    const visibleTestIds = await page
      .locator('[data-testid]:visible')
      .elementHandles()
      .then(async (els) =>
        Promise.all(
          els.slice(0, 30).map((el) => el.getAttribute('data-testid'))
        )
      )
      .catch(() => [] as (string | null)[]);
    console.log(
      `${label}: buttons=${JSON.stringify(
        visibleButtons.slice(0, 20)
      )} testIds=${JSON.stringify(visibleTestIds.slice(0, 20))}`
    );
  } catch (e: any) {
    console.warn(`${label}: failed to snapshot UI -> ${e?.message || e}`);
  }
}
