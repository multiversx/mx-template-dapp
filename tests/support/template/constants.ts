export const PATHS = {
  WALLETS_DIR: 'tests/support/wallets'
} as const;

export const METAMASK_CACHE_DIR_NAME = '.cache';

export const TEST_CONSTANTS = {
  MIN_BALANCE_FOR_PING_PONG: 1, // 1 EGLD
  MIN_BALANCE_FOR_BATCH_TX: 5, // 5 EGLD
  MIN_BALANCE_FOR_WRAP_AND_MULTI_TRANSFER: 4, // 4 EGLD
  MIN_BALANCE_FOR_SWAP_AND_LOCK: 4, // 4 EGLD

  URL_NAVIGATION_TIMEOUT: 10000, // 10 seconds
  BALANCE_POLLING_TIMEOUT: 90000, // 90 seconds
  PAGE_WAIT_TIMEOUT: 30000, // 30 seconds
  TOAST_WAIT_TIMEOUT: 60000, // 60 seconds

  PING_PONG_COOLDOWN: 3 * 60 * 1000, // 3 minutes in milliseconds
  PING_BALANCE_CHANGE: -1.0, // Balance decreases by 1 EGLD + gas fees
  PONG_BALANCE_CHANGE: 1.0, // Balance increases by 1 EGLD - gas fees

  BALANCE_PRECISION: 2,

  PAGE_CLOSE_TIMEOUT: 10000 // 10 seconds
} as const;
