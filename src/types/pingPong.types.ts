import { Transaction } from 'types/sdkCoreTypes';

export type PongRawProps = {
  callbackRoute: string;
};

export type PingRawProps = PongRawProps & {
  amount: string;
};

export type PingPongServiceProps = PongRawProps & {
  transactions: Transaction[];
};
