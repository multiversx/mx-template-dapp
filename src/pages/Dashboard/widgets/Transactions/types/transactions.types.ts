import { InterpretedTransactionType } from 'lib';

export type TransactionsPropsType = {
  receiver?: string;
};

export interface WithTransactionPropsType {
  transaction: InterpretedTransactionType;
}
