import { expect, Page } from '@playwright/test';

import { SelectorsEnum } from './testdata';

export const waitForToastToBeClosed = async (page: Page) => {
  const toast = await page.getByTestId(SelectorsEnum.txToast);
  expect(toast).not.toBeVisible();
};
