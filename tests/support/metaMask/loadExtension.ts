import path from 'node:path';
import { chromium, type ChromiumBrowserContext } from '@playwright/test';
import { METAMASK_CACHE_DIR_NAME } from '../template/constants';
import { waitUntilStable } from '../template/waitUntilStable';
import { prepareExtension } from './prepareExtension';

const METAMASK_USER_DIR = 'metamask-user-data';
const CONTEXT_RELEASE_GRACE_MS = 1000;
const SERVICE_WORKER_RETRIES = 3;
const SERVICE_WORKER_RETRY_DELAY_MS = 300;

// Utility: delay
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Utility: fail early with types preserved
function ensure<T>(value: T | null | undefined, message: string): T {
  if (value == null) throw new Error(message);
  return value;
}

// Extract extension id from a service worker url
function extractExtensionIdFromUrl(url: string): string | null {
  if (!url.startsWith('chrome-extension://')) return null;
  const id = url.split('/')[2];
  return id && id.length > 0 ? id : null;
}

// Try to read the extension id from existing service workers (with a small retry window for CI flakiness).
export async function getExtensionId(
  context: ChromiumBrowserContext,
  _extensionName: string // kept for signature parity / future filtering if needed
): Promise<string> {
  if (!context) throw new Error('Browser context is required');

  for (let attempt = 0; attempt <= SERVICE_WORKER_RETRIES; attempt++) {
    const workers = context.serviceWorkers();
    for (const sw of workers) {
      const id = extractExtensionIdFromUrl(sw.url());
      if (id) return id;
    }
    if (attempt < SERVICE_WORKER_RETRIES) {
      await sleep(SERVICE_WORKER_RETRY_DELAY_MS);
    }
  }

  throw new Error(
    'Could not find extension ID from service workers. The extension may not be loaded yet.'
  );
}

// Launch a persistent Chromium context with a single loaded extension.
export async function createBrowserContextWithExtension(
  extensionPath: string
): Promise<ChromiumBrowserContext> {
  const absoluteExtensionPath = path.resolve(
    ensure(extensionPath, 'Extension path is required')
  );

  const userDataDir = path.join(
    process.cwd(),
    METAMASK_CACHE_DIR_NAME,
    METAMASK_USER_DIR
  );

  // Give the previous persistent context time to fully release its lock on userDataDir.
  await sleep(CONTEXT_RELEASE_GRACE_MS);

  try {
    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      args: [
        `--disable-extensions-except=${absoluteExtensionPath}`,
        `--load-extension=${absoluteExtensionPath}`
      ]
    });

    return ensure(context, 'Failed to create browser context');
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const isBusy =
      msg.includes('Target page, context or browser has been closed') ||
      msg.includes('userDataDir') ||
      msg.includes('already in use');

    if (isBusy) {
      throw new Error(
        'Failed to create browser context: previous persistent context may still be closing. ' +
          `Ensure contexts are closed before launching a new one. Original error: ${msg}`
      );
    }
    throw new Error(`Failed to create browser context with extension: ${msg}`);
  }
}

// Prepare the MetaMask extension, start a browser context, stabilize, and return the context + extensionId.
export async function setupMetaMaskExtension(): Promise<{
  context: ChromiumBrowserContext;
  extensionId: string;
}> {
  // 1) Ensure extension bits exist on disk (download/unzip if needed).
  const extensionPath = ensure(
    await prepareExtension(),
    'Failed to prepare MetaMask extension'
  );

  // 2) Launch a persistent context with the extension.
  const context = await createBrowserContextWithExtension(extensionPath);

  // 3) Wait for the first page to be interactive (extension often opens a tab).
  const firstPage = ensure(
    context.pages()[0],
    'Extension did not open an initial page'
  );
  await waitUntilStable(firstPage);

  // 4) Resolve the extension id via service worker.
  const extensionId = ensure(
    await getExtensionId(context, 'MetaMask'),
    'Failed to get extension ID'
  );

  return { context, extensionId };
}
