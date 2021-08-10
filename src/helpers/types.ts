export interface RawTransactionType {
  value: string;
  receiver: string;
  gasPrice?: number;
  gasLimit?: number;
  data?: string;
  chainID?: string;
  version?: number;
}
