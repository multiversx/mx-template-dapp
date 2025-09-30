export const TEST_CONFIG = {
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Parallel tests on CI only. */
  workers: process.env.CI ? 10 : 10,
  /* Timeout for each test */
  timeout: process.env.CI ? 90_000 : 90_000,
  /* Timeout for locators */
  expectTimeout: 60_000,
  /* Run tests in files in parallel */
  fullyParallel: true
} as const;
