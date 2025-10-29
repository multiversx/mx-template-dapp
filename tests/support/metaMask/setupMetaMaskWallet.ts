import { Page } from '@playwright/test';
import { handleMetaMetrics } from '../metaMask/handleMetrics';
import { createPassword } from './createPassword';
import { fillSecretRecoveryPhrase } from './fillSecretRecoveryPhrase';
import { setupMetaMaskExtension } from './loadExtension';

export async function setupMetaMaskWallet(
  mnemonic: string,
  password: string
): Promise<{
  context: any;
  extensionId: string;
  metamaskPage: Page;
}> {
  try {
    // Setup MetaMask extension
    const { context, extensionId } = await setupMetaMaskExtension();

    if (!extensionId) {
      throw new Error('Failed to get MetaMask extension ID');
    }

    // Try to find any extension page or open the popup
    let metamaskPage: Page | undefined;

    // First check if there's already an extension page
    const existingPages = context.pages();
    metamaskPage = existingPages.find((page) =>
      page.url().startsWith('chrome-extension://')
    );

    // If not found, navigate to the extension's popup page
    if (!metamaskPage) {
      metamaskPage = await context.newPage();
      await metamaskPage.goto(`chrome-extension://${extensionId}/popup.html`, {
        waitUntil: 'load',
        timeout: 10000
      });
    }

    // Wait for the page to fully load
    await metamaskPage.waitForLoadState('domcontentloaded');

    // Check if we're in onboarding or unlock mode by checking element visibility
    const unlockButton = metamaskPage.getByTestId('unlock-password');
    const importButton = metamaskPage.getByTestId('onboarding-import-wallet');

    // Check if unlock button is visible (wallet already set up)
    if (await unlockButton.isVisible()) {
      // Enter password
      await unlockButton.fill(password);
      await unlockButton.press('Enter');

      // Wait for unlock to complete
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return { context, extensionId, metamaskPage };
    }

    // Check if import button is visible (onboarding needed)
    if (!(await importButton.isVisible())) {
      throw new Error(
        'Could not find onboarding-import-wallet or unlock-password button'
      );
    }

    // Start onboarding
    await importButton.click();

    // Wait a moment for the UI to load
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Click "Import using Secret Recovery Phrase" button
    const seedPhraseButton = metamaskPage.getByTestId(
      'onboarding-import-with-srp-button'
    );
    await seedPhraseButton.waitFor({ state: 'visible', timeout: 10000 });
    await seedPhraseButton.click();

    // Wait a moment for the import form to load
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Enter only the first word in the initial textarea to trigger SRP inputs
    const seedPhraseInput = metamaskPage.getByTestId(
      'srp-input-import__srp-note'
    );
    await seedPhraseInput.waitFor({ state: 'visible', timeout: 10000 });
    await seedPhraseInput.click();
    const firstWord = mnemonic.split(' ')[0];
    await seedPhraseInput.type(firstWord);

    // Press Enter to trigger the individual word inputs
    await seedPhraseInput.press('Enter');

    // Wait for the individual word inputs to appear
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Fill the secret recovery phrase using individual word inputs
    await fillSecretRecoveryPhrase(metamaskPage, mnemonic);

    // Wait a moment for the next step to load
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create password
    await createPassword(metamaskPage, password);

    // Wait a moment for MetaMetrics screen to load
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Handle MetaMetrics opt-in
    await handleMetaMetrics(metamaskPage);

    // Wait a moment for the import to complete
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { context, extensionId, metamaskPage };
  } catch (error) {
    throw new Error(
      `Failed to setup MetaMask wallet: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
