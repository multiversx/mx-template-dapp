export const TEST_CONFIG = {
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0, // TODO: re-enable retries
  /* Parallel tests on CI only. */
  workers: 1,
  /* Timeout for each test */
  timeout: 90_000,
  /* Timeout for locators */
  expectTimeout: 60_000,
  /* Run tests in files in parallel */
  fullyParallel: false
} as const;
