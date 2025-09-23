export const TEST_CONSTANTS = {
  MIN_BALANCE_FOR_PING_PONG: 1, // 1 EGLD
  MIN_BALANCE_FOR_BATCH_TX: 5, // 5 EGLD

  URL_NAVIGATION_TIMEOUT: 10000, // 10 seconds
  BALANCE_POLLING_TIMEOUT: 60000, // 60 seconds
  PAGE_WAIT_TIMEOUT: 30000, // 30 seconds
  TOAST_WAIT_TIMEOUT: 60000, // 60 seconds

  PING_PONG_COOLDOWN: 3 * 60 * 1000, // 3 minutes in milliseconds
  PING_BALANCE_CHANGE: -1, // Balance decreases by 1 EGLD
  PONG_BALANCE_CHANGE: 1, // Balance increases by 1 EGLD

  BALANCE_PRECISION: 2 // Decimal places for balance comparison
} as const;
