import { SelectorsEnum } from './testdata';
import { SignBatchTransactionsType } from './types';

export const signBatchTransactions = async ({
  walletPage,
  buttonSelector,
  numberOfTransactions
}: SignBatchTransactionsType) => {
  let i = buttonSelector === 'swap-lock' ? 1 : 0;
  for (i; i < numberOfTransactions; i++) {
    await walletPage.waitForLoadState();
    await walletPage.getByTestId(SelectorsEnum.signButton).click();
  }
};
