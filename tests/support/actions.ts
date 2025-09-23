import { expect, Page } from '@playwright/test';

import { OriginPageEnum, PingPongEnum, SelectorsEnum } from './test.data';
import { TEST_CONSTANTS } from './constants';

// Check if the template is connected to the web wallet by veryfing that
// the top info contains the wallet address
export const checkConnectionToWallet = async (
  page: Page,
  walletAddress: string
) => {
  await expect(page.getByTestId(SelectorsEnum.topInfo)).toContainText(
    walletAddress
  );
};

export const waitForPageByUrlSubstring = async (
  page: Page,
  urlSubstring: string,
  timeout: number = TEST_CONSTANTS.PAGE_WAIT_TIMEOUT
) => {
  // Check if page already exists
  let existingPages: Page[];
  try {
    existingPages = await page.context().pages();
  } catch (contextError) {
    throw new Error(
      'Browser context is closed or invalid. Cannot access pages. ' +
        `Original error: ${contextError}`
    );
  }

  const existingPage = existingPages.find((browserPage) =>
    browserPage.url().includes(urlSubstring)
  );
  if (existingPage) {
    return existingPage;
  }

  // Try current page navigation first
  try {
    await page.waitForURL((url) => url.hostname.includes(urlSubstring), {
      timeout: TEST_CONSTANTS.URL_NAVIGATION_TIMEOUT
    });
    return page;
  } catch (urlWaitError) {
    // Fallback: Wait for new page to be created
    try {
      const newPage = await page.context().waitForEvent('page', {
        timeout: timeout - TEST_CONSTANTS.URL_NAVIGATION_TIMEOUT
      });
      await newPage.waitForURL((url) => url.hostname.includes(urlSubstring), {
        timeout: TEST_CONSTANTS.URL_NAVIGATION_TIMEOUT
      });
      return newPage;
    } catch (newPageError) {
      // Final fallback: Check all pages again in case one was created
      let allPages: Page[];
      try {
        allPages = await page.context().pages();
      } catch (finalContextError) {
        throw new Error(
          'Browser context is closed or invalid during final check. ' +
            `Original error: ${finalContextError}`
        );
      }

      const foundPage = allPages.find((browserPage) =>
        browserPage.url().includes(urlSubstring)
      );

      if (foundPage) {
        return foundPage;
      }

      // Get current page URL safely
      let currentPageUrl: string;
      try {
        currentPageUrl = page.url();
      } catch (urlError) {
        currentPageUrl = 'Unable to get current page URL';
      }

      throw new Error(
        `No page found with URL containing "${urlSubstring}" after ${timeout}ms. ` +
          `Current page URL: ${currentPageUrl}, Available pages: ${allPages
            .map((p) => {
              try {
                return p.url();
              } catch {
                return 'Unable to get URL';
              }
            })
            .join(', ')}`
      );
    }
  }
};

const authenticateWithKeystore = async (
  walletPage: Page,
  keystorePath: string,
  keystorePassword: string
) => {
  await walletPage.getByTestId(SelectorsEnum.keystoreBtn).click();
  await walletPage.setInputFiles(SelectorsEnum.walletFile, keystorePath);

  const passwordInput = walletPage.getByTestId(SelectorsEnum.passwordInput);
  await expect(passwordInput).toBeVisible();
  await passwordInput.fill(keystorePassword);

  await walletPage.getByTestId(SelectorsEnum.submitButton).click();
  await walletPage.getByTestId(SelectorsEnum.confirmButton).click();
};

const authenticateWithPem = async (walletPage: Page, pemPath: string) => {
  await walletPage.getByTestId(SelectorsEnum.pemBtn).click();
  await walletPage.setInputFiles(SelectorsEnum.walletFile, pemPath);
  await walletPage.getByTestId(SelectorsEnum.submitButton).click();
};

