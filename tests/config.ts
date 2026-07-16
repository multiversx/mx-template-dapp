export const TEST_CONFIG = {
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Parallel tests on CI only. */
  workers: 5,
  /* Timeout for each test. Must stay above BALANCE_POLLING_TIMEOUT (90s), which
   * the ping/pong flow spends polling for the balance to settle. */
  timeout: 120_000,
  /* Timeout for locators. Waits that legitimately run longer (toasts, balance
   * polling) pass their own explicit timeout. */
  expectTimeout: 30_000,
  /* Run tests in files in parallel */
  fullyParallel: false
} as const;
