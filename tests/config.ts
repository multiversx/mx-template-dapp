export const TEST_CONFIG = {
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Parallel tests on CI only. */
  workers: 10,
  /* Timeout for each test */
  timeout: 120_000,
  /* Timeout for locators */
  expectTimeout: 60_000,
  /* Run tests in files in parallel */
  fullyParallel: false
} as const;
