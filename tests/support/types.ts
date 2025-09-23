import { Page } from '@playwright/test';

export interface CheckBalanceUpdateType {
  page: Page;
  initialBalance: number;
  expectedChange: number;
}

export interface VerifyBalanceChangeType {
  page: Page;
  initialBalance: number;
  clickedButton: 'ping' | 'pong';
}

export interface CheckButtonStatusType {
  page: Page;
  type: import('./testdata').PingPongEnum;
  lastClickedButton: 'ping' | 'pong' | null;
}

export interface HandlePingPongType {
  page: Page;
  type: import('./testdata').PingPongEnum;
}

export interface WaitForPageByUrlSubstringType {
  page: Page;
  urlSubstring: string;
  timeout?: number;
}

export interface WaitForNewPageType {
  page: Page;
  urlSubstring: string;
  timeout: number;
}

export interface CreateNotFoundErrorType {
  urlSubstring: string;
  timeout: number;
  currentPageUrl: string;
  availablePagesUrls: string;
}

export interface ConnectWebWalletType {
  page: Page;
  loginMethod: {
    keystore?: string;
    pem?: string;
    password?: string;
  };
}

export interface AuthenticateWithKeystoreType {
  walletPage: Page;
  keystorePath: string;
  keystorePassword: string;
}

export interface AuthenticateWithPemType {
  walletPage: Page;
  pemPath: string;
}

export interface ConfirmWalletTransactionType {
  page: Page;
  loginMethod: {
    keystore?: string;
    password?: string;
    pem?: string;
  };
}

export interface SignBatchTransactionsType {
  walletPage: Page;
  buttonSelector: string;
  numberOfTransactions: number;
}

export interface CheckConnectionToWalletType {
  page: Page;
  walletAddress: string;
}

export interface NavigateToConnectWalletType {
  page: Page;
}

export interface GetCurrentBalanceType {
  page: Page;
}

export interface WaitForToastToBeDisplayedType {
  page: Page;
}

export interface CheckToastShowsTransactionsSignedType {
  page: Page;
  numberOfTransactions: number;
}

export interface PasteStringFromClipboardType {
  page: Page;
  context: import('@playwright/test').BrowserContext;
}

export interface CheckClipboardContainsType {
  page: Page;
  context: import('@playwright/test').BrowserContext;
  text: string;
  timeout?: number;
}
