import { SelectorsEnum } from './testdata';
import { SignBatchTransactionsType } from './types';

export const signBatchTransactions = async ({
  walletPage,
  numberOfTransactions
}: SignBatchTransactionsType) => {
  // The sign panel only mounts once the wallet leaves the unlock screen; clicking
  // before that races the re-render and the click is silently lost.
  await walletPage.waitForURL(/\/sign/);

  // The last transaction's button is the same control, labelled "Sign", so
  // numberOfTransactions clicks covers every step plus the final signature.
  const button = walletPage.getByTestId(
    SelectorsEnum.signNextTransactionButton
  );

  for (let i = 0; i < numberOfTransactions; i++) {
    await button.waitFor({ state: 'visible' });
    await button.click();
  }
};
