import { Page } from '@playwright/test';

const secretRecoverySelectors = {
  wordInput: (index: number) => `[data-testid="import-srp__srp-word-${index}"]`,
  confirmButton: '[data-testid="import-srp-confirm"]',
  errorMessage: '[data-testid="import-srp__error"]'
};

export async function fillSecretRecoveryPhrase(page: Page, seedPhrase: string) {
  const words = seedPhrase.split(' ');
  await fillSeedWords(page, words);
  await confirmSeedPhrase(page);
}

async function fillSeedWords(page: Page, words: string[]) {
  // Skip first word (already filled in the textarea)
  const remainingWords = words.slice(1);

  for (const [index, word] of remainingWords.entries()) {
    const inputSelector = secretRecoverySelectors.wordInput(index + 1);
    await fillSingleWord(page, inputSelector, word);
  }
}

async function fillSingleWord(page: Page, selector: string, word: string) {
  const input = page.locator(selector);
  await input.fill(word);
  await input.press('Enter');
}

async function confirmSeedPhrase(page: Page) {
  const confirmButton = page.locator(secretRecoverySelectors.confirmButton);

  if (await confirmButton.isDisabled()) {
    const errorText = await getErrorText(page);
    throw new Error(
      `[ConfirmSecretRecoveryPhrase] Invalid seed phrase. MetaMask error: ${errorText}`
    );
  }

  await confirmButton.click();
}

async function getErrorText(page: Page): Promise<string> {
  return (
    (await page
      .locator(secretRecoverySelectors.errorMessage)
      .textContent({ timeout: 1000 })) || 'Unknown error'
  );
}
