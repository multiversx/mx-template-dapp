import { Page } from '@playwright/test';

import { SelectorsEnum } from './testdata';

export const signBatchTransactions = async ({
  walletPage,
  buttonSelector,
  numberOfTransactions
}: {
  walletPage: Page;
  buttonSelector: string;
  numberOfTransactions: number;
}) => {
  let i = buttonSelector === 'swap-lock' ? 1 : 0;
  for (i; i < numberOfTransactions; i++) {
    await walletPage.getByTestId(SelectorsEnum.signButton).click();
  }
};
