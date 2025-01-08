import type { CustomElementsDefineOptions } from '@multiversx/sdk-dapp-core-ui/loader';
export type { LedgerConnectModal } from '@multiversx/sdk-dapp-core-ui/dist/components/ledger-connect-modal';
export type { SignTransactionsModal } from '@multiversx/sdk-dapp-core-ui/dist/components/sign-transactions-modal';
export type { WalletConnectModal } from '@multiversx/sdk-dapp-core-ui/dist/components/wallet-connect-modal';
export type { PendingTransactionsModal } from '@multiversx/sdk-dapp-core-ui/dist/components/pending-transactions-modal';
export type { TransactionToastList } from '@multiversx/sdk-dapp-core-ui/dist/components/transaction-toast-list';

export async function defineCustomElements(
  win?: Window,
  opts?: CustomElementsDefineOptions
): Promise<void> {
  try {
    const loader = await import('@multiversx/sdk-dapp-core-ui/loader');
    loader.defineCustomElements(win, opts);
  } catch (err) {
    throw new Error('@multiversx/sdk-dapp-core-ui not found' + err);
  }
}
