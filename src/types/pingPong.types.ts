import { Transaction } from 'types/sdkCore.types';

export type PongRawProps = {
  callbackRoute: string;
};

export type PingRawProps = PongRawProps & {
  amount: string;
};

export type PingPongServiceProps = PongRawProps & {
  transactions: Transaction[];
};
