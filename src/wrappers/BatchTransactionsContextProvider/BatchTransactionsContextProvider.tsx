import { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

interface BatchTransactionsContextType {
  sendBatchTransactionsOnDemand: boolean;
  setSendBatchTransactionsOnDemand: (newState: boolean) => void;
}

const BatchTransactionsContext = createContext<
  BatchTransactionsContextType | undefined
>(undefined);

export const BatchTransactionsContextProvider = ({
  children
}: PropsWithChildren) => {
  const [sendBatchTransactionsOnDemand, setSendBatchTransactionsOnDemand] =
    useState(true);

  const value: BatchTransactionsContextType = {
    sendBatchTransactionsOnDemand,
    setSendBatchTransactionsOnDemand
  };

  return (
    <BatchTransactionsContext.Provider value={value}>
      {children}
    </BatchTransactionsContext.Provider>
  );
};

export const useBatchTransactionContext = (): BatchTransactionsContextType => {
  const context = useContext(BatchTransactionsContext);

  if (!context) {
    throw new Error(
      'useBatchTransactionContext must be used within a BatchTransactionsContextProvider'
    );
  }

  return context;
};
