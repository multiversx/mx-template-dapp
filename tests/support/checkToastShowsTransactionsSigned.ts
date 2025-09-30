import { expect, Page } from '@playwright/test';

import { SelectorsEnum } from './testdata';
import { TEST_CONSTANTS } from './constants';

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
