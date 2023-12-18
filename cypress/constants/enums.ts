export enum AssertionEnum {
  contain = 'contain',
  include = 'include',
  beChecked = 'be.checked'
}

export enum ErrorMessagesEnum {
  invalidAddress = 'Invalid address',
  required = 'Required'
}

export enum RoutesEnum {
  unlock = '/unlock',
  send = '/send',
  dashboard = '/dashboard',
  keystoreRoute = '/unlock/keystore'
}

export enum WalletIDEnum {
  unguardedWallet1 = 'check_0',
  unguardedWallet2 = 'check_1',
  unguardedWallet3 = 'check_2',
  unguardedWallet4 = 'check_3',
  guardedWallet = 'check_9'
}

export const enum GlobalSelectorsEnum {
  connect = 'Connect',
  signAutoSend = 'sign-auto-send',
  sendTransactions = 'send-transactions',
  swapLock = 'swap-lock',
  transactionToastTitle = 'transactionToastTitle',
  ledgerLoginButton = 'ledgerLoginButton',
  webWalletLoginBtn = 'webWalletLoginBtn',
  keystoreBtn = 'keystoreBtn',
  submitButton = 'submitButton',
  accessPass = 'accessPass',
  confirmBtn = 'confirmBtn',
  signBtn = 'signBtn',
  closeButton = 'closeButton'
}

export const enum GlobalDataEnum {
  pendingToast = 'Processing',
  confirmedToast = 'transactions successful',
  cancelToast = 'Transaction canceled'
}

export const enum GlobalSelectorsEnum {
  connect = 'Connect',
  signAutoSend = 'sign-auto-send',
  sendTransactions = 'send-transactions',
  swapLock = 'swap-lock'
}
