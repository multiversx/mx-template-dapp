type RawTransactionType = {
  value: string;
  data: string;
  receiver: string;
  sender: string;
  gasLimit?: string;
};

export type BatchTransactionsType = {
  transactions: RawTransactionType[];
  order?: number[][];
};
