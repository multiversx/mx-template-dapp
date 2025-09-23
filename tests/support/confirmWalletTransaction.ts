import { Page } from '@playwright/test';

import { SelectorsEnum } from './testdata';

const confirmWithKeystore = async (walletPage: Page, password: string) => {
  await walletPage.getByTestId(SelectorsEnum.passwordInput).fill(password);
  await walletPage.getByTestId(SelectorsEnum.submitButton).click();
};

const confirmWithPem = async (walletPage: Page, pemPath: string) => {
  await walletPage.setInputFiles(
    `[data-testid="${SelectorsEnum.walletFile}"]`,
    pemPath
  );
  await walletPage.getByTestId(SelectorsEnum.submitButton).click();
};

export const confirmWalletTransaction = async (
  page: Page,
  loginMethod: {
    keystore?: string;
    password?: string;
    pem?: string;
  }
) => {
  switch (true) {
    // Authenticate with keystore
    case !!loginMethod.keystore:
      await confirmWithKeystore(page, loginMethod.password ?? '');
      return;

    // Authenticate with PEM
    case !!loginMethod.pem:
      await confirmWithPem(page, loginMethod.pem!);
      return;

    // No authentication method provided
    default:
      return;
  }
};
