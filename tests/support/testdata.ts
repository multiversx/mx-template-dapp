export enum TestDataEnums {
  keystoreFilePath = 'tests/support/testfile.json',
  keystoreFilePassword = 'alcatel25A~',
  keystoreWalletAddress = 'erd12atzfnyam5wtsv7xr8f773recpygsdk6azpwueylt78hs27j2fesz8y4tt',

  pemFilePath = 'tests/support/testfile.pem',
  pemWalletAddress = 'erd1c8dnqn56flfu5jdngl3tq0y667tjqvx0lqz99z3020q93fl7jk9qsxmq57'
}

export enum OriginPageEnum {
  multiversxWallet = 'wallet.multiversx.com',
  templateDashboard = '/dashboard'
}

export enum SelectorsEnum {
  walletFile = 'walletFile',
  passwordInput = 'accessPass',
  submitButton = 'submitButton',
  confirmButton = 'confirmBtn',
  signButton = 'signBtn',
  topInfoContainer = 'topInfo',
  crossWindow = 'crossWindow',
  keystoreButton = 'keystoreBtn',
  pemButton = 'pemBtn',
  pingButton = 'btnPing',
  pongButton = 'btnPong',
  txToast = 'transactionToastContent',
  balance = 'balance',
  formatAmountInt = 'formatAmountInt',
  formatAmountDecimals = 'formatAmountDecimals',
  signMsgButton = 'signMsgBtn',
  signMsgWalletButton = 'signButton',
  signAndBatchButton = 'sign-auto-send',
  nativeAuthContainer = '#native-auth',
  trimFullAddress = 'trimFullAddress',
  pingPongAbiContainer = '#ping-pong-abi',
  batchTransactionsContainer = '#batch-transactions',
  signMessageContainer = '#sign-message',
  accountAddress = 'accountAddress',
  heroTag = 'heroTag',
  shard = 'addressShard',

  // Transaction table selectors
  transactionLink = 'transactionLink',
  transactionAge = 'transactionAge',
  senderShard = 'senderShard',
  receiverShard = 'receiverShard',
  transactionSender = 'transactionSender',
  transactionReceiver = 'transactionReceiver',
  receiverLink = 'receiverLink',
  method = 'method',
  formatAmountSymbol = 'formatAmountSymbol',
  errorIcon = '.mvx\\:text-error',

  // Table containers
  transactionsAllTable = '#transactions-all table.transactions-table',
  transactionsPingPongTable = '#transactions-ping-pong table.transactions-table',
  transactionsTableBodyRow = 'tbody tr.transactions-table-body-row'
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
