import { Transaction } from 'types/sdkCoreTypes';

export interface PongRawProps {
  callbackRoute: string;
}

export type PingRawProps = PongRawProps & {
  amount: string;
};

export type PingPongServiceProps = {
  transactions: Transaction[];
  callbackRoute: string;
};
