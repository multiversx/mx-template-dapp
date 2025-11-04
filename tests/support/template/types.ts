/* eslint-disable sort-exports/sort-exports */
import { BrowserContext, Page } from '@playwright/test';
import { PingPongEnum } from './testdata';

export type FileEncoding = 'base64' | 'utf8' | 'none';

export interface AuthenticateWithKeystoreType {
  walletPage: Page;
  keystorePath: string;
  keystorePassword: string;
}

export interface InMemoryProviderType {
  page: Page;
  loginMethod: InMemoryProviderLoginMethodType;
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
  loginMethod: WebWalletLoginMethodType;
}

export interface ConnectWebWalletType {
  page: Page;
  loginMethod: WebWalletLoginMethodType;
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

export interface WebWalletLoginMethodType {
  keystore?: string;
  password?: string;
  pem?: string;
}

export interface InMemoryProviderLoginMethodType {
  address: string;
  privateKey: string;
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

export interface GetPageAndWaitForLoadOptions {
  maxRetries?: number;
  timeout?: number;
  viewport?: { width: number; height: number };
  waitForReady?: (page: Page) => Promise<Page>;
}

export type GetPageAndWaitForLoad = (
  context: BrowserContext,
  urlSubstring: string | RegExp,
  options?: GetPageAndWaitForLoadOptions
) => Promise<Page>;
