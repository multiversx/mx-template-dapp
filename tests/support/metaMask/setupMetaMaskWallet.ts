import { Page } from '@playwright/test';
import { handleMetaMetrics } from '../metaMask/handleMetrics';
import { getPageAndWaitForLoad } from '../template/getPageAndWaitForLoad';
import { waitUntilStable } from '../template/waitUntilStable';
import { createPassword } from './createPassword';
import { fillSecretRecoveryPhrase } from './fillSecretRecoveryPhrase';
import { setupMetaMaskExtension } from './loadExtension';

const DEFAULT_PAGE_TIMEOUT = 10000;

const metaMaskSelectors = {
  unlockPasswordInput: '[data-testid="unlock-password"]',
  importWalletButton: '[data-testid="onboarding-import-wallet"]',
  importWithSRPButton: '[data-testid="onboarding-import-with-srp-button"]',
  srpNoteInput: '[data-testid="srp-input-import__srp-note"]'
};

export async function setupMetaMaskWallet(mnemonic: string, password: string) {
  try {
    const { context, extensionId } = await initializeMetaMaskExtension();
    const metamaskPage = await openAndPrepareExtensionPage(
      context,
      extensionId
    );

    const onboardingState = await detectOnboardingState(metamaskPage);

    if (onboardingState === 'unlock') {
      await unlockExistingWallet(metamaskPage, password);
      return { context, extensionId, metamaskPage };
    }

    await importWalletFlow(metamaskPage, mnemonic, password);
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

async function initializeMetaMaskExtension() {
  const { context, extensionId } = await setupMetaMaskExtension();
  if (!extensionId) throw new Error('Failed to get MetaMask extension ID');
  return { context, extensionId };
}

async function openAndPrepareExtensionPage(context: any, extensionId: string) {
  const metamaskPage = await getPageAndWaitForLoad(
    context,
    `chrome-extension://${extensionId}/`
  );
  await waitUntilStable(metamaskPage);
  return metamaskPage;
}

async function detectOnboardingState(page: Page) {
  const unlockPassword = page.locator(metaMaskSelectors.unlockPasswordInput);
  const importWallet = page.locator(metaMaskSelectors.importWalletButton);

  return Promise.race([
    unlockPassword
      .waitFor({ state: 'visible', timeout: DEFAULT_PAGE_TIMEOUT })
      .then(() => 'unlock' as const),
    importWallet
      .waitFor({ state: 'visible', timeout: DEFAULT_PAGE_TIMEOUT })
      .then(() => 'import' as const)
  ]).catch(() => {
    throw new Error(
      'Neither "unlock-password" nor "onboarding-import-wallet" appeared within timeout'
    );
  });
}

async function unlockExistingWallet(page: Page, password: string) {
  const passwordInput = page.locator(metaMaskSelectors.unlockPasswordInput);
  await passwordInput.fill(password);
  await passwordInput.press('Enter');
}

async function importWalletFlow(
  page: Page,
  mnemonic: string,
  password: string
) {
  await startImportProcess(page);
  await fillFirstSecretRecoveryPhraseWord(page, mnemonic);
  await fillSecretRecoveryPhrase(page, mnemonic);
  await createPassword(page, password);
}

async function startImportProcess(page: Page) {
  const importButton = page.locator(metaMaskSelectors.importWalletButton);
  await importButton.click();

  const srpButton = page.locator(metaMaskSelectors.importWithSRPButton);
  await srpButton.waitFor({ state: 'visible', timeout: DEFAULT_PAGE_TIMEOUT });
  await srpButton.click();
}

async function fillFirstSecretRecoveryPhraseWord(page: Page, mnemonic: string) {
  const srpInput = page.locator(metaMaskSelectors.srpNoteInput);
  await srpInput.waitFor({ state: 'visible', timeout: DEFAULT_PAGE_TIMEOUT });
  await srpInput.click();

  const [firstWord] = mnemonic.split(' ');
  await srpInput.type(firstWord);
  await srpInput.press('Enter');
}
