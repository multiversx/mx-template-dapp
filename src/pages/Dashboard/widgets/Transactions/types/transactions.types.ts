import { InterpretedTransactionType } from 'types';

export type TransactionsPropsType = {
  receiver?: string;
};

export interface WithTransactionPropsType {
  transaction: InterpretedTransactionType;
}
