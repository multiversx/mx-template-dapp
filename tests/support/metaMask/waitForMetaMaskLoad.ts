import { errors, Page } from '@playwright/test';
import { waitUntilStable } from '../template/waitUntilStable';

const DEFAULT_TIMEOUT = 10_000;
const DEFAULT_POST_DELAY_MS = 300;

// Core loading indicators commonly found in MetaMask screens
const BASE_LOADING_SELECTORS: readonly string[] = [
  '.loading-logo',
  '.loading-spinner',
  '.loading-overlay',
  '.loading-overlay__spinner',
  '.loading-span',
  '.loading-indicator',
  '#loading__logo',
  '#loading__spinner',
  '.mm-button-base__icon-loading',
  '.loading-swaps-quotes',
  '.loading-heartbeat',
  '.spinner'
];

type WaitForMetaMaskLoadOptions = {
  // Per-selector timeout while waiting to become hidden (defaults to 10s).
  selectorTimeoutMs?: number;
  // Additional page selectors that should also be hidden before continuing.
  extraLoadingSelectors?: string[];
  // Milliseconds to sleep after the page looks ready (defaults to 300ms).
  postDelayMs?: number;
  // Skip the initial stable wait if you’ve already done it.
  skipInitialStabilityWait?: boolean;
};

// Waits for MetaMask UI to become usable:
// 1) (optionally) waits for DOM/network to settle
// 2) waits for known loading indicators to disappear (best-effort)
// 3) small post-delay to avoid flakiness on slow CI
export async function waitForMetaMaskLoad(
  page: Page,
  options: WaitForMetaMaskLoadOptions = {}
): Promise<Page> {
  const {
    selectorTimeoutMs = DEFAULT_TIMEOUT,
    extraLoadingSelectors = [],
    postDelayMs = DEFAULT_POST_DELAY_MS,
    skipInitialStabilityWait = false
  } = options;

  try {
    if (!skipInitialStabilityWait) {
      await waitUntilStable(page);
    }

    const selectors = [...BASE_LOADING_SELECTORS, ...extraLoadingSelectors];

    await waitForSelectorsHidden(page, selectors, selectorTimeoutMs);
  } catch (err) {
    // Don’t fail the test — UI might still be interactive
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[waitForMetaMaskLoad] Non-fatal warning: ${msg}`);
  }

  await page.waitForTimeout(postDelayMs);
  return page;
}

// Wait until each selector is hidden; ignore timeouts (selector may not exist on this screen).
async function waitForSelectorsHidden(
  page: Page,
  selectors: string[],
  perSelectorTimeoutMs: number
): Promise<void> {
  await Promise.all(
    selectors.map(async (selector) => {
      try {
        await waitUntilStable(page);
        await page.waitForSelector(selector, {
          state: 'hidden',
          timeout: perSelectorTimeoutMs
        });
      } catch (err) {
        if (err instanceof errors.TimeoutError) {
          // OK: selector may never appear on this view; continue
          return;
        }
        throw err;
      }
    })
  );
}
