import { Page } from '@playwright/test';
import { TEST_CONSTANTS } from './constants';
import { SelectorsEnum } from './testdata';

export const waitForToastToBeClosed = async (page: Page) => {
  const toast = page.getByTestId(SelectorsEnum.toastContent).first();
  await toast.waitFor({
    state: 'hidden',
    timeout: TEST_CONSTANTS.TOAST_WAIT_TIMEOUT
  });
};
