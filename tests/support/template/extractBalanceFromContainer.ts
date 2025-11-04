import { expect } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import { getTestIdSelector } from './testIdSelector';
import { ExtractBalanceFromContainerType } from './types';

export const extractBalanceFromContainer = async ({
  page,
  containerSelector,
  selectorType = 'testId'
}: ExtractBalanceFromContainerType): Promise<number> => {
  const containerElement =
    selectorType === 'testId'
      ? page.getByTestId(containerSelector)
      : page.locator(containerSelector);

  await containerElement.scrollIntoViewIfNeeded();

  const balanceElement = containerElement.getByTestId(SelectorsEnum.balance);
  await expect(balanceElement).toBeVisible();

  // Integer part
  const intText = (
    await balanceElement
      .locator(getTestIdSelector(SelectorsEnum.formatAmountInt))
      .innerText()
  )?.trim();

  // Decimals part
  const decimalsText = (
    await balanceElement
      .locator(getTestIdSelector(SelectorsEnum.formatAmountDecimals))
      .innerText()
  )?.trim();

  // Combine with decimal point
  const fullNumber = decimalsText ? `${intText}.${decimalsText}` : intText;

  return parseFloat(fullNumber || '0');
};
