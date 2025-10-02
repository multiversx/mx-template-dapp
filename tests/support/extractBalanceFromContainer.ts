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

  // Get the integer part
  const intElement = balanceElement.locator(
    getTestIdSelector(SelectorsEnum.formatAmountInt)
  );
  await expect(intElement).toBeVisible();
  const intText = await intElement.textContent();

  // Get the decimals part
  const decimalsElement = balanceElement.locator(
    getTestIdSelector(SelectorsEnum.formatAmountDecimals)
  );
  await expect(decimalsElement).toBeVisible();
  const decimalsText = await decimalsElement.textContent();

  // Combine integer and decimals to form the complete number
  const fullNumber = `${intText}${decimalsText}`;

  return parseFloat(fullNumber || '0');
};
