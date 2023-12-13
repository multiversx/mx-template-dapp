import { IPlainTransactionObject } from 'types/sdkCoreTypes';

export type PingRawProps = {
  amount: string;
  callbackRoute: string;
};

export type PongRawProps = {
  callbackRoute: string;
};

export type PingPongServiceProps = {
  transaction: IPlainTransactionObject;
  callbackRoute: string;
};
