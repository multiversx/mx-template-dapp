import { TransactionProps } from 'types/transaction.types';

export type SendTransactionProps = TransactionProps & {
  callbackRoute: string;
};
