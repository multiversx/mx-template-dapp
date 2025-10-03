/* eslint-disable sort-exports/sort-exports */
import { Page } from '@playwright/test';
import { BrowserContext } from '@playwright/test';
import { PingPongEnum } from './testdata';

export interface AuthenticateWithKeystoreType {
  walletPage: Page;
  keystorePath: string;
  keystorePassword: string;
}

export interface AuthenticateWithPemType {
  walletPage: Page;
  pemPath: string;
}

export interface CheckBalanceUpdateType {
  page: Page;
  containerSelector: string;
  initialBalance: number;
  expectedChange: number;
}

export interface CheckButtonStatusType {
  page: Page;
  type: PingPongEnum;
  lastClickedButton: 'ping' | 'pong';
}

export interface CheckClipboardContainsType {
  page: Page;
  context: BrowserContext;
  text: string;
  timeout?: number;
}

export interface CheckConnectionToWalletType {
  page: Page;
  walletAddress: string;
}

export interface CheckToastShowsTransactionsSignedType {
  page: Page;
  numberOfTransactions: number;
}

export interface ConfirmWalletTransactionType {
  page: Page;
  loginMethod: LoginMethodType;
}

export interface ConnectWebWalletType {
  page: Page;
  loginMethod: LoginMethodType;
}

export interface CreateNotFoundErrorType {
  urlSubstring: string;
  timeout: number;
  currentPageUrl: string;
  availablePagesUrls: string;
}

export interface ExtractBalanceFromContainerType {
  page: Page;
  containerSelector: string;
  selectorType: 'testId' | 'locator';
}

export interface HandlePingPongType {
  page: Page;
  type: PingPongEnum;
}

export interface LoginMethodType {
  keystore?: string;
  password?: string;
  pem?: string;
}

export interface NavigateToConnectWalletType {
  page: Page;
}

export interface ParseTransactionsTableType {
  page: Page;
  tableSelector?: string;
  tableType: 'all' | 'ping-pong';
  maxRows?: number;
  enableLogging?: boolean;
}

export interface PasteStringFromClipboardType {
  page: Page;
  context: BrowserContext;
}

export interface SignBatchTransactionsType {
  walletPage: Page;
  buttonSelector: string;
  numberOfTransactions: number;
}

export interface TransactionFilter {
  maxAgeInMinutes?: number;
  minAgeInMinutes?: number;
  methods?: string[];
  exactValue?: number;
  onlySuccessful?: boolean;
  onlyFailed?: boolean;
  fromAddress?: string;
  toAddress?: string;
  enableLogging?: boolean;
}

export interface TransactionRow {
  hash: string;
  age: string;
  ageInMinutes: number;
  senderShard: string;
  receiverShard: string;
  fromAddress: string;
  toAddress: string;
  method: string;
  value: number;
  symbol: string;
  isFailed: boolean;
}

export interface WaitForPageByUrlSubstringType {
  page: Page;
  urlSubstring: string;
  timeout?: number;
}

export interface WaitForToastToBeClosedType {
  page: Page;
}

export interface WaitForToastToBeDisplayedType {
  page: Page;
}

export interface WaitForTransactionToastToShowType {
  page: Page;
  toastTitle: string;
  toastContent: string;
}

export interface WaitForTransactionToastToContainType {
  page: Page;
  toastTitle?: string;
  toastContent?: string;
  toastStatus?: string;
  toastIndex?: number;
}
