export type PingPongServiceTransactionType = {
  chainID: string;
  data: string;
  gasLimit: number;
  gasPrice: number;
  nonce: number;
  receiver: string;
  sender: string;
  value: string;
  version: number;
};

export type TimeToPongResponseType = {
  status: 'not_yet_pinged' | 'awaiting_pong';
  timeToPong?: number;
};
