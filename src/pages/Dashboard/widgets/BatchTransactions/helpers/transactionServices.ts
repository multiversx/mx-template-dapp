import {
  getAccountProvider,
  TransactionManager,
  TransactionsDisplayInfoType
} from 'lib';
import { TransactionProps } from 'types';
import {
  getBatchTransactions,
  getSwapAndLockTransactions
} from './transactionFactories';

export const sendBatchTransactions = async ({
  address,
  chainID,
  nonce
}: TransactionProps) => {
  const provider = getAccountProvider();
  const txManager = TransactionManager.getInstance();

  const transactionsToSign = getBatchTransactions({
    address,
    chainID,
    nonce
  });

  const transactions = await provider.signTransactions(transactionsToSign);

  const groupedTransactions = [
    [transactions[0]],
    [transactions[1], transactions[2]],
    [transactions[3], transactions[4]]
  ];

  const sentTransactions = await txManager.send(groupedTransactions);
  const sessionId = await txManager.track(sentTransactions);

  return { sentTransactions, sessionId };
};

export const signAndAutoSendBatchTransactions = async ({
  address,
  nonce,
  chainID,
  transactionsDisplayInfo = {
    processingMessage: 'Processing transactions',
    errorMessage: 'An error has occurred during transaction execution',
    successMessage: 'Batch transactions successful'
  }
}: TransactionProps & {
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
}) => {
  const provider = getAccountProvider();
  const txManager = TransactionManager.getInstance();

  const transactions = getBatchTransactions({
    address,
    nonce,
    chainID
  });

  const signedTransactions = await provider.signTransactions(transactions);

  const groupedTransactions = [
    [signedTransactions[0]],
    [signedTransactions[1], signedTransactions[2]],
    [signedTransactions[3], signedTransactions[4]]
  ];

  const sentTransactions = await txManager.send(groupedTransactions);
  const sessionId = await txManager.track(sentTransactions, {
    transactionsDisplayInfo
  });

  return { sentTransactions, sessionId };
};

export const swapAndLockTokens = async ({
  address,
  nonce,
  chainID,
  transactionsDisplayInfo = {
    processingMessage: 'Processing transactions',
    errorMessage: 'An error has occurred during transaction execution',
    successMessage: 'Swap and lock transactions successful'
  }
}: TransactionProps & {
  transactionsDisplayInfo?: TransactionsDisplayInfoType;
}) => {
  const provider = getAccountProvider();
  const txManager = TransactionManager.getInstance();

  const transactionsToSign = getSwapAndLockTransactions({
    address,
    chainID,
    nonce
  });

  const transactions = await provider.signTransactions(transactionsToSign);

  const groupedTransactions = [
    [transactions[0]],
    [transactions[1], transactions[2]],
    [transactions[3]]
  ];

  const sentTransactions = await txManager.send(groupedTransactions);
  const sessionId = await txManager.track(sentTransactions, {
    transactionsDisplayInfo
  });

  return { sentTransactions, sessionId };
};
