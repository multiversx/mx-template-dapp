export type PingPongResponseType = {
  code: string;
  data: {
    data: {
      returnData: string[];
      returnCode: string;
      returnMessage: string;
      gasRemaining: number;
      gasRefund: number;
      outputAccounts: {
        [key: string]: {
          address: string;
          nonce: number;
          balance: null | number;
          balanceDelta: number;
          storageUpdates: { [key: string]: any };
          code: null | number;
          codeMetaData: null | number;
          outputTransfers: [];
          callType: number;
        };
      };
      deletedAccounts: [];
      touchedAccounts: [];
      logs: [];
    };
  };
  error: string;
};
