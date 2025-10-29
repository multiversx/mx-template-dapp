import { Page } from '@playwright/test';

const stepSelectors = {
  secretPhraseWord: (index: number) =>
    `[data-testid="import-srp__srp-word-${index}"]`,
  confirmSecretPhraseButton: '[data-testid="import-srp-confirm"]'
};

export async function importMetaMaskWallet(page: Page, seedPhrase: string) {
  const seedPhraseWords = seedPhrase.split(' ');

  for (const [index, word] of seedPhraseWords.entries()) {
    const wordInput = page.locator(stepSelectors.secretPhraseWord(index));
    await wordInput.fill(word);
    await wordInput.press('Enter');
  }

  const confirmButton = page.locator(stepSelectors.confirmSecretPhraseButton);

  if (await confirmButton.isDisabled()) {
    throw new Error(
      '[ImportMetaMaskWallet] Invalid seed phrase. Error from MetaMask.'
    );
  }

  await confirmButton.click();
}
