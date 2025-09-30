import { expect } from '@playwright/test';

import { TEST_CONSTANTS } from './constants';
import { extractBalanceFromContainer } from './extractBalanceFromContainer';
import { CheckBalanceUpdateType } from './types';

export const checkBalanceUpdate = async ({
  page,
  containerSelector,
  initialBalance,
  expectedChange
}: CheckBalanceUpdateType) => {
  const expectedBalance = initialBalance + expectedChange;

  const pollFunction = async () => {
    const currentBalance = await extractBalanceFromContainer({
      page,
      containerSelector,
      selectorType: 'testId'
    });
    return currentBalance;
  };

  const pollOptions = {
    message: `Balance should reach ${expectedBalance}`,
    timeout: TEST_CONSTANTS.BALANCE_POLLING_TIMEOUT
  };

  try {
    await expect
      .poll(pollFunction, pollOptions)
      .toBeCloseTo(expectedBalance, TEST_CONSTANTS.BALANCE_PRECISION);
  } catch (error) {
    // If expect.poll times out, get the current balance for debugging
    let currentBalance: number;
    try {
      currentBalance = await extractBalanceFromContainer({
        page,
        containerSelector,
        selectorType: 'testId'
      });
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
  const currentBalance = await extractBalanceFromContainer({
    page,
    containerSelector,
    selectorType: 'testId'
  });
  const actualChange = currentBalance - initialBalance;

  expect(actualChange).toBeCloseTo(
    expectedChange,
    TEST_CONSTANTS.BALANCE_PRECISION
  );
};
