import { IPlainTransactionObject } from 'types/sdkCoreTypes';

export type PingRawProps = {
  amount?: string;
  callbackUrl: string;
};

export type PongRawProps = {
  callbackUrl: string;
};

export type PingPongServiceProps = {
  transaction: IPlainTransactionObject;
  callbackUrl: string;
};
