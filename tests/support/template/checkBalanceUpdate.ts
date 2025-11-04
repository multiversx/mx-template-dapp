import { expect, Page } from '@playwright/test';
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
    const balance = await extractBalanceFromContainer({
      page,
      containerSelector,
      selectorType: 'testId'
    });

    return balance;
  };

  await expect
    .poll(pollFunction, {
      message: `Balance should reach ${expectedBalance} (change: ${expectedChange})`,
      timeout: TEST_CONSTANTS.BALANCE_POLLING_TIMEOUT
    })
    .toBeCloseTo(expectedBalance, TEST_CONSTANTS.BALANCE_PRECISION);
};

export const checkPingPongBalanceUpdate = async ({
  page,
  containerSelector,
  initialBalance,
  isPing
}: {
  page: Page;
  containerSelector: string;
  initialBalance: number;
  isPing: boolean;
}) => {
  const expectedChange = isPing
    ? TEST_CONSTANTS.PING_BALANCE_CHANGE
    : TEST_CONSTANTS.PONG_BALANCE_CHANGE;

  await checkBalanceUpdate({
    page,
    containerSelector,
    initialBalance,
    expectedChange
  });
};
