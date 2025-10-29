import path from 'node:path';
import { chromium, ChromiumBrowserContext } from '@playwright/test';
import { METAMASK_CACHE_DIR_NAME } from '../template/constants';
import { waitUntilStable } from '../template/waitUntilStable';
import { prepareExtension } from './prepareExtension';

// Get the extension ID from a browser context using background pages or service workers
export async function getExtensionId(
  context: ChromiumBrowserContext,
  _extensionName: string
): Promise<string> {
  try {
    if (!context) {
      throw new Error('Browser context is required');
    }

    // Get the extension ID from the service worker
    const serviceWorkers = context.serviceWorkers();

    for (const serviceWorker of serviceWorkers) {
      try {
        const serviceWorkerUrl = serviceWorker.url();

        if (serviceWorkerUrl.startsWith('chrome-extension://')) {
          const id = serviceWorkerUrl.split('/')[2];
          if (id && id.length > 0) {
            return id;
          }
        }
      } catch (error) {
        throw new Error(
          `Failed to get extension ID: ${(error as Error).message}`
        );
      }
    }

    throw new Error(
      'Could not find extension ID. This might mean the extension is not loaded properly.'
    );
  } catch (error) {
    throw new Error(
      `Failed to get extension ID: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

// Create a browser context with the MetaMask extension loaded
export async function createBrowserContextWithExtension(
  extensionPath: string
): Promise<ChromiumBrowserContext> {
  try {
    if (!extensionPath) {
      throw new Error('Extension path is required');
    }

    const METAMASK_USER_DIR = 'metamask-user-data';
    // Ensure the extension path uses absolute path
    const absoluteExtensionPath = path.resolve(extensionPath);
    const userDataDir = path.join(
      process.cwd(),
      METAMASK_CACHE_DIR_NAME,
      METAMASK_USER_DIR
    );

    // Add a delay to ensure any previous context is fully closed
    // Persistent contexts need time to release the userDataDir lock
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      args: [
        `--disable-extensions-except=${absoluteExtensionPath}`,
        `--load-extension=${absoluteExtensionPath}`
      ]
    });

    if (!context) {
      throw new Error('Failed to create browser context');
    }

    return context;
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes(
        'Target page, context or browser has been closed'
      ) ||
        error.message.includes('userDataDir') ||
        error.message.includes('already in use'))
    ) {
      throw new Error(
        `Failed to create browser context with extension: Previous context may still be closing. Please ensure contexts are properly closed before creating new ones. Original error: ${error.message}`
      );
    }
    throw new Error(
      `Failed to create browser context with extension: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

// Setup MetaMask extension and return the browser context and extension ID
export async function setupMetaMaskExtension(): Promise<{
  context: ChromiumBrowserContext;
  extensionId: string;
}> {
  try {
    // Download and unzip MetaMask if not already done
    const extensionPath = await prepareExtension();

    if (!extensionPath) {
      throw new Error('Failed to prepare MetaMask extension');
    }

    // Create browser context with extension
    const context = await createBrowserContextWithExtension(extensionPath);

    if (!context) {
      throw new Error('Failed to create browser context');
    }

    // Wait for the page to be stable and loaded
    await waitUntilStable(context.pages()[0]);

    // Get the extension ID from service worker
    const extensionId = await getExtensionId(context, 'MetaMask');

    if (!extensionId || extensionId.length === 0) {
      throw new Error('Failed to get extension ID');
    }

    return { context, extensionId };
  } catch (error) {
    throw new Error(
      `Failed to setup MetaMask extension: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
