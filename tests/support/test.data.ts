export enum TestDataEnums {
  keystoreFilePath = 'tests/support/testfile.json',
  keystoreFilePassword = 'alcatel25A~',
  keystoreWalletAddress = 'erd12atzfnyam5wtsv7xr8f773recpygsdk6azpwueylt78hs27j2fesz8y4tt',

  pemFilePath = 'tests/support/testfile.pem',
  pemWalletAddress = 'erd1c8dnqn56flfu5jdngl3tq0y667tjqvx0lqz99z3020q93fl7jk9qsxmq57'
}

export enum OriginPageEnum {
  multiversxWallet = 'wallet.multiversx.com',
  templateDashboard = 'dashboard'
}

export enum SelectorsEnum {
  walletFile = '[data-testid="walletFile"]',
  passwordInput = 'accessPass',
  submitButton = 'submitButton',
  confirmButton = 'confirmBtn',
  signButton = 'signBtn',
  topInfo = 'topInfo',
  crossWindow = 'crossWindow',
  keystoreBtn = 'keystoreBtn',
  pemBtn = 'pemBtn',
  btnPing = 'btnPing',
  btnPong = 'btnPong',
  txToast = 'transactionToastContent',
  balance = 'balance',
  formatAmountInt = 'formatAmountInt',
  formatAmountDecimals = 'formatAmountDecimals',
  signMsgBtn = 'signMsgBtn',
  signMsgWalletBtn = 'signButton',
  signAndBatchButton = 'sign-auto-send'
}

export enum PingPongEnum {
  raw = 'raw',
  abi = 'abi',
  service = 'service'
}

export enum TransactionIndexEnum {
  ping = 0,
  swapLock = 3,
  signBatch = 4
}