export const connectWebWallet = async (
  page: Page,
  via: {
    keystore?: string;
    pem?: string;
    password?: string;
  }
) => {
  // Click the cross-window button to open wallet
  await page.getByTestId(SelectorsEnum.crossWindow).click();

  // Add a small delay to ensure the click is processed
  await page.waitForTimeout(1000);

  // Debug: Check what pages exist before waiting
  const pagesBefore = await page.context().pages();
  console.log(
    `Pages before waiting: ${pagesBefore.map((p) => p.url()).join(', ')}`
  );

  // Wait for the web wallet page to be loaded which is the new tab
  const walletPage = await waitForPageByUrlSubstring(
    page,
    OriginPageEnum.multiversxWallet
  );

  // If the web wallet page is not loaded, throw an error
  if (!walletPage) {
    throw new Error(
      `Web wallet page containing ${OriginPageEnum.multiversxWallet} is not loaded.`
    );
  }

  if (via.keystore) {
    if (!via.password) {
      throw new Error('Password is required when using a keystore.');
    }
    await authenticateWithKeystore(walletPage, via.keystore, via.password);
  } else if (via.pem) {
    await authenticateWithPem(walletPage, via.pem);
  }

  await walletPage.waitForEvent('close');
};

export const navigateToConnectWallet = async (page: Page) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Connect' }).first().click();
};

export const handlePingPong = async (page: Page, type: PingPongEnum) => {
  const container = page.locator(`#ping-pong-${type}`);
  const pingButton = container.getByTestId(SelectorsEnum.btnPing);
  const pongButton = container.getByTestId(SelectorsEnum.btnPong);

  let clickedButton: 'ping' | 'pong' | null = null;

  // Check if buttons are enabled by looking for absence of disabled attribute
  const isPingEnabled =
    (await pingButton.locator('button').getAttribute('disabled')) === null;
  const isPongEnabled =
    (await pongButton.locator('button').getAttribute('disabled')) === null;

  if (isPingEnabled) {
    await pingButton.click();
    clickedButton = 'ping';
  } else if (isPongEnabled) {
    await pongButton.click();
    clickedButton = 'pong';
  } else {
    throw new Error(
      `Neither Ping nor Pong button are enabled! Did you send a Ping or Pong within ${
        TEST_CONSTANTS.PING_PONG_COOLDOWN / 1000 / 60
      } minutes?`
    );
  }

  return clickedButton;
};

const confirmWithKeystore = async (walletPage: Page, password: string) => {
  await walletPage.getByTestId(SelectorsEnum.passwordInput).fill(password);
  await walletPage.getByTestId(SelectorsEnum.submitButton).click();
};

const confirmWithPem = async (walletPage: Page, pemPath: string) => {
  await walletPage.setInputFiles(SelectorsEnum.walletFile, pemPath);
  await walletPage.getByTestId(SelectorsEnum.submitButton).click();
};

export const confirmWalletTx = async (
  page: Page,
  via: {
    keystore?: string;
    password?: string;
    pem?: string;
  }
) => {
  if (via.keystore) {
    await confirmWithKeystore(page, via.password ?? '');
  } else if (via.pem) {
    await confirmWithPem(page, via.pem);
  }
};

export const checkButtonStatus = async (
  page: Page,
  type: PingPongEnum,
  lastClickedButton: 'ping' | 'pong' | null
) => {
  const container = page.locator(`#ping-pong-${type}`);
  const pingButton = container.getByTestId(SelectorsEnum.btnPing);
  const pongButton = container.getByTestId(SelectorsEnum.btnPong);

  // Check that ping button became disabled by looking for disabled attribute
  if (lastClickedButton === 'ping') {
    await expect(pingButton.locator('button')).toHaveAttribute('disabled');
  } else if (lastClickedButton === 'pong') {
    await expect(pongButton.locator('button')).toHaveAttribute('disabled');
  } else {
    throw new Error(
      'No button click information found. Did you call handlePingPong first?'
    );
  }
};

