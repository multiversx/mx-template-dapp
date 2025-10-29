import { Page } from '@playwright/test';

const stepSelectors = {
  secretRecoveryPhraseWord: (index: number) =>
    `[data-testid="import-srp__srp-word-${index}"]`,
  confirmSecretRecoveryPhraseButton: '[data-testid="import-srp-confirm"]',
  error: '[data-testid="import-srp__error"]'
};

export async function fillSecretRecoveryPhrase(page: Page, seedPhrase: string) {
  const seedPhraseWords = seedPhrase.split(' ');

  // Skip the first word since it's already entered in the initial textarea
  for (const [index, word] of seedPhraseWords.slice(1).entries()) {
    const wordInput = page.locator(
      stepSelectors.secretRecoveryPhraseWord(index + 1)
    );
    await wordInput.fill(word);
    await wordInput.press('Enter');
  }

  const continueButton = page.locator(
    stepSelectors.confirmSecretRecoveryPhraseButton
  );

  // Check if something went wrong during the filling process
  if (await continueButton.isDisabled()) {
    const errorText = await page.locator(stepSelectors.error).textContent({
      timeout: 1000
    });

    throw new Error(
      `[ConfirmSecretRecoveryPhrase] Invalid seed phrase. Error from MetaMask: ${errorText}`
    );
  }

  await continueButton.click();
}
