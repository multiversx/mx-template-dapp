import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';

export const confirmPrivateKeyTransaction = async (
  page: Page,
  privateKey: string
) => {
  await page.getByTestId(SelectorsEnum.privateKeyInput).fill(privateKey);
  await page.getByTestId(SelectorsEnum.submitButton).click();
};