export const getCurrentBalance = async (page: Page): Promise<number> => {
  const topInfoElement = page.getByTestId(SelectorsEnum.topInfo);
  await topInfoElement.scrollIntoViewIfNeeded();
  const balanceElement = topInfoElement.getByTestId(SelectorsEnum.balance);
  await expect(balanceElement).toBeVisible();

  // Get the integer part
  const intElement = balanceElement.locator(
    `[data-testid="${SelectorsEnum.formatAmountInt}"]`
  );
  await expect(intElement).toBeVisible();
  const intText = await intElement.textContent();

  // Get the decimals part
  const decimalsElement = balanceElement.locator(
    `[data-testid="${SelectorsEnum.formatAmountDecimals}"]`
  );
  await expect(decimalsElement).toBeVisible();
  const decimalsText = await decimalsElement.textContent();

  // Combine integer and decimals to form the complete number
  const fullNumber = `${intText}${decimalsText}`;
  return parseFloat(fullNumber || '0');
};

export const checkBalanceUpdate = async (
  page: Page,
  initialBalance: number,
  expectedChange: number
) => {
  const expectedBalance = initialBalance + expectedChange;

  try {
    await expect
      .poll(
        async () => {
          const currentBalance = await getCurrentBalance(page);
          return currentBalance;
        },
        {
          message: `Balance should reach ${expectedBalance}`,
          timeout: TEST_CONSTANTS.BALANCE_POLLING_TIMEOUT
        }
      )
      .toBeCloseTo(expectedBalance, TEST_CONSTANTS.BALANCE_PRECISION);
  } catch (error) {
    // If expect.poll times out, get the current balance for debugging
    let currentBalance: number;
    try {
      currentBalance = await getCurrentBalance(page);
    } catch (getBalanceError) {
      currentBalance = initialBalance;
    }

    const actualChange = currentBalance - initialBalance;

    throw new Error(
      `Balance change verification timed out after ${TEST_CONSTANTS.BALANCE_POLLING_TIMEOUT}ms. ` +
        `Expected change: ${expectedChange}, Actual change: ${actualChange}`
    );
  }

  // If we get here, the balance has reached the expected value
  const currentBalance = await getCurrentBalance(page);
  const actualChange = currentBalance - initialBalance;

  expect(actualChange).toBeCloseTo(
    expectedChange,
    TEST_CONSTANTS.BALANCE_PRECISION
  );
};

/**
 * Verifies balance change based on the action performed
 * @param page - Playwright page object
 * @param initialBalance - Balance before the action
 * @param clickedButton - The button that was clicked ('ping' or 'pong')
 */
export const verifyBalanceChange = async (
  page: Page,
  initialBalance: number,
  clickedButton: 'ping' | 'pong'
) => {
  let expectedChange: number;

  if (clickedButton === 'ping') {
    expectedChange = TEST_CONSTANTS.PING_BALANCE_CHANGE; // -1 EGLD
  } else {
    expectedChange = TEST_CONSTANTS.PONG_BALANCE_CHANGE; // +1 EGLD
  }

  await checkBalanceUpdate(page, initialBalance, expectedChange);
};

export const waitForToastToBeDisplayed = async (page: Page) => {
  const toast = await page.getByTestId(SelectorsEnum.txToast);
  expect(toast).toBeVisible();
};

export const checkToastShowsTransactionsSigned = async (
  page: Page,
  numberOfTransactions: number
) => {
  const toast = page.getByTestId(SelectorsEnum.txToast);
  await expect(toast).toBeVisible();

  // Wait for the toast to show that all transactions are processed
  // TODO: use testId instead of text when testId is added
  await expect(toast).toContainText(
    `${numberOfTransactions} / ${numberOfTransactions} transactions processed`,
    { timeout: TEST_CONSTANTS.TOAST_WAIT_TIMEOUT }
  );
};

export const signBatchTransactions = async (
  page: Page,
  transactionType: string,
  numberOfTransactions: number
) => {
  let i = transactionType === 'swap-lock' ? 1 : 0;
  for (i; i < numberOfTransactions; i++) {
    await page.getByTestId(SelectorsEnum.signButton).click();
  }
};
