import path from 'node:path';
import { chromium, ChromiumBrowserContext, Page } from '@playwright/test';
import { METAMASK_CACHE_DIR_NAME } from '../template/constants';
import { waitUntilStable } from '../template/waitUntilStable';
import { prepareExtension } from './prepareExtension';

const DEFAULT_VIEWPORT = { width: 360, height: 592 };
const CONTEXT_CLOSE_GRACE_MS = 1_000;
const EXT_ID_RETRIES = 5;
const EXT_ID_RETRY_DELAY_MS = 300;
const METAMASK_USER_DIR = 'metamask-user-data';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function assertTruthy<T>(
  value: T,
  msg: string
): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(msg);
  }
}

function toAbsolutePath(p: string) {
  return path.resolve(p);
}

function getUserDataDir(): string {
  return path.join(process.cwd(), METAMASK_CACHE_DIR_NAME, METAMASK_USER_DIR);
}

async function firstPageOrThrow(
  context: ChromiumBrowserContext
): Promise<Page> {
  const [page] = context.pages();
  assertTruthy(page, 'No pages were opened by the extension context.');
  return page;
}

async function tryGetExtensionIdOnce(
  context: ChromiumBrowserContext
): Promise<string | null> {
  // Prefer service workers (MV3); background pages are rare in MV3.
  const sw = context.serviceWorkers();
  for (const worker of sw) {
    try {
      const url = worker.url();
      if (url.startsWith('chrome-extension://')) {
        const id = url.split('/')[2];
        if (id) return id;
      }
    } catch {
      // ignore and continue
    }
  }

  // Fallback: parse from any extension page if present
  for (const page of context.pages()) {
    try {
      const url = page.url();
      if (url.startsWith('chrome-extension://')) {
        const id = url.split('/')[2];
        if (id) return id;
      }
    } catch {
      // ignore and continue
    }
  }

  return null;
}

async function getExtensionIdWithRetry(
  context: ChromiumBrowserContext
): Promise<string> {
  for (let attempt = 1; attempt <= EXT_ID_RETRIES; attempt++) {
    const id = await tryGetExtensionIdOnce(context);
    if (id) return id;
    await sleep(EXT_ID_RETRY_DELAY_MS);
  }
  throw new Error(
    'Could not determine extension ID (service worker/background not ready).'
  );
}

export async function createBrowserContextWithExtension(
  extensionPath: string
): Promise<ChromiumBrowserContext> {
  assertTruthy(extensionPath, 'Extension path is required');

  const absoluteExtensionPath = toAbsolutePath(extensionPath);
  const userDataDir = getUserDataDir();

  // Give any previous persistent context time to release file locks.
  await sleep(CONTEXT_CLOSE_GRACE_MS);

  try {
    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      args: [
        `--disable-extensions-except=${absoluteExtensionPath}`,
        `--load-extension=${absoluteExtensionPath}`
      ],
      viewport: DEFAULT_VIEWPORT
    });

    assertTruthy(context, 'Failed to create Chromium persistent context');
    return context;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (
      msg.includes('Target page, context or browser has been closed') ||
      msg.includes('userDataDir') ||
      msg.includes('already in use')
    ) {
      throw new Error(
        `Failed to create browser context: a previous persistent context may still be closing or userDataDir is locked. Original error: ${msg}`
      );
    }
    throw new Error(`Failed to create browser context: ${msg}`);
  }
}

export async function getExtensionId(
  context: ChromiumBrowserContext,
  _extensionName: string // kept for signature parity; reserved for future filtering
): Promise<string> {
  assertTruthy(context, 'Browser context is required');
  try {
    return await getExtensionIdWithRetry(context);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to get extension ID: ${msg}`);
  }
}

// Downloads (if needed), loads MetaMask as an extension, and returns the context + extensionId.
export async function setupMetaMaskExtension(): Promise<{
  context: ChromiumBrowserContext;
  extensionId: string;
}> {
  try {
    const extensionPath = await prepareExtension();
    assertTruthy(extensionPath, 'Failed to prepare MetaMask extension');

    const context = await createBrowserContextWithExtension(extensionPath);

    // Ensure the initial extension page is stable before querying workers/pages
    const first = await firstPageOrThrow(context);
    await waitUntilStable(first);

    const extensionId = await getExtensionId(context, 'MetaMask');
    assertTruthy(extensionId, 'Failed to resolve MetaMask extension ID');

    return { context, extensionId };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to setup MetaMask extension: ${msg}`);
  }
}
