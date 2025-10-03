export enum OriginPageEnum {
  multiversxWallet = '/devnet-wallet.multiversx.com/',
  templateDashboard = '/dashboard'
}

export enum PingPongEnum {
  raw = 'raw',
  abi = 'abi',
  service = 'service'
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
  toastTitle = 'transactionToastTitle',
  toastContent = 'transactionToastContent',
  toastStatus = 'transactionDetailsStatus',
  balance = 'balance',
  formatAmountInt = 'formatAmountInt',
  formatAmountDecimals = 'formatAmountDecimals',
  signMsgButton = 'signMsgBtn',
  signMsgWalletButton = 'signButton',
  signAndBatchButton = 'sign-auto-send',
  wrapAndMultiTransferButton = 'wrap-multi-transfer',
  swapAndLockButton = 'swap-lock',
  nativeAuthContainer = '#native-auth',
  trimFullAddress = 'trimFullAddress',
  pingPongAbiContainer = '#ping-pong-abi',
  batchTransactionsContainer = '#batch-transactions',
  signMessageContainer = '#sign-message',
  accountAddress = 'accountAddress',
  heroTag = 'heroTag',
  shard = 'addressShard',
  decodedMessage = 'decodedMessage',

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

export enum TestDataEnums {
  // Keystore files
  keystorePassword = 'multiversX1~',

  keystoreFilePath1 = 'tests/support/wallets/keystoreFile1.json',
  keystoreWalletAddress1 = 'erd1357nhm7c90m53xy9x2xeydqadzd93ksawy7ne2wzrd0muvnsx22savqukc',

  keystoreFilePath2 = 'tests/support/wallets/keystoreFile2.json',
  keystoreWalletAddress2 = 'erd1x8lzae5pckdkwfavahpaa05ulqaeewl5fa876m02jtszyksp2ytsqqap0c',

  keystoreFilePath3 = 'tests/support/wallets/keystoreFile3.json',
  keystoreWalletAddress3 = 'erd1hhmd7uehzg28cmuh2vmsvwrfz8whxrncfgqz22rwlxj7celrxkcsaad4d9',

  keystoreFilePath4 = 'tests/support/wallets/keystoreFile4.json',
  keystoreWalletAddress4 = 'erd19qeszhth84mtq384c7qfqd2zpzcnvgfe4pfaegg0e936ujwa0y7qke80kx',

  // PEM files
  pemFilePath1 = 'tests/support/wallets/pemFile1.pem',
  pemWalletAddress1 = 'erd1c8dnqn56flfu5jdngl3tq0y667tjqvx0lqz99z3020q93fl7jk9qsxmq57'
}

export enum TransactionIndexEnum {
  ping = 0,
  swapLock = 3,
  signBatch = 4
}
