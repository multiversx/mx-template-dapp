import { expect, Page } from '@playwright/test';

import { SelectorsEnum } from './testdata';

export const waitForToastToBeDisplayed = async (page: Page) => {
  const toast = await page.getByTestId(SelectorsEnum.txToast);
  expect(toast).toBeVisible();
};
