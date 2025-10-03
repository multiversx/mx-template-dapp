import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';

export const waitForToastToBeClosed = async (page: Page) => {
  const toast = page.getByTestId(SelectorsEnum.toastContent).first();
  await toast.waitFor({ state: 'hidden' });
};
