import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import { waitUntilStable } from './waitUntilStable';

const RETRY_DELAY_BASE = 1000;
const CLICK_TIMEOUT = 10000;
const SCREENSHOT_DIR = './__debug__';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ensureDebugDir = async () => {
  // create debug dir if missing (don't fail test if mkdir fails)
  try {
    // Using node APIs directly, but keep it quiet on errors
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');
    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    }
  } catch (e) {
    // ignore
  }
};

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
  console.log(
    `${debugTag}[attemptClickElement] page.isClosed():`,
    page.isClosed()
  );
  try {
    console.log(
      `${debugTag}[attemptClickElement] waiting for "${action.name}" to be visible`
    );
    await element.waitFor({ state: 'visible', timeout: CLICK_TIMEOUT });
    await element.click();
    console.log(`${debugTag}[attemptClickElement] Clicked "${action.name}"`);
  } catch (err: any) {
    console.log(
      `${debugTag}[attemptClickElement] Error clicking "${action.name}": ${
        err?.message || err
      }`
    );
    // Add screenshot for debugging (if page still open)
    try {
      await ensureDebugDir();
      if (!page.isClosed()) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await page.screenshot({
          path: `${SCREENSHOT_DIR}/click-fail-${action.name}-${timestamp}.png`,
          fullPage: true
        });
        console.log(
          `${debugTag}[attemptClickElement] Saved screenshot for "${action.name}"`
        );
      } else {
        console.log(
          `${debugTag}[attemptClickElement] page closed, no screenshot`
        );
      }
    } catch (ssErr) {
      console.warn(
        `${debugTag}[attemptClickElement] Screenshot failed: ${
          (ssErr as Error).message
        }`
      );
    }

    // Throw so outer logic retries / reacquires page
    throw err;
  }
};

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

  console.log('[Debugging][handleMetaMaskSnapApproval] START');
  console.log(
    '[Debugging][handleMetaMaskSnapApproval] initial notificationPage URL:',
    notificationPage.url()
  );
  console.log(
    '[Debugging][handleMetaMaskSnapApproval] isClosed:',
    notificationPage.isClosed()
  );

  // allow swapping out the page reference when it closes and a new one appears
  let pageRef: Page = notificationPage;
  let attempt = 0;
  // startIndex remembers which action to (re)start from after a page reload/reacquire
  let startIndex = 0;

  while (attempt <= maxRetries) {
    try {
      console.log(
        `[Debugging][handleMetaMaskSnapApproval] Attempt ${
          attempt + 1
        }/${maxRetries} - startIndex=${startIndex}`
      );

      // If the page is closed, try to reacquire it before waiting for stability
      if (pageRef.isClosed()) {
        console.log(
          '[Debugging][handleMetaMaskSnapApproval] pageRef was closed; attempting to reacquire from context pages'
        );
        const ctxPages = pageRef.context().pages();
        const newPage = ctxPages.find((p) =>
          p.url().includes('notification.html')
        );
        if (newPage) {
          pageRef = newPage;
          console.log(
            '[Debugging][handleMetaMaskSnapApproval] reacquired notification page via context.pages()'
          );
        } else {
          // wait briefly for a new page event in case MetaMask opens a fresh popup
          try {
            const candidate = await pageRef.context().waitForEvent('page', {
              timeout: 3000
            });
            if (candidate.url().includes('notification.html')) {
              pageRef = candidate;
              console.log(
                '[Debugging][handleMetaMaskSnapApproval] reacquired notification page via waitForEvent'
              );
            } else {
              // not the notification page; continue to next attempt
              console.log(
                '[Debugging][handleMetaMaskSnapApproval] newly opened page is not notification.html'
              );
            }
          } catch {
            console.log(
              '[Debugging][handleMetaMaskSnapApproval] no new page event within short timeout'
            );
          }
        }
      }

      // Wait for page to be stable (domcontent + network idle)
      try {
        await waitUntilStable(pageRef);
      } catch (e) {
        // If page closed while waiting, trigger a retry
        if (pageRef.isClosed())
          throw new Error(
            'notification page closed while waiting for stability'
          );
        throw e;
      }

      // Execute actions starting from startIndex
      for (let i = startIndex; i < actions.length; i++) {
        const action = actions[i];

        // Save index we're about to perform so we can resume here if it fails
        startIndex = i;

        // Debugging log: which action we're about to attempt
        console.log(
          `[Debugging][handleMetaMaskSnapApproval] Performing action [${i}] ${action.type}:${action.name}`
        );

        // If clicking "Ok" we expect the page might reload or transition — small stabilization wait after it
        await attemptClickElement(pageRef, action, '[Debugging] ');

        if (action.name === 'Ok') {
          // small pause + stability check because MetaMask often transitions after "Ok"
          console.log(
            '[Debugging][handleMetaMaskSnapApproval] waiting after "Ok" for possible internal navigation'
          );
          await sleep(400); // brief allow internal transitions
          try {
            await waitUntilStable(pageRef);
          } catch {
            // if page closed / reloads, the outer try/catch will catch and trigger reacquire
            if (pageRef.isClosed())
              throw new Error('notification page closed after "Ok" click');
          }
        }
      }

      // If we got here, all actions succeeded
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

      // Show open pages for context (helps in CI)
      try {
        const pages = pageRef.context().pages();
        console.log(
          `[Debugging][handleMetaMaskSnapApproval] Open pages count: ${pages.length}`
        );
        pages.forEach((p, idx) =>
          console.log(`   Page[${idx}] url=${p.url()} closed=${p.isClosed()}`)
        );
      } catch (e) {
        console.warn(
          '[Debugging][handleMetaMaskSnapApproval] Failed to list pages:',
          (e as Error).message
        );
      }

      // Try to save screenshot if possible
      try {
        await ensureDebugDir();
        if (!pageRef.isClosed()) {
          const ts = new Date().toISOString().replace(/[:.]/g, '-');
          await pageRef.screenshot({
            path: `${SCREENSHOT_DIR}/attempt-${attempt}-${ts}.png`,
            fullPage: true
          });
          console.log(
            '[Debugging][handleMetaMaskSnapApproval] screenshot saved for failed attempt'
          );
        }
      } catch (ssErr) {
        console.warn(
          '[Debugging][handleMetaMaskSnapApproval] screenshot failed:',
          (ssErr as Error).message
        );
      }

      if (attempt > maxRetries) break;

      // exponential backoff
      const delay = RETRY_DELAY_BASE * 2 ** (attempt - 1);
      console.log(
        `[Debugging][handleMetaMaskSnapApproval] Retrying in ${delay}ms (will resume at action index ${startIndex})...`
      );
      await sleep(delay);

      // If page closed try to reacquire one more time before next attempt
      if (pageRef.isClosed()) {
        console.log(
          '[Debugging][handleMetaMaskSnapApproval] pageRef closed — searching for a new notification page'
        );
        const ctxPages = pageRef.context().pages();
        const candidate = ctxPages.find((p) =>
          p.url().includes('notification.html')
        );
        if (candidate) {
          pageRef = candidate;
          console.log(
            '[Debugging][handleMetaMaskSnapApproval] reacquired notification page from context.pages()'
          );
        } else {
          // try waiting for a short-lived page event (MetaMask might open a new popup)
          try {
            const newPage = await pageRef
              .context()
              .waitForEvent('page', { timeout: 5000 });
            if (newPage.url().includes('notification.html')) {
              pageRef = newPage;
              console.log(
                '[Debugging][handleMetaMaskSnapApproval] reacquired notification page via waitForEvent'
              );
            } else {
              console.log(
                '[Debugging][handleMetaMaskSnapApproval] new page opened but not notification.html'
              );
            }
          } catch {
            console.log(
              '[Debugging][handleMetaMaskSnapApproval] no new notification page appeared in short timeout'
            );
          }
        }
      } else {
        // if page is still open, try reload to ensure DOM is in consistent state
        try {
          console.log(
            '[Debugging][handleMetaMaskSnapApproval] Reloading pageRef to recover state'
          );
          await pageRef.reload();
          await waitUntilStable(pageRef);
          console.log(
            '[Debugging][handleMetaMaskSnapApproval] reload completed'
          );
        } catch (reloadErr) {
          console.warn(
            '[Debugging][handleMetaMaskSnapApproval] reload failed:',
            (reloadErr as Error).message
          );
        }
      }

      // Important: do NOT reset startIndex — we intentionally resume from the failing index
      // unless you want to restart from the beginning; keeping resume behavior preserves work done.
      continue;
    }
  }

  // If we exit loop without returning, report failure
  console.error(
    '[handleMetaMaskSnapApproval] ❌ All retries exhausted — actions not completed'
  );
  throw new Error(
    'handleMetaMaskSnapApproval: Unable to complete snap approval after retries'
  );
};
