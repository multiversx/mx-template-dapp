export enum GlobalDataEnum {
  homePageTitle = 'Utilities for the MultiversX Blockchain',
  homePageDescription = 'This page offers an easy to use pack of utilities necessary for interacting with the MultiversX Blockchain.',
  signatureTxt = 'MVX Signature',
  invalidPayload = 'invalid-mvx',
  invalidPayloadErr = 'Invalid signature payload',
  signature = '94ea7c3c28c2e718cbac76d00423e2cfbde63017120e5353c17b675fb7d78a1e855ee55e41f021d40dad1487db11f5e897c314aaff7d4cc4dc82062abaa97403',
  address = 'erd16xlzk48ftvhxp8dyq6d0kkfpgpfechlzycfm9xmdmwna66pvkymqvz4vzq',
  signedMsgPlaceHolder = 'Insert or paste the message that was signed.',
  // eslint-disable-next-line quotes
  signaturePlaceHolder = "Insert or paste the signature. You don't have to add '0x' prefix.",
  confirmationMsg = 'Valid',
  invalidMsg = 'Invalid',
  base64Err = 'Value must be base64 input',
  explainValidUrl = 'https://github.com/multiversx/mx-ping-pong-sc/tree/main/ping-pong',
  firstExplainerParagraph = 'This Rust Smart',
  errorExplainerMsg = 'Could not download git repository.',
  invalidGitUrl = 'https://github.com/multiversx/mx-template-dapp',
  abiFile = 'abi.json',
  pemFile = 'tests/utils/wdioPem.pem',
  invalidPem = 'tests/utils/invalidPem.pem',
  keystoreFile = 'tests/utils/keystore.json',
  scAdress = 'erd1qqqqqqqqqqqqqpgqk4tchxyrzt5pzunl6qhcnl705yrnplms0n4sa52jkw',
  abiPrevieText = 'ABI Preview',
  buildInfoLink = 'Build Info',
  buildName = 'GovernanceV2',
  frameworkName = 'multiversx-sc 0.44.0',
  devnetNetwork = 'devnet',
  contractFile = 'contract.wasm',
  walletWindow = 'devnet-wallet',
  daapWindow = 'integration.template',
  explorerWindow = 'devnet-explorer',
  confrimTransactionMsg = 'Processing Ping transaction',
  globalPassword = 'Develop13#',
  transactionCanceled = 'Transaction canceled'
}

export enum GlobalSelectorEnum {
  homeTitle = 'home-title',
  homeDescription = 'home-description',
  convertersLink = 'navigation-page-/converters',
  nativeAuthLink = 'navigation-page-/auth',
  signMsgLink = 'navigation-page-/sign-message',
  scDeployLink = 'navigation-page-/smart-contract',
  explainerLink = 'navigation-page-/explainer',
  loginLink = 'navigation-page-unlock',
  walletFile = 'walletFile',
  submitButton = 'submitButton',
  expandAll = 'Expand All',
  queryBtn = 'Query',
  readEndpoint = 'Read Endpoints',
  deployContract = 'Deploy Contract',
  walletConnectBtn = 'Connect Your Wallet',
  crossWindowLoginBtn = '[data-testid="webWalletLoginBtn"]',
  legacyWebWalletLoginDropdownButton = '[data-testid="legacyWebWalletLoginDropdownButton"]',
  legacyDropdownValue = '//*[@aria-labelledby="dropdown-button"]',
  accesWalletBtn = '[data-testid="submitButton"]',
  signBtn = '[data-testid="signBtn"]',
  toastSelector = 'transactionToastTitle',
  keystoreBtn = '[data-testid="keystoreBtn"]',
  accesPass = 'accessPass',
  confirmBtn = 'confirmBtn',
  logoutBtn = 'button*=Close',
  unlockPage = '[data-testid="unlockPage"]',
  xportalBtn = '[data-testid="walletConnectBtn"]',
  ledgerBtn = '[data-testid="ledgerLoginButton"]',
  pemBtn = '[data-testid="pemBtn"]',
  modalCloseBtn = '[data-testid="modalCloseButton"]',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  closeTemplateModal = 'button*=Close',
  confirmParagraph = '//*[@id="dapp-modal"]/div/div/div/p',
  closeBtn = '[data-testid="closeButton"]',
  textArea = '//*[@id="sign-message"]/div/div[2]/textarea',
  signMsgBtn = '[data-testid="signMsgBtn"]',
  signMsgWalletBtn = '[data-testid="signButton"]',
  errorMsg = '[data-testid="dropzoneErrorMessage"]',
  connectBtn = 'a*=Connect',
  rawType = 'Raw',
  abiType = 'Abi',
  serviceType = 'Service',
  signAndBatchType = 'sign-auto-send',
  controlledSendingType = 'send-transactions',
  swapLockType = 'swap-lock',
  clearBtn = '[data-testid="closeTransactionSuccessBtn"]',
  batchBtn = '[data-testid="sign-auto-send"]',
  keystoreCloseModalBtn = 'keystoreCloseModalBtn',
  inputFile = 'input[type=file]',
  lastBatchTransaction = 'div:nth-child(5) > .dapp-core-component__explorerLinkStyles__link',
  lastBatchControlledTransaction = 'div:nth-child(6) > .dapp-core-component__explorerLinkStyles__link',
  closeButton = 'closeButton',
  signButton = 'signButton',
  transactionLink = '.transaction-link',
  closePoupBtn = 'mvx-provider-idle-screen',
  test = 'test'
}

export enum OriginPageEnum {
  multiversxWallet = 'wallet.multiversx.com',
  explorerPage = 'devnet-explorer.multiversx.com'
}

export enum RoutesEnum {
  converters = 'converters',
  auth = 'auth',
  signMsg = 'sign-message',
  scDeploy = 'smart-contract',
  explainer = 'explainer',
  login = 'unlock',
  xportal = 'walletconnect',
  ledger = 'ledger',
  dashboard = 'dashboard'
}

export enum TransactionIndexEnum {
  ping = 0,
  swapLock = 3,
  signBatch = 4
}

export enum WalletAdressEnum {
  adress1 = 'erd1qtknph0q5hsm4hmjpvzusj8vgy8m48lpvclnv6jlkw4uu7sacj6smz8uhg',
  adress2 = 'erd16fq70uf7mdkkkv3fylawk7269ef63kv2vh5s4lrtm58aufve8dtqjlhjjn',
  adress3 = 'erd1hrv7xl5xyu536cdkz2mu92jm6w93sxecrsjxe2t8y9tv4er24a2qhfqkkr',
  adress4 = 'erd1ljyvg76hnt0wnj3asmte3nfxhcl8cxsukmz94kc56emhwvvm8lgsptux0y',
  adress5 = 'erd130zl7gmh3dzz5ed5xhypxrxmzd4ev9940zcwaz8vgpxkx6xg0s7q07jpej',
  adress6 = 'erd1p7a4q6qz9pns8mytcw62n2anuhd8nh6qkh4w5mzf9s7urdlkud5q94d630',
  adress7 = 'erd1tqtxnneypvga204w3e26096kpyxmtfk660yq7fh3jswtwagpwuds2a8wr3'
}
