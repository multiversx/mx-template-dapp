import { errors, Page } from '@playwright/test';
import { WaitForMetaMaskLoadOptions } from '../template/types';
import { waitUntilStable } from '../template/waitUntilStable';

const DEFAULT_TIMEOUT = 10_000;
const DEFAULT_POST_DELAY_MS = 300;
const DEFAULT_CONCURRENCY = 3;

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

/**
 * Waits for MetaMask UI to be usable:
 * 1) (optional) wait for page stability
 * 2) wait for known loading indicators to hide (best-effort)
 * 3) brief post delay (conditional)
 */
export async function waitForMetaMaskLoad(
  page: Page,
  options: WaitForMetaMaskLoadOptions = {}
): Promise<Page> {
  const {
    selectorTimeoutMs = DEFAULT_TIMEOUT,
    extraLoadingSelectors = [],
    postDelayMs = DEFAULT_POST_DELAY_MS,
    skipInitialStabilityWait = false,
    concurrency = DEFAULT_CONCURRENCY // how many selectors to wait on in parallel
  } = options;

  try {
    if (!skipInitialStabilityWait) {
      await waitUntilStable(page);
    }

    const selectors = Array.from(
      new Set([...BASE_LOADING_SELECTORS, ...extraLoadingSelectors])
    );

    await waitSelectorsHiddenWithConcurrency(
      page,
      selectors,
      selectorTimeoutMs,
      concurrency
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[waitForMetaMaskLoad] Non-fatal warning: ${msg}`);
  }

  // Smarter post-delay: only wait if we still see a common loader possibly flickering
  const residualSpinner = page.locator('.mm-button-base__icon-loading');
  if (await residualSpinner.isVisible().catch(() => false)) {
    await residualSpinner
      .waitFor({ state: 'hidden', timeout: Math.min(1000, selectorTimeoutMs) })
      .catch(() => {});
  } else {
    await page.waitForTimeout(postDelayMs);
  }

  return page;
}

async function waitSelectorsHiddenWithConcurrency(
  page: Page,
  selectors: string[],
  perSelectorTimeoutMs: number,
  concurrency: number
) {
  // One stability wait per batch, not per selector
  await waitUntilStable(page);

  // Process selectors with a small concurrency to reduce polling in CI/CD
  let i = 0;
  while (i < selectors.length) {
    const batch = selectors.slice(i, i + Math.max(1, concurrency));
    await Promise.all(
      batch.map(async (selector) => {
        try {
          await page.waitForSelector(selector, {
            state: 'hidden',
            timeout: perSelectorTimeoutMs
          });
        } catch (err) {
          if (err instanceof errors.TimeoutError) {
            // OK if a selector never appears on this screen
            return;
          }
          throw err;
        }
      })
    );
    i += batch.length;
  }
}
