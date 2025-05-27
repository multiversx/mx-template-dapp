import { useBatchTransactionsTracker, useTransactionsTracker } from 'lib';

export const TransactionsTracker = () => {
  useTransactionsTracker({
    onSuccess: (sessionId: string) => {
      console.log(`Session ${sessionId} successfully completed`);
    },
    onFail: (sessionId: string, errorMessage?: string) => {
      if (errorMessage) {
        console.log(`Session ${sessionId} failed, ${errorMessage}`);
        return;
      }

      console.log(`Session ${sessionId} failed`);
    }
  });
  // We do this in order to have full control of the implementation
  // Default tracker sends signedTransactions automatically and we don't want to do that
  // By doing this it will enable the tracker but without the sendTransactions logic
  useBatchTransactionsTracker({
    onSuccess: (sessionId) => {
      console.log(`Batch with session ${sessionId} successfully completed`);
    },
    onFail: (sessionId, errorMessage) => {
      if (errorMessage) {
        console.log(`Batch with session ${sessionId} failed, ${errorMessage}`);
        return;
      }

      console.log(`Batch with session ${sessionId} failed`);
    }
  });

  return null;
};
