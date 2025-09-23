import { Page } from '@playwright/test';

import { TEST_CONSTANTS } from './constants';
import { checkBalanceUpdate } from './checkBalanceUpdate';

/**
 * Verifies balance change based on the action performed
 * @param page - Playwright page object
 * @param initialBalance - Balance before the action
 * @param clickedButton - The button that was clicked ('ping' or 'pong')
 */
export const verifyBalanceChange = async ({
  page,
  initialBalance,
  clickedButton
}: {
  page: Page;
  initialBalance: number;
  clickedButton: 'ping' | 'pong';
}) => {
  let expectedChange: number;

  if (clickedButton === 'ping') {
    expectedChange = TEST_CONSTANTS.PING_BALANCE_CHANGE; // -1 EGLD
  } else {
    expectedChange = TEST_CONSTANTS.PONG_BALANCE_CHANGE; // +1 EGLD
  }

  await checkBalanceUpdate({
    page,
    initialBalance,
    expectedChange
  });
};
