import { expect, Page } from '@playwright/test';
import { initTransaction, confirmPass } from '../utils/actions';
import { GlobalSelectorEnum } from '../utils/enums';

export const closeTransaction = async (page: Page) => {
  const walletPage = await initTransaction(page);
  await walletPage
    .getByTestId(GlobalSelectorEnum.keystoreCloseModalBtn)
    .click();
};

export const closeTemplateModal = async (page: Page) => {
  await initTransaction(page);
  await page.bringToFront();
  await page.waitForTimeout(1500);
  const buttons = await page
    .locator(GlobalSelectorEnum.closeTemplateModal)
    .all();
  await buttons[1].click();
  await page.waitForTimeout(1500);
  const allHandles = await page.context().pages();
  expect(allHandles.length).toBe(1);
  await initTransaction(page);
  await page.bringToFront();
  await expect(page.locator(GlobalSelectorEnum.accesWalletBtn)).toBeVisible();
};

export const closeWalletTab = async (page: Page) => {
  await initTransaction(page);
  await page.close();
  await page.bringToFront();
  const buttons = await page
    .locator(GlobalSelectorEnum.closeTemplateModal)
    .all();
  await buttons[1].click();
  await page.waitForTimeout(1500);
  await initTransaction(page);
  await page.bringToFront();
  await page.locator(GlobalSelectorEnum.accesWalletBtn).waitFor();
};

export const reloadWalletWindow = async (page: Page) => {
  await initTransaction(page);
  await page.reload();
  await page.waitForTimeout(500);
  const allHandles = await page.context().pages();
  expect(allHandles.length).toBe(1);
};

export const signMsg = async (page: Page) => {
  await page.fill(GlobalSelectorEnum.textArea, 'Test');
  await page.click(GlobalSelectorEnum.signMsgBtn);
  await page.waitForTimeout(1000);
  await page.bringToFront();
  await confirmPass(page);
  await page.click(GlobalSelectorEnum.signMsgWalletBtn);
  await page.waitForTimeout(1000);
  await page.bringToFront();
  await page.click(GlobalSelectorEnum.clearBtn);
};
