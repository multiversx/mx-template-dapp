import { expect } from '@playwright/test';
import { TEST_CONSTANTS } from './constants';
import { SelectorsEnum } from './testdata';
import { WaitForTransactionToastToContainType } from './types';

export const waitForTransactionToastToContain = async ({
  page,
  toastTitle,
  toastContent,
  toastStatus,
  toastIndex = 0
}: WaitForTransactionToastToContainType) => {
  if (!toastTitle && !toastContent && !toastStatus) {
    throw new Error('Either toast title, content or status must be provided');
  }

  const titleLocator = page.getByTestId(SelectorsEnum.toastTitle);
  const contentLocator = page.getByTestId(SelectorsEnum.toastContent);
  const statusLocator = page.getByTestId(SelectorsEnum.toastStatus);

  // Wait for toast visibility
  await expect(contentLocator.nth(toastIndex)).toBeVisible({
    timeout: TEST_CONSTANTS.TOAST_WAIT_TIMEOUT
  });

  if (toastTitle) {
    await expect(titleLocator.nth(toastIndex)).toContainText(toastTitle, {
      timeout: TEST_CONSTANTS.TOAST_WAIT_TIMEOUT,
      useInnerText: true
    });
  }

  if (toastContent) {
    await expect(contentLocator.nth(toastIndex)).toContainText(toastContent, {
      timeout: TEST_CONSTANTS.TOAST_WAIT_TIMEOUT,
      useInnerText: true
    });
  }

  if (toastStatus) {
    await expect(statusLocator.nth(toastIndex)).toContainText(toastStatus, {
      timeout: TEST_CONSTANTS.TOAST_WAIT_TIMEOUT,
      useInnerText: true
    });
  }
};
