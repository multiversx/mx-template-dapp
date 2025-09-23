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
  let method: 'keystore' | 'pem' | 'none';
  if (loginMethod.keystore) {
    method = 'keystore';
  } else if (loginMethod.pem) {
    method = 'pem';
  } else {
    method = 'none';
  }

  switch (method) {
    case 'keystore':
      await confirmWithKeystore(page, loginMethod.password ?? '');
      break;
    case 'pem':
      await confirmWithPem(page, loginMethod.pem!);
      break;
    case 'none':
      // No authentication method provided
      break;
  }
};
