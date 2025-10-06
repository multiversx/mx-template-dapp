import { PATHS } from './constants';

const walletsDir = process.env.WALLETS_DIR || PATHS.WALLETS_DIR;

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

// Test data is parameterized via environment variables so secrets (passwords,
// addresses, keystores) come from GitHub Secrets in CI or from local .env.
export const TestDataEnums = {
  keystorePassword1: process.env.KEYSTORE1_PASSWORD || '',
  keystorePassword2: process.env.KEYSTORE2_PASSWORD || '',
  keystorePassword3: process.env.KEYSTORE3_PASSWORD || '',
  keystorePassword4: process.env.KEYSTORE4_PASSWORD || '',

  keystoreWalletAddress1: process.env.KEYSTORE1_ADDRESS || '',
  keystoreWalletAddress2: process.env.KEYSTORE2_ADDRESS || '',
  keystoreWalletAddress3: process.env.KEYSTORE3_ADDRESS || '',
  keystoreWalletAddress4: process.env.KEYSTORE4_ADDRESS || '',
  keystoreWalletAddress5: process.env.KEYSTORE5_ADDRESS || '',

  keystoreFilePath1: `${walletsDir}/keystoreFile1.json`,
  keystoreFilePath2: `${walletsDir}/keystoreFile2.json`,
  keystoreFilePath3: `${walletsDir}/keystoreFile3.json`,
  keystoreFilePath4: `${walletsDir}/keystoreFile4.json`,
  keystoreFilePath5: `${walletsDir}/keystoreFile5.pem`
} as const;
