import { Transaction } from 'lib';

export type PingPongServiceProps = PongRawProps & {
  transactions: Transaction[];
};

export type PingRawProps = PongRawProps & {
  amount: string;
};

export type PongRawProps = {
  callbackRoute: string;
};
