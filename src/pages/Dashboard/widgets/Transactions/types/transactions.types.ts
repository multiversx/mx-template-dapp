import { InterpretedTransactionType } from 'lib/sdkDapp/sdkDappCore.types';

export type TransactionsPropsType = {
  receiver?: string;
};

export interface WithTransactionPropsType {
  transaction: InterpretedTransactionType;
}
