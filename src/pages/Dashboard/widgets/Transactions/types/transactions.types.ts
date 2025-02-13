import { InterpretedTransactionType } from 'types/sdkDappCore.types';

export type TransactionsPropsType = {
  receiver?: string;
};

export interface WithTransactionPropsType {
  transaction: InterpretedTransactionType;
}
