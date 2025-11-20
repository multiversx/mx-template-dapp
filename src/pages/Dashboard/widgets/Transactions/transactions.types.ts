import { ItemsIdentifiersEnum } from '../../dashboard.types';

export interface TransactionsPropsType {
  receiver?: string;
  identifier?: `${ItemsIdentifiersEnum}`;
}
