import { Page } from '@playwright/test';
import { handleMetaMetrics } from '../metaMask/handleMetrics';
import { waitUntilStable } from '../template/waitUntilStable';
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
        waitUntil: 'load'
      });
    }

    // Wait for the page to be stable and loaded
    await waitUntilStable(metamaskPage);

    // Wait for either unlock button or import button to appear
    const unlockButton = metamaskPage.getByTestId('unlock-password');
    const importButton = metamaskPage.getByTestId('onboarding-import-wallet');

    // Wait for unlock button or import button to appear (whichever appears first)
    const result = await Promise.race([
      unlockButton
        .waitFor({ state: 'visible', timeout: 10000 })
        .then(() => 'unlock' as const),
      importButton
        .waitFor({ state: 'visible', timeout: 10000 })
        .then(() => 'import' as const)
    ]).catch(() => null);

    if (result === 'unlock') {
      // Enter password
      await unlockButton.fill(password);
      await unlockButton.press('Enter');

      return { context, extensionId, metamaskPage };
    }

    if (result === 'import') {
      // Start onboarding
      await importButton.click();
    } else {
      throw new Error(
        'Could not find onboarding-import-wallet or unlock-password button after waiting 10 seconds'
      );
    }

    // Click "Import using Secret Recovery Phrase" button
    const seedPhraseButton = metamaskPage.getByTestId(
      'onboarding-import-with-srp-button'
    );
    await seedPhraseButton.waitFor({ state: 'visible', timeout: 10000 });
    await seedPhraseButton.click();

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

    // Fill the secret recovery phrase using individual word inputs
    await fillSecretRecoveryPhrase(metamaskPage, mnemonic);

    // Create password
    await createPassword(metamaskPage, password);

    // Handle MetaMetrics opt-in
    await handleMetaMetrics(metamaskPage);

    return { context, extensionId, metamaskPage };
  } catch (error) {
    throw new Error(
      `Failed to setup MetaMask wallet: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
