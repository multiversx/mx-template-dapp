import { expect, Page } from '@playwright/test';

import { SelectorsEnum } from './testdata';
import { TEST_CONSTANTS } from './constants';

export const waitForTransactionToastToContain = async ({
  page,
  toastContent
}: {
  page: Page;
  toastContent?: string;
}) => {
  // Wait for at least one toast to appear
  const toastContentElements = page.getByTestId(
    SelectorsEnum.toastTransactionContent
  );
  const count = await toastContentElements.count();
  expect(count).toBeGreaterThan(0);

  // Wait for any toast that contains the expected content
  if (toastContent) {
    await page.waitForFunction(
      ({ expectedContent, testId }) => {
        const toasts = document.querySelectorAll(`[data-testid="${testId}"]`);
        return Array.from(toasts).some(
          (toast) => toast.textContent?.includes(expectedContent)
        );
      },
      {
        expectedContent: toastContent,
        testId: SelectorsEnum.toastTransactionContent
      },
      { timeout: TEST_CONSTANTS.TOAST_WAIT_TIMEOUT }
    );
  }
};
